// Landing Page Translations - Separate file to avoid modifying existing translations.ts

// Using const + typeof pattern for better Vite compatibility
const languages = ['es', 'en', 'pt'] as const;
export type LandingLanguage = typeof languages[number];

export interface LandingTranslations {
  nav: {
    products: string;
    features: string;
    login: string;
    register: string;
  };
  hero: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaLogin: string;
    ctaLearnMore: string;
  };
  products: {
    title: string;
    subtitle: string;
    visitSite: string;
    socialgestDesc: string;
    tikketDesc: string;
    advocatesDesc: string;
    quanticoDesc: string;
  };
  features: {
    title: string;
    subtitle: string;
    sso: { title: string; description: string };
    dashboard: { title: string; description: string };
    security: { title: string; description: string };
    multilang: { title: string; description: string };
    ai: { title: string; description: string };
    support: { title: string; description: string };
  };
  stats: {
    products: string;
    languages: string;
    support: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
    loginLink: string;
  };
  footer: {
    description: string;
    products: string;
    legal: string;
    terms: string;
    privacy: string;
    contact: string;
    copyright: string;
  };
  login: {
    title: string;
    subtitle: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    forgotPassword: string;
    submitButton: string;
    noAccount: string;
    createAccount: string;
    orContinueWith: string;
    rememberMe: string;
  };
}

export const landingTranslations: Record<LandingLanguage, LandingTranslations> = {
  es: {
    nav: {
      products: 'Productos',
      features: 'Caracteristicas',
      login: 'Iniciar sesion',
      register: 'Registrarse',
    },
    hero: {
      title: 'Todos tus productos',
      titleHighlight: 'en un solo lugar',
      subtitle: 'Magnetic Suite centraliza el acceso a SocialGest, Tikket, AdvocatesPro y Quantico con un unico inicio de sesion seguro.',
      ctaLogin: 'Iniciar sesion',
      ctaLearnMore: 'Conocer mas',
    },
    products: {
      title: 'Nuestros Productos',
      subtitle: 'Soluciones integrales para potenciar tu negocio digital',
      visitSite: 'Visitar sitio',
      socialgestDesc: 'Gestion integral de redes sociales. Programa publicaciones, analiza metricas y gestiona tu comunidad.',
      tikketDesc: 'Sistema de tickets y soporte al cliente. Gestiona conversaciones y mejora la atencion.',
      advocatesDesc: 'Plataforma de employee advocacy. Amplifica tu marca a traves de colaboradores.',
      quanticoDesc: 'Analytics y metricas avanzadas. Dashboards, reportes automatizados e insights.',
    },
    features: {
      title: 'Por que elegir Magnetic Suite',
      subtitle: 'La plataforma que simplifica la gestion de tus herramientas digitales',
      sso: {
        title: 'Single Sign-On',
        description: 'Un solo inicio de sesion para acceder a todos los productos de Magnetic.',
      },
      dashboard: {
        title: 'Dashboard Unificado',
        description: 'Visualiza metricas de todos tus productos en un solo lugar centralizado.',
      },
      security: {
        title: 'Seguridad Empresarial',
        description: 'Autenticacion JWT, sesiones seguras y cifrado de credenciales AES-256.',
      },
      multilang: {
        title: 'Multiidioma',
        description: 'Disponible en Espanol, Ingles y Portugues para equipos globales.',
      },
      ai: {
        title: 'Asistente AI',
        description: 'Asistente inteligente integrado para responder tus preguntas.',
      },
      support: {
        title: 'Soporte Dedicado',
        description: 'Equipo de soporte disponible para ayudarte cuando lo necesites.',
      },
    },
    stats: {
      products: 'productos integrados',
      languages: 'idiomas disponibles',
      support: 'soporte dedicado',
    },
    cta: {
      title: 'Comienza a centralizar tus productos hoy',
      subtitle: 'Accede a todas las herramientas de Magnetic con una sola cuenta. Sin tarjeta de credito requerida.',
      button: 'Crear cuenta gratis',
      loginLink: 'Ya tienes cuenta?',
    },
    footer: {
      description: 'La plataforma unificada para gestionar todos los productos de Magnetic Suite de forma segura y eficiente.',
      products: 'Productos',
      legal: 'Legal',
      terms: 'Terminos de servicio',
      privacy: 'Politica de privacidad',
      contact: 'Contacto',
      copyright: '2026 Magnetic. Todos los derechos reservados.',
    },
    login: {
      title: 'Bienvenido de nuevo',
      subtitle: 'Ingresa a tu cuenta de Magnetic Suite',
      emailPlaceholder: 'tu@email.com',
      passwordPlaceholder: 'Tu contrasena',
      forgotPassword: 'Olvidaste tu contrasena?',
      submitButton: 'Iniciar sesion',
      noAccount: 'No tienes cuenta?',
      createAccount: 'Crear cuenta',
      orContinueWith: 'O continua con',
      rememberMe: 'Recordarme',
    },
  },
  en: {
    nav: {
      products: 'Products',
      features: 'Features',
      login: 'Sign in',
      register: 'Sign up',
    },
    hero: {
      title: 'All your products',
      titleHighlight: 'in one place',
      subtitle: 'Magnetic Suite centralizes access to SocialGest, Tikket, AdvocatesPro and Quantico with a single secure sign-on.',
      ctaLogin: 'Sign in',
      ctaLearnMore: 'Learn more',
    },
    products: {
      title: 'Our Products',
      subtitle: 'Comprehensive solutions to power your digital business',
      visitSite: 'Visit site',
      socialgestDesc: 'Complete social media management. Schedule posts, analyze metrics and manage your community.',
      tikketDesc: 'Ticket system and customer support. Manage conversations and improve service.',
      advocatesDesc: 'Employee advocacy platform. Amplify your brand through collaborators.',
      quanticoDesc: 'Advanced analytics and metrics. Dashboards, automated reports and insights.',
    },
    features: {
      title: 'Why choose Magnetic Suite',
      subtitle: 'The platform that simplifies managing your digital tools',
      sso: {
        title: 'Single Sign-On',
        description: 'One login to access all Magnetic products seamlessly.',
      },
      dashboard: {
        title: 'Unified Dashboard',
        description: 'View metrics from all your products in one centralized place.',
      },
      security: {
        title: 'Enterprise Security',
        description: 'JWT authentication, secure sessions and AES-256 credential encryption.',
      },
      multilang: {
        title: 'Multi-language',
        description: 'Available in Spanish, English and Portuguese for global teams.',
      },
      ai: {
        title: 'AI Assistant',
        description: 'Integrated intelligent assistant to answer your questions.',
      },
      support: {
        title: 'Dedicated Support',
        description: 'Support team available to help you whenever you need.',
      },
    },
    stats: {
      products: 'integrated products',
      languages: 'languages available',
      support: 'dedicated support',
    },
    cta: {
      title: 'Start centralizing your products today',
      subtitle: 'Access all Magnetic tools with a single account. No credit card required.',
      button: 'Create free account',
      loginLink: 'Already have an account?',
    },
    footer: {
      description: 'The unified platform to manage all Magnetic Suite products securely and efficiently.',
      products: 'Products',
      legal: 'Legal',
      terms: 'Terms of service',
      privacy: 'Privacy policy',
      contact: 'Contact',
      copyright: '2026 Magnetic. All rights reserved.',
    },
    login: {
      title: 'Welcome back',
      subtitle: 'Sign in to your Magnetic Suite account',
      emailPlaceholder: 'you@email.com',
      passwordPlaceholder: 'Your password',
      forgotPassword: 'Forgot your password?',
      submitButton: 'Sign in',
      noAccount: "Don't have an account?",
      createAccount: 'Create account',
      orContinueWith: 'Or continue with',
      rememberMe: 'Remember me',
    },
  },
  pt: {
    nav: {
      products: 'Produtos',
      features: 'Recursos',
      login: 'Entrar',
      register: 'Cadastrar',
    },
    hero: {
      title: 'Todos os seus produtos',
      titleHighlight: 'em um so lugar',
      subtitle: 'Magnetic Suite centraliza o acesso ao SocialGest, Tikket, AdvocatesPro e Quantico com um unico login seguro.',
      ctaLogin: 'Entrar',
      ctaLearnMore: 'Saiba mais',
    },
    products: {
      title: 'Nossos Produtos',
      subtitle: 'Solucoes completas para impulsionar seu negocio digital',
      visitSite: 'Visitar site',
      socialgestDesc: 'Gestao completa de redes sociais. Agende publicacoes, analise metricas e gerencie sua comunidade.',
      tikketDesc: 'Sistema de tickets e suporte ao cliente. Gerencie conversas e melhore o atendimento.',
      advocatesDesc: 'Plataforma de employee advocacy. Amplifique sua marca atraves de colaboradores.',
      quanticoDesc: 'Analytics e metricas avancadas. Dashboards, relatorios automatizados e insights.',
    },
    features: {
      title: 'Por que escolher Magnetic Suite',
      subtitle: 'A plataforma que simplifica a gestao das suas ferramentas digitais',
      sso: {
        title: 'Single Sign-On',
        description: 'Um unico login para acessar todos os produtos da Magnetic.',
      },
      dashboard: {
        title: 'Dashboard Unificado',
        description: 'Visualize metricas de todos os seus produtos em um so lugar centralizado.',
      },
      security: {
        title: 'Seguranca Empresarial',
        description: 'Autenticacao JWT, sessoes seguras e criptografia de credenciais AES-256.',
      },
      multilang: {
        title: 'Multi-idioma',
        description: 'Disponivel em Espanhol, Ingles e Portugues para equipes globais.',
      },
      ai: {
        title: 'Assistente AI',
        description: 'Assistente inteligente integrado para responder suas perguntas.',
      },
      support: {
        title: 'Suporte Dedicado',
        description: 'Equipe de suporte disponivel para ajuda-lo quando precisar.',
      },
    },
    stats: {
      products: 'produtos integrados',
      languages: 'idiomas disponiveis',
      support: 'suporte dedicado',
    },
    cta: {
      title: 'Comece a centralizar seus produtos hoje',
      subtitle: 'Acesse todas as ferramentas Magnetic com uma unica conta. Sem cartao de credito.',
      button: 'Criar conta gratis',
      loginLink: 'Ja tem uma conta?',
    },
    footer: {
      description: 'A plataforma unificada para gerenciar todos os produtos do Magnetic Suite de forma segura e eficiente.',
      products: 'Produtos',
      legal: 'Legal',
      terms: 'Termos de servico',
      privacy: 'Politica de privacidade',
      contact: 'Contato',
      copyright: '2026 Magnetic. Todos os direitos reservados.',
    },
    login: {
      title: 'Bem-vindo de volta',
      subtitle: 'Entre na sua conta Magnetic Suite',
      emailPlaceholder: 'voce@email.com',
      passwordPlaceholder: 'Sua senha',
      forgotPassword: 'Esqueceu sua senha?',
      submitButton: 'Entrar',
      noAccount: 'Nao tem uma conta?',
      createAccount: 'Criar conta',
      orContinueWith: 'Ou continue com',
      rememberMe: 'Lembrar de mim',
    },
  },
};

// Hook to get translations based on current language
export function useLandingTranslation(language: LandingLanguage): LandingTranslations {
  return landingTranslations[language];
}

// Helper to detect language from existing context or localStorage
export function detectLandingLanguage(): LandingLanguage {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('language');
    if (stored && ['es', 'en', 'pt'].includes(stored)) {
      return stored as LandingLanguage;
    }
  }
  return 'es'; // Default to Spanish
}
