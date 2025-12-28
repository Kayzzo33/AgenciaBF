import { Target, TrendingUp, MessageCircle, Cpu, Eye, Users } from 'lucide-react';

// Assets configuration with Cloudinary optimization parameters
const CLOUDINARY_BASE = "https://res.cloudinary.com/djpdiwdxt/image/upload/f_auto,q_auto";

export const ASSETS = {
  heroBg: `${CLOUDINARY_BASE}/v1764784953/BackGround_Hero_syepak.jpg`, 
  logoMain: `${CLOUDINARY_BASE}/v1764784701/logo_bf_hero_bcswa7.png`,
  logoText: `${CLOUDINARY_BASE}/v1764784736/agencia_logo_hero_iv4l2t.png`,
  heroLogo: `${CLOUDINARY_BASE}/v1764784775/Logo_Preta_gkfaix.png`,
  logoWatermark: `${CLOUDINARY_BASE}/v1764784887/logo_amarela_lwvtk6.png`,
  introBg: `${CLOUDINARY_BASE}/v1764786446/fundo_section2_avqlo5.jpg`,
  notebook: `${CLOUDINARY_BASE}/v1764784887/notebook_xro8m7.png`,
  arrow: `${CLOUDINARY_BASE}/v1764784886/SETAS_aggeri.png`,
  logoYellow: `${CLOUDINARY_BASE}/v1764784887/logo_amarela_lwvtk6.png`,
  teamBg: `${CLOUDINARY_BASE}/v1764786392/Fundobsluan_pikhlq.jpg`,
  teamPerson1: `${CLOUDINARY_BASE}/v1764785101/BFCOMSOMBRA_ojuysb.png`,
  teamPerson2: `${CLOUDINARY_BASE}/v1764785101/LuanComSombra_g0tsot.png`,
  teamFrame: `${CLOUDINARY_BASE}/v1764785099/QuadradoLinha_quqo4f.png`, 
  teamLogo: `${CLOUDINARY_BASE}/v1764784775/Logo_Preta_gkfaix.png`,
  notebookBlack: `${CLOUDINARY_BASE}/v1764787033/notebookblack_-_Editado_b91fnn.png`,
  notebookBlur: `${CLOUDINARY_BASE}/v1764785100/notebookblack_-_Editado_b91fnn.png`,
  partnerPerson: `${CLOUDINARY_BASE}/v1764785607/Gemini_Generated_Image_r9yafcr9yafcr9ya_zap6qs.png`,
};

// Data
export const SERVICES = [
  { title: "Gestão de Tráfego", desc: "Campanhas otimizadas no Meta e Google Ads para PMEs.", icon: Target },
  { title: "Análise de ROI", desc: "Foco total no retorno sobre o investimento do seu negócio.", icon: TrendingUp },
  { title: "Copywriting", desc: "Textos persuasivos que convertem visitantes em clientes.", icon: MessageCircle },
  { title: "Consultoria AI", desc: "Análise de dados preditiva com tecnologia Gemini.", icon: Cpu },
];

export const STATS = [
  { value: 50, label: "Projetos Concluídos", suffix: "+" },
  { value: 50, label: "Clientes Satisfeitos", suffix: "+" },
  { value: 92, label: "Taxa de Sucesso", suffix: "%" },
  { value: 5, label: "Anos de Experiência", suffix: "+" },
];

export const TESTIMONIALS = [
  { name: "Carlos Silva", role: "CEO, TechStore", text: "A BF Agência transformou nossas vendas online em 3 meses." },
  { name: "Mariana Costa", role: "Diretora, Clinica Bem Estar", text: "Profissionalismo e resultados consistentes. Recomendo demais!" },
  { name: "Ricardo Gomes", role: "Fundador, Burger King (Franquia)", text: "O tráfego pago finalmente deu retorno real para nossa loja." },
  { name: "Ana Paula", role: "Gerente, Modas 360", text: "Atendimento humanizado e estratégias que funcionam." },
  { name: "Fernanda Lima", role: "Advogada", text: "Conseguiram segmentar meu público perfeitamente." },
];

export const SOLUTIONS_LIST = [
  "Criação de campanhas estratégicas",
  "Gerenciamento de métricas",
  "Foco em resultados exponenciais",
  "Planejamento de escala",
  "Análise de criativos",
  "Análise de Copy",
  "Relatório Mensal com dados precisos",
  "Criação de processo comercial otimizado",
  "Automação com IA para atendimento sem dores de cabeça",
  "Gerenciamento das Redes",
  "Otimização do seu Perfil no Google meu Negócio",
  "Criação de Sites Profissionais"
];

export const ADAPTATION_ITEMS = [
  { title: "Observação de mercado", icon: Eye },
  { title: "Análise completa do nicho", icon: Target },
  { title: "Direcionamento estratégico de público", icon: Users }
];

export const EXTENDED_TEAM = [
  { 
    name: "Anne", 
    role: "Setor Administrativo", 
    instagram: "https://www.instagram.com/anneujjo/", 
    image: `${CLOUDINARY_BASE}/v1764785473/Design_sem_nome_33_kbp3ml.png`, 
    thumbnail: `${CLOUDINARY_BASE}/w_200,c_fill,g_face,f_auto,q_auto/v1765329731/Design_sem_nome_42_q2cfik.png`,
    active: true
  },
  { 
    name: "Gleice", 
    role: "Suporte ao cliente", 
    instagram: "https://www.instagram.com/gleh_01/", 
    image: `${CLOUDINARY_BASE}/v1764785473/Design_sem_nome_34_juikmo.png`,
    thumbnail: `${CLOUDINARY_BASE}/w_200,c_fill,g_face,f_auto,q_auto/v1765329731/Design_sem_nome_41_fyoiso.png`,
    active: true 
  },
  { 
    name: "Ytallo", 
    role: "Estrategista digital", 
    instagram: "https://www.instagram.com/o.ytallo/", 
    image: `${CLOUDINARY_BASE}/v1764789524/Design_sem_nome_36_uvsfcy.png`,
    thumbnail: `${CLOUDINARY_BASE}/w_200,c_fill,g_face,f_auto,q_auto/v1765329731/Design_sem_nome_40_mweocc.png`,
    active: true
  },
  { 
    name: "Evinho", 
    role: "Especialista em Google meu Negócio", 
    instagram: "https://www.instagram.com/evin_san_?igsh=NGN4MmN0MTF4b3ow", 
    image: `${CLOUDINARY_BASE}/v1764789524/Design_sem_nome_35_wknqat.png`,
    thumbnail: `${CLOUDINARY_BASE}/w_200,c_fill,g_face,f_auto,q_auto/v1765329731/Design_sem_nome_39_xe3zaw.png`,
    active: true
  },
  { 
    name: "Giselle", 
    role: "Especialista em Contingência", 
    instagram: "https://www.instagram.com/g.soglia/", 
    image: `${CLOUDINARY_BASE}/v1765326689/Design_sem_nome_37_a2mqkn.png`,
    thumbnail: `${CLOUDINARY_BASE}/w_200,c_fill,g_face,f_auto,q_auto/v1765329731/Design_sem_nome_38_vrxc6w.png`,
    active: true
  },
  { 
    name: "Vanesca", 
    role: "Comercial e Vendas", 
    instagram: "https://www.instagram.com/vanesca_araujoo/", 
    image: `${CLOUDINARY_BASE}/v1766511478/Design_sem_nome_44_ty0igi.png`,
    thumbnail: `${CLOUDINARY_BASE}/w_200,c_fill,g_face,f_auto,q_auto/v1766511821/Design_sem_nome_46_tliwsk.png`,
    active: true
  },
];