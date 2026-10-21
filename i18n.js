/* =========================================================
   Sergio Cajide Gómez — Portfolio · i18n.js
   El HTML está escrito en español (idioma por defecto y
   versión sin JavaScript). Este archivo contiene la versión
   inglesa y cambia el contenido en el sitio, sin recargar.
   ========================================================= */
(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio-lang';
  const LANGS = ['es', 'en'];

  /* Textos simples: español → inglés. Las claves se comparan
     con los espacios normalizados. */
  const EN = {
    /* Cabecera y navegación */
    'Saltar al contenido': 'Skip to content',
    'Sergio Cajide Gómez, volver al inicio': 'Sergio Cajide Gómez, back to top',
    'Secciones': 'Sections',
    'Perfil': 'Profile',
    'Experiencia': 'Experience',
    'Formación': 'Education',
    'Certificaciones': 'Certifications',
    'Herramientas': 'Tools',
    'Proyectos': 'Projects',
    'Contacto': 'Contact',
    'Idioma': 'Language',
    'Navegación rápida': 'Quick navigation',
    'Índice': 'Contents',
    'Cerrar índice': 'Close contents',
    'Descargar CV': 'Download CV',

    /* Portada */
    'Empresa y Tecnología · USC': 'Business and Technology · USC',
    'Disponible para nuevas oportunidades': 'Open to new opportunities',
    'Data Science · Data Analytics · Transformación digital': 'Data Science · Data Analytics · Digital transformation',
    'Graduado en Empresa y Tecnología, con prácticas en revenue management y marketing digital. Ahora, especializándome en análisis y ciencia de datos.':
      'Business and Technology graduate with internships in revenue management and digital marketing. Now specialising in data analytics and data science.',
    'Ver experiencia': 'View experience',
    'Retrato de Sergio Cajide Gómez, sentado con las manos entrelazadas': 'Portrait of Sergio Cajide Gómez, seated with hands clasped',

    /* Perfil */
    'Me interesa cómo los datos y la tecnología ayudan a entender un negocio y a tomar mejores decisiones.':
      'I’m interested in how data and technology help us understand a business and make better decisions.',
    'Ficha': 'Fact sheet',
    'Base': 'Based in',
    'Grado en Empresa y Tecnología, mención en Tecnología · USC ·': 'Bachelor’s in Business and Technology, Technology specialisation · USC ·',
    'Enfoque': 'Focus',
    'Data Analytics · Data Science · Transformación digital': 'Data Analytics · Data Science · Digital transformation',
    'Idiomas': 'Languages',
    'Español': 'Spanish',
    'Gallego': 'Galician',
    'Inglés': 'English',
    'Portugués': 'Portuguese',
    'Nativo': 'Native',
    'Básico': 'Elementary',
    'Además': 'Other',
    'Carné de conducir B': 'Driving licence (category B)',

    /* Habilidades */
    'Habilidades': 'Skills',
    'habilidades en 4 áreas': 'skills across 4 areas',
    'Todas': 'All',
    'Filtrar habilidades por área': 'Filter skills by area',
    'Análisis de datos': 'Data analysis',
    'Limpieza de datos': 'Data cleaning',
    'Análisis exploratorio (EDA)': 'Exploratory data analysis (EDA)',
    'Análisis de correlación': 'Correlation analysis',
    'Visualización interactiva': 'Interactive visualisation',
    'Regresión logística': 'Logistic regression',
    'Árboles de decisión': 'Decision trees',
    'Aprendizaje no supervisado': 'Unsupervised learning',
    'Evaluación de modelos': 'Model evaluation',
    'IA generativa': 'Generative AI',
    'Negocio': 'Business',
    'Análisis de negocio': 'Business analysis',
    'Decisiones basadas en datos': 'Data-driven decision making',
    'Transformación digital': 'Digital transformation',
    'Gestión de proyectos': 'Project management',
    'Competencias': 'Soft skills',
    'Liderazgo': 'Leadership',
    'Comunicación': 'Communication',
    'Resolución de problemas': 'Problem solving',
    'Trabajo en equipo': 'Teamwork',
    'Creatividad': 'Creativity',

    /* Experiencia */
    'Prácticas': 'Internship',
    'Logotipo de Overfly Consulting': 'Overfly Consulting logo',
    'Logotipo de Newlink': 'Newlink logo',
    'Marketing Digital': 'Digital Marketing',
    'Análisis de tráfico, keywords y campañas para clientes del sector hotelero.': 'Traffic, keyword and campaign analysis for clients in the hotel sector.',
    'Análisis de métricas de tráfico y rendimiento web con Google Analytics y Semrush para medir el impacto de contenidos y campañas.':
      'Analysed web traffic and performance metrics with Google Analytics and Semrush to measure the impact of content and campaigns.',
    'Análisis de keywords y benchmarking de la competencia en el sector hotelero para detectar oportunidades de crecimiento.':
      'Carried out keyword research and competitor benchmarking in the hotel sector to identify growth opportunities.',
    'Seguimiento de KPIs de campañas SEO y SEM y propuesta de mejoras basadas en datos para captar tráfico cualificado.':
      'Tracked SEO and SEM campaign KPIs and proposed data-driven improvements to attract qualified traffic.',
    'Colaboración en desarrollo web para mejorar la estructura, la usabilidad y el rendimiento de los sitios.':
      'Contributed to web development to improve site structure, usability and performance.',
    'Herramientas y áreas': 'Tools and areas',
    'Análisis de reservas, ocupación y demanda para apoyar el pricing de hoteles: pick-ups, forecast e informes.':
      'Booking, occupancy and demand analysis to support hotel pricing: pick-ups, forecasts and reports.',
    'Análisis de datos de reservas, ocupación y demanda para apoyar las estrategias de pricing y optimizar ingresos.':
      'Analysed booking, occupancy and demand data to support pricing strategies and optimise revenue.',
    'Elaboración y seguimiento de pick-ups y forecast de demanda.': 'Prepared and monitored pick-up reports and demand forecasts.',
    'Benchmarking de la competencia y revisión de KPIs para detectar oportunidades de mejora en pricing y forecasting.':
      'Benchmarked competitors and reviewed KPIs to identify improvements in pricing and forecasting.',
    'Elaboración de informes para la toma de decisiones estratégicas basadas en datos.': 'Prepared reports to support data-driven strategic decisions.',
    'Gestión de datos de disponibilidad, tarifas e inventario en PMS y channel managers (SiteMinder, Prestige, Ulyses).':
      'Managed availability, rate and inventory data in PMS and channel managers (SiteMinder, Prestige, Ulyses).',
    'Hockey sobre patines': 'Roller hockey',
    'Ene 2022 — actualidad': 'Jan 2022 — present',
    'Escudo del Hockey Club Riazor': 'Hockey Club Riazor crest',
    'Entrenador': 'Coach',
    'Preparo y dirijo los entrenamientos del equipo y lo acompaño en los partidos.': 'I plan and run the team’s training sessions and support the team during matches.',
    'Planificación y desarrollo de las sesiones de entrenamiento.': 'Planning and running training sessions.',
    'Trabajo de los aspectos técnicos y tácticos del hockey sobre patines.': 'Working on the technical and tactical aspects of roller hockey.',
    'Dirección del equipo en los partidos y seguimiento de la evolución de cada jugador y del grupo.':
      'Leading the team in matches and following the progress of each player and of the group.',
    'Emblema de la Federación Galega de Patinaxe': 'Federación Galega de Patinaxe emblem',
    'Árbitro': 'Referee',
    'Arbitro partidos de competiciones regionales de hockey sobre patines.': 'I referee matches in regional roller hockey competitions.',
    'Arbitraje de los partidos y aplicación del reglamento con imparcialidad.': 'Officiating matches and applying the rules impartially.',
    'Seguimiento del desarrollo del encuentro y toma de decisiones en pista, bajo presión.': 'Following the flow of the game and making on-court decisions under pressure.',
    'Comunicación con los participantes y gestión de conflictos para el correcto desarrollo de la competición.':
      'Communicating with participants and handling conflicts so that the competition runs properly.',
    'Funciones': 'Duties',
    'Ocultar funciones': 'Hide duties',

    /* Formación y TFG */
    'Logotipo de la Universidad de Santiago de Compostela': 'University of Santiago de Compostela logo',
    'Grado en Empresa y Tecnología': 'Bachelor’s Degree in Business and Technology',
    'Universidade de Santiago de Compostela · Campus de Lugo': 'Universidade de Santiago de Compostela · Lugo campus',
    'Mención en Tecnología': 'Specialisation in Technology',
    'El grado combina la gestión de empresas con las tecnologías de la información. Dentro de él cursé la mención en Tecnología.':
      'The degree combines business management with information technology. Within it, I took the Technology specialisation.',
    'Graduado · julio de 2026': 'Graduated · July 2026',
    'Trabajo de Fin de Grado (TFG)': 'Bachelor’s thesis (TFG)',
    'Parte de una pregunta: ¿está preparada Galicia para competir como una de las regiones tecnológicas de referencia en España? Analizo cómo la transformación digital influye en su desarrollo económico entre 2014 y 2024.':
      'It starts from one question: is Galicia ready to compete as one of Spain’s leading technology regions? I analyse how digital transformation shaped its economic development between 2014 and 2024.',
    'Ver más información': 'More information',
    'Ver menos': 'Show less',
    'Abrir PDF': 'Open PDF',
    '(se abre en una pestaña nueva)': '(opens in a new tab)',
    'Descargar': 'Download',
    'Objetivo': 'Aim',
    'Analizar la evolución de la digitalización y de los principales indicadores tecnológicos de Galicia entre 2014 y 2024, su relación con el desarrollo económico regional y su posición frente al resto de comunidades autónomas.':
      'To analyse how digitalisation and the main technology indicators evolved in Galicia between 2014 and 2024, how they relate to regional economic development and how Galicia compares with the other Spanish regions.',
    'Método': 'Method',
    'Enfoque descriptivo-comparativo con fuentes oficiales (INE, ONTSI, IGE y AMTEGA-OSIMGA). Incluye una explotación propia de los microdatos de la Encuesta sobre Innovación en las Empresas del INE para construir la serie 2014–2024 de intensidad innovadora de las 17 comunidades.':
      'A descriptive and comparative approach based on official sources (INE, ONTSI, IGE and AMTEGA-OSIMGA). It includes my own processing of the microdata from the INE Survey on Innovation in Companies to build the 2014–2024 innovation intensity series for all 17 regions.',
    'Qué estudia': 'What it covers',
    'El hipersector TIC gallego, la adopción tecnológica de las empresas, los sectores estratégicos (automoción, textil, naval y agroalimentario-pesquero) y la comparación con Madrid, Cataluña, País Vasco, Andalucía y la Comunidad Valenciana.':
      'The Galician ICT hypersector, technology adoption by companies, the strategic sectors (automotive, textile, shipbuilding, and agri-food and fishing) and a comparison with Madrid, Catalonia, the Basque Country, Andalusia and the Valencian Community.',
    'Conclusiones': 'Conclusions',
    'Galicia avanza hacia una economía cada vez más digital, pero de forma desigual. Tiene tres retos estructurales: retener el talento, aumentar la inversión privada en innovación y reducir el desequilibrio territorial interno.':
      'Galicia is moving towards an increasingly digital economy, but unevenly. It faces three structural challenges: retaining talent, increasing private investment in innovation and reducing its internal territorial imbalance.',
    'Presentado en': 'Presented at',
    'Mención': 'Specialisation',
    'Tecnología': 'Technology',
    'Especialización dentro del Grado en Empresa y Tecnología': 'A specialisation within the Bachelor’s Degree in Business and Technology',

    /* Certificaciones */
    'Especialización en datos': 'Data specialisation',
    'Pulsa una tarjeta para ver su reverso. Los diplomas de IBM y Google se pueden ampliar y verificar en Coursera.':
      'Tap a card to see the back. The IBM and Google diplomas can be enlarged and verified on Coursera.',
    'Completado': 'Completed',
    'En curso': 'In progress',
    'Diploma del Certificado Profesional IBM Data Science otorgado a Sergio Cajide Gómez el 29 de septiembre de 2026 a través de Coursera, con la lista de los 12 cursos completados.':
      'IBM Data Science Professional Certificate awarded to Sergio Cajide Gómez on 29 September 2026 through Coursera, listing the 12 completed courses.',
    'Diploma del Certificado Profesional Google Advanced Data Analytics otorgado a Sergio Cajide Gómez el 9 de octubre de 2026 a través de Coursera, con la lista de los 7 cursos completados.':
      'Google Advanced Data Analytics Professional Certificate awarded to Sergio Cajide Gómez on 9 October 2026 through Coursera, listing the 7 completed courses.',
    'Ampliar el diploma IBM Data Science Professional Certificate': 'Enlarge the IBM Data Science Professional Certificate diploma',
    'Ampliar el diploma Google Advanced Data Analytics Professional Certificate': 'Enlarge the Google Advanced Data Analytics Professional Certificate diploma',
    'Ampliar': 'Enlarge',
    'Ajustar': 'Fit',
    '12 cursos · Coursera': '12 courses · Coursera',
    '7 cursos · Coursera': '7 courses · Coursera',
    '29 sep 2026': '29 Sep 2026',
    '9 oct 2026': '9 Oct 2026',
    'Ver cursos': 'View courses',
    'Detalles: IBM Data Science Professional Certificate': 'Details: IBM Data Science Professional Certificate',
    'Detalles: Google Advanced Data Analytics Professional Certificate': 'Details: Google Advanced Data Analytics Professional Certificate',
    'Detalles: Microsoft Certified Power BI Data Analyst Associate': 'Details: Microsoft Certified Power BI Data Analyst Associate',
    'Ciencia de datos y machine learning: metodología, Python y SQL, análisis y visualización de datos, modelos de machine learning y un proyecto final.':
      'Data science and machine learning: methodology, Python and SQL, data analysis and visualisation, machine learning models and a final project.',
    'Analítica avanzada con evaluaciones prácticas: exploración de grandes conjuntos de datos, estadística, regresión, machine learning y modelado predictivo, con un proyecto final.':
      'Advanced analytics with hands-on assessments: exploring large datasets, statistics, regression, machine learning and predictive modelling, with a final project.',
    'Cursos del diploma': 'Courses on the diploma',
    'Ver diploma': 'View diploma',
    'Verificar en Coursera': 'Verify on Coursera',
    'Volver': 'Back',
    'Insignia de la certificación Microsoft Certified: Power BI Data Analyst Associate, que estoy preparando':
      'Badge of the Microsoft Certified: Power BI Data Analyst Associate certification, which I am preparing for',
    'Examen PL-300': 'PL-300 exam',
    'Preparándolo actualmente': 'Currently preparing',
    'Detalles': 'Details',
    'Certificación de Microsoft para analistas de datos que trabajan con Power BI: preparar y modelar datos, y construir visualizaciones e informes para analizarlos.':
      'Microsoft certification for data analysts who work with Power BI: preparing and modelling data, and building visualisations and reports to analyse it.',
    'Estado: en curso. Estoy preparando el examen PL-300; todavía no he obtenido la certificación.':
      'Status: in progress. I am preparing for the PL-300 exam and have not earned the certification yet.',

    /* Herramientas */
    'Las herramientas que utilizo.': 'The tools I use.',
    'Herramientas principales': 'Main tools',
    'Ver todas las herramientas': 'View all tools',
    'Ocultar herramientas': 'Hide tools',
    'Programación y análisis de datos': 'Programming and data analysis',
    'Business intelligence y hojas de cálculo': 'Business intelligence and spreadsheets',
    'Marketing digital y analítica web': 'Digital marketing and web analytics',
    'Revenue management y sistemas hoteleros': 'Revenue management and hotel systems',
    'Desarrollo web': 'Web development',
    'Productividad y gestión': 'Productivity and management',
    'Análisis de datos y machine learning': 'Data analysis and machine learning',
    'Limpieza y análisis exploratorio': 'Data cleaning and exploratory analysis',
    'Consultas a bases de datos': 'Database queries',
    'Análisis estadístico': 'Statistical analysis',
    'Programación orientada a objetos': 'Object-oriented programming',
    'Modelado de datos e informes': 'Data modelling and reports',
    'Preparando la certificación PL-300': 'Preparing for the PL-300 certification',
    'Análisis de datos y modelos de gestión': 'Data analysis and management models',
    'Tráfico y comportamiento de usuarios': 'Traffic and user behaviour',
    'Prácticas en Overfly': 'Internship at Overfly',
    'SEO, keywords y competencia': 'SEO, keywords and competitors',
    'Diseño de contenido digital': 'Digital content design',
    'Channel manager: tarifas y distribución': 'Channel manager: rates and distribution',
    'Prácticas en Newlink': 'Internship at Newlink',
    'Gestión operativa y reservas': 'Operations and bookings',
    'Disponibilidad, tarifas e inventario': 'Availability, rates and inventory',
    'Reservas y operaciones hoteleras': 'Hotel bookings and operations',
    'Estructura de páginas web': 'Web page structure',
    'Diseño y maquetación responsive': 'Responsive design and layout',
    'Interactividad web, como la de este portfolio': 'Web interactivity, like this portfolio’s',
    'Proyectos web y de Python': 'Web and Python projects',
    'Documentación profesional': 'Professional documents',
    'Bases de datos': 'Databases',
    'ERP de gestión empresarial': 'Business management ERP',

    /* Proyectos */
    'Logotipo de ATLIC, Atlantic Innoblue Communities': 'ATLIC (Atlantic Innoblue Communities) logo',
    'Proyecto europeo': 'European project',
    'Ene — Nov 2024': 'Jan — Nov 2024',
    'Proyecto europeo de innovación y desarrollo de comunidades del Atlántico. Participé en actividades de colaboración con equipos de varios países, trabajando la comunicación intercultural y la gestión de proyectos.':
      'European project on innovation and the development of Atlantic communities. I took part in collaborative activities with teams from several countries, working on intercultural communication and project management.',
    'Logotipo de Erasmus+': 'Erasmus+ logo',
    'Proyecto Erasmus+ sobre sostenibilidad y emprendimiento verde. Con él obtuve el Youthpass, el certificado de la Unión Europea que reconoce lo aprendido en programas de educación no formal.':
      'Erasmus+ project on sustainability and green entrepreneurship. Through it I earned the Youthpass, the European Union certificate that recognises learning in non-formal education programmes.',
    'Logotipo de Santander X Explorer': 'Santander X Explorer logo',
    'Programa de emprendimiento': 'Entrepreneurship programme',
    'Ene — Abr 2024': 'Jan — Apr 2024',
    'Programa de Santander X para desarrollar habilidades emprendedoras y conectar con el ecosistema de startups y talento joven.':
      'Santander X programme to develop entrepreneurial skills and connect with the startup and young talent ecosystem.',

    /* Cursos y certificaciones */
    'Formación complementaria': 'Further training',
    'Universidad de Santiago de Compostela ·': 'University of Santiago de Compostela ·',
    'Abr 2025': 'Apr 2025',
    'Inglés · B2': 'English · B2',
    'Trinity College London · Certificado oficial': 'Trinity College London · Official certificate',
    'Título de Entrenador de Hockey sobre Patines · Nivel I': 'Roller Hockey Coach Qualification · Level I',
    'Real Federación Española de Patinaje · Certificado oficial': 'Real Federación Española de Patinaje · Official certificate',
    'Curso de Árbitro de Hockey sobre Patines': 'Roller Hockey Referee Course',

    /* Contacto y pie */
    'Para ofertas, prácticas o cualquier pregunta, escríbeme por email o por LinkedIn.': 'For job offers, internships or any questions, write to me by email or on LinkedIn.',
    'Copiar': 'Copy',
    'Copiado': 'Copied',
    'No se pudo copiar': 'Could not copy',
    'Email copiado al portapapeles': 'Email copied to clipboard',
    'No se pudo copiar el email': 'The email could not be copied',
    'Teléfono': 'Phone',
    'Ubicación': 'Location',
    'Currículum': 'CV',
    'PDF · versión en español · 168 KB': 'PDF · English version · 168 KB',
    'Enviar un mensaje': 'Send a message',
    'Nombre': 'Name',
    'Asunto': 'Subject',
    'opcional': 'optional',
    'Mensaje': 'Message',
    'Preparar email': 'Prepare email',
    'Se abrirá tu aplicación de correo con el mensaje listo para enviar.': 'Your email app will open with the message ready to send.',
    'Revisa:': 'Please check:',
    'Contacto desde el portfolio': 'Contact from the portfolio',
    'Nombre:': 'Name:',
    'Volver arriba': 'Back to top',

    /* Visor */
    'PDF original': 'Original PDF',
    'Verificar': 'Verify',
    'en Coursera (se abre en una pestaña nueva)': 'on Coursera (opens in a new tab)',
    'Cerrar el visor': 'Close the viewer',
  };

  /* Bloques con marcado interno, traducidos como un todo */
  const EN_HTML = {
    'hero.headline': 'I read a business <span class="marker">through its data.</span>',
    'title.perfil': 'Business, technology <em>and data</em>',
    'title.exp': 'Professional <em>experience</em>',
    'title.form': 'Academic <em>background</em>',
    'title.cert': 'Certifications in <em>data and analytics</em>',
    'title.tools': 'Tools <em>and technologies</em>',
    'title.proj': 'Projects <em>and programmes</em>',
    'title.cursos': 'Courses and <em>certifications</em>',
    'title.contact': 'Let’s talk',
    'title.skills': 'Key <em>skills</em>',
    'profile.p1': 'I studied the <strong>Bachelor’s Degree in Business and Technology</strong> at the University of Santiago de Compostela, with a <strong>specialisation in Technology</strong>. In 2026 I did two internships: one in <strong>revenue management</strong>, analysing hotel bookings, occupancy and demand, and one in <strong>digital marketing</strong>, measuring web traffic, keywords and campaigns.',
    'profile.p2': 'That same year I completed the <strong>IBM Data Science</strong> and <strong>Google Advanced Data Analytics</strong> professional certificates, and I am now preparing for the <strong>Microsoft PL-300</strong> Power BI certification. I keep learning about data analysis and machine learning.',
    'profile.p3': 'Outside work, I coach at Hockey Club Riazor and referee matches in regional roller hockey competitions.',
  };

  const META = {
    es: {
      title: 'Sergio Cajide Gómez — Negocio, datos y tecnología',
      description: 'Portfolio de Sergio Cajide Gómez. Graduado en Empresa y Tecnología (USC, mención en Tecnología), con prácticas en revenue management y marketing digital, y certificaciones en ciencia y análisis de datos.',
    },
    en: {
      title: 'Sergio Cajide Gómez — Business, data and technology',
      description: 'Portfolio of Sergio Cajide Gómez. Business and Technology graduate (USC, Technology specialisation) with internships in revenue management and digital marketing, and certifications in data science and data analytics.',
    },
  };

  const CV = {
    es: { href: 'assets/documents/CV_Sergio_Cajide_Gomez_ES.pdf', file: 'CV_Sergio_Cajide_Gomez_ES.pdf', preview: 'assets/img/cv-preview-es.webp' },
    en: { href: 'assets/documents/CV_Sergio_Cajide_Gomez_EN.pdf', file: 'CV_Sergio_Cajide_Gomez_EN.pdf', preview: 'assets/img/cv-preview-en.webp' },
  };

  const ATTRS = ['aria-label', 'alt', 'title', 'data-diploma-alt'];
  const norm = (text) => text.replace(/\s+/g, ' ').trim();

  let current = 'es';
  const textOriginals = new WeakMap();   // nodo de texto → texto en español
  const attrOriginals = new WeakMap();   // elemento → { atributo: valor en español }
  const htmlOriginals = new WeakMap();   // elemento [data-i18n] → innerHTML en español

  function t(spanish) {
    if (current !== 'en') return spanish;
    const hit = EN[norm(spanish)];
    return hit === undefined ? spanish : hit;
  }

  function skipped(node) {
    const el = node.nodeType === 1 ? node : node.parentElement;
    return !el || !!el.closest('[data-i18n-skip], [data-i18n], script, style, noscript');
  }

  function translateText(lang) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.nodeValue.trim() || skipped(node)) continue;
      if (!textOriginals.has(node)) textOriginals.set(node, node.nodeValue);
      const original = textOriginals.get(node);
      if (lang === 'es') { node.nodeValue = original; continue; }
      const hit = EN[norm(original)];
      if (hit === undefined) continue;
      const [, lead, , trail] = original.match(/^(\s*)([\s\S]*?)(\s*)$/);
      node.nodeValue = lead + hit + trail;
    }
  }

  function translateAttributes(lang) {
    const selector = ATTRS.map((a) => '[' + a + ']').join(',');
    document.querySelectorAll(selector).forEach((el) => {
      if (el.closest('[data-i18n-skip]')) return;
      if (!attrOriginals.has(el)) {
        const saved = {};
        ATTRS.forEach((a) => { if (el.hasAttribute(a)) saved[a] = el.getAttribute(a); });
        attrOriginals.set(el, saved);
      }
      const saved = attrOriginals.get(el);
      Object.keys(saved).forEach((a) => {
        const value = lang === 'es' ? saved[a] : (EN[norm(saved[a])] ?? saved[a]);
        if (el.getAttribute(a) !== value) el.setAttribute(a, value);
      });
    });
  }

  function translateBlocks(lang) {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      if (!htmlOriginals.has(el)) htmlOriginals.set(el, el.innerHTML);
      const html = lang === 'es' ? htmlOriginals.get(el) : EN_HTML[el.dataset.i18n];
      if (html !== undefined && el.innerHTML !== html) el.innerHTML = html;
    });
  }

  function updateDocument(lang) {
    document.documentElement.lang = lang;
    document.title = META[lang].title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', META[lang].description);

    document.querySelectorAll('[data-cv]').forEach((a) => {
      a.setAttribute('href', CV[lang].href);
      a.setAttribute('download', CV[lang].file);
      a.setAttribute('hreflang', lang);
    });
    document.querySelectorAll('[data-cv-preview]').forEach((img) => img.setAttribute('src', CV[lang].preview));

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
  }

  function apply(lang) {
    translateBlocks(lang);
    translateText(lang);
    translateAttributes(lang);
    updateDocument(lang);
  }

  function set(lang, persist = true) {
    if (!LANGS.includes(lang)) lang = 'es';
    current = lang;
    apply(lang);
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (err) { /* sin almacenamiento: solo esta visita */ }
    }
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function initial() {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (LANGS.includes(fromUrl)) return fromUrl;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (LANGS.includes(saved)) return saved;
    } catch (err) { /* sin almacenamiento */ }
    return 'es';
  }

  function init() {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => { if (btn.dataset.lang !== current) set(btn.dataset.lang); });
    });
    const lang = initial();
    if (lang !== 'es') set(lang, false);
    else updateDocument('es');
  }

  window.I18N = { t, set, init, get lang() { return current; } };
})();
