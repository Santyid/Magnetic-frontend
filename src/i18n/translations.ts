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
    emailPlaceholder: string;
    passwordPlaceholder: string;
    confirmPasswordPlaceholder: string;
    firstNamePlaceholder: string;
    lastNamePlaceholder: string;
  };

  // Register
  register: {
    title: string;
    subtitle: string;
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
    passwordsMatch: string;
    updateButton: string;
    updating: string;
    successMessage: string;
    errorMessage: string;
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

  // Language Selector
  language: {
    select: string;
    spanish: string;
    english: string;
    portuguese: string;
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
    },
    register: {
      title: 'Crear cuenta',
      subtitle: 'Completa el formulario para crear tu cuenta en Login Magnetic.',
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
      emailLabel: 'Email',
      emailDisabled: 'El email no se puede modificar.',
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
      passwordsMatch: 'Las contraseñas coinciden',
      updateButton: 'Actualizar Contraseña',
      updating: 'Actualizando...',
      successMessage: 'Contraseña actualizada correctamente.',
      errorMessage: 'Error al cambiar la contraseña',
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
      socialgestDescription: 'Gestión integral de redes sociales',
      tikketDescription: 'Sistema de tickets y soporte al cliente',
      advocatesDescription: 'Plataforma de employee advocacy',
      quanticoDescription: 'Analytics y métricas avanzadas',
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
    language: {
      select: 'Idioma',
      spanish: 'Español',
      english: 'Inglés',
      portuguese: 'Portugués',
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
    },
    register: {
      title: 'Create account',
      subtitle: 'Fill out the form to create your account on Login Magnetic.',
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
      passwordsMatch: 'Passwords match',
      updateButton: 'Update Password',
      updating: 'Updating...',
      successMessage: 'Password updated successfully.',
      errorMessage: 'Error changing password',
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
      socialgestDescription: 'Comprehensive social media management',
      tikketDescription: 'Ticketing and customer support system',
      advocatesDescription: 'Employee advocacy platform',
      quanticoDescription: 'Advanced analytics and metrics',
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
    language: {
      select: 'Language',
      spanish: 'Spanish',
      english: 'English',
      portuguese: 'Portuguese',
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
    },
    register: {
      title: 'Criar conta',
      subtitle: 'Preencha o formulário para criar sua conta no Login Magnetic.',
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
      passwordsMatch: 'As senhas coincidem',
      updateButton: 'Atualizar Senha',
      updating: 'Atualizando...',
      successMessage: 'Senha atualizada com sucesso.',
      errorMessage: 'Erro ao alterar a senha',
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
      socialgestDescription: 'Gestão completa de redes sociais',
      tikketDescription: 'Sistema de tickets e suporte ao cliente',
      advocatesDescription: 'Plataforma de employee advocacy',
      quanticoDescription: 'Analytics e métricas avançadas',
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
    language: {
      select: 'Idioma',
      spanish: 'Espanhol',
      english: 'Inglês',
      portuguese: 'Português',
    },
  },
};
