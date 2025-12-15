import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";

// Tool definition for saving leads
const saveLeadTool: FunctionDeclaration = {
  name: 'saveLead',
  parameters: {
    type: Type.OBJECT,
    description: 'Salva os dados de um cliente potencial (lead) no banco de dados quando ele demonstra interesse. Deve ser chamado ao final da qualificação.',
    properties: {
      name: { type: Type.STRING, description: 'Nome do cliente' },
      company: { type: Type.STRING, description: 'Nome da empresa ou "Projeto Pessoal" se não tiver empresa.' },
      phone: { type: Type.STRING, description: 'Telefone ou WhatsApp do cliente' },
      revenue: { type: Type.STRING, description: 'Faturamento mensal estimado (ou "Iniciante" se não tiver)' },
      needs: { type: Type.STRING, description: 'RESUMO COMPLETO da conversa: O que o cliente quer? Qual a dor dele? (Ex: "Quer crescer instagram pessoal", "Tem loja de roupas e quer vender mais")' }
    },
    required: ['name', 'phone', 'company', 'needs'],
  },
};

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const generateAIResponse = async (history: ChatMessage[]): Promise<{ text: string, functionCall?: any }> => {
  try {
    // Correção: Acessar diretamente process.env.API_KEY.
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.error("API_KEY não encontrada. Verifique o arquivo .env ou as variáveis de ambiente da Vercel.");
      return { text: "⚠️ Configuração de API ausente." };
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });

    const systemInstruction = `
      Você é a IA de Vendas da BF Agência (Gestão de Tráfego).
      
      SEU OBJETIVO:
      Qualificar e coletar dados de QUALQUER pessoa interessada em crescer no digital.

      REGRAS DE CONTEXTO E FLUIDEZ (MUITO IMPORTANTE):
      1. **Não seja robótico**: Se o usuário disser apenas "Oi", "Olá" ou uma saudação simples, **NÃO** responda com "Excelente!", "Perfeito!" ou validações exageradas. Apenas retribua a saudação e pergunte educadamente como pode ajudar.
         - ERRADO: Usuário: "Oi" -> Você: "Excelente! Qual seu nome?" (Sem nexo).
         - CERTO: Usuário: "Oi" -> Você: "Olá! Tudo bem? Como posso ajudar sua empresa a vender mais hoje?"
      2. **Escute antes de perguntar**: Se o usuário fizer uma pergunta específica (ex: "Vocês fazem sites?"), responda a pergunta PRIMEIRO, e só depois tente qualificar.
      3. **Validação**: Só use "Excelente", "Ótimo", "Entendido" se o usuário tiver passado uma informação real ou positiva.

      REGRAS DE NEGÓCIO:
      1. **CLIENTE SEM EMPRESA É CLIENTE**: Se o usuário disser "Não tenho empresa", NÃO O DESCARTE. Trate como um projeto de "Marca Pessoal", "Influenciador" ou "Negócio em fase de ideia".
      2. **QUALIFICAÇÃO**:
         - Nome
         - Nome do Projeto/Empresa (Se não tiver, chame de "Projeto Pessoal")
         - WhatsApp
         - Faturamento (Se for pessoa física/iniciante, pergunte quanto pretende investir).
      3. **PEDIDO DE NÚMERO**: Se o usuário pedir o WhatsApp, forneça o link https://wa.me/5573991002247 IMEDIATAMENTE.
      
      FINALIZAÇÃO (Use a ferramenta 'saveLead'):
      - Assim que tiver os dados básicos, chame a função 'saveLead'.
      - No campo 'needs', faça um RESUMO do que o cliente falou.
      - Após chamar a função, diga: "Perfeito, [Nome]. Registrei seu interesse. Clique no botão abaixo para finalizar."

      Tom de voz: Profissional, confiante, mas adaptável e sensato.
    `;

    // Convert internal history format to Gemini format
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        tools: [{ functionDeclarations: [saveLeadTool] }],
      }
    });

    const candidate = response.candidates?.[0];
    const modelText = candidate?.content?.parts?.find(p => p.text)?.text || "";
    
    // Check for function calls
    const functionCall = candidate?.content?.parts?.find(p => p.functionCall)?.functionCall;

    return {
      text: modelText,
      functionCall: functionCall
    };

  } catch (error) {
    console.error("Erro na Gemini API:", error);
    return { text: "Estou enfrentando uma instabilidade momentânea. Por favor, me chame no WhatsApp." };
  }
};