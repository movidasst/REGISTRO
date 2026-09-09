(() => {
  'use strict';

  const STORAGE_KEY = 'movidasst_registro_language';
  const SUPPORTED = ['es', 'en', 'pt', 'fr'];
  const LOCALES = { es: 'es', en: 'en', pt: 'pt-BR', fr: 'fr' };
  const TITLES = {
    es: 'Registro Internacional | La Movida SST Plus',
    en: 'International Registration | La Movida SST Plus',
    pt: 'Registro Internacional | La Movida SST Plus',
    fr: 'Inscription internationale | La Movida SST Plus'
  };
  const DESCRIPTIONS = {
    es: 'Únete desde cualquier país a la red internacional de profesionales de Seguridad y Salud en el Trabajo de La Movida SST Plus.',
    en: 'Join La Movida SST Plus international network of Occupational Safety and Health professionals from any country.',
    pt: 'Junte-se, de qualquer país, à rede internacional de profissionais de Segurança e Saúde no Trabalho da La Movida SST Plus.',
    fr: 'Rejoignez, depuis n’importe quel pays, le réseau international de professionnels de la santé et de la sécurité au travail de La Movida SST Plus.'
  };

  const TRANSLATIONS = {
    en: {
      'De la Reacción a la prevención': 'From Reaction to Prevention',
      'integrantes': 'members',
      'Empresas': 'Companies',
      'Ver Directorio': 'View Directory',
      'Directorio SST': 'OSH Directory',
      'Directorio': 'Directory',
      'Para empresas': 'For companies',
      'Capacitación corporativa SST para tu equipo': 'Corporate OSH training for your team',
      'Cotiza participantes y cursos y solicita una propuesta formal.': 'Quote participants and courses and request a formal proposal.',
      'Cotizar': 'Request quote',
      'Datos Personales': 'Personal Information',
      'Ubicación y Contacto': 'Location and Contact',
      'Perfil Profesional': 'Professional Profile',
      '¡Empecemos! Solo tomará 1 minuto.': 'Let’s get started! It only takes 1 minute.',
      '¡Vas por la mitad! Ya casi terminas.': 'You’re halfway there! Almost done.',
      '¡Último paso! Sube tu foto y asegura tu código.': 'Final step! Upload your photo and secure your code.',
      '¡Te damos la bienvenida!': 'Welcome!',
      'Por favor, lee detalladamente cada campo y llénalo según las indicaciones. Al finalizar el registro, recibirás tu código de integrante y confirmación por correo electrónico.': 'Please read each field carefully and complete it as indicated. When registration is complete, you will receive your member code and an email confirmation.',
      '¡Ya somos': 'We are already',
      'integrantes oficiales!': 'official members!',
      'Nombres *': 'First name(s) *',
      'Apellidos *': 'Last name(s) *',
      'Solo letras y espacios.': 'Letters and spaces only.',
      'País de residencia *': 'Country of residence *',
      'Selecciona tu país': 'Select your country',
      'Toca la lista y selecciona tu país.': 'Open the list and select your country.',
      'Cédula de identidad *': 'National ID *',
      'Documento de identidad *': 'Identity document *',
      'Cédula de identidad': 'National ID',
      'Documento de identidad': 'Identity document',
      'Usa solamente números, sin puntos, letras, espacios ni símbolos.': 'Use numbers only, with no dots, letters, spaces or symbols.',
      'Edad actual *': 'Current age *',
      'Género *': 'Gender *',
      'Selecciona tu género': 'Select your gender',
      'Masculino': 'Male',
      'Femenino': 'Female',
      'Estado *': 'State *',
      'Selecciona tu Estado': 'Select your state',
      'Municipio *': 'Municipality *',
      'Primero selecciona un estado': 'Select a state first',
      'Selecciona un municipio': 'Select a municipality',
      'No aplica': 'Not applicable',
      'WhatsApp *': 'WhatsApp *',
      'Número de WhatsApp': 'WhatsApp number',
      'Selecciona el prefijo e ingresa un número válido con código internacional.': 'Select the country code and enter a valid international number.',
      'Nombre de usuario de WhatsApp': 'WhatsApp username',
      '(Opcional)': '(Optional)',
      'Es diferente de tu nombre visible y de tu número. Si todavía no tienes uno, déjalo vacío.': 'This is different from your display name and phone number. If you do not have one yet, leave it blank.',
      'Correo Electrónico *': 'Email *',
      'Perfil de LinkedIn': 'LinkedIn profile',
      'Debe ser el enlace público de tu perfil personal.': 'Use the public link to your personal profile.',
      'Grado de Instrucción *': 'Education level *',
      'Selecciona tu grado académico': 'Select your education level',
      'Primaria': 'Primary education',
      'Bachiller': 'High school',
      'TSU (Técnico Superior Universitario)': 'Higher Technical Degree (TSU)',
      'Universitario (Lic./Ing.)': 'University degree (BSc/Eng.)',
      'Postgrado': 'Postgraduate',
      'Situación Laboral *': 'Employment status *',
      'Selecciona tu situación actual': 'Select your current status',
      'Dependiente': 'Employee',
      'Independiente': 'Self-employed',
      'Desempleado': 'Unemployed',
      'Carrera *': 'Profession / degree *',
      'Selecciona tu carrera': 'Select your profession / degree',
      'TSU en Higiene y Seguridad Laboral': 'Higher Technical Degree in Occupational Hygiene and Safety',
      'Ingeniería en HSL': 'Engineering in Occupational Hygiene and Safety',
      'Otra': 'Other',
      'Especifique su carrera': 'Specify your profession / degree',
      'Postgrado *': 'Postgraduate studies *',
      'Selecciona una opción': 'Select an option',
      'Ninguno / No aplica': 'None / Not applicable',
      'Especialización': 'Specialization',
      'Master': 'Master',
      'Maestría': 'Master’s degree',
      'Doctorado / Post Doctorado *': 'Doctorate / Postdoctorate *',
      'Doctorado': 'Doctorate',
      'Post Doctorado': 'Postdoctorate',
      'Fotografía de Perfil *': 'Profile photo *',
      'Toca para subir tu foto': 'Tap to upload your photo',
      '* Tu foto será utilizada para generar tu credencial digital de integrante oficial de La Movida de SST Plus.': '* Your photo will be used to generate your official La Movida de SST Plus digital member credential.',
      'La foto de perfil es obligatoria.': 'A profile photo is required.',
      'Acuerdo de Privacidad:': 'Privacy Agreement:',
      'Entiendo que mis datos personales (incluyendo identificación y fotografía) serán utilizados exclusivamente para el registro en La Movida SST Plus bajo estrictas normas de confidencialidad. Acepto los términos de la comunidad.': 'I understand that my personal data (including identification and photograph) will be used exclusively for registration with La Movida SST Plus under strict confidentiality standards. I accept the community terms.',
      'Anterior': 'Back',
      'Siguiente': 'Next',
      'Completar Registro': 'Complete Registration',
      '¡Registro Exitoso!': 'Registration successful!',
      '¡Felicidades! Ya formas parte de nuestra red.': 'Congratulations! You are now part of our network.',
      'Código Único de Integrante': 'Unique Member Code',
      'Preparando fotografía': 'Preparing photo',
      'La fotografía se guardará en Google Drive.': 'The photo will be saved to Google Drive.',
      'Guardando fotografía': 'Saving photo',
      'La fotografía se está enviando a Google Drive.': 'The photo is being sent to Google Drive.',
      'Fotografía guardada': 'Photo saved',
      'La imagen quedó vinculada a tu credencial y directorio.': 'The image is now linked to your credential and directory profile.',
      'Registro creado; fotografía pendiente': 'Registration created; photo pending',
      'Guarda tu código. Podrás cargar la fotografía desde el acceso de integrantes.': 'Save your code. You can upload the photo later from member access.',
      'Podrás cargarla desde el acceso de integrantes.': 'You can upload it later from member access.',
      'El registro está guardado. Podrás cargar la fotografía desde el acceso de integrantes.': 'Your registration is saved. You can upload the photo later from member access.',
      'Preparando correo de confirmación': 'Preparing confirmation email',
      'El registro ya está guardado en Supabase.': 'Your registration is already saved in Supabase.',
      'Enviando correo de confirmación': 'Sending confirmation email',
      'Correo enviado': 'Email sent',
      'Registro guardado; correo programado': 'Registration saved; email queued',
      'Registro guardado; correo no confirmado': 'Registration saved; email not confirmed',
      'Tu registro está completo. Supabase reintentará automáticamente el correo; guarda también el código mostrado en pantalla.': 'Your registration is complete. Supabase will automatically retry the email; also save the code shown on screen.',
      'Tu registro está completo. Guarda el código mostrado en pantalla.': 'Your registration is complete. Save the code shown on screen.',
      'Unirse al Grupo Oficial de WhatsApp': 'Join the Official WhatsApp Group',
      'Unirse al Grupo La Movida SST Internacional': 'Join La Movida SST International Group',
      'Invitar a otro profesional a registrarse': 'Invite another professional to register',
      'Ir al inicio de La Movida SST': 'Go to La Movida SST home',
      'Hubo un error.': 'An error occurred.',
      'Plataforma desarrollada por': 'Platform developed by',
      'Síguenos en nuestras redes': 'Follow us on social media',
      'Únete a nuestro Canal Oficial': 'Join our Official Channel',
      'Preparando fotografía...': 'Preparing photo...',
      'Subiendo fotografía...': 'Uploading photo...',
      'Guardando fotografía...': 'Saving photo...',
      'Creando registro...': 'Creating registration...',
      'Selecciona una imagen JPG o PNG de máximo 5 MB': 'Select a JPG or PNG image up to 5 MB',
      'Formato no permitido o archivo mayor de 5 MB.': 'Unsupported format or file larger than 5 MB.',
      'Ingresa un número de WhatsApp válido para el país seleccionado.': 'Enter a valid WhatsApp number for the selected country.',
      'El número de WhatsApp no es válido para el prefijo seleccionado.': 'The WhatsApp number is not valid for the selected country code.',
      'No se pudo leer la fotografía.': 'The photo could not be read.',
      'La fotografía seleccionada no pudo procesarse.': 'The selected photo could not be processed.',
      'La fotografía es obligatoria.': 'A photo is required.',
      'La fotografía debe ser JPG o PNG.': 'The photo must be JPG or PNG.',
      'La fotografía no puede superar 5 MB.': 'The photo cannot exceed 5 MB.',
      'El navegador no pudo preparar la fotografía.': 'The browser could not prepare the photo.',
      'Google Apps Script devolvió una respuesta no válida al subir la fotografía.': 'Google Apps Script returned an invalid response while uploading the photo.',
      'No se pudo guardar la fotografía en Google Drive.': 'The photo could not be saved to Google Drive.',
      'La carga de la fotografía tardó demasiado. Revisa tu conexión e intenta nuevamente.': 'The photo upload took too long. Check your connection and try again.',
      'Error desconocido': 'Unknown error',
      'Este documento ya se encuentra registrado. Si necesita modificar sus datos, ingrese al Directorio y abra la sección Credencial.': 'This document is already registered. To update your information, open the Directory and go to the Credential section.',
      'El código generado coincidió con otro registro. Intenta nuevamente.': 'The generated code matched another registration. Please try again.',
      'Supabase rechazó la operación por una política RLS.': 'Supabase rejected the operation because of an RLS policy.',
      'Supabase no está disponible para programar el correo.': 'Supabase is not available to queue the email.',
      'Apps Script devolvió una respuesta no válida.': 'Apps Script returned an invalid response.',
      'No se pudo confirmar el envío del correo.': 'The email delivery could not be confirmed.',
      'No se pudo iniciar la conexión con Supabase.': 'The connection to Supabase could not be started.',
      'Supabase no confirmó el nuevo registro.': 'Supabase did not confirm the new registration.',
      'Cambiar idioma': 'Change language',
      'Español': 'Spanish',
      'muchos': 'many'
    },
    pt: {
      'De la Reacción a la prevención': 'Da Reação à Prevenção',
      'integrantes': 'integrantes',
      'Empresas': 'Empresas',
      'Ver Directorio': 'Ver Diretório',
      'Directorio SST': 'Diretório SST',
      'Directorio': 'Diretório',
      'Para empresas': 'Para empresas',
      'Capacitación corporativa SST para tu equipo': 'Capacitação corporativa em SST para sua equipe',
      'Cotiza participantes y cursos y solicita una propuesta formal.': 'Faça uma cotação de participantes e cursos e solicite uma proposta formal.',
      'Cotizar': 'Solicitar cotação',
      'Datos Personales': 'Dados Pessoais',
      'Ubicación y Contacto': 'Localização e Contato',
      'Perfil Profesional': 'Perfil Profissional',
      '¡Empecemos! Solo tomará 1 minuto.': 'Vamos começar! Leva apenas 1 minuto.',
      '¡Vas por la mitad! Ya casi terminas.': 'Você já está na metade! Falta pouco.',
      '¡Último paso! Sube tu foto y asegura tu código.': 'Último passo! Envie sua foto e garanta seu código.',
      '¡Te damos la bienvenida!': 'Boas-vindas!',
      'Por favor, lee detalladamente cada campo y llénalo según las indicaciones. Al finalizar el registro, recibirás tu código de integrante y confirmación por correo electrónico.': 'Leia atentamente cada campo e preencha-o conforme as instruções. Ao concluir o registro, você receberá seu código de integrante e uma confirmação por e-mail.',
      '¡Ya somos': 'Já somos',
      'integrantes oficiales!': 'integrantes oficiais!',
      'Nombres *': 'Nome(s) *',
      'Apellidos *': 'Sobrenome(s) *',
      'Solo letras y espacios.': 'Somente letras e espaços.',
      'País de residencia *': 'País de residência *',
      'Selecciona tu país': 'Selecione seu país',
      'Toca la lista y selecciona tu país.': 'Abra a lista e selecione seu país.',
      'Cédula de identidad *': 'Documento de identidade *',
      'Documento de identidad *': 'Documento de identidade *',
      'Cédula de identidad': 'Documento de identidade',
      'Documento de identidad': 'Documento de identidade',
      'Usa solamente números, sin puntos, letras, espacios ni símbolos.': 'Use somente números, sem pontos, letras, espaços ou símbolos.',
      'Edad actual *': 'Idade atual *',
      'Género *': 'Gênero *',
      'Selecciona tu género': 'Selecione seu gênero',
      'Masculino': 'Masculino',
      'Femenino': 'Feminino',
      'Estado *': 'Estado *',
      'Selecciona tu Estado': 'Selecione seu estado',
      'Municipio *': 'Município *',
      'Primero selecciona un estado': 'Primeiro selecione um estado',
      'Selecciona un municipio': 'Selecione um município',
      'No aplica': 'Não se aplica',
      'WhatsApp *': 'WhatsApp *',
      'Número de WhatsApp': 'Número de WhatsApp',
      'Selecciona el prefijo e ingresa un número válido con código internacional.': 'Selecione o código do país e informe um número internacional válido.',
      'Nombre de usuario de WhatsApp': 'Nome de usuário do WhatsApp',
      '(Opcional)': '(Opcional)',
      'Es diferente de tu nombre visible y de tu número. Si todavía no tienes uno, déjalo vacío.': 'É diferente do seu nome visível e do seu número. Se ainda não tiver um, deixe em branco.',
      'Correo Electrónico *': 'E-mail *',
      'Perfil de LinkedIn': 'Perfil do LinkedIn',
      'Debe ser el enlace público de tu perfil personal.': 'Use o link público do seu perfil pessoal.',
      'Grado de Instrucción *': 'Nível de escolaridade *',
      'Selecciona tu grado académico': 'Selecione seu nível de escolaridade',
      'Primaria': 'Ensino fundamental',
      'Bachiller': 'Ensino médio',
      'TSU (Técnico Superior Universitario)': 'Técnico Superior Universitário (TSU)',
      'Universitario (Lic./Ing.)': 'Universitário (Lic./Eng.)',
      'Postgrado': 'Pós-graduação',
      'Situación Laboral *': 'Situação profissional *',
      'Selecciona tu situación actual': 'Selecione sua situação atual',
      'Dependiente': 'Empregado',
      'Independiente': 'Autônomo',
      'Desempleado': 'Desempregado',
      'Carrera *': 'Formação / profissão *',
      'Selecciona tu carrera': 'Selecione sua formação / profissão',
      'TSU en Higiene y Seguridad Laboral': 'Técnico Superior em Higiene e Segurança do Trabalho',
      'Ingeniería en HSL': 'Engenharia em Higiene e Segurança do Trabalho',
      'Otra': 'Outra',
      'Especifique su carrera': 'Informe sua formação / profissão',
      'Postgrado *': 'Pós-graduação *',
      'Selecciona una opción': 'Selecione uma opção',
      'Ninguno / No aplica': 'Nenhum / Não se aplica',
      'Especialización': 'Especialização',
      'Master': 'Master',
      'Maestría': 'Mestrado',
      'Doctorado / Post Doctorado *': 'Doutorado / Pós-doutorado *',
      'Doctorado': 'Doutorado',
      'Post Doctorado': 'Pós-doutorado',
      'Fotografía de Perfil *': 'Foto de perfil *',
      'Toca para subir tu foto': 'Toque para enviar sua foto',
      '* Tu foto será utilizada para generar tu credencial digital de integrante oficial de La Movida de SST Plus.': '* Sua foto será usada para gerar sua credencial digital de integrante oficial da La Movida de SST Plus.',
      'La foto de perfil es obligatoria.': 'A foto de perfil é obrigatória.',
      'Acuerdo de Privacidad:': 'Acordo de Privacidade:',
      'Entiendo que mis datos personales (incluyendo identificación y fotografía) serán utilizados exclusivamente para el registro en La Movida SST Plus bajo estrictas normas de confidencialidad. Acepto los términos de la comunidad.': 'Entendo que meus dados pessoais (incluindo identificação e fotografia) serão utilizados exclusivamente para o registro na La Movida SST Plus, sob rígidas normas de confidencialidade. Aceito os termos da comunidade.',
      'Anterior': 'Anterior',
      'Siguiente': 'Próximo',
      'Completar Registro': 'Concluir Registro',
      '¡Registro Exitoso!': 'Registro concluído!',
      '¡Felicidades! Ya formas parte de nuestra red.': 'Parabéns! Você já faz parte da nossa rede.',
      'Código Único de Integrante': 'Código Único de Integrante',
      'Preparando fotografía': 'Preparando foto',
      'La fotografía se guardará en Google Drive.': 'A foto será salva no Google Drive.',
      'Guardando fotografía': 'Salvando foto',
      'La fotografía se está enviando a Google Drive.': 'A foto está sendo enviada ao Google Drive.',
      'Fotografía guardada': 'Foto salva',
      'La imagen quedó vinculada a tu credencial y directorio.': 'A imagem foi vinculada à sua credencial e ao diretório.',
      'Registro creado; fotografía pendiente': 'Registro criado; foto pendente',
      'Guarda tu código. Podrás cargar la fotografía desde el acceso de integrantes.': 'Guarde seu código. Você poderá enviar a foto depois pelo acesso de integrantes.',
      'Podrás cargarla desde el acceso de integrantes.': 'Você poderá enviá-la depois pelo acesso de integrantes.',
      'El registro está guardado. Podrás cargar la fotografía desde el acceso de integrantes.': 'Seu registro está salvo. Você poderá enviar a foto depois pelo acesso de integrantes.',
      'Preparando correo de confirmación': 'Preparando e-mail de confirmação',
      'El registro ya está guardado en Supabase.': 'O registro já está salvo no Supabase.',
      'Enviando correo de confirmación': 'Enviando e-mail de confirmação',
      'Correo enviado': 'E-mail enviado',
      'Registro guardado; correo programado': 'Registro salvo; e-mail programado',
      'Registro guardado; correo no confirmado': 'Registro salvo; e-mail não confirmado',
      'Tu registro está completo. Supabase reintentará automáticamente el correo; guarda también el código mostrado en pantalla.': 'Seu registro está completo. O Supabase tentará reenviar o e-mail automaticamente; guarde também o código exibido na tela.',
      'Tu registro está completo. Guarda el código mostrado en pantalla.': 'Seu registro está completo. Guarde o código exibido na tela.',
      'Unirse al Grupo Oficial de WhatsApp': 'Entrar no Grupo Oficial do WhatsApp',
      'Unirse al Grupo La Movida SST Internacional': 'Entrar no Grupo La Movida SST Internacional',
      'Invitar a otro profesional a registrarse': 'Convidar outro profissional para se registrar',
      'Ir al inicio de La Movida SST': 'Ir para o início da La Movida SST',
      'Hubo un error.': 'Ocorreu um erro.',
      'Plataforma desarrollada por': 'Plataforma desenvolvida por',
      'Síguenos en nuestras redes': 'Siga-nos nas redes sociais',
      'Únete a nuestro Canal Oficial': 'Entre no nosso Canal Oficial',
      'Preparando fotografía...': 'Preparando foto...',
      'Subiendo fotografía...': 'Enviando foto...',
      'Guardando fotografía...': 'Salvando foto...',
      'Creando registro...': 'Criando registro...',
      'Selecciona una imagen JPG o PNG de máximo 5 MB': 'Selecione uma imagem JPG ou PNG de até 5 MB',
      'Formato no permitido o archivo mayor de 5 MB.': 'Formato não permitido ou arquivo maior que 5 MB.',
      'Ingresa un número de WhatsApp válido para el país seleccionado.': 'Informe um número de WhatsApp válido para o país selecionado.',
      'El número de WhatsApp no es válido para el prefijo seleccionado.': 'O número de WhatsApp não é válido para o código de país selecionado.',
      'No se pudo leer la fotografía.': 'Não foi possível ler a foto.',
      'La fotografía seleccionada no pudo procesarse.': 'Não foi possível processar a foto selecionada.',
      'La fotografía es obligatoria.': 'A foto é obrigatória.',
      'La fotografía debe ser JPG o PNG.': 'A foto deve ser JPG ou PNG.',
      'La fotografía no puede superar 5 MB.': 'A foto não pode exceder 5 MB.',
      'El navegador no pudo preparar la fotografía.': 'O navegador não conseguiu preparar a foto.',
      'Google Apps Script devolvió una respuesta no válida al subir la fotografía.': 'O Google Apps Script retornou uma resposta inválida ao enviar a foto.',
      'No se pudo guardar la fotografía en Google Drive.': 'Não foi possível salvar a foto no Google Drive.',
      'La carga de la fotografía tardó demasiado. Revisa tu conexión e intenta nuevamente.': 'O envio da foto demorou demais. Verifique sua conexão e tente novamente.',
      'Error desconocido': 'Erro desconhecido',
      'Este documento ya se encuentra registrado. Si necesita modificar sus datos, ingrese al Directorio y abra la sección Credencial.': 'Este documento já está registrado. Para atualizar seus dados, acesse o Diretório e abra a seção Credencial.',
      'El código generado coincidió con otro registro. Intenta nuevamente.': 'O código gerado coincidiu com outro registro. Tente novamente.',
      'Supabase rechazó la operación por una política RLS.': 'O Supabase rejeitou a operação devido a uma política RLS.',
      'Supabase no está disponible para programar el correo.': 'O Supabase não está disponível para programar o e-mail.',
      'Apps Script devolvió una respuesta no válida.': 'O Apps Script retornou uma resposta inválida.',
      'No se pudo confirmar el envío del correo.': 'Não foi possível confirmar o envio do e-mail.',
      'No se pudo iniciar la conexión con Supabase.': 'Não foi possível iniciar a conexão com o Supabase.',
      'Supabase no confirmó el nuevo registro.': 'O Supabase não confirmou o novo registro.',
      'Cambiar idioma': 'Mudar idioma',
      'Español': 'Espanhol',
      'muchos': 'muitos'
    },
    fr: {
      'De la Reacción a la prevención': 'De la Réaction à la Prévention',
      'integrantes': 'membres',
      'Empresas': 'Entreprises',
      'Ver Directorio': 'Voir l’annuaire',
      'Directorio SST': 'Annuaire SST',
      'Directorio': 'Annuaire',
      'Para empresas': 'Pour les entreprises',
      'Capacitación corporativa SST para tu equipo': 'Formation SST en entreprise pour votre équipe',
      'Cotiza participantes y cursos y solicita una propuesta formal.': 'Chiffrez les participants et les cours et demandez une proposition formelle.',
      'Cotizar': 'Demander un devis',
      'Datos Personales': 'Données personnelles',
      'Ubicación y Contacto': 'Localisation et contact',
      'Perfil Profesional': 'Profil professionnel',
      '¡Empecemos! Solo tomará 1 minuto.': 'Commençons ! Cela ne prend qu’une minute.',
      '¡Vas por la mitad! Ya casi terminas.': 'Vous êtes à mi-chemin ! Presque terminé.',
      '¡Último paso! Sube tu foto y asegura tu código.': 'Dernière étape ! Téléversez votre photo et obtenez votre code.',
      '¡Te damos la bienvenida!': 'Bienvenue !',
      'Por favor, lee detalladamente cada campo y llénalo según las indicaciones. Al finalizar el registro, recibirás tu código de integrante y confirmación por correo electrónico.': 'Veuillez lire attentivement chaque champ et le remplir selon les indications. À la fin de l’inscription, vous recevrez votre code de membre et une confirmation par e-mail.',
      '¡Ya somos': 'Nous sommes déjà',
      'integrantes oficiales!': 'membres officiels !',
      'Nombres *': 'Prénom(s) *',
      'Apellidos *': 'Nom(s) *',
      'Solo letras y espacios.': 'Lettres et espaces uniquement.',
      'País de residencia *': 'Pays de résidence *',
      'Selecciona tu país': 'Sélectionnez votre pays',
      'Toca la lista y selecciona tu país.': 'Ouvrez la liste et sélectionnez votre pays.',
      'Cédula de identidad *': 'Pièce d’identité *',
      'Documento de identidad *': 'Pièce d’identité *',
      'Cédula de identidad': 'Pièce d’identité',
      'Documento de identidad': 'Pièce d’identité',
      'Usa solamente números, sin puntos, letras, espacios ni símbolos.': 'Utilisez uniquement des chiffres, sans points, lettres, espaces ni symboles.',
      'Edad actual *': 'Âge actuel *',
      'Género *': 'Genre *',
      'Selecciona tu género': 'Sélectionnez votre genre',
      'Masculino': 'Masculin',
      'Femenino': 'Féminin',
      'Estado *': 'État / Région *',
      'Selecciona tu Estado': 'Sélectionnez votre État / région',
      'Municipio *': 'Municipalité *',
      'Primero selecciona un estado': 'Sélectionnez d’abord un État / une région',
      'Selecciona un municipio': 'Sélectionnez une municipalité',
      'No aplica': 'Sans objet',
      'WhatsApp *': 'WhatsApp *',
      'Número de WhatsApp': 'Numéro WhatsApp',
      'Selecciona el prefijo e ingresa un número válido con código internacional.': 'Sélectionnez l’indicatif du pays et saisissez un numéro international valide.',
      'Nombre de usuario de WhatsApp': 'Nom d’utilisateur WhatsApp',
      '(Opcional)': '(Facultatif)',
      'Es diferente de tu nombre visible y de tu número. Si todavía no tienes uno, déjalo vacío.': 'Il est différent de votre nom visible et de votre numéro. Si vous n’en avez pas encore, laissez ce champ vide.',
      'Correo Electrónico *': 'E-mail *',
      'Perfil de LinkedIn': 'Profil LinkedIn',
      'Debe ser el enlace público de tu perfil personal.': 'Utilisez le lien public de votre profil personnel.',
      'Grado de Instrucción *': 'Niveau d’études *',
      'Selecciona tu grado académico': 'Sélectionnez votre niveau d’études',
      'Primaria': 'Enseignement primaire',
      'Bachiller': 'Enseignement secondaire',
      'TSU (Técnico Superior Universitario)': 'Diplôme technique supérieur (TSU)',
      'Universitario (Lic./Ing.)': 'Diplôme universitaire (Licence/Ing.)',
      'Postgrado': 'Études supérieures',
      'Situación Laboral *': 'Situation professionnelle *',
      'Selecciona tu situación actual': 'Sélectionnez votre situation actuelle',
      'Dependiente': 'Salarié(e)',
      'Independiente': 'Indépendant(e)',
      'Desempleado': 'Sans emploi',
      'Carrera *': 'Formation / profession *',
      'Selecciona tu carrera': 'Sélectionnez votre formation / profession',
      'TSU en Higiene y Seguridad Laboral': 'Diplôme technique supérieur en hygiène et sécurité au travail',
      'Ingeniería en HSL': 'Ingénierie en hygiène et sécurité au travail',
      'Otra': 'Autre',
      'Especifique su carrera': 'Précisez votre formation / profession',
      'Postgrado *': 'Études supérieures *',
      'Selecciona una opción': 'Sélectionnez une option',
      'Ninguno / No aplica': 'Aucun / Sans objet',
      'Especialización': 'Spécialisation',
      'Master': 'Master',
      'Maestría': 'Master',
      'Doctorado / Post Doctorado *': 'Doctorat / Postdoctorat *',
      'Doctorado': 'Doctorat',
      'Post Doctorado': 'Postdoctorat',
      'Fotografía de Perfil *': 'Photo de profil *',
      'Toca para subir tu foto': 'Touchez pour téléverser votre photo',
      '* Tu foto será utilizada para generar tu credencial digital de integrante oficial de La Movida de SST Plus.': '* Votre photo sera utilisée pour générer votre carte numérique officielle de membre de La Movida de SST Plus.',
      'La foto de perfil es obligatoria.': 'La photo de profil est obligatoire.',
      'Acuerdo de Privacidad:': 'Accord de confidentialité :',
      'Entiendo que mis datos personales (incluyendo identificación y fotografía) serán utilizados exclusivamente para el registro en La Movida SST Plus bajo estrictas normas de confidencialidad. Acepto los términos de la comunidad.': 'Je comprends que mes données personnelles (y compris mon identification et ma photographie) seront utilisées exclusivement pour mon inscription à La Movida SST Plus, dans le respect de règles strictes de confidentialité. J’accepte les conditions de la communauté.',
      'Anterior': 'Précédent',
      'Siguiente': 'Suivant',
      'Completar Registro': 'Terminer l’inscription',
      '¡Registro Exitoso!': 'Inscription réussie !',
      '¡Felicidades! Ya formas parte de nuestra red.': 'Félicitations ! Vous faites désormais partie de notre réseau.',
      'Código Único de Integrante': 'Code unique de membre',
      'Preparando fotografía': 'Préparation de la photo',
      'La fotografía se guardará en Google Drive.': 'La photo sera enregistrée dans Google Drive.',
      'Guardando fotografía': 'Enregistrement de la photo',
      'La fotografía se está enviando a Google Drive.': 'La photo est en cours d’envoi vers Google Drive.',
      'Fotografía guardada': 'Photo enregistrée',
      'La imagen quedó vinculada a tu credencial y directorio.': 'L’image est maintenant liée à votre carte et à votre profil dans l’annuaire.',
      'Registro creado; fotografía pendiente': 'Inscription créée ; photo en attente',
      'Guarda tu código. Podrás cargar la fotografía desde el acceso de integrantes.': 'Conservez votre code. Vous pourrez téléverser la photo plus tard depuis l’accès membres.',
      'Podrás cargarla desde el acceso de integrantes.': 'Vous pourrez la téléverser plus tard depuis l’accès membres.',
      'El registro está guardado. Podrás cargar la fotografía desde el acceso de integrantes.': 'Votre inscription est enregistrée. Vous pourrez téléverser la photo plus tard depuis l’accès membres.',
      'Preparando correo de confirmación': 'Préparation de l’e-mail de confirmation',
      'El registro ya está guardado en Supabase.': 'L’inscription est déjà enregistrée dans Supabase.',
      'Enviando correo de confirmación': 'Envoi de l’e-mail de confirmation',
      'Correo enviado': 'E-mail envoyé',
      'Registro guardado; correo programado': 'Inscription enregistrée ; e-mail programmé',
      'Registro guardado; correo no confirmado': 'Inscription enregistrée ; e-mail non confirmé',
      'Tu registro está completo. Supabase reintentará automáticamente el correo; guarda también el código mostrado en pantalla.': 'Votre inscription est terminée. Supabase retentera automatiquement l’envoi de l’e-mail ; conservez également le code affiché à l’écran.',
      'Tu registro está completo. Guarda el código mostrado en pantalla.': 'Votre inscription est terminée. Conservez le code affiché à l’écran.',
      'Unirse al Grupo Oficial de WhatsApp': 'Rejoindre le groupe WhatsApp officiel',
      'Unirse al Grupo La Movida SST Internacional': 'Rejoindre le groupe La Movida SST International',
      'Invitar a otro profesional a registrarse': 'Inviter un autre professionnel à s’inscrire',
      'Ir al inicio de La Movida SST': 'Aller à l’accueil de La Movida SST',
      'Hubo un error.': 'Une erreur s’est produite.',
      'Plataforma desarrollada por': 'Plateforme développée par',
      'Síguenos en nuestras redes': 'Suivez-nous sur les réseaux sociaux',
      'Únete a nuestro Canal Oficial': 'Rejoignez notre chaîne officielle',
      'Preparando fotografía...': 'Préparation de la photo...',
      'Subiendo fotografía...': 'Téléversement de la photo...',
      'Guardando fotografía...': 'Enregistrement de la photo...',
      'Creando registro...': 'Création de l’inscription...',
      'Selecciona una imagen JPG o PNG de máximo 5 MB': 'Sélectionnez une image JPG ou PNG de 5 Mo maximum',
      'Formato no permitido o archivo mayor de 5 MB.': 'Format non pris en charge ou fichier supérieur à 5 Mo.',
      'Ingresa un número de WhatsApp válido para el país seleccionado.': 'Saisissez un numéro WhatsApp valide pour le pays sélectionné.',
      'El número de WhatsApp no es válido para el prefijo seleccionado.': 'Le numéro WhatsApp n’est pas valide pour l’indicatif sélectionné.',
      'No se pudo leer la fotografía.': 'Impossible de lire la photo.',
      'La fotografía seleccionada no pudo procesarse.': 'Impossible de traiter la photo sélectionnée.',
      'La fotografía es obligatoria.': 'La photo est obligatoire.',
      'La fotografía debe ser JPG o PNG.': 'La photo doit être au format JPG ou PNG.',
      'La fotografía no puede superar 5 MB.': 'La photo ne peut pas dépasser 5 Mo.',
      'El navegador no pudo preparar la fotografía.': 'Le navigateur n’a pas pu préparer la photo.',
      'Google Apps Script devolvió una respuesta no válida al subir la fotografía.': 'Google Apps Script a renvoyé une réponse non valide lors du téléversement de la photo.',
      'No se pudo guardar la fotografía en Google Drive.': 'Impossible d’enregistrer la photo dans Google Drive.',
      'La carga de la fotografía tardó demasiado. Revisa tu conexión e intenta nuevamente.': 'Le téléversement de la photo a pris trop de temps. Vérifiez votre connexion et réessayez.',
      'Error desconocido': 'Erreur inconnue',
      'Este documento ya se encuentra registrado. Si necesita modificar sus datos, ingrese al Directorio y abra la sección Credencial.': 'Ce document est déjà enregistré. Pour modifier vos données, ouvrez l’annuaire puis la section Carte.',
      'El código generado coincidió con otro registro. Intenta nuevamente.': 'Le code généré correspond à une autre inscription. Réessayez.',
      'Supabase rechazó la operación por una política RLS.': 'Supabase a rejeté l’opération en raison d’une politique RLS.',
      'Supabase no está disponible para programar el correo.': 'Supabase n’est pas disponible pour programmer l’e-mail.',
      'Apps Script devolvió una respuesta no válida.': 'Apps Script a renvoyé une réponse non valide.',
      'No se pudo confirmar el envío del correo.': 'Impossible de confirmer l’envoi de l’e-mail.',
      'No se pudo iniciar la conexión con Supabase.': 'Impossible d’établir la connexion à Supabase.',
      'Supabase no confirmó el nuevo registro.': 'Supabase n’a pas confirmé la nouvelle inscription.',
      'Cambiar idioma': 'Changer de langue',
      'Español': 'Espagnol',
      'muchos': 'beaucoup'
    }
  };

  const PHONE_UI = {
    es: {
      selectedCountryAriaLabel: 'Cambiar país para el número de teléfono, seleccionado ${countryName} (${dialCode})',
      noCountrySelected: 'Seleccionar país para el número de teléfono',
      countryListAriaLabel: 'Lista de países',
      searchPlaceholder: 'Buscar',
      clearSearchAriaLabel: 'Limpiar búsqueda',
      searchEmptyState: 'Sin resultados',
      searchSummaryAria(count) { return count === 0 ? 'Sin resultados' : count === 1 ? '1 resultado' : `${count} resultados`; }
    },
    en: {
      selectedCountryAriaLabel: 'Change country for phone number, currently selected ${countryName} (${dialCode})',
      noCountrySelected: 'Select country for phone number',
      countryListAriaLabel: 'List of countries',
      searchPlaceholder: 'Search',
      clearSearchAriaLabel: 'Clear search',
      searchEmptyState: 'No results found',
      searchSummaryAria(count) { return count === 0 ? 'No results found' : count === 1 ? '1 result found' : `${count} results found`; }
    },
    pt: {
      selectedCountryAriaLabel: 'Alterar país do número de telefone, selecionado ${countryName} (${dialCode})',
      noCountrySelected: 'Selecionar país para o número de telefone',
      countryListAriaLabel: 'Lista de países',
      searchPlaceholder: 'Buscar',
      clearSearchAriaLabel: 'Limpar busca',
      searchEmptyState: 'Nenhum resultado',
      searchSummaryAria(count) { return count === 0 ? 'Nenhum resultado' : count === 1 ? '1 resultado' : `${count} resultados`; }
    },
    fr: {
      selectedCountryAriaLabel: 'Changer le pays du numéro de téléphone, sélection actuelle ${countryName} (${dialCode})',
      noCountrySelected: 'Sélectionner le pays du numéro de téléphone',
      countryListAriaLabel: 'Liste des pays',
      searchPlaceholder: 'Rechercher',
      clearSearchAriaLabel: 'Effacer la recherche',
      searchEmptyState: 'Aucun résultat',
      searchSummaryAria(count) { return count === 0 ? 'Aucun résultat' : count === 1 ? '1 résultat' : `${count} résultats`; }
    }
  };

  let currentLang = (() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.includes(saved)) return saved;
    } catch (_) {}
    const browser = String(navigator.language || 'es').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(browser) ? browser : 'es';
  })();

  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();
  let observer = null;
  let applying = false;

  function locale() {
    return LOCALES[currentLang] || 'es';
  }

  function t(value, lang = currentLang) {
    const text = String(value ?? '');
    if (lang === 'es' || !text) return text;
    const dict = TRANSLATIONS[lang] || {};
    if (Object.prototype.hasOwnProperty.call(dict, text)) return dict[text];

    let match = text.match(/^Paso\s+(\d+)\s+de\s+(\d+)$/i);
    if (match) {
      if (lang === 'en') return `Step ${match[1]} of ${match[2]}`;
      if (lang === 'pt') return `Etapa ${match[1]} de ${match[2]}`;
      if (lang === 'fr') return `Étape ${match[1]} sur ${match[2]}`;
    }

    match = text.match(/^Estamos enviando el código a (.+)\.$/);
    if (match) {
      if (lang === 'en') return `We are sending the code to ${match[1]}.`;
      if (lang === 'pt') return `Estamos enviando o código para ${match[1]}.`;
      if (lang === 'fr') return `Nous envoyons le code à ${match[1]}.`;
    }

    match = text.match(/^La confirmación fue enviada a (.+)\. Revisa también la carpeta de spam\.$/);
    if (match) {
      if (lang === 'en') return `The confirmation was sent to ${match[1]}. Also check your spam folder.`;
      if (lang === 'pt') return `A confirmação foi enviada para ${match[1]}. Verifique também a pasta de spam.`;
      if (lang === 'fr') return `La confirmation a été envoyée à ${match[1]}. Vérifiez également le dossier spam.`;
    }

    match = text.match(/^(.+) devolvió más de un registro\.$/);
    if (match) {
      if (lang === 'en') return `${match[1]} returned more than one record.`;
      if (lang === 'pt') return `${match[1]} retornou mais de um registro.`;
      if (lang === 'fr') return `${match[1]} a renvoyé plus d’un enregistrement.`;
    }

    return text;
  }

  function translateTextNode(node) {
    if (!node || node.nodeType !== Node.TEXT_NODE || !node.parentElement) return;
    if (node.parentElement.closest('script, style, [data-no-translate]')) return;
    if (!/\S/.test(node.nodeValue || '')) return;

    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const raw = originalText.get(node);
    const lead = raw.match(/^\s*/)?.[0] || '';
    const tail = raw.match(/\s*$/)?.[0] || '';
    const core = raw.trim();
    const translated = t(core);
    const next = lead + translated + tail;
    if (node.nodeValue !== next) node.nodeValue = next;
  }

  function translateAttributes(el) {
    if (!(el instanceof Element) || el.closest('[data-no-translate]')) return;
    const attrs = ['placeholder', 'title', 'aria-label'];
    let saved = originalAttrs.get(el);
    if (!saved) {
      saved = {};
      originalAttrs.set(el, saved);
    }
    attrs.forEach(attr => {
      if (!el.hasAttribute(attr)) return;
      if (!(attr in saved)) saved[attr] = el.getAttribute(attr);
      const raw = saved[attr];
      const translated = t(raw);
      if (el.getAttribute(attr) !== translated) el.setAttribute(attr, translated);
    });
  }

  function apply(root = document) {
    if (applying) return;
    applying = true;
    try {
      document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : currentLang;
      document.documentElement.dataset.locale = locale();
      document.title = TITLES[currentLang] || TITLES.es;
      const description = document.querySelector('meta[name="description"]');
      if (description) description.setAttribute('content', DESCRIPTIONS[currentLang] || DESCRIPTIONS.es);

      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          return /\S/.test(node.nodeValue || '') && !node.parentElement?.closest('script, style, [data-no-translate]')
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        }
      });
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(translateTextNode);

      const elements = root.querySelectorAll ? root.querySelectorAll('[placeholder],[title],[aria-label]') : [];
      elements.forEach(translateAttributes);

      const selector = document.getElementById('languageSelect');
      if (selector && selector.value !== currentLang) selector.value = currentLang;
    } finally {
      applying = false;
    }
  }

  function countryName(iso2) {
    const code = String(iso2 || '').toUpperCase();
    try {
      return new Intl.DisplayNames([locale()], { type: 'region' }).of(code) || code;
    } catch (_) {
      return code;
    }
  }

  function flag(iso2) {
    return String(iso2 || '').toUpperCase().replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt()));
  }

  function refreshCountrySelect() {
    const select = document.getElementById('pais');
    if (!select) return;
    const selected = select.value;
    const options = [...select.options];
    const placeholder = options.find(o => !o.value);
    const countryOptions = options.filter(o => /^[A-Z]{2}$/.test(o.value));
    countryOptions.forEach(o => { o.textContent = `${flag(o.value)} ${countryName(o.value)}`; });
    countryOptions.sort((a, b) => a.textContent.localeCompare(b.textContent, locale()));
    if (placeholder) select.appendChild(placeholder);
    countryOptions.forEach(o => select.appendChild(o));
    select.value = selected;
  }

  function refreshPhoneUi() {
    const ui = PHONE_UI[currentLang] || PHONE_UI.es;
    document.querySelectorAll('.iti__country[data-country-code]').forEach(item => {
      const iso = item.getAttribute('data-country-code');
      const nameEl = item.querySelector('.iti__country-name');
      if (iso && nameEl) nameEl.textContent = countryName(iso);
    });
    document.querySelectorAll('.iti__search-input').forEach(input => {
      input.placeholder = ui.searchPlaceholder;
      input.setAttribute('aria-label', ui.searchPlaceholder);
    });
    document.querySelectorAll('.iti__country-list').forEach(list => list.setAttribute('aria-label', ui.countryListAriaLabel));
  }

  function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) return;
    currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
    apply(document);
    refreshCountrySelect();
    refreshPhoneUi();
    window.dispatchEvent(new CustomEvent('movida:languagechange', { detail: { lang, locale: locale() } }));
    requestAnimationFrame(() => {
      try {
        if (typeof window.updateHeight === 'function' && typeof window.currentStep === 'number') window.updateHeight(window.currentStep);
      } catch (_) {}
    });
  }

  function phoneTranslations() {
    return PHONE_UI[currentLang] || PHONE_UI.es;
  }

  function shareMessage() {
    if (currentLang === 'en') return 'I am now an official member of La Movida de SST Plus international network! 🌎 You can also join our ecosystem of OSH professionals. Register here: https://registro.movidasst.com';
    if (currentLang === 'pt') return 'Já sou integrante oficial da rede internacional da La Movida de SST Plus! 🌎 Você também pode fazer parte do nosso ecossistema de profissionais de SST. Registre-se aqui: https://registro.movidasst.com';
    if (currentLang === 'fr') return 'Je suis désormais membre officiel du réseau international de La Movida de SST Plus ! 🌎 Vous pouvez aussi rejoindre notre écosystème de professionnels SST. Inscrivez-vous ici : https://registro.movidasst.com';
    return '¡Ya soy integrante oficial de la red internacional de La Movida de SST Plus! 🌎 Tú también puedes formar parte de nuestro ecosistema de profesionales de SST. Regístrate aquí: https://registro.movidasst.com';
  }

  function startObserver() {
    if (observer) observer.disconnect();
    observer = new MutationObserver(mutations => {
      if (applying) return;
      mutations.forEach(mutation => {
        if (mutation.type === 'characterData') translateTextNode(mutation.target);
        mutation.addedNodes?.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
          if (node.nodeType === Node.ELEMENT_NODE) apply(node);
        });
      });
      setTimeout(refreshPhoneUi, 0);
    });
    observer.observe(document.documentElement, { subtree: true, childList: true, characterData: true });
  }

  window.movidaI18n = {
    t,
    apply,
    setLanguage,
    currentLang: () => currentLang,
    locale,
    countryName,
    refreshCountrySelect,
    refreshPhoneUi,
    phoneTranslations,
    shareMessage,
    supported: [...SUPPORTED]
  };

  document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : currentLang;

  function initLanguageUI() {
    const selector = document.getElementById('languageSelect');
    if (selector) {
      selector.value = currentLang;
      if (selector.dataset.i18nBound !== '1') {
        selector.addEventListener('change', event => setLanguage(event.target.value));
        selector.dataset.i18nBound = '1';
      }
    }
    apply(document);
    startObserver();
    setTimeout(() => {
      refreshCountrySelect();
      refreshPhoneUi();
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageUI, { once: true });
  } else {
    initLanguageUI();
  }

  window.addEventListener('load', () => {
    setTimeout(initLanguageUI, 0);
  }, { once: true });

  window.addEventListener('pageshow', () => {
    setTimeout(initLanguageUI, 0);
  });
})();