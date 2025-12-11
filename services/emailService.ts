import emailjs from '@emailjs/browser';

// ==============================================================================
// CONFIGURAÇÃO DO EMAILJS
// Chaves configuradas para a BF Agência
// ==============================================================================

const SERVICE_ID = 'service_xk7qegk';
const TEMPLATE_ID = 'template_tx3pkq8';
const PUBLIC_KEY = 'ldt4IFPLiNXVl0IGu';

export const sendEmailNotification = async (data: any) => {
  try {
    // Mapeia os dados do formulário/chat para as variáveis do Template do EmailJS
    const templateParams = {
      to_name: "Equipe BF Agência",
      from_name: data.name,
      company: data.company || "Não informada",
      phone: data.phone,
      email: data.email || "Não informado",
      revenue: data.revenue || "Não informado",
      message: data.message || data.needs || "Sem mensagem", // 'message' do form, 'needs' do chat
      source: data.source || "Site"
    };

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    console.log('✅ Email enviado com sucesso!', response.status, response.text);
    return response;
  } catch (error) {
    console.error('❌ Falha ao enviar email:', error);
    // Não lançamos o erro novamente para não travar o fluxo do WhatsApp caso o email falhe
  }
};