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
  teamGroup: "https://res.cloudinary.com/djpdiwdxt/image/upload/v1773419178/EquipeBF_1_xqqrzd.png",
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
    name: "Mônica",
    role: "Social Media",
    instagram: "https://www.instagram.com/_bfagencia/",
    image: "https://res.cloudinary.com/djpdiwdxt/image/upload/v1773419556/Design_sem_nome_79_y0odb6.png",
    thumbnail: "https://res.cloudinary.com/djpdiwdxt/image/upload/v1773419550/Rostobf_xrshbz.png",
    active: true
  },
  { 
    name: "Gleice", 
    role: "Suporte ao cliente", 
    instagram: "https://www.instagram.com/gleh_01/", 
    image: "https://res.cloudinary.com/djpdiwdxt/image/upload/v1770230307/3_w0xudp.png",
    thumbnail: "https://res.cloudinary.com/djpdiwdxt/image/upload/v1770230317/4_cu8hz0.png",
    active: true 
  },
  {
    name: "Geriel Soglia",
    role: "CEO & Founder",
    instagram: "https://www.instagram.com/ogeriiel/",
    image: "https://res.cloudinary.com/djpdiwdxt/image/upload/v1770230307/7_whqhjp.png",
    thumbnail: "https://res.cloudinary.com/djpdiwdxt/image/upload/v1770230320/6_ybipph.png",
    active: true
  },
  {
    name: "Marcos Júnior",
    role: "Diretor e Gerente Comercial",
    instagram: "https://www.instagram.com/marcosg_jr/",
    image: "https://res.cloudinary.com/djpdiwdxt/image/upload/v1770230307/8_j6pnvt.png",
    thumbnail: "https://res.cloudinary.com/djpdiwdxt/image/upload/v1770230317/1_ux9pyq.png",
    active: true
  },
  { 
    name: "Giselle", 
    role: "Especialista em Contingência", 
    instagram: "https://www.instagram.com/g.soglia/", 
    image: "https://res.cloudinary.com/djpdiwdxt/image/upload/v1770230308/4_fjpmbz.png",
    thumbnail: "https://res.cloudinary.com/djpdiwdxt/image/upload/v1770230320/5_dq1zoe.png",
    active: true
  },
  { 
    name: "Vanesca", 
    role: "Copywriting", 
    instagram: "https://www.instagram.com/vanesca_araujoo/", 
    image: "https://res.cloudinary.com/djpdiwdxt/image/upload/v1770230307/6_ogm4tu.png",
    thumbnail: "https://res.cloudinary.com/djpdiwdxt/image/upload/v1770230316/8_jgxhu3.png",
    active: true
  },
  { 
    name: "Ytallo", 
    role: "Estrategista digital", 
    instagram: "https://www.instagram.com/o.ytallo/", 
    image: "https://res.cloudinary.com/djpdiwdxt/image/upload/v1770230308/2_ghf0o7.png",
    thumbnail: "https://res.cloudinary.com/djpdiwdxt/image/upload/v1770230317/3_irbm0z.png",
    active: true
  },
  { 
    name: "Anne", 
    role: "Setor Administrativo", 
    instagram: "https://www.instagram.com/anneujjo/", 
    image: "https://res.cloudinary.com/djpdiwdxt/image/upload/v1770230308/1_a8i8lp.png", 
    thumbnail: "https://res.cloudinary.com/djpdiwdxt/image/upload/v1770230317/2_mdorsm.png",
    active: true
  }
];