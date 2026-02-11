export type Language = 'es' | 'en' | 'pt';

export interface Translations {
  // Common
  common: {
    poweredBy: string;
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    delete: string;
    edit: string;
    search: string;
  };

  // Auth
  auth: {
    login: string;
    logout: string;
    register: string;
    signUp: string;
    signIn: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    forgotPassword: string;
    rememberMe: string;
    dontHaveAccount: string;
    alreadyHaveAccount: string;
    createAccount: string;
    welcomeBack: string;
    welcomeBackSubtitle: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    confirmPasswordPlaceholder: string;
    firstNamePlaceholder: string;
    lastNamePlaceholder: string;
    back: string;
  };

  // Register
  register: {
    title: string;
    subtitle: string;
    createPasswordSubtitle: string;
    emailLabel: string;
    nameLabel: string;
    lastNameLabel: string;
    passwordLabel: string;
    confirmPasswordLabel: string;
    termsLabel: string;
    termsOfService: string;
    privacyPolicy: string;
    registerButton: string;
    registering: string;
    successTitle: string;
    successMessage: string;
    errorMessage: string;
    validation: {
      minLength: string;
      hasSpecialChar: string;
      hasNumber: string;
      hasUpperCase: string;
      passwordsMatch: string;
    };
  };

  // Login
  login: {
    title: string;
    subtitle: string;
    loginButton: string;
    loggingIn: string;
  };

  // Dashboard
  dashboard: {
    title: string;
    subtitle: string;
    myProducts: string;
    accessProduct: string;
    noProducts: string;
    noProductsMessage: string;
    loadingProducts: string;
    errorLoadingProducts: string;
    goodMorning: string;
    goodAfternoon: string;
    goodEvening: string;
  };

  // Profile
  profile: {
    title: string;
    personalInfo: string;
    name: string;
    lastName: string;
    emailLabel: string;
    emailDisabled: string;
    account: string;
    status: string;
    statusDescription: string;
    active: string;
    role: string;
    roleDescription: string;
    administrator: string;
    user: string;
    memberSince: string;
    memberSinceDescription: string;
    security: string;
    changePassword: string;
    changePasswordDescription: string;
    saveChanges: string;
    saving: string;
    savedSuccess: string;
    savedError: string;
  };

  // Change Password
  changePassword: {
    title: string;
    subtitle: string;
    currentPassword: string;
    currentPasswordPlaceholder: string;
    newPassword: string;
    newPasswordPlaceholder: string;
    confirmPassword: string;
    confirmPasswordPlaceholder: string;
    requirements: string;
    minLength: string;
    hasSpecialChar: string;
    hasNumber: string;
    hasUpperCase: string;
    hasLowerCase: string;
    passwordsMatch: string;
    updateButton: string;
    updating: string;
    successMessage: string;
    errorMessage: string;
    strengthTitle: string;
    strengthWeak: string;
    strengthMedium: string;
    strengthStrong: string;
  };

  // Dashboard extra
  dashboardExtra: {
    welcome: string;
    productsAvailable: string;
    accessesToday: string;
    accountActive: string;
    verified: string;
    myProducts: string;
    products: string;
    product: string;
    contactAdmin: string;
    recentActivity: string;
    noRecentActivity: string;
    productAccess: string;
    quickActions: string;
    myProfile: string;
    viewPersonalInfo: string;
    changePassword: string;
    updateSecurity: string;
    support: string;
    helpAndAssistance: string;
    needHelp: string;
    needHelpDescription: string;
    contactSupport: string;
    addProducts: string;
    addProductsDescription: string;
    visitWebsite: string;
    socialgestDescription: string;
    tikketDescription: string;
    advocatesDescription: string;
    quanticoDescription: string;
    socialgestDescriptionLong: string;
    tikketDescriptionLong: string;
    advocatesDescriptionLong: string;
    quanticoDescriptionLong: string;
  };

  // Admin
  admin: {
    panel: string;
    dashboard: string;
    users: string;
    products: string;
    backToDashboard: string;
    administrator: string;
    totalUsers: string;
    activeProducts: string;
    recentUsers: string;
    overview: string;
    userList: string;
    createUser: string;
    editUser: string;
    deleteUser: string;
    confirmDeleteUser: string;
    confirmDeleteUserMessage: string;
    userCreated: string;
    userUpdated: string;
    userDeleted: string;
    noUsers: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    status: string;
    active: string;
    inactive: string;
    actions: string;
    assignProducts: string;
    assignedProducts: string;
    availableProducts: string;
    externalUserId: string;
    customDomain: string;
    customDomainHint: string;
    assign: string;
    remove: string;
    noAssignedProducts: string;
    productAssigned: string;
    productRemoved: string;
    selectUser: string;
    searchUsers: string;
    createdAt: string;
    admin: string;
    user: string;
  };

  // AI Assistant
  ai: {
    title: string;
    placeholder: string;
    send: string;
    thinking: string;
    welcome: string;
    errorMessage: string;
    rateLimitError: string;
    close: string;
  };

  // FAQ
  faq: {
    title: string;
    searchPlaceholder: string;
    noResults: string;
    categories: {
      general: string;
      products: string;
      account: string;
      admin: string;
    };
    items: { question: string; answer: string; category: 'general' | 'products' | 'account' | 'admin' }[];
  };

  // Metrics & Connection
  metrics: {
    connect: string;
    enter: string;
    disconnect: string;
    reconnect: string;
    connected: string;
    disconnected: string;
    connectionError: string;
    connectTitle: string;
    connectSubtitle: string;
    emailLabel: string;
    passwordLabel: string;
    subdomainLabel: string;
    subdomainHelp: string;
    connecting: string;
    disconnectConfirm: string;
    metricsTitle: string;
    syncNow: string;
    syncing: string;
    noMetrics: string;
    backToDashboard: string;
    openProduct: string;
    accumulatedValue: string;
    totalInteractions: string;
    totalContent: string;
    potentialReach: string;
    estimatedReach: string;
    // Sections
    campaigns: string;
    activeCampaigns: string;
    createdCampaigns: string;
    avgContentPerCampaign: string;
    challenges: string;
    activeChallenges: string;
    createdChallenges: string;
    contentForChallenges: string;
    contents: string;
    totalContents: string;
    approvedContents: string;
    pendingContents: string;
    groups: string;
    totalGroups: string;
    totalAmbassadors: string;
    ambassadorsCreating: string;
    orConnectWith: string;
  };

  // Health
  health: {
    title: string;
    frontend: string;
    backend: string;
    operational: string;
    down: string;
    checking: string;
    service: string;
    uptime: string;
    timestamp: string;
    refresh: string;
  };

  // Creator Marketplace
  creators: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    followers: string;
    engagementRate: string;
    viewProfile: string;
    verified: string;
    biography: string;
    mediaCount: string;
    avgLikes: string;
    avgComments: string;
    details: string;
    recentMedia: string;
    viewOnFacebook: string;
    viewOnInstagram: string;
    viewOnTiktok: string;
    loading: string;
    noResults: string;
    noResultsHint: string;
    loadMore: string;
    loadingMore: string;
    searchHint: string;
    errorSearch: string;
    errorProfile: string;
    rateLimitError: string;
    metaApiError: string;
    tiktokApiError: string;
    creatorPrice: string;
    medianViews: string;
    views: string;
  };

  // Release Notes
  releaseNotes: {
    title: string;
    subtitle: string;
    noProducts: string;
    noUpdates: string;
    viewMore: string;
    viewLess: string;
  };

  // Release Notes Page
  releaseNotesPage: {
    title: string;
    subtitle: string;
  };

  // Auth Social
  authSocial: {
    continueWithEmail: string;
    continueWithGoogle: string;
    continueWithFacebook: string;
    continueWithApple: string;
    orSignUpWith: string;
    orConnectWith: string;
    comingSoon: string;
    tagline: string;
    taglineSubtitle: string;
  };

  // Auth 2FA
  auth2fa: {
    title: string;
    emailSubtitle: string;
    appSubtitle: string;
    confirmButton: string;
    resendCode: string;
    resendLink: string;
    invalidCode: string;
    codeLabel: string;
  };

  // Language Selector
  language: {
    select: string;
    spanish: string;
    english: string;
    portuguese: string;
  };

  // Forgot Password
  forgotPassword: {
    title: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    sendButton: string;
    sending: string;
    successMessage: string;
    backToLogin: string;
    errorMessage: string;
    sentTitle: string;
    sentSubtitle: string;
    resetTitle: string;
    resetSubtitle: string;
  };

  // Error Codes (backend → frontend mapping)
  errorCodes: {
    INVALID_CREDENTIALS: string;
    INACTIVE_USER: string;
    INVALID_SESSION: string;
    UNAUTHORIZED_USER: string;
    INVALID_TOKEN: string;
    CURRENT_PASSWORD_INVALID: string;
    SESSION_NOT_FOUND: string;
    RESET_TOKEN_INVALID: string;
    RESET_TOKEN_EXPIRED: string;
    PASSWORD_TOO_SHORT: string;
    PASSWORD_TOO_WEAK: string;
    INVALID_PRODUCT_CREDENTIALS: string;
    [key: string]: string;
  };
}

export const translations: Record<Language, Translations> = {
  // ESPAÑOL
  es: {
    common: {
      poweredBy: 'Powered by',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      search: 'Buscar',
    },
    auth: {
      login: 'Iniciar sesión',
      logout: 'Cerrar sesión',
      register: 'Registrarse',
      signUp: 'Regístrate',
      signIn: 'Inicia sesión',
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      firstName: 'Nombre',
      lastName: 'Apellido',
      forgotPassword: '¿Olvidaste tu contraseña?',
      rememberMe: 'Recordarme',
      dontHaveAccount: '¿No tienes una cuenta?',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      createAccount: 'Crear cuenta',
      welcomeBack: 'Bienvenido de nuevo',
      emailPlaceholder: 'Escribe tu usuario o correo electrónico',
      passwordPlaceholder: 'Escribe tu contraseña',
      confirmPasswordPlaceholder: 'Escribe nuevamente tu contraseña',
      firstNamePlaceholder: 'Escribe tu nombre',
      lastNamePlaceholder: 'Escribe tu apellido',
      back: 'Atrás',
      welcomeBackSubtitle: 'Inicia sesión con tu correo electrónico o vuelve para elegir otro método.',
    },
    register: {
      title: 'Crear cuenta',
      subtitle: 'Completa el formulario para crear tu cuenta en Login Magnetic.',
      createPasswordSubtitle: 'Crea tu contraseña segura',
      emailLabel: 'Correo o usuario',
      nameLabel: 'Nombre',
      lastNameLabel: 'Apellido',
      passwordLabel: 'Contraseña',
      confirmPasswordLabel: 'Confirmar contraseña',
      termsLabel: 'Acepto los',
      termsOfService: 'Términos de servicio',
      privacyPolicy: 'políticas de privacidad',
      registerButton: 'Registrarme',
      registering: 'Registrando...',
      successTitle: '¡Registro exitoso!',
      successMessage: 'Redirigiendo al login...',
      errorMessage: 'Por favor, completa todos los campos correctamente y acepta los términos.',
      validation: {
        minLength: 'La contraseña tiene más de 8 caracteres.',
        hasSpecialChar: 'La contraseña tiene caracteres especiales.',
        hasNumber: 'La contraseña tiene un número.',
        hasUpperCase: 'La contraseña tiene una letra mayúscula.',
        passwordsMatch: 'Las contraseñas coinciden.',
      },
    },
    login: {
      title: 'Bienvenido de nuevo',
      subtitle: 'Inicia sesión con tu correo para acceder a tu cuenta.',
      loginButton: 'Iniciar sesión',
      loggingIn: 'Iniciando sesión...',
    },
    dashboard: {
      title: 'Mis Productos',
      subtitle: 'Accede a tus productos disponibles',
      myProducts: 'Mis Productos',
      accessProduct: 'Acceder',
      noProducts: 'Sin productos',
      noProductsMessage: 'No tienes productos asignados aún.',
      loadingProducts: 'Cargando productos...',
      errorLoadingProducts: 'Error al cargar los productos',
      goodMorning: 'Buenos días',
      goodAfternoon: 'Buenas tardes',
      goodEvening: 'Buenas noches',
    },
    profile: {
      title: 'Mi Perfil',
      personalInfo: 'Información Personal',
      name: 'Nombre',
      lastName: 'Apellido',
      emailLabel: 'Correo electrónico',
      emailDisabled: 'El correo electrónico no se puede modificar.',
      account: 'Cuenta',
      status: 'Estado',
      statusDescription: 'Estado de tu cuenta',
      active: 'Activa',
      role: 'Rol',
      roleDescription: 'Permisos de tu cuenta',
      administrator: 'Administrador',
      user: 'Usuario',
      memberSince: 'Miembro desde',
      memberSinceDescription: 'Fecha de registro',
      security: 'Seguridad',
      changePassword: 'Cambiar Contraseña',
      changePasswordDescription: 'Actualiza tu contraseña de acceso',
      saveChanges: 'Guardar Cambios',
      saving: 'Guardando...',
      savedSuccess: 'Cambios guardados correctamente.',
      savedError: 'Error al guardar los cambios',
    },
    changePassword: {
      title: 'Cambiar Contraseña',
      subtitle: 'Actualiza tu contraseña de acceso a Login Magnetic.',
      currentPassword: 'Contraseña Actual',
      currentPasswordPlaceholder: 'Ingresa tu contraseña actual',
      newPassword: 'Nueva Contraseña',
      newPasswordPlaceholder: 'Ingresa tu nueva contraseña',
      confirmPassword: 'Confirmar contraseña',
      confirmPasswordPlaceholder: 'Confirma tu nueva contraseña',
      requirements: 'Requisitos de contraseña:',
      minLength: 'Mínimo 8 caracteres',
      hasSpecialChar: 'Al menos un carácter especial (!@#$%^&*)',
      hasNumber: 'Al menos un número',
      hasUpperCase: 'Al menos una mayúscula',
      hasLowerCase: 'Al menos una letra minúscula',
      passwordsMatch: 'Las contraseñas coinciden',
      updateButton: 'Actualizar Contraseña',
      updating: 'Actualizando...',
      successMessage: 'Contraseña actualizada correctamente.',
      errorMessage: 'Error al cambiar la contraseña',
      strengthTitle: 'Fortaleza de contraseña',
      strengthWeak: 'Débil',
      strengthMedium: 'Media',
      strengthStrong: 'Fuerte',
    },
    dashboardExtra: {
      welcome: 'Bienvenido',
      productsAvailable: 'Productos Disponibles',
      accessesToday: 'Accesos Hoy',
      accountActive: 'Cuenta Activa',
      verified: 'Verificada',
      myProducts: 'Mis Productos',
      products: 'productos',
      product: 'producto',
      contactAdmin: 'Contacta al administrador para asignar productos a tu cuenta',
      recentActivity: 'Actividad Reciente',
      noRecentActivity: 'No hay actividad reciente',
      productAccess: 'Acceso al producto',
      quickActions: 'Acciones Rápidas',
      myProfile: 'Mi Perfil',
      viewPersonalInfo: 'Ver información personal',
      changePassword: 'Cambiar Contraseña',
      updateSecurity: 'Actualizar seguridad',
      support: 'Soporte',
      helpAndAssistance: 'Ayuda y asistencia',
      needHelp: '¿Necesitas ayuda?',
      needHelpDescription: 'Contacta a nuestro equipo de soporte para asistencia con tus productos',
      contactSupport: 'Contactar Soporte',
      addProducts: 'Agregar Productos',
      addProductsDescription: 'Conoce nuestras soluciones y agrega productos a tu cuenta',
      visitWebsite: 'Visitar sitio',
      socialgestDescription: 'Planifica, publica y mide tus redes en un solo lugar',
      tikketDescription: 'Convierte conversaciones en oportunidades',
      advocatesDescription: 'Impulsa tu contenido con embajadores de marca',
      quanticoDescription: 'Escucha lo que se dice de tu marca en tiempo real',
      socialgestDescriptionLong: 'Organiza tu calendario, flujos de aprobación y métricas para que tu equipo publique con consistencia y decida con datos.',
      tikketDescriptionLong: 'Centraliza mensajes de WhatsApp, redes y web para responder mejor, capturar leads y dar seguimiento con IA y automatizaciones que ayudan a convertir más.',
      advocatesDescriptionLong: 'Multiplica el alcance con embajadores de marca y convierte esa amplificación en visibilidad y oportunidades medibles para tu equipo.',
      quanticoDescriptionLong: 'Reúne conversaciones en un solo lugar y recibe alertas para actuar rápido ante tendencias y riesgos reputacionales.',
    },
    admin: {
      panel: 'Admin',
      dashboard: 'Dashboard',
      users: 'Usuarios',
      products: 'Productos',
      backToDashboard: 'Ir al Dashboard',
      administrator: 'Administrador',
      totalUsers: 'Total Usuarios',
      activeProducts: 'Productos Activos',
      recentUsers: 'Usuarios Recientes',
      overview: 'Vista General',
      userList: 'Lista de Usuarios',
      createUser: 'Crear Usuario',
      editUser: 'Editar Usuario',
      deleteUser: 'Eliminar Usuario',
      confirmDeleteUser: 'Confirmar Eliminación',
      confirmDeleteUserMessage: '¿Estás seguro de que deseas eliminar a este usuario? Esta acción no se puede deshacer.',
      userCreated: 'Usuario creado correctamente',
      userUpdated: 'Usuario actualizado correctamente',
      userDeleted: 'Usuario eliminado correctamente',
      noUsers: 'No hay usuarios registrados',
      email: 'Correo electrónico',
      firstName: 'Nombre',
      lastName: 'Apellido',
      password: 'Contraseña',
      role: 'Rol',
      status: 'Estado',
      active: 'Activo',
      inactive: 'Inactivo',
      actions: 'Acciones',
      assignProducts: 'Asignar Productos',
      assignedProducts: 'Productos Asignados',
      availableProducts: 'Productos Disponibles',
      externalUserId: 'ID Usuario Externo',
      customDomain: 'Dominio Personalizado',
      customDomainHint: 'Solo para Advocates (ej: empresa.advocates.com)',
      assign: 'Asignar',
      remove: 'Quitar',
      noAssignedProducts: 'No tiene productos asignados',
      productAssigned: 'Producto asignado correctamente',
      productRemoved: 'Producto removido correctamente',
      selectUser: 'Seleccionar usuario',
      searchUsers: 'Buscar usuarios...',
      createdAt: 'Fecha de registro',
      admin: 'Administrador',
      user: 'Usuario',
    },
    ai: {
      title: 'Magnetic AI',
      placeholder: 'Escribe tu pregunta...',
      send: 'Enviar',
      thinking: 'Pensando...',
      welcome: '¡Hola! Soy el asistente de Magnetic Suite. ¿En qué puedo ayudarte?',
      errorMessage: 'Error al procesar tu mensaje. Intenta de nuevo.',
      rateLimitError: 'Has alcanzado el límite de mensajes. Intenta más tarde.',
      close: 'Cerrar',
    },
    faq: {
      title: 'Preguntas Frecuentes',
      searchPlaceholder: 'Buscar preguntas...',
      noResults: 'No se encontraron resultados.',
      categories: {
        general: 'General',
        products: 'Productos',
        account: 'Mi Cuenta',
        admin: 'Administración',
      },
      items: [
        { category: 'general', question: '¿Qué es Magnetic Suite?', answer: 'Magnetic Suite es una plataforma unificada que centraliza el acceso a todos los productos de Magnetic: SocialGest, Tikket, AdvocatesPro y Quantico. Con un solo inicio de sesión puedes acceder a todas las herramientas.' },
        { category: 'general', question: '¿Cómo accedo a mis productos?', answer: 'Desde el Dashboard, haz clic en el botón "Acceder" de cualquier producto asignado. Se abrirá en una nueva pestaña con inicio de sesión automático (SSO).' },
        { category: 'general', question: '¿En qué idiomas está disponible?', answer: 'Magnetic Suite está disponible en Español, Inglés y Portugués. Puedes cambiar el idioma desde el selector en la barra superior.' },
        { category: 'products', question: '¿Qué es SocialGest?', answer: 'SocialGest es una herramienta de gestión integral de redes sociales. Permite programar publicaciones, analizar métricas y gestionar la comunidad desde un solo lugar.' },
        { category: 'products', question: '¿Qué es Tikket?', answer: 'Tikket es un sistema de tickets y soporte al cliente. Facilita la gestión de conversaciones, asignación de agentes y generación de reportes de atención.' },
        { category: 'products', question: '¿Qué es AdvocatesPro?', answer: 'AdvocatesPro es una plataforma de employee advocacy que permite amplificar la marca de tu empresa a través de tus colaboradores en redes sociales.' },
        { category: 'products', question: '¿Qué es Quantico?', answer: 'Quantico es una herramienta de analytics y métricas avanzadas. Ofrece dashboards personalizados, reportes automatizados e insights basados en datos.' },
        { category: 'account', question: '¿Cómo cambio mi contraseña?', answer: 'Ve a tu perfil haciendo clic en tu avatar en la barra superior, selecciona "Mi Perfil" y luego haz clic en "Cambiar contraseña". Deberás ingresar tu contraseña actual y la nueva.' },
        { category: 'account', question: '¿Cómo edito mi perfil?', answer: 'Haz clic en tu avatar en la esquina superior derecha y selecciona "Mi Perfil". Desde ahí puedes editar tu nombre y apellido.' },
        { category: 'account', question: '¿Qué hago si olvidé mi contraseña?', answer: 'En la página de inicio de sesión, haz clic en "¿Olvidaste tu contraseña?" e ingresa tu correo electrónico. Recibirás un enlace para restablecerla.' },
        { category: 'admin', question: '¿Cómo creo un nuevo usuario?', answer: 'En el panel de administración, ve a "Usuarios" y haz clic en "Crear usuario". Completa el formulario con email, nombre, apellido y contraseña.' },
        { category: 'admin', question: '¿Cómo asigno productos a un usuario?', answer: 'En el panel de administración, ve a "Productos", selecciona un usuario de la lista y usa el formulario para asignarle los productos disponibles con su ID externo.' },
      ],
    },
    metrics: {
      connect: 'Conectar',
      enter: 'Ingresar',
      disconnect: 'Desconectar',
      reconnect: 'Reconectar',
      connected: 'Conectado',
      disconnected: 'No conectado',
      connectionError: 'Error de conexión',
      connectTitle: 'Conectar producto',
      connectSubtitle: 'Ingresa tus credenciales del producto',
      emailLabel: 'Email o usuario',
      passwordLabel: 'Contraseña',
      subdomainLabel: 'Subdominio',
      subdomainHelp: 'Ej: tu-empresa',
      connecting: 'Conectando...',
      disconnectConfirm: '¿Estás seguro de que deseas desconectar este producto?',
      metricsTitle: 'Métricas',
      syncNow: 'Sincronizar',
      syncing: 'Sincronizando...',
      noMetrics: 'Conecta tu cuenta para ver métricas',
      backToDashboard: 'Volver al Dashboard',
      openProduct: 'Abrir producto',
      accumulatedValue: 'Valorización acumulada',
      totalInteractions: 'Interacciones totales',
      totalContent: 'Total contenidos',
      potentialReach: 'Alcance potencial',
      estimatedReach: 'Alcance estimado',
      campaigns: 'Campañas',
      activeCampaigns: 'Campañas activas',
      createdCampaigns: 'Campañas creadas',
      avgContentPerCampaign: 'Contenidos promedio por campaña',
      challenges: 'Challenges',
      activeChallenges: 'Challenges activos',
      createdChallenges: 'Challenges creados',
      contentForChallenges: 'Contenidos creados para challenges',
      contents: 'Contenidos',
      totalContents: 'Total contenidos',
      approvedContents: 'Contenidos aprobados',
      pendingContents: 'Contenidos pendientes',
      groups: 'Grupos',
      totalGroups: 'Total grupos',
      totalAmbassadors: 'Total embajadores',
      ambassadorsCreating: 'Embajadores generando contenido',
      orConnectWith: 'O conéctate con',
    },
    health: {
      title: 'Estado del Sistema',
      frontend: 'Frontend',
      backend: 'Backend',
      operational: 'Operativo',
      down: 'Caído',
      checking: 'Verificando...',
      service: 'Servicio',
      uptime: 'Tiempo activo',
      timestamp: 'Última verificación',
      refresh: 'Actualizar',
    },
    creators: {
      title: 'Creators',
      subtitle: 'Descubre creadores en Facebook, Instagram y TikTok',
      searchPlaceholder: 'Buscar creadores por palabra clave...',
      facebook: 'Facebook',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      followers: 'Seguidores',
      engagementRate: 'Tasa de engagement',
      viewProfile: 'Ver perfil',
      verified: 'Verificado',
      biography: 'Biografía',
      mediaCount: 'Publicaciones',
      avgLikes: 'Likes promedio',
      avgComments: 'Comentarios promedio',
      details: 'Detalles del creador',
      recentMedia: 'Publicaciones recientes',
      viewOnFacebook: 'Ver en Facebook',
      viewOnInstagram: 'Ver en Instagram',
      viewOnTiktok: 'Ver en TikTok',
      loading: 'Buscando creadores...',
      noResults: 'No se encontraron creadores',
      noResultsHint: 'Intenta con otra palabra clave',
      loadMore: 'Cargar más',
      loadingMore: 'Cargando más...',
      searchHint: 'Busca creadores por nombre, categoría o tema',
      errorSearch: 'Error al buscar creadores',
      errorProfile: 'Error al cargar perfil',
      rateLimitError: 'Has alcanzado el límite de búsquedas. Intenta más tarde.',
      metaApiError: 'Error de conexión con Meta API',
      tiktokApiError: 'Error de conexión con TikTok API',
      creatorPrice: 'Precio estimado',
      medianViews: 'Views promedio',
      views: 'Views',
    },
    releaseNotes: {
      title: 'Novedades',
      subtitle: 'Descubre las últimas mejoras en tus productos conectados',
      noProducts: 'No tienes productos para ver novedades',
      noUpdates: 'No hay novedades disponibles para este producto',
      viewMore: 'Ver más',
      viewLess: 'Ver menos',
    },
    releaseNotesPage: {
      title: 'Novedades',
      subtitle: 'Descubre las últimas mejoras en tus productos conectados',
    },
    authSocial: {
      continueWithEmail: 'Continuar con correo electrónico',
      continueWithGoogle: 'Continuar con Google',
      continueWithFacebook: 'Continuar con Facebook',
      continueWithApple: 'Continuar con Apple',
      orSignUpWith: 'O regístrate con',
      orConnectWith: 'O conéctate con',
      comingSoon: 'Próximamente',
      tagline: '¡Programa el contenido y mantén la frecuencia que necesita tu red social!',
      taglineSubtitle: 'Inicia sesión con una de las siguientes opciones.',
    },
    auth2fa: {
      title: 'Verificación en dos pasos',
      emailSubtitle: 'Ingresa el código de verificación que enviamos a tu correo electrónico',
      appSubtitle: 'Ingresa el código de verificación de la aplicación de autenticación',
      confirmButton: 'Confirmar',
      resendCode: 'Enviar nuevo código',
      resendLink: 'nuevo código',
      invalidCode: 'Código inválido. Intenta de nuevo.',
      codeLabel: 'Escribe tu código de seguridad de 6 dígitos',
    },
    language: {
      select: 'Idioma',
      spanish: 'Español',
      english: 'Inglés',
      portuguese: 'Portugués',
    },
    forgotPassword: {
      title: 'Recuperar contrasena',
      subtitle: 'Ingresa tu correo electronico y te enviaremos instrucciones para restablecer tu contrasena.',
      emailLabel: 'Correo electronico',
      emailPlaceholder: 'tu@email.com',
      sendButton: 'Enviar instrucciones',
      sending: 'Enviando...',
      successMessage: 'Si existe una cuenta con ese correo, recibiras instrucciones para restablecer tu contrasena.',
      backToLogin: 'Volver al inicio de sesion',
      errorMessage: 'Error al enviar las instrucciones. Intenta de nuevo.',
      sentTitle: '¡Revisa tu correo!',
      sentSubtitle: 'Te hemos enviado un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada.',
      resetTitle: '¡Casi allí!',
      resetSubtitle: 'Crea tu nueva contraseña segura',
    },
    errorCodes: {
      INVALID_CREDENTIALS: 'Credenciales invalidas. Verifica tu correo y contrasena.',
      INACTIVE_USER: 'Tu cuenta esta inactiva. Contacta al administrador.',
      INVALID_SESSION: 'Sesion invalida. Inicia sesion nuevamente.',
      UNAUTHORIZED_USER: 'No tienes autorizacion para esta accion.',
      INVALID_TOKEN: 'Token invalido o expirado. Inicia sesion nuevamente.',
      CURRENT_PASSWORD_INVALID: 'La contrasena actual es incorrecta.',
      SESSION_NOT_FOUND: 'Sesion no encontrada.',
      RESET_TOKEN_INVALID: 'El enlace de restablecimiento es invalido o ya fue utilizado.',
      RESET_TOKEN_EXPIRED: 'El enlace de restablecimiento ha expirado. Solicita uno nuevo.',
      PASSWORD_TOO_SHORT: 'La contrasena debe tener al menos 8 caracteres.',
      PASSWORD_TOO_WEAK: 'La contrasena debe incluir mayuscula, numero y caracter especial.',
      INVALID_PRODUCT_CREDENTIALS: 'Credenciales del producto invalidas. Verifica tu email y contrasena.',
      EMAIL_ALREADY_EXISTS: 'El email ya esta registrado.',
      USER_NOT_FOUND: 'Usuario no encontrado.',
      PRODUCT_NOT_FOUND: 'Producto no encontrado.',
      PRODUCT_ALREADY_EXISTS: 'Ya existe un producto con ese nombre.',
      PRODUCT_ALREADY_ASSIGNED: 'El producto ya esta asignado al usuario.',
      ASSIGNMENT_NOT_FOUND: 'Asignacion no encontrada.',
      PRODUCT_ACCESS_DENIED: 'No tienes acceso a este producto.',
    },
  },

  // ENGLISH
  en: {
    common: {
      poweredBy: 'Powered by',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
    },
    auth: {
      login: 'Log in',
      logout: 'Log out',
      register: 'Register',
      signUp: 'Sign up',
      signIn: 'Sign in',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      firstName: 'First name',
      lastName: 'Last name',
      forgotPassword: 'Forgot your password?',
      rememberMe: 'Remember me',
      dontHaveAccount: "Don't have an account yet?",
      alreadyHaveAccount: 'Already have an account?',
      createAccount: 'Create account',
      welcomeBack: 'Welcome back',
      emailPlaceholder: 'Enter your email or username',
      passwordPlaceholder: 'Enter your password',
      confirmPasswordPlaceholder: 'Enter your password again',
      firstNamePlaceholder: 'Enter your first name',
      lastNamePlaceholder: 'Enter your last name',
      back: 'Back',
      welcomeBackSubtitle: 'Log in via email or go back for other method.',
    },
    register: {
      title: 'Create account',
      subtitle: 'Fill out the form to create your account on Login Magnetic.',
      createPasswordSubtitle: 'Create your secure password',
      emailLabel: 'Email or username',
      nameLabel: 'First name',
      lastNameLabel: 'Last name',
      passwordLabel: 'Password',
      confirmPasswordLabel: 'Confirm password',
      termsLabel: 'I accept the',
      termsOfService: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      registerButton: 'Sign up',
      registering: 'Signing up...',
      successTitle: 'Registration successful!',
      successMessage: 'Redirecting to login...',
      errorMessage: 'Please fill out all fields correctly and accept the terms.',
      validation: {
        minLength: 'Password has more than 8 characters.',
        hasSpecialChar: 'Password has special characters.',
        hasNumber: 'Password has a number.',
        hasUpperCase: 'Password has an uppercase letter.',
        passwordsMatch: 'Passwords match.',
      },
    },
    login: {
      title: 'Welcome back',
      subtitle: 'Log in with your email to access your account.',
      loginButton: 'Log in',
      loggingIn: 'Logging in...',
    },
    dashboard: {
      title: 'My Products',
      subtitle: 'Access your available products',
      myProducts: 'My Products',
      accessProduct: 'Access',
      noProducts: 'No products',
      noProductsMessage: "You don't have any products assigned yet.",
      loadingProducts: 'Loading products...',
      errorLoadingProducts: 'Error loading products',
      goodMorning: 'Good morning',
      goodAfternoon: 'Good afternoon',
      goodEvening: 'Good evening',
    },
    profile: {
      title: 'My Profile',
      personalInfo: 'Personal Information',
      name: 'First Name',
      lastName: 'Last Name',
      emailLabel: 'Email',
      emailDisabled: 'Email cannot be changed.',
      account: 'Account',
      status: 'Status',
      statusDescription: 'Your account status',
      active: 'Active',
      role: 'Role',
      roleDescription: 'Your account permissions',
      administrator: 'Administrator',
      user: 'User',
      memberSince: 'Member since',
      memberSinceDescription: 'Registration date',
      security: 'Security',
      changePassword: 'Change Password',
      changePasswordDescription: 'Update your access password',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      savedSuccess: 'Changes saved successfully.',
      savedError: 'Error saving changes',
    },
    changePassword: {
      title: 'Change Password',
      subtitle: 'Update your Login Magnetic access password.',
      currentPassword: 'Current Password',
      currentPasswordPlaceholder: 'Enter your current password',
      newPassword: 'New Password',
      newPasswordPlaceholder: 'Enter your new password',
      confirmPassword: 'Confirm password',
      confirmPasswordPlaceholder: 'Confirm your new password',
      requirements: 'Password requirements:',
      minLength: 'At least 8 characters',
      hasSpecialChar: 'At least one special character (!@#$%^&*)',
      hasNumber: 'At least one number',
      hasUpperCase: 'At least one uppercase letter',
      hasLowerCase: 'At least one lowercase',
      passwordsMatch: 'Passwords match',
      updateButton: 'Update Password',
      updating: 'Updating...',
      successMessage: 'Password updated successfully.',
      errorMessage: 'Error changing password',
      strengthTitle: 'Pick a password',
      strengthWeak: 'Weak',
      strengthMedium: 'Medium',
      strengthStrong: 'Strong',
    },
    dashboardExtra: {
      welcome: 'Welcome',
      productsAvailable: 'Products Available',
      accessesToday: 'Accesses Today',
      accountActive: 'Account Active',
      verified: 'Verified',
      myProducts: 'My Products',
      products: 'products',
      product: 'product',
      contactAdmin: 'Contact the administrator to assign products to your account',
      recentActivity: 'Recent Activity',
      noRecentActivity: 'No recent activity',
      productAccess: 'Product access',
      quickActions: 'Quick Actions',
      myProfile: 'My Profile',
      viewPersonalInfo: 'View personal information',
      changePassword: 'Change Password',
      updateSecurity: 'Update security',
      support: 'Support',
      helpAndAssistance: 'Help and assistance',
      needHelp: 'Need help?',
      needHelpDescription: 'Contact our support team for assistance with your products',
      contactSupport: 'Contact Support',
      addProducts: 'Add Products',
      addProductsDescription: 'Discover our solutions and add products to your account',
      visitWebsite: 'Visit website',
      socialgestDescription: 'Plan, publish and measure your social media in one place',
      tikketDescription: 'Turn conversations into opportunities',
      advocatesDescription: 'Boost your content with brand ambassadors',
      quanticoDescription: 'Listen to what is being said about your brand in real time',
      socialgestDescriptionLong: 'Organize your calendar, approval workflows and metrics so your team publishes consistently and makes data-driven decisions.',
      tikketDescriptionLong: 'Centralize WhatsApp, social and web messages to respond better, capture leads and follow up with AI and automations that help convert more.',
      advocatesDescriptionLong: 'Multiply your reach with brand ambassadors and turn that amplification into measurable visibility and opportunities for your team.',
      quanticoDescriptionLong: 'Gather conversations in one place and get alerts to act fast on trends and reputational risks.',
    },
    admin: {
      panel: 'Admin',
      dashboard: 'Dashboard',
      users: 'Users',
      products: 'Products',
      backToDashboard: 'Go to Dashboard',
      administrator: 'Administrator',
      totalUsers: 'Total Users',
      activeProducts: 'Active Products',
      recentUsers: 'Recent Users',
      overview: 'Overview',
      userList: 'User List',
      createUser: 'Create User',
      editUser: 'Edit User',
      deleteUser: 'Delete User',
      confirmDeleteUser: 'Confirm Deletion',
      confirmDeleteUserMessage: 'Are you sure you want to delete this user? This action cannot be undone.',
      userCreated: 'User created successfully',
      userUpdated: 'User updated successfully',
      userDeleted: 'User deleted successfully',
      noUsers: 'No registered users',
      email: 'Email',
      firstName: 'First Name',
      lastName: 'Last Name',
      password: 'Password',
      role: 'Role',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      actions: 'Actions',
      assignProducts: 'Assign Products',
      assignedProducts: 'Assigned Products',
      availableProducts: 'Available Products',
      externalUserId: 'External User ID',
      customDomain: 'Custom Domain',
      customDomainHint: 'Only for Advocates (e.g.: company.advocates.com)',
      assign: 'Assign',
      remove: 'Remove',
      noAssignedProducts: 'No assigned products',
      productAssigned: 'Product assigned successfully',
      productRemoved: 'Product removed successfully',
      selectUser: 'Select user',
      searchUsers: 'Search users...',
      createdAt: 'Registration date',
      admin: 'Administrator',
      user: 'User',
    },
    ai: {
      title: 'Magnetic AI',
      placeholder: 'Type your question...',
      send: 'Send',
      thinking: 'Thinking...',
      welcome: 'Hi! I\'m the Magnetic Suite assistant. How can I help you?',
      errorMessage: 'Error processing your message. Please try again.',
      rateLimitError: 'You have reached the message limit. Please try again later.',
      close: 'Close',
    },
    faq: {
      title: 'Frequently Asked Questions',
      searchPlaceholder: 'Search questions...',
      noResults: 'No results found.',
      categories: {
        general: 'General',
        products: 'Products',
        account: 'My Account',
        admin: 'Administration',
      },
      items: [
        { category: 'general', question: 'What is Magnetic Suite?', answer: 'Magnetic Suite is a unified platform that centralizes access to all Magnetic products: SocialGest, Tikket, AdvocatesPro, and Quantico. With a single login you can access all tools.' },
        { category: 'general', question: 'How do I access my products?', answer: 'From the Dashboard, click the "Access" button on any assigned product. It will open in a new tab with automatic sign-in (SSO).' },
        { category: 'general', question: 'What languages are available?', answer: 'Magnetic Suite is available in Spanish, English, and Portuguese. You can change the language from the selector in the top bar.' },
        { category: 'products', question: 'What is SocialGest?', answer: 'SocialGest is a comprehensive social media management tool. It allows you to schedule posts, analyze metrics, and manage your community from one place.' },
        { category: 'products', question: 'What is Tikket?', answer: 'Tikket is a ticketing and customer support system. It facilitates conversation management, agent assignment, and support report generation.' },
        { category: 'products', question: 'What is AdvocatesPro?', answer: 'AdvocatesPro is an employee advocacy platform that amplifies your company\'s brand through your employees on social media.' },
        { category: 'products', question: 'What is Quantico?', answer: 'Quantico is an advanced analytics and metrics tool. It offers custom dashboards, automated reports, and data-driven insights.' },
        { category: 'account', question: 'How do I change my password?', answer: 'Go to your profile by clicking your avatar in the top bar, select "My Profile" and then click "Change password". You will need to enter your current password and the new one.' },
        { category: 'account', question: 'How do I edit my profile?', answer: 'Click your avatar in the top right corner and select "My Profile". From there you can edit your first and last name.' },
        { category: 'account', question: 'What if I forgot my password?', answer: 'On the login page, click "Forgot your password?" and enter your email. You will receive a link to reset it.' },
        { category: 'admin', question: 'How do I create a new user?', answer: 'In the admin panel, go to "Users" and click "Create user". Fill in the form with email, first name, last name, and password.' },
        { category: 'admin', question: 'How do I assign products to a user?', answer: 'In the admin panel, go to "Products", select a user from the list and use the form to assign available products with their external ID.' },
      ],
    },
    metrics: {
      connect: 'Connect',
      enter: 'Enter',
      disconnect: 'Disconnect',
      reconnect: 'Reconnect',
      connected: 'Connected',
      disconnected: 'Not connected',
      connectionError: 'Connection error',
      connectTitle: 'Connect product',
      connectSubtitle: 'Enter your product credentials',
      emailLabel: 'Email or username',
      passwordLabel: 'Password',
      subdomainLabel: 'Subdomain',
      subdomainHelp: 'E.g.: your-company',
      connecting: 'Connecting...',
      disconnectConfirm: 'Are you sure you want to disconnect this product?',
      metricsTitle: 'Metrics',
      syncNow: 'Sync',
      syncing: 'Syncing...',
      noMetrics: 'Connect your account to view metrics',
      backToDashboard: 'Back to Dashboard',
      openProduct: 'Open product',
      accumulatedValue: 'Accumulated value',
      totalInteractions: 'Total interactions',
      totalContent: 'Total content',
      potentialReach: 'Potential reach',
      estimatedReach: 'Estimated reach',
      campaigns: 'Campaigns',
      activeCampaigns: 'Active campaigns',
      createdCampaigns: 'Created campaigns',
      avgContentPerCampaign: 'Avg content per campaign',
      challenges: 'Challenges',
      activeChallenges: 'Active challenges',
      createdChallenges: 'Created challenges',
      contentForChallenges: 'Content created for challenges',
      contents: 'Contents',
      totalContents: 'Total contents',
      approvedContents: 'Approved contents',
      pendingContents: 'Pending contents',
      groups: 'Groups',
      totalGroups: 'Total groups',
      totalAmbassadors: 'Total ambassadors',
      ambassadorsCreating: 'Ambassadors creating content',
      orConnectWith: 'Or connect with',
    },
    health: {
      title: 'System Status',
      frontend: 'Frontend',
      backend: 'Backend',
      operational: 'Operational',
      down: 'Down',
      checking: 'Checking...',
      service: 'Service',
      uptime: 'Uptime',
      timestamp: 'Last check',
      refresh: 'Refresh',
    },
    creators: {
      title: 'Creators',
      subtitle: 'Discover creators on Facebook, Instagram and TikTok',
      searchPlaceholder: 'Search creators by keyword...',
      facebook: 'Facebook',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      followers: 'Followers',
      engagementRate: 'Engagement Rate',
      viewProfile: 'View Profile',
      verified: 'Verified',
      biography: 'Biography',
      mediaCount: 'Posts',
      avgLikes: 'Avg. Likes',
      avgComments: 'Avg. Comments',
      details: 'Creator Details',
      recentMedia: 'Recent Posts',
      viewOnFacebook: 'View on Facebook',
      viewOnInstagram: 'View on Instagram',
      viewOnTiktok: 'View on TikTok',
      loading: 'Searching creators...',
      noResults: 'No creators found',
      noResultsHint: 'Try a different keyword',
      loadMore: 'Load More',
      loadingMore: 'Loading more...',
      searchHint: 'Search creators by name, category or topic',
      errorSearch: 'Error searching creators',
      errorProfile: 'Error loading profile',
      rateLimitError: 'You have reached the search limit. Try again later.',
      metaApiError: 'Meta API connection error',
      tiktokApiError: 'TikTok API connection error',
      creatorPrice: 'Estimated Price',
      medianViews: 'Avg. Views',
      views: 'Views',
    },
    releaseNotes: {
      title: 'Release Notes',
      subtitle: 'Discover the latest improvements in your connected products',
      noProducts: 'No products available to view updates',
      noUpdates: 'No updates available for this product',
      viewMore: 'View more',
      viewLess: 'View less',
    },
    releaseNotesPage: {
      title: 'What\'s new',
      subtitle: 'Discover the latest improvements in your connected products',
    },
    authSocial: {
      continueWithEmail: 'Continue with email',
      continueWithGoogle: 'Continue with Google',
      continueWithFacebook: 'Continue with Facebook',
      continueWithApple: 'Continue with Apple',
      orSignUpWith: 'Or sign up with',
      orConnectWith: 'Or connect with',
      comingSoon: 'Coming soon',
      tagline: 'Schedule content and keep the frequency your social media needs!',
      taglineSubtitle: 'Log in with one of the following options.',
    },
    auth2fa: {
      title: 'Two-step verification',
      emailSubtitle: 'Enter the verification code we sent to your email',
      appSubtitle: 'Enter the verification code from your authentication app',
      confirmButton: 'Confirm',
      resendCode: 'Send new code',
      resendLink: 'new code',
      invalidCode: 'Invalid code. Try again.',
      codeLabel: 'Enter your 6-digit security code',
    },
    language: {
      select: 'Language',
      spanish: 'Spanish',
      english: 'English',
      portuguese: 'Portuguese',
    },
    forgotPassword: {
      title: 'Reset Password',
      subtitle: 'Enter your email address and we will send you instructions to reset your password.',
      emailLabel: 'Email address',
      emailPlaceholder: 'you@email.com',
      sendButton: 'Send instructions',
      sending: 'Sending...',
      successMessage: 'If an account exists with that email, you will receive instructions to reset your password.',
      backToLogin: 'Back to login',
      errorMessage: 'Error sending instructions. Please try again.',
      sentTitle: 'Check your email!',
      sentSubtitle: 'We sent you a link to reset your password. Check your inbox.',
      resetTitle: 'Almost there!',
      resetSubtitle: 'Create your new secure password',
    },
    errorCodes: {
      INVALID_CREDENTIALS: 'Invalid credentials. Check your email and password.',
      INACTIVE_USER: 'Your account is inactive. Contact your administrator.',
      INVALID_SESSION: 'Invalid session. Please log in again.',
      UNAUTHORIZED_USER: 'You are not authorized for this action.',
      INVALID_TOKEN: 'Invalid or expired token. Please log in again.',
      CURRENT_PASSWORD_INVALID: 'Current password is incorrect.',
      SESSION_NOT_FOUND: 'Session not found.',
      RESET_TOKEN_INVALID: 'The reset link is invalid or has already been used.',
      RESET_TOKEN_EXPIRED: 'The reset link has expired. Please request a new one.',
      PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long.',
      PASSWORD_TOO_WEAK: 'Password must include an uppercase letter, a number, and a special character.',
      INVALID_PRODUCT_CREDENTIALS: 'Invalid product credentials. Check your email and password.',
      EMAIL_ALREADY_EXISTS: 'Email is already registered.',
      USER_NOT_FOUND: 'User not found.',
      PRODUCT_NOT_FOUND: 'Product not found.',
      PRODUCT_ALREADY_EXISTS: 'A product with that name already exists.',
      PRODUCT_ALREADY_ASSIGNED: 'Product is already assigned to the user.',
      ASSIGNMENT_NOT_FOUND: 'Assignment not found.',
      PRODUCT_ACCESS_DENIED: 'You do not have access to this product.',
    },
  },

  // PORTUGUÊS
  pt: {
    common: {
      poweredBy: 'Powered by',
      loading: 'Carregando...',
      error: 'Erro',
      success: 'Sucesso',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      save: 'Salvar',
      delete: 'Excluir',
      edit: 'Editar',
      search: 'Buscar',
    },
    auth: {
      login: 'Entrar',
      logout: 'Sair',
      register: 'Registrar',
      signUp: 'Cadastre-se',
      signIn: 'Entrar',
      email: 'E-mail',
      password: 'Senha',
      confirmPassword: 'Confirmar senha',
      firstName: 'Nome',
      lastName: 'Sobrenome',
      forgotPassword: 'Esqueceu sua senha?',
      rememberMe: 'Lembrar-me',
      dontHaveAccount: 'Não tem uma conta ainda?',
      alreadyHaveAccount: 'Já tem uma conta?',
      createAccount: 'Criar conta',
      welcomeBack: 'Bem-vindo de volta',
      emailPlaceholder: 'Digite seu e-mail ou usuário',
      passwordPlaceholder: 'Digite sua senha',
      confirmPasswordPlaceholder: 'Digite sua senha novamente',
      firstNamePlaceholder: 'Digite seu nome',
      lastNamePlaceholder: 'Digite seu sobrenome',
      back: 'Voltar',
      welcomeBackSubtitle: 'Faça login pelo email ou volte para outro método.',
    },
    register: {
      title: 'Criar conta',
      subtitle: 'Preencha o formulário para criar sua conta no Login Magnetic.',
      createPasswordSubtitle: 'Crie sua senha segura',
      emailLabel: 'E-mail ou usuário',
      nameLabel: 'Nome',
      lastNameLabel: 'Sobrenome',
      passwordLabel: 'Senha',
      confirmPasswordLabel: 'Confirmar senha',
      termsLabel: 'Eu aceito os',
      termsOfService: 'Termos de Serviço',
      privacyPolicy: 'Políticas de Privacidade',
      registerButton: 'Cadastrar',
      registering: 'Cadastrando...',
      successTitle: 'Cadastro realizado com sucesso!',
      successMessage: 'Redirecionando para o login...',
      errorMessage: 'Por favor, preencha todos os campos corretamente e aceite os termos.',
      validation: {
        minLength: 'A senha tem mais de 8 caracteres.',
        hasSpecialChar: 'A senha tem caracteres especiais.',
        hasNumber: 'A senha tem um número.',
        hasUpperCase: 'A senha tem uma letra maiúscula.',
        passwordsMatch: 'As senhas coincidem.',
      },
    },
    login: {
      title: 'Bem-vindo de volta',
      subtitle: 'Entre com seu e-mail para acessar sua conta.',
      loginButton: 'Entrar',
      loggingIn: 'Entrando...',
    },
    dashboard: {
      title: 'Meus Produtos',
      subtitle: 'Acesse seus produtos disponíveis',
      myProducts: 'Meus Produtos',
      accessProduct: 'Acessar',
      noProducts: 'Sem produtos',
      noProductsMessage: 'Você ainda não tem produtos atribuídos.',
      loadingProducts: 'Carregando produtos...',
      errorLoadingProducts: 'Erro ao carregar produtos',
      goodMorning: 'Bom dia',
      goodAfternoon: 'Boa tarde',
      goodEvening: 'Boa noite',
    },
    profile: {
      title: 'Meu Perfil',
      personalInfo: 'Informações Pessoais',
      name: 'Nome',
      lastName: 'Sobrenome',
      emailLabel: 'E-mail',
      emailDisabled: 'O e-mail não pode ser alterado.',
      account: 'Conta',
      status: 'Status',
      statusDescription: 'Status da sua conta',
      active: 'Ativa',
      role: 'Função',
      roleDescription: 'Permissões da sua conta',
      administrator: 'Administrador',
      user: 'Usuário',
      memberSince: 'Membro desde',
      memberSinceDescription: 'Data de registro',
      security: 'Segurança',
      changePassword: 'Alterar Senha',
      changePasswordDescription: 'Atualize sua senha de acesso',
      saveChanges: 'Salvar Alterações',
      saving: 'Salvando...',
      savedSuccess: 'Alterações salvas com sucesso.',
      savedError: 'Erro ao salvar as alterações',
    },
    changePassword: {
      title: 'Alterar Senha',
      subtitle: 'Atualize sua senha de acesso ao Login Magnetic.',
      currentPassword: 'Senha Atual',
      currentPasswordPlaceholder: 'Digite sua senha atual',
      newPassword: 'Nova Senha',
      newPasswordPlaceholder: 'Digite sua nova senha',
      confirmPassword: 'Confirmar senha',
      confirmPasswordPlaceholder: 'Confirme sua nova senha',
      requirements: 'Requisitos da senha:',
      minLength: 'Mínimo de 8 caracteres',
      hasSpecialChar: 'Pelo menos um caractere especial (!@#$%^&*)',
      hasNumber: 'Pelo menos um número',
      hasUpperCase: 'Pelo menos uma letra maiúscula',
      hasLowerCase: 'Pelo menos uma letra minúscula',
      passwordsMatch: 'As senhas coincidem',
      updateButton: 'Atualizar Senha',
      updating: 'Atualizando...',
      successMessage: 'Senha atualizada com sucesso.',
      errorMessage: 'Erro ao alterar a senha',
      strengthTitle: 'Força da senha',
      strengthWeak: 'Fraca',
      strengthMedium: 'Média',
      strengthStrong: 'Forte',
    },
    dashboardExtra: {
      welcome: 'Bem-vindo',
      productsAvailable: 'Produtos Disponíveis',
      accessesToday: 'Acessos Hoje',
      accountActive: 'Conta Ativa',
      verified: 'Verificada',
      myProducts: 'Meus Produtos',
      products: 'produtos',
      product: 'produto',
      contactAdmin: 'Entre em contato com o administrador para atribuir produtos à sua conta',
      recentActivity: 'Atividade Recente',
      noRecentActivity: 'Nenhuma atividade recente',
      productAccess: 'Acesso ao produto',
      quickActions: 'Ações Rápidas',
      myProfile: 'Meu Perfil',
      viewPersonalInfo: 'Ver informações pessoais',
      changePassword: 'Alterar Senha',
      updateSecurity: 'Atualizar segurança',
      support: 'Suporte',
      helpAndAssistance: 'Ajuda e assistência',
      needHelp: 'Precisa de ajuda?',
      needHelpDescription: 'Entre em contato com nossa equipe de suporte para assistência com seus produtos',
      contactSupport: 'Contatar Suporte',
      addProducts: 'Adicionar Produtos',
      addProductsDescription: 'Conheça nossas soluções e adicione produtos à sua conta',
      visitWebsite: 'Visitar site',
      socialgestDescription: 'Planeje, publique e meça suas redes em um só lugar',
      tikketDescription: 'Converta conversas em oportunidades',
      advocatesDescription: 'Impulsione seu conteúdo com embaixadores de marca',
      quanticoDescription: 'Escute o que se diz sobre sua marca em tempo real',
      socialgestDescriptionLong: 'Organize seu calendário, fluxos de aprovação e métricas para que sua equipe publique com consistência e decida com dados.',
      tikketDescriptionLong: 'Centralize mensagens de WhatsApp, redes e web para responder melhor, capturar leads e acompanhar com IA e automações que ajudam a converter mais.',
      advocatesDescriptionLong: 'Multiplique o alcance com embaixadores de marca e converta essa amplificação em visibilidade e oportunidades mensuráveis para sua equipe.',
      quanticoDescriptionLong: 'Reúna conversas em um só lugar e receba alertas para agir rápido diante de tendências e riscos reputacionais.',
    },
    admin: {
      panel: 'Admin',
      dashboard: 'Dashboard',
      users: 'Usuários',
      products: 'Produtos',
      backToDashboard: 'Ir ao Dashboard',
      administrator: 'Administrador',
      totalUsers: 'Total de Usuários',
      activeProducts: 'Produtos Ativos',
      recentUsers: 'Usuários Recentes',
      overview: 'Visão Geral',
      userList: 'Lista de Usuários',
      createUser: 'Criar Usuário',
      editUser: 'Editar Usuário',
      deleteUser: 'Excluir Usuário',
      confirmDeleteUser: 'Confirmar Exclusão',
      confirmDeleteUserMessage: 'Tem certeza de que deseja excluir este usuário? Esta ação não pode ser desfeita.',
      userCreated: 'Usuário criado com sucesso',
      userUpdated: 'Usuário atualizado com sucesso',
      userDeleted: 'Usuário excluído com sucesso',
      noUsers: 'Nenhum usuário registrado',
      email: 'E-mail',
      firstName: 'Nome',
      lastName: 'Sobrenome',
      password: 'Senha',
      role: 'Função',
      status: 'Status',
      active: 'Ativo',
      inactive: 'Inativo',
      actions: 'Ações',
      assignProducts: 'Atribuir Produtos',
      assignedProducts: 'Produtos Atribuídos',
      availableProducts: 'Produtos Disponíveis',
      externalUserId: 'ID Usuário Externo',
      customDomain: 'Domínio Personalizado',
      customDomainHint: 'Apenas para Advocates (ex: empresa.advocates.com)',
      assign: 'Atribuir',
      remove: 'Remover',
      noAssignedProducts: 'Nenhum produto atribuído',
      productAssigned: 'Produto atribuído com sucesso',
      productRemoved: 'Produto removido com sucesso',
      selectUser: 'Selecionar usuário',
      searchUsers: 'Buscar usuários...',
      createdAt: 'Data de registro',
      admin: 'Administrador',
      user: 'Usuário',
    },
    ai: {
      title: 'Magnetic AI',
      placeholder: 'Digite sua pergunta...',
      send: 'Enviar',
      thinking: 'Pensando...',
      welcome: 'Olá! Sou o assistente do Magnetic Suite. Como posso ajudá-lo?',
      errorMessage: 'Erro ao processar sua mensagem. Tente novamente.',
      rateLimitError: 'Você atingiu o limite de mensagens. Tente novamente mais tarde.',
      close: 'Fechar',
    },
    faq: {
      title: 'Perguntas Frequentes',
      searchPlaceholder: 'Buscar perguntas...',
      noResults: 'Nenhum resultado encontrado.',
      categories: {
        general: 'Geral',
        products: 'Produtos',
        account: 'Minha Conta',
        admin: 'Administração',
      },
      items: [
        { category: 'general', question: 'O que é o Magnetic Suite?', answer: 'O Magnetic Suite é uma plataforma unificada que centraliza o acesso a todos os produtos Magnetic: SocialGest, Tikket, AdvocatesPro e Quantico. Com um único login você acessa todas as ferramentas.' },
        { category: 'general', question: 'Como acesso meus produtos?', answer: 'No Dashboard, clique no botão "Acessar" de qualquer produto atribuído. Ele abrirá em uma nova aba com login automático (SSO).' },
        { category: 'general', question: 'Em quais idiomas está disponível?', answer: 'O Magnetic Suite está disponível em Espanhol, Inglês e Português. Você pode alterar o idioma no seletor da barra superior.' },
        { category: 'products', question: 'O que é o SocialGest?', answer: 'O SocialGest é uma ferramenta completa de gestão de redes sociais. Permite agendar publicações, analisar métricas e gerenciar a comunidade em um só lugar.' },
        { category: 'products', question: 'O que é o Tikket?', answer: 'O Tikket é um sistema de tickets e suporte ao cliente. Facilita a gestão de conversas, atribuição de agentes e geração de relatórios de atendimento.' },
        { category: 'products', question: 'O que é o AdvocatesPro?', answer: 'O AdvocatesPro é uma plataforma de employee advocacy que amplifica a marca da sua empresa através dos seus colaboradores nas redes sociais.' },
        { category: 'products', question: 'O que é o Quantico?', answer: 'O Quantico é uma ferramenta de analytics e métricas avançadas. Oferece dashboards personalizados, relatórios automatizados e insights baseados em dados.' },
        { category: 'account', question: 'Como altero minha senha?', answer: 'Vá ao seu perfil clicando no seu avatar na barra superior, selecione "Meu Perfil" e clique em "Alterar senha". Você precisará inserir sua senha atual e a nova.' },
        { category: 'account', question: 'Como edito meu perfil?', answer: 'Clique no seu avatar no canto superior direito e selecione "Meu Perfil". A partir daí você pode editar seu nome e sobrenome.' },
        { category: 'account', question: 'O que faço se esqueci minha senha?', answer: 'Na página de login, clique em "Esqueceu sua senha?" e insira seu e-mail. Você receberá um link para redefini-la.' },
        { category: 'admin', question: 'Como crio um novo usuário?', answer: 'No painel de administração, vá em "Usuários" e clique em "Criar usuário". Preencha o formulário com e-mail, nome, sobrenome e senha.' },
        { category: 'admin', question: 'Como atribuo produtos a um usuário?', answer: 'No painel de administração, vá em "Produtos", selecione um usuário da lista e use o formulário para atribuir os produtos disponíveis com seu ID externo.' },
      ],
    },
    metrics: {
      connect: 'Conectar',
      enter: 'Entrar',
      disconnect: 'Desconectar',
      reconnect: 'Reconectar',
      connected: 'Conectado',
      disconnected: 'Não conectado',
      connectionError: 'Erro de conexão',
      connectTitle: 'Conectar produto',
      connectSubtitle: 'Insira suas credenciais do produto',
      emailLabel: 'Email ou usuário',
      passwordLabel: 'Senha',
      subdomainLabel: 'Subdomínio',
      subdomainHelp: 'Ex: sua-empresa',
      connecting: 'Conectando...',
      disconnectConfirm: 'Tem certeza que deseja desconectar este produto?',
      metricsTitle: 'Métricas',
      syncNow: 'Sincronizar',
      syncing: 'Sincronizando...',
      noMetrics: 'Conecte sua conta para ver métricas',
      backToDashboard: 'Voltar ao Dashboard',
      openProduct: 'Abrir produto',
      accumulatedValue: 'Valorização acumulada',
      totalInteractions: 'Interações totais',
      totalContent: 'Total de conteúdos',
      potentialReach: 'Alcance potencial',
      estimatedReach: 'Alcance estimado',
      campaigns: 'Campanhas',
      activeCampaigns: 'Campanhas ativas',
      createdCampaigns: 'Campanhas criadas',
      avgContentPerCampaign: 'Conteúdos por campanha',
      challenges: 'Challenges',
      activeChallenges: 'Challenges ativos',
      createdChallenges: 'Challenges criados',
      contentForChallenges: 'Conteúdos criados para challenges',
      contents: 'Conteúdos',
      totalContents: 'Total conteúdos',
      approvedContents: 'Conteúdos aprovados',
      pendingContents: 'Conteúdos pendentes',
      groups: 'Grupos',
      totalGroups: 'Total grupos',
      totalAmbassadors: 'Total embaixadores',
      ambassadorsCreating: 'Embaixadores gerando conteúdo',
      orConnectWith: 'Ou conecte com',
    },
    health: {
      title: 'Status do Sistema',
      frontend: 'Frontend',
      backend: 'Backend',
      operational: 'Operacional',
      down: 'Fora do ar',
      checking: 'Verificando...',
      service: 'Serviço',
      uptime: 'Tempo ativo',
      timestamp: 'Última verificação',
      refresh: 'Atualizar',
    },
    creators: {
      title: 'Creators',
      subtitle: 'Descubra criadores no Facebook, Instagram e TikTok',
      searchPlaceholder: 'Buscar criadores por palavra-chave...',
      facebook: 'Facebook',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      followers: 'Seguidores',
      engagementRate: 'Taxa de engajamento',
      viewProfile: 'Ver perfil',
      verified: 'Verificado',
      biography: 'Biografia',
      mediaCount: 'Publicações',
      avgLikes: 'Curtidas médias',
      avgComments: 'Comentários médios',
      details: 'Detalhes do criador',
      recentMedia: 'Publicações recentes',
      viewOnFacebook: 'Ver no Facebook',
      viewOnInstagram: 'Ver no Instagram',
      viewOnTiktok: 'Ver no TikTok',
      loading: 'Buscando criadores...',
      noResults: 'Nenhum criador encontrado',
      noResultsHint: 'Tente outra palavra-chave',
      loadMore: 'Carregar mais',
      loadingMore: 'Carregando mais...',
      searchHint: 'Busque criadores por nome, categoria ou tema',
      errorSearch: 'Erro ao buscar criadores',
      errorProfile: 'Erro ao carregar perfil',
      rateLimitError: 'Você atingiu o limite de buscas. Tente novamente mais tarde.',
      metaApiError: 'Erro de conexão com Meta API',
      tiktokApiError: 'Erro de conexão com TikTok API',
      creatorPrice: 'Preço estimado',
      medianViews: 'Views médias',
      views: 'Views',
    },
    releaseNotes: {
      title: 'Novidades',
      subtitle: 'Descubra as últimas melhorias nos seus produtos conectados',
      noProducts: 'Nenhum produto disponível para ver novidades',
      noUpdates: 'Nenhuma novidade disponível para este produto',
      viewMore: 'Ver mais',
      viewLess: 'Ver menos',
    },
    releaseNotesPage: {
      title: 'Novidades',
      subtitle: 'Descubra as últimas melhorias nos seus produtos conectados',
    },
    authSocial: {
      continueWithEmail: 'Continuar com email',
      continueWithGoogle: 'Continuar com Google',
      continueWithFacebook: 'Continuar com Facebook',
      continueWithApple: 'Continuar com Apple',
      orSignUpWith: 'Ou registre-se com',
      orConnectWith: 'Ou conecte-se com',
      comingSoon: 'Em breve',
      tagline: 'Programe o conteúdo e mantenha a frequência que sua rede social precisa!',
      taglineSubtitle: 'Inicie sessão com uma das seguintes opções.',
    },
    auth2fa: {
      title: 'Verificação em duas etapas',
      emailSubtitle: 'Insira o código de verificação que enviamos para seu email',
      appSubtitle: 'Insira o código de verificação do aplicativo de autenticação',
      confirmButton: 'Confirmar',
      resendCode: 'Enviar novo código',
      resendLink: 'novo código',
      invalidCode: 'Código inválido. Tente novamente.',
      codeLabel: 'Digite seu código de segurança de 6 dígitos',
    },
    language: {
      select: 'Idioma',
      spanish: 'Espanhol',
      english: 'Inglês',
      portuguese: 'Português',
    },
    forgotPassword: {
      title: 'Recuperar senha',
      subtitle: 'Digite seu email e enviaremos instrucoes para redefinir sua senha.',
      emailLabel: 'Endereco de email',
      emailPlaceholder: 'voce@email.com',
      sendButton: 'Enviar instrucoes',
      sending: 'Enviando...',
      successMessage: 'Se existe uma conta com esse email, voce recebera instrucoes para redefinir sua senha.',
      backToLogin: 'Voltar ao login',
      errorMessage: 'Erro ao enviar instrucoes. Tente novamente.',
      sentTitle: 'Verifique seu email!',
      sentSubtitle: 'Enviamos um link para redefinir sua senha. Verifique sua caixa de entrada.',
      resetTitle: 'Quase lá!',
      resetSubtitle: 'Crie sua nova senha segura',
    },
    errorCodes: {
      INVALID_CREDENTIALS: 'Credenciais invalidas. Verifique seu email e senha.',
      INACTIVE_USER: 'Sua conta esta inativa. Entre em contato com o administrador.',
      INVALID_SESSION: 'Sessao invalida. Faca login novamente.',
      UNAUTHORIZED_USER: 'Voce nao tem autorizacao para esta acao.',
      INVALID_TOKEN: 'Token invalido ou expirado. Faca login novamente.',
      CURRENT_PASSWORD_INVALID: 'A senha atual esta incorreta.',
      SESSION_NOT_FOUND: 'Sessao nao encontrada.',
      RESET_TOKEN_INVALID: 'O link de redefinicao e invalido ou ja foi utilizado.',
      RESET_TOKEN_EXPIRED: 'O link de redefinicao expirou. Solicite um novo.',
      PASSWORD_TOO_SHORT: 'A senha deve ter pelo menos 8 caracteres.',
      PASSWORD_TOO_WEAK: 'A senha deve incluir maiuscula, numero e caractere especial.',
      INVALID_PRODUCT_CREDENTIALS: 'Credenciais do produto invalidas. Verifique seu email e senha.',
      EMAIL_ALREADY_EXISTS: 'O email ja esta registrado.',
      USER_NOT_FOUND: 'Usuario nao encontrado.',
      PRODUCT_NOT_FOUND: 'Produto nao encontrado.',
      PRODUCT_ALREADY_EXISTS: 'Ja existe um produto com esse nome.',
      PRODUCT_ALREADY_ASSIGNED: 'O produto ja esta atribuido ao usuario.',
      ASSIGNMENT_NOT_FOUND: 'Atribuicao nao encontrada.',
      PRODUCT_ACCESS_DENIED: 'Voce nao tem acesso a este produto.',
    },
  },
};
