// Main JS for interactive behaviors and translations
(function(){
  const dir = document.documentElement.getAttribute('dir') || 'rtl';
  const navList = document.querySelector('.nav-list');
  const toggle = document.querySelector('.menu-toggle');
  const langBtn = document.getElementById('lang-switch');
  const root = document.documentElement;

  // Translation dictionary (AR and EN)
  const dictionary = {
    AR: {
      'nav.about': 'حول',
      'nav.skills': 'المهارات',
      'nav.projects': 'المشاريع',
      'nav.testimonials': 'الشهادات',
      'nav.contact': 'تواصل',
      'hero.title': 'المبرمج الأسطوري',
      'hero.subtitle': 'مصمم حلول برمجية مبتكرة وسيط موثوق في عالم التكنولوجيا.',
      'hero.cta': 'اعرض مشاريعي',
      'hero.cta2': 'تواصل معي',
      'about.title': 'حول المبرمج الأسطوري',
      'about.text': 'أطمح لبناء أنظمة برمجية بسيطة وذكية تقود العالم نحو تجربة رقمية أكثر سلاسة وفاعلية. أدير فرق صغيرة وتساهم في تصميم وتطوير حلول مفتوحة ومبتكرة.',
      'about.card1': 'خبرة تقنية عميقة',
      'about.card1text': 'خبرة واسعة في هندسة البرمجيات، الأرشيف البرمجي، وتطوير الأنظمة القابلة للتوسع.',
      'about.card2': 'فلسفة عمل شفافة',
      'about.card2text': 'شفافية في التقدير والتواصل مع الفريق والعملاء لضمان نتائج ملموسة.',
      'about.card3': 'هدف مركّز على القيمة',
      'about.card3text': 'تركيز دائم على خلق قيمة حقيقية من خلال حلول قابلة للتنفيذ وسهلة التبني.',
      'skills.title': 'المهارات الأساسية',
      'projects.title': 'مشاريعي',
      'projects.subtitle': 'عينة من المشاريع التي سلمت بنجاح مع نتائج قابلة القياس.',
      'projects.p1': 'نظام إدارة المهام الذكي',
      'projects.p1desc': 'إدارة مشروعات، تتبع تقدم، وتكامل مع أدوات الفريق.',
      'projects.p2': 'بوابة تعلم إلكترونية',
      'projects.p2desc': 'منصة تعلم سحابية بمميزات تفاعل متقدمة وتقييم تلقائي.',
      'projects.p3': 'خدمات مكونات برمجية موجهة',
      'projects.p3desc': 'مكتبات قابلة لإعادة الاستخدام ودعم تكامل بسيط.',
      'testimonials.title': 'شهادات وتوصيات',
      'testimonials.t1': '"مبرمج يحقق النتائج بسرعة وبكفاءة عالية."',
      'testimonials.t2': '"عمل رائع، تواصل ممتاز وجودة عالية في الكود."',
      'contact.title': 'تواصل معي',
      'contact.subtitle': 'يمكنك إرسال رسالة وسأعود إليك في أقرب وقت ممكن.',
      'contact.name': 'الاسم',
      'contact.email': 'البريد الإلكتروني',
      'contact.message': 'الرسالة',
      'contact.send': 'إرسال',
      'footer.note': 'هذا موقع تجريبي بنسخة ذات اتجاهين مع إمكان التبديل بين اللغات.'
    },
    EN: {
      'nav.about': 'About',
      'nav.skills': 'Skills',
      'nav.projects': 'Projects',
      'nav.testimonials': 'Testimonials',
      'nav.contact': 'Contact',
      'hero.title': 'The Legendary Programmer',
      'hero.subtitle': 'Innovative software solutions expert and trusted technical advisor.',
      'hero.cta': 'View Projects',
      'hero.cta2': 'Get in Touch',
      'about.title': 'About the Legendary Programmer',
      'about.text': 'I aim to build simple, smart software systems that guide the world toward a smoother, more efficient digital experience. I lead small teams and contribute to open, innovative solutions.',
      'about.card1': 'Deep Technical Experience',
      'about.card1text': 'Extensive software engineering, architecture, and scalable systems.',
      'about.card2': 'Transparent Working Ethos',
      'about.card2text': 'Clear communication and accountability with teams and clients.',
      'about.card3': 'Value-Driven Focus',
      'about.card3text': 'Constant focus on creating real value through practical, adoptable solutions.',
      'skills.title': 'Core Skills',
      'projects.title': 'Projects',
      'projects.subtitle': 'A curated set of successful projects with measurable outcomes.',
      'projects.p1': 'Smart Task Management System',
      'projects.p1desc': 'Project management, progress tracking, and team integration.',
      'projects.p2': 'Online Learning Gateway',
      'projects.p2desc': 'Cloud-based learning platform with advanced interaction and auto assessments.',
      'projects.p3': 'Programmable Component Services',
      'projects.p3desc': 'Reusable libraries with easy integration support.',
      'testimonials.title': 'Testimonials',
      'testimonials.t1': '"A programmer who delivers quickly with high quality."',
      'testimonials.t2': '"Excellent communication and code quality."',
      'contact.title': 'Contact Me',
      'contact.subtitle': 'Send a message and I will respond as soon as possible.',
      'contact.name': 'Name',
      'contact.email': 'Email',
      'contact.message': 'Message',
      'contact.send': 'Send',
      'footer.note': 'This is a dual-language demo site with language switch capability.'
    }
  };

  // Initialize translations on load
  function applyTranslations(lang){
    const t = dictionary[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(t[key]){ el.textContent = t[key]; }
    });
    // Direction switch on page level if needed
    if(lang === 'AR'){
      document.documentElement.setAttribute('dir','rtl');
    } else {
      document.documentElement.setAttribute('dir','ltr');
    }
  }

  // Language persistence in localStorage
  let currentLang = localStorage.getItem('lang') || 'AR';
  // Initial apply
  applyTranslations(currentLang);

  // Lang switch button toggles between AR and EN and updates text
  langBtn.addEventListener('click', function(){
    currentLang = (currentLang === 'AR') ? 'EN' : 'AR';
    localStorage.setItem('lang', currentLang);
    langBtn.textContent = (currentLang === 'AR') ? 'EN' : 'AR';
    applyTranslations(currentLang);
  });
  // Set initial button label
  langBtn.textContent = (currentLang === 'AR') ? 'EN' : 'AR';

  // Mobile menu toggle
  if(toggle){
    toggle.addEventListener('click', function(){
      const open = navList.style.display === 'flex' || navList.style.display === '';
      navList.style.display = open ? 'none' : 'flex';
      toggle.setAttribute('aria-expanded', (!open).toString());
    });
  }

  // Smooth scrolling for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
    });
  });
})();
