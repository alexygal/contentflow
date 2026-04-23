import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ArrowRight,
  Award,
  BarChart3,
  Brain,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileVideo,
  Globe,
  Instagram,
  Linkedin,
  Lock,
  Menu,
  Play,
  Send,
  Shield,
  Sparkles,
  Star,
  Twitter,
  Upload,
  Users,
  Wand2,
  X,
  Youtube,
  Zap,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type Lang = 'en' | 'fr' | 'es';

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────────────────

const translations = {
  en: {
    nav: {
      features: 'Features',
      pricing: 'Pricing',
      howItWorks: 'How it works',
      faq: 'FAQ',
      cta: 'Start Free Trial',
    },
    hero: {
      badge: '✦ AI Content Operations Manager',
      headline: 'Your AI Content Operations Manager.',
      headlineAccent: 'We handle everything.',
      sub: 'Scripts written. Videos edited. Posts scheduled. Partnerships found. Revenue tracked. You approve. We execute. You focus on creating.',
      placeholder: 'Enter your email address',
      cta: 'Reclaim 20+ Hours Per Week',
      ctaSub: 'No credit card required · 14-day free trial',
    },
    stats: {
      creators: 'Creators',
      creatorNum: '500+',
      saved: 'Hours saved weekly',
      savedNum: '20+',
      videos: 'Partnership revenue facilitated',
      videosNum: '€50M+',
    },
    features: {
      heading: 'One platform to',
      headingAccent: 'manage it all',
      sub: 'ContentFlow is your personal AI operations manager. We handle scripts, videos, emails, partnerships, and analytics—so you can focus purely on creating.',
      items: [
        { title: 'Content Creation', desc: 'Stop staring at a blank page. Our AI writes video scripts, partnership emails, social captions, and brainstorms ideas—all personalized to your voice and brand.' },
        { title: 'Content Operations', desc: 'Upload raw footage. AI edits it to match your style perfectly. Auto-schedules for optimal times. Auto-publishes to every platform simultaneously.' },
        { title: 'Growth & Optimization', desc: 'Weekly analytics reports. Topic recommendations. A/B testing insights. We tell you exactly what works and why, so every upload outperforms the last.' },
        { title: 'Revenue Growth', desc: 'We identify brands that match your audience, generate personalized outreach emails, and track every partnership deal. Turn your content into diversified income.' },
        { title: 'Your Approval, Always', desc: 'Nothing goes live without your green light. Review scripts, edits, emails, and pitches before anything is sent or published. You stay in full control.' },
        { title: 'Learns Your Unique Style', desc: 'Upload 5 past videos. ContentFlow analyzes your colors, pacing, transitions, tone, and topics. Every piece of content it creates matches your identity precisely.' },
      ],
    },
    hiw: {
      heading: 'From idea to revenue,',
      headingAccent: 'fully automated',
      sub: 'Six steps. One AI manager. Zero manual operations.',
      steps: [
        { title: 'We Learn Your Style', desc: 'Upload 5–10 past videos. Our AI analyzes your editing style, tone, topics, and engagement patterns. Setup takes just 30 minutes.' },
        { title: 'We Generate Your Content', desc: 'Pick a topic. ContentFlow writes your script, email templates, and social captions—personalized to your brand voice and audience.' },
        { title: 'You Record the Footage', desc: "That's your job—and the only part no AI can replace. Film your video. The rest is completely handled." },
        { title: 'We Edit and Schedule', desc: 'Upload raw footage. AI edits it matching your exact style. Auto-schedules for the optimal posting time on every connected platform.' },
        { title: 'We Publish and Find Partnerships', desc: 'Content goes live automatically. Meanwhile, AI identifies brand opportunities, generates outreach emails, and queues them for your approval.' },
        { title: 'We Track and Improve', desc: 'Weekly analytics reports land in your inbox. ContentFlow learns what resonates and makes every next piece of content even more targeted.' },
      ],
    },
    pricing: {
      heading: 'Simple, transparent',
      headingAccent: 'pricing',
      sub: 'Choose the plan that matches your ambitions. Upgrade or downgrade anytime.',
      perMonth: '/ month',
      popular: 'Most Popular',
      cta: 'Get Started',
      ctaPop: 'Start Free Trial',
      tiers: [
        {
          name: 'Starter',
          price: '€500',
          desc: 'For creators testing AI content operations. Get started in 30 minutes.',
          features: ['4 scripts per month', 'Video editing (5 videos)', 'Email templates', 'YouTube + 1 platform', 'Analytics dashboard', '7-day revision history'],
        },
        {
          name: 'Growth',
          price: '€2,500',
          desc: 'Complete content operations for creators ready to scale and grow revenue.',
          features: ['Unlimited scripts, captions & emails', 'Unlimited video editing', 'Style AI (matches your exact brand)', 'Auto-schedule & publish (all platforms)', 'Partnership finder (2–3 matches/month)', 'Analytics + growth recommendations', 'Team collaboration', '30-day revision history'],
        },
        {
          name: 'Premium',
          price: '€5,000',
          desc: 'Full content and revenue growth for established creators and agencies.',
          features: ['Everything in Growth, plus:', 'Proactive partnership scouting', 'Deal negotiation assistance', 'Revenue optimization reports', 'Weekly strategy calls', 'Dedicated account manager', 'White-label option', 'API access', 'SLA guarantee'],
        },
      ],
    },
    testimonials: {
      heading: 'Loved by',
      headingAccent: 'top creators',
      sub: 'Join hundreds of creators who let ContentFlow manage their entire content operation.',
      items: [
        { name: 'Marcus Chen', role: 'Tech YouTuber · 512K subscribers', quote: "ContentFlow doesn't just edit my videos—it runs my entire content operation. Scripts, scheduling, even found me 3 brand deals last month worth €8,000. That's on top of saving me 30 hours every single week.", metric: '€8K/month', metricLabel: 'New partnership revenue', rating: 5 },
        { name: 'Sofia Rodriguez', role: 'TikTok Creator · 2.1M followers', quote: "I thought it was just another video editor. Then partnership emails started arriving from brands I'd been trying to reach for years. ContentFlow wrote the pitches, I approved, and collected €5,400 in month one.", metric: '+€5,400', metricLabel: 'First month in new deals', rating: 5 },
        { name: 'Sarah Thompson', role: 'Fitness Creator · 500K YouTube subscribers', quote: "ContentFlow found me 3 brand partnerships last month. That's €12,000 in extra revenue PLUS 25 hours saved every week. The scripts it writes sound exactly like me. I'd pay double.", metric: '€12K extra', metricLabel: 'Partnership revenue, month 1', rating: 5 },
        { name: 'Aisha Okonkwo', role: 'Lifestyle Coach · 890K Instagram followers', quote: "I used to dread Mondays because of content planning. Now I record once a week and ContentFlow handles everything—scripts, editing, scheduling, partnership outreach. My revenue doubled in 3 months.", metric: '2× revenue', metricLabel: 'In just 3 months', rating: 5 },
      ],
    },
    faq: {
      heading: 'Frequently asked',
      headingAccent: 'questions',
      sub: 'Everything you need to know about ContentFlow.',
      items: [
        { q: 'Do you really write scripts for me?', a: 'Yes. Pick a topic, your tone, and target platform (YouTube, TikTok, Blog). Our AI generates a complete, personalized script in under 30 seconds. It learns from your past content so the voice, style, and topic angle are uniquely yours. You approve or ask for a revision before recording.' },
        { q: 'How do you find brand partnerships?', a: 'Our AI analyzes your audience demographics, engagement rates, niche, and content themes to identify brands that are an ideal match. We generate personalized outreach emails for you to review and approve. You finalize the negotiation—we handle everything before that stage.' },
        { q: "What if I don't like the script, edit, or pitch?", a: "Everything requires your approval before going anywhere. Reject it or request specific changes—we revise until it's right. Unlimited revisions on all plans. Nothing is published, sent, or executed without your explicit green light." },
        { q: 'How much partnership revenue can I earn?', a: 'Creators with 50K+ audiences typically see €1,000–5,000/month in new partnership revenue within their first 3 months. Some earn €10,000+ with multiple concurrent deals. Results depend on your niche, engagement rate, and audience alignment with available brands.' },
        { q: 'Do you really handle partnership emails?', a: "Yes. We write the initial outreach emails, follow-ups, and proposal summaries—all personalized to the specific brand. You review every message before it's sent. You never miss an opportunity, and you never write a cold email from scratch again." },
        { q: 'How does the AI learn my editing style?', a: 'Upload 5–10 of your existing videos during onboarding. Our AI analyzes cut timing, color grading, transitions, music choices, pacing, and visual composition—building a personalized style model in 30 minutes. Every video we edit after that matches your aesthetic precisely.' },
        { q: 'Is this really automated or are humans involved?', a: "Script writing, video editing, scheduling, and partnership matching are 100% AI. The critical difference: YOU always review and approve before anything is executed. Your judgment is the final filter. Our AI does the work; you make the decisions." },
        { q: 'How long before I see results?', a: 'Day 1: Scripts generated 10× faster. Week 1: First AI-edited video published to all platforms. Month 1: 4+ videos live, first partnership opportunities identified. Month 3: Measurable channel growth, partnership revenue flowing in, 20+ hours saved weekly.' },
      ],
    },
    ctaSection: {
      heading: 'Ready to reclaim',
      headingAccent: '20+ hours per week?',
      sub: 'Join 500+ creators who let ContentFlow manage their entire content operation.',
      placeholder: 'Enter your email address',
      cta: 'Start Your Free Trial',
      ctaSub: 'No credit card required · Cancel anytime · 14-day free trial',
      trust: ['Trusted by 500+ creators', 'SOC 2 Compliant', 'GDPR Ready'],
    },
    footer: {
      desc: 'Your AI content operations manager. Scripts, videos, partnerships, and analytics—handled automatically so you focus on creating.',
      product: 'Product',
      company: 'Company',
      legal: 'Legal',
      links: {
        features: 'Features', pricing: 'Pricing', hiw: 'How it Works', changelog: 'Changelog',
        about: 'About Us', blog: 'Blog', careers: 'Careers', contact: 'Contact',
        privacy: 'Privacy Policy', terms: 'Terms of Service', cookies: 'Cookie Policy',
      },
      copy: '© 2026 ContentFlow. All rights reserved.',
    },
  },
  fr: {
    nav: { features: 'Fonctionnalités', pricing: 'Tarifs', howItWorks: 'Comment ça marche', faq: 'FAQ', cta: 'Essai gratuit' },
    hero: {
      badge: '✦ Plateforme IA de gestion de contenu',
      headline: 'Votre gestionnaire de contenu piloté par IA.',
      headlineAccent: 'Nous gérons tout.',
      sub: "Scripts rédigés. Vidéos montées. Posts programmés. Partenariats trouvés. Revenus suivis. Vous approuvez. Nous exécutons. Vous créez.",
      placeholder: 'Entrez votre adresse e-mail',
      cta: 'Récupérez 20h+ par semaine',
      ctaSub: 'Sans carte bancaire · 14 jours gratuits',
    },
    stats: { creators: 'Créateurs', creatorNum: '500+', saved: 'Heures économisées / sem.', savedNum: '20+', videos: 'Revenus partenariats facilités', videosNum: '€50M+' },
    features: {
      heading: 'Une plateforme pour',
      headingAccent: 'tout gérer',
      sub: "ContentFlow est votre gestionnaire IA personnel. Nous gérons scripts, vidéos, emails, partenariats et analytics—pour que vous vous consacriez à la création.",
      items: [
        { title: 'Création de contenu', desc: "Stop à la page blanche. Notre IA rédige vos scripts vidéo, emails de partenariat, captions—tout personnalisé à votre voix et votre marque." },
        { title: 'Opérations contenu', desc: "Téléchargez vos rushes. L'IA les monte dans votre style. Auto-programmation aux meilleurs moments. Publication automatique sur toutes les plateformes." },
        { title: 'Croissance & Optimisation', desc: "Rapports analytics hebdomadaires. Recommandations de sujets. Tests A/B. Nous vous disons exactement ce qui fonctionne et pourquoi." },
        { title: 'Croissance des revenus', desc: "Nous identifions les marques qui correspondent à votre audience, rédigeons des emails de prospection personnalisés et suivons chaque deal de partenariat." },
        { title: 'Votre approbation, toujours', desc: "Rien ne part sans votre feu vert. Révisez scripts, montages, emails et pitches avant toute publication ou envoi. Vous gardez le contrôle total." },
        { title: 'Apprend votre style unique', desc: "Téléchargez 5 vidéos passées. ContentFlow analyse vos couleurs, rythme, transitions, ton et sujets. Chaque contenu créé correspond parfaitement à votre identité." },
      ],
    },
    hiw: {
      heading: "De l'idée au revenu,",
      headingAccent: 'entièrement automatisé',
      sub: 'Six étapes. Un gestionnaire IA. Zéro opération manuelle.',
      steps: [
        { title: 'Nous apprenons votre style', desc: "Téléchargez 5 à 10 vidéos passées. Notre IA analyse votre style, ton, sujets et patterns d'engagement. Installation en 30 minutes." },
        { title: 'Nous générons votre contenu', desc: "Choisissez un sujet. ContentFlow rédige votre script, vos emails et captions—personnalisés à votre voix de marque et votre audience." },
        { title: 'Vous filmez', desc: "C'est votre rôle—la seule partie qu'aucune IA ne peut remplacer. Filmez votre vidéo. Le reste est entièrement pris en charge." },
        { title: 'Nous montons et programmons', desc: "Téléchargez vos rushes. L'IA monte dans votre style exact. Auto-programmation au meilleur moment sur chaque plateforme connectée." },
        { title: 'Nous publions et cherchons des partenariats', desc: "Le contenu est mis en ligne automatiquement. L'IA identifie des opportunités de marques et génère des emails de prospection pour votre approbation." },
        { title: 'Nous suivons et améliorons', desc: "Rapports analytics hebdomadaires dans votre boîte mail. ContentFlow apprend ce qui résonne et rend chaque prochain contenu encore plus ciblé." },
      ],
    },
    pricing: {
      heading: 'Tarifs simples et',
      headingAccent: 'transparents',
      sub: 'Choisissez le plan qui correspond à vos ambitions. Mettez à niveau ou réduisez à tout moment.',
      perMonth: '/ mois',
      popular: 'Le plus populaire',
      cta: 'Commencer',
      ctaPop: 'Essai gratuit',
      tiers: [
        { name: 'Débutant', price: '€500', desc: 'Pour les créateurs qui testent les opérations de contenu IA. Démarrez en 30 minutes.', features: ['4 scripts par mois', 'Montage vidéo (5 vidéos)', "Modèles d'email", 'YouTube + 1 plateforme', 'Tableau de bord analytics', 'Historique 7 jours'] },
        { name: 'Croissance', price: '€2 500', desc: 'Opérations contenu complètes pour les créateurs prêts à scaler et générer des revenus.', features: ['Scripts, captions & emails illimités', 'Montage vidéo illimité', 'Style AI (correspond à votre marque)', 'Auto-programmation & publication', 'Finder de partenariats (2–3/mois)', 'Analytics + recommandations', 'Collaboration en équipe', 'Historique 30 jours'] },
        { name: 'Premium', price: '€5 000', desc: 'Contenu et croissance des revenus pour créateurs établis et agences.', features: ['Tout du plan Croissance, plus:', 'Scouting proactif de partenariats', 'Assistance à la négociation', "Rapports d'optimisation des revenus", 'Appels stratégie hebdomadaires', 'Manager dédié', 'Option white-label', 'Accès API', 'Garantie SLA'] },
      ],
    },
    testimonials: {
      heading: 'Adoré par les',
      headingAccent: 'meilleurs créateurs',
      sub: "Rejoignez des centaines de créateurs qui laissent ContentFlow gérer toute leur opération contenu.",
      items: [
        { name: 'Marcus Chen', role: 'YouTubeur Tech · 512K abonnés', quote: "ContentFlow ne monte pas juste mes vidéos—il gère toute mon opération contenu. Scripts, programmation, il m'a même trouvé 3 deals de marques le mois dernier valant €8 000, en plus de me faire économiser 30h par semaine.", metric: '€8K/mois', metricLabel: 'Nouveaux revenus partenariats', rating: 5 },
        { name: 'Sofia Rodriguez', role: 'Créatrice TikTok · 2,1M abonnés', quote: "Je pensais que c'était juste un autre éditeur vidéo. Puis les emails de partenariat ont commencé à arriver de marques que j'essayais d'atteindre depuis des années. ContentFlow a écrit les pitches, j'ai approuvé, j'ai encaissé €5 400 le premier mois.", metric: '+€5 400', metricLabel: 'Premier mois en deals', rating: 5 },
        { name: 'Sarah Thompson', role: 'Créatrice Fitness · 500K abonnés YouTube', quote: "ContentFlow m'a trouvé 3 partenariats de marques le mois dernier. C'est €12 000 de revenus supplémentaires PLUS 25h économisées chaque semaine. Les scripts qu'il écrit me ressemblent exactement. Je paierais le double.", metric: '€12K extra', metricLabel: 'Revenus partenariats, mois 1', rating: 5 },
        { name: 'Aisha Okonkwo', role: 'Coach Lifestyle · 890K abonnés Instagram', quote: "Je redoutais les lundis à cause de la planification de contenu. Maintenant je filme une fois par semaine et ContentFlow gère tout—scripts, montage, programmation, prospection. Mes revenus ont doublé en 3 mois.", metric: '2× revenus', metricLabel: 'En 3 mois', rating: 5 },
      ],
    },
    faq: {
      heading: 'Questions',
      headingAccent: 'fréquentes',
      sub: 'Tout ce que vous devez savoir sur ContentFlow.',
      items: [
        { q: 'Rédigez-vous vraiment mes scripts ?', a: "Oui. Choisissez un sujet, votre ton et la plateforme cible. Notre IA génère un script complet et personnalisé en moins de 30 secondes. Il apprend de votre contenu passé pour que la voix, le style et l'angle soient uniquement les vôtres. Vous approuvez ou demandez une révision." },
        { q: 'Comment trouvez-vous les partenariats de marques ?', a: "Notre IA analyse votre audience, taux d'engagement, niche et thèmes de contenu pour identifier les marques idéales. Nous générons des emails de prospection personnalisés pour votre approbation. Vous finalisez la négociation—nous gérons tout ce qui précède." },
        { q: "Que faire si je n'aime pas le script, le montage ou le pitch ?", a: "Tout nécessite votre approbation. Rejetez-le ou demandez des modifications—nous révisons jusqu'à ce que ce soit parfait. Révisions illimitées sur tous les plans. Rien n'est publié ou envoyé sans votre feu vert explicite." },
        { q: 'Combien de revenus de partenariat puis-je gagner ?', a: "Les créateurs avec 50K+ audiences voient généralement €1 000–5 000/mois de nouveaux revenus de partenariat dans leurs 3 premiers mois. Certains gagnent €10 000+ avec plusieurs deals simultanés. Les résultats dépendent de votre niche et taux d'engagement." },
        { q: 'Gérez-vous vraiment les emails de partenariat ?', a: "Oui. Nous rédigeons les emails de prospection initiale, les relances et résumés de propositions—tous personnalisés à la marque spécifique. Vous révisez chaque message avant envoi. Vous ne manquez plus jamais une opportunité." },
        { q: "Comment l'IA apprend-elle mon style de montage ?", a: "Téléchargez 5 à 10 vidéos existantes lors de l'onboarding. Notre IA analyse le timing des coupes, l'étalonnage, les transitions, les choix musicaux et la composition visuelle—construisant un modèle de style personnalisé en 30 minutes." },
        { q: 'Est-ce vraiment automatisé ou y a-t-il des humains ?', a: "Rédaction de scripts, montage vidéo, programmation et matching de partenariats sont 100% IA. La différence cruciale : VOUS révisez et approuvez toujours avant toute exécution. Notre IA fait le travail ; vous prenez les décisions." },
        { q: 'Quand verrai-je des résultats ?', a: "Jour 1 : Scripts générés 10× plus vite. Semaine 1 : Première vidéo IA publiée. Mois 1 : 4+ vidéos en ligne, premières opportunités de partenariat identifiées. Mois 3 : Croissance mesurable, revenus de partenariat, 20h+ économisées par semaine." },
      ],
    },
    ctaSection: {
      heading: 'Prêt à récupérer',
      headingAccent: '20h+ par semaine ?',
      sub: 'Rejoignez 500+ créateurs qui laissent ContentFlow gérer toute leur opération contenu.',
      placeholder: 'Entrez votre adresse e-mail',
      cta: "Démarrer l'essai gratuit",
      ctaSub: 'Sans carte bancaire · Annulez à tout moment · 14 jours gratuits',
      trust: ['Approuvé par 500+ créateurs', 'Conforme SOC 2', 'Prêt RGPD'],
    },
    footer: {
      desc: "Votre gestionnaire de contenu IA. Scripts, vidéos, partenariats et analytics—gérés automatiquement pour que vous vous consacriez à la création.",
      product: 'Produit', company: 'Entreprise', legal: 'Légal',
      links: { features: 'Fonctionnalités', pricing: 'Tarifs', hiw: 'Comment ça marche', changelog: 'Changelog', about: 'À propos', blog: 'Blog', careers: 'Carrières', contact: 'Contact', privacy: 'Confidentialité', terms: "Conditions d'utilisation", cookies: 'Cookies' },
      copy: '© 2026 ContentFlow. Tous droits réservés.',
    },
  },
  es: {
    nav: { features: 'Características', pricing: 'Precios', howItWorks: 'Cómo funciona', faq: 'FAQ', cta: 'Prueba gratuita' },
    hero: {
      badge: '✦ Plataforma IA de operaciones de contenido',
      headline: 'Tu gestor de operaciones de contenido con IA.',
      headlineAccent: 'Nosotros gestionamos todo.',
      sub: 'Scripts redactados. Videos editados. Posts programados. Partnerships encontrados. Ingresos rastreados. Tú apruebas. Nosotros ejecutamos. Tú creas.',
      placeholder: 'Ingresa tu correo electrónico',
      cta: 'Recupera 20+ horas por semana',
      ctaSub: 'Sin tarjeta de crédito · 14 días gratis',
    },
    stats: { creators: 'Creadores', creatorNum: '500+', saved: 'Horas ahorradas / sem.', savedNum: '20+', videos: 'Ingresos de partnerships facilitados', videosNum: '€50M+' },
    features: {
      heading: 'Una plataforma para',
      headingAccent: 'gestionarlo todo',
      sub: 'ContentFlow es tu gestor de operaciones IA personal. Manejamos scripts, videos, emails, partnerships y analytics—para que te concentres en crear.',
      items: [
        { title: 'Creación de contenido', desc: 'Deja de mirar la página en blanco. Nuestra IA escribe scripts, emails de partnership, captions—todo personalizado a tu voz y marca.' },
        { title: 'Operaciones de contenido', desc: 'Sube metraje sin editar. La IA lo edita con tu estilo. Autoprograma para los mejores momentos. Autopublica en todas las plataformas.' },
        { title: 'Crecimiento y optimización', desc: 'Informes analytics semanales. Recomendaciones de temas. Sugerencias A/B. Te decimos exactamente qué funciona y por qué.' },
        { title: 'Crecimiento de ingresos', desc: 'Identificamos marcas que encajan con tu audiencia, generamos emails de prospección personalizados y rastreamos cada deal de partnership.' },
        { title: 'Tu aprobación, siempre', desc: 'Nada se publica sin tu visto bueno. Revisa scripts, ediciones, emails y pitches antes de cualquier publicación o envío. Control total.' },
        { title: 'Aprende tu estilo único', desc: 'Sube 5 videos pasados. ContentFlow analiza tus colores, ritmo, transiciones, tono y temas. Cada contenido que crea coincide precisamente con tu identidad.' },
      ],
    },
    hiw: {
      heading: 'De la idea a los ingresos,',
      headingAccent: 'completamente automatizado',
      sub: 'Seis pasos. Un gestor IA. Cero operaciones manuales.',
      steps: [
        { title: 'Aprendemos tu estilo', desc: 'Sube 5–10 videos pasados. Nuestra IA analiza tu estilo, tono, temas y patrones de engagement. Configuración en 30 minutos.' },
        { title: 'Generamos tu contenido', desc: 'Elige un tema. ContentFlow escribe tu script, plantillas de email y captions—personalizados a tu voz de marca y audiencia.' },
        { title: 'Tú grabas el metraje', desc: "Ese es tu trabajo—la única parte que ninguna IA puede reemplazar. Filma tu video. El resto está completamente gestionado." },
        { title: 'Editamos y programamos', desc: 'Sube metraje sin editar. La IA edita con tu estilo exacto. Autoprogramación para el momento óptimo en cada plataforma conectada.' },
        { title: 'Publicamos y buscamos partnerships', desc: 'El contenido se publica automáticamente. Mientras tanto, la IA identifica oportunidades de marca y genera emails de prospección para tu aprobación.' },
        { title: 'Rastreamos y mejoramos', desc: 'Informes analytics semanales en tu bandeja. ContentFlow aprende lo que resuena y hace cada próximo contenido aún más dirigido.' },
      ],
    },
    pricing: {
      heading: 'Precios simples y',
      headingAccent: 'transparentes',
      sub: 'Elige el plan que coincida con tus ambiciones. Actualiza o baja de nivel en cualquier momento.',
      perMonth: '/ mes',
      popular: 'Más Popular',
      cta: 'Empezar',
      ctaPop: 'Prueba Gratuita',
      tiers: [
        { name: 'Inicial', price: '€500', desc: 'Para creadores probando operaciones de contenido IA. Empieza en 30 minutos.', features: ['4 scripts por mes', 'Edición de video (5 videos)', 'Plantillas de email', 'YouTube + 1 plataforma', 'Panel de analíticas', 'Historial de 7 días'] },
        { name: 'Crecimiento', price: '€2.500', desc: 'Operaciones de contenido completas para creadores listos para escalar y crecer ingresos.', features: ['Scripts, captions & emails ilimitados', 'Edición de video ilimitada', 'Style AI (coincide con tu marca exacta)', 'Autoprogramación y publicación', 'Finder de partnerships (2–3/mes)', 'Analytics + recomendaciones de crecimiento', 'Colaboración en equipo', 'Historial de 30 días'] },
        { name: 'Premium', price: '€5.000', desc: 'Contenido y crecimiento de ingresos para creadores establecidos y agencias.', features: ['Todo en Crecimiento, más:', 'Scouting proactivo de partnerships', 'Asistencia en negociación', 'Informes de optimización de ingresos', 'Llamadas de estrategia semanales', 'Gestor dedicado', 'Opción white-label', 'Acceso API', 'Garantía SLA'] },
      ],
    },
    testimonials: {
      heading: 'Amado por los',
      headingAccent: 'mejores creadores',
      sub: 'Únete a cientos de creadores que dejan que ContentFlow gestione toda su operación de contenido.',
      items: [
        { name: 'Marcus Chen', role: 'YouTuber de Tecnología · 512K suscriptores', quote: "ContentFlow no solo edita mis videos—gestiona toda mi operación de contenido. Scripts, programación, incluso me encontró 3 deals de marca el mes pasado por €8.000, además de ahorrarme 30 horas cada semana.", metric: '€8K/mes', metricLabel: 'Nuevos ingresos de partnerships', rating: 5 },
        { name: 'Sofia Rodriguez', role: 'Creadora de TikTok · 2.1M seguidores', quote: "Pensé que era otro editor de video. Luego empezaron a llegar los emails de partnership de marcas que llevaba años intentando contactar. ContentFlow escribió los pitches, yo aprobé y recaudé €5.400 el primer mes.", metric: '+€5.400', metricLabel: 'Primer mes en deals', rating: 5 },
        { name: 'Sarah Thompson', role: 'Creadora Fitness · 500K suscriptores YouTube', quote: "ContentFlow me encontró 3 partnerships de marca el mes pasado. Son €12.000 en ingresos extra MÁS 25 horas ahorradas cada semana. Los scripts que escribe suenan exactamente como yo. Pagaría el doble.", metric: '€12K extra', metricLabel: 'Ingresos de partnerships, mes 1', rating: 5 },
        { name: 'Aisha Okonkwo', role: 'Coach Lifestyle · 890K seguidores Instagram', quote: "Odiaba los lunes por la planificación de contenido. Ahora grabo una vez por semana y ContentFlow gestiona todo—scripts, edición, programación, prospección. Mis ingresos se duplicaron en 3 meses.", metric: '2× ingresos', metricLabel: 'En 3 meses', rating: 5 },
      ],
    },
    faq: {
      heading: 'Preguntas',
      headingAccent: 'frecuentes',
      sub: 'Todo lo que necesitas saber sobre ContentFlow.',
      items: [
        { q: '¿Realmente escribís mis scripts?', a: 'Sí. Elige un tema, tu tono y plataforma objetivo. Nuestra IA genera un script completo y personalizado en menos de 30 segundos. Aprende de tu contenido pasado para que la voz, estilo y ángulo sean únicamente tuyos. Apruebas o pides revisión antes de grabar.' },
        { q: '¿Cómo encontráis partnerships de marca?', a: 'Nuestra IA analiza tu demografía de audiencia, tasas de engagement, nicho y temas de contenido para identificar marcas ideales. Generamos emails de prospección personalizados para tu aprobación. Tú finalizas la negociación—nosotros gestionamos todo lo anterior.' },
        { q: '¿Qué pasa si no me gusta el script, edición o pitch?', a: 'Todo requiere tu aprobación antes de ir a cualquier lado. Recházalo o pide cambios específicos—revisamos hasta que esté bien. Revisiones ilimitadas en todos los planes. Nada se publica o envía sin tu visto bueno explícito.' },
        { q: '¿Cuántos ingresos de partnership puedo ganar?', a: 'Creadores con 50K+ audiencias típicamente ven €1.000–5.000/mes en nuevos ingresos de partnership en sus primeros 3 meses. Algunos ganan €10.000+ con múltiples deals simultáneos. Los resultados dependen de tu nicho y engagement.' },
        { q: '¿Realmente gestionáis los emails de partnership?', a: 'Sí. Escribimos los emails de prospección inicial, seguimientos y resúmenes de propuestas—todos personalizados a la marca específica. Revisas cada mensaje antes de ser enviado. Nunca más pierdes una oportunidad.' },
        { q: '¿Cómo aprende la IA mi estilo de edición?', a: 'Sube 5–10 de tus videos existentes durante el onboarding. Nuestra IA analiza timing de cortes, graduación de color, transiciones, elecciones musicales y composición visual—construyendo un modelo de estilo en 30 minutos.' },
        { q: '¿Está realmente automatizado o hay humanos?', a: 'Escritura de scripts, edición de video, programación y matching de partnerships son 100% IA. La diferencia crucial: TÚ siempre revisas y apruebas antes de cualquier ejecución. Nuestra IA hace el trabajo; tú tomas las decisiones.' },
        { q: '¿Cuándo veré resultados?', a: 'Día 1: Scripts generados 10× más rápido. Semana 1: Primer video IA publicado. Mes 1: 4+ videos en vivo, primeras oportunidades de partnership. Mes 3: Crecimiento medible, ingresos de partnership, 20+ horas ahorradas semanalmente.' },
      ],
    },
    ctaSection: {
      heading: '¿Listo para recuperar',
      headingAccent: '20+ horas por semana?',
      sub: 'Únete a 500+ creadores que dejan que ContentFlow gestione toda su operación de contenido.',
      placeholder: 'Ingresa tu correo electrónico',
      cta: 'Iniciar prueba gratuita',
      ctaSub: 'Sin tarjeta de crédito · Cancela cuando quieras · 14 días gratis',
      trust: ['Confiado por 500+ creadores', 'Compatible con SOC 2', 'Listo para GDPR'],
    },
    footer: {
      desc: 'Tu gestor de operaciones de contenido IA. Scripts, videos, partnerships y analytics—gestionados automáticamente para que te concentres en crear.',
      product: 'Producto', company: 'Empresa', legal: 'Legal',
      links: { features: 'Características', pricing: 'Precios', hiw: 'Cómo Funciona', changelog: 'Cambios', about: 'Sobre Nosotros', blog: 'Blog', careers: 'Carreras', contact: 'Contacto', privacy: 'Privacidad', terms: 'Términos', cookies: 'Cookies' },
      copy: '© 2026 ContentFlow. Todos los derechos reservados.',
    },
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// I18N CONTEXT
// ─────────────────────────────────────────────────────────────────────────────

type T = typeof translations['en'];
interface I18nCtx { lang: Lang; setLang: (l: Lang) => void; t: T }

const I18nContext = createContext<I18nCtx>({ lang: 'en', setLang: () => {}, t: translations.en });
const useI18n = () => useContext(I18nContext);

// ─────────────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────────────

function useScrollAnimation(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCounter(target: number, active: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function Fade({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function GradientButton({ text, sub, size = 'md' }: { text: string; sub?: string; size?: 'md' | 'lg' }) {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <button
        className={`group relative overflow-hidden rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] ${size === 'lg' ? 'px-8 py-4 text-base' : 'px-6 py-3.5 text-sm'}`}
        style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 55%, #9333ea 85%, #EC4899 100%)' }}
      >
        <span className="relative z-10 flex items-center gap-2">
          {text}
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #7c3aed 55%, #db2777 100%)' }} />
      </button>
      {sub && <p className="text-xs text-slate-500">{sub}</p>}
    </div>
  );
}

function SectionHeader({ pre, heading, accent, sub }: { pre?: string; heading: string; accent: string; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-16">
      {pre && <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">{pre}</p>}
      <h2 className="text-3xl md:text-5xl font-bold text-slate-100 leading-tight mb-4">
        {heading}{' '}
        <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">{accent}</span>
      </h2>
      {sub && <p className="text-slate-400 text-lg leading-relaxed">{sub}</p>}
    </div>
  );
}

function EmailCapture({ placeholder, cta, sub }: { placeholder: string; cta: string; sub?: string }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('Please enter a valid email address.'); return; }
    setErr('');
    setDone(true);
  };

  if (done) return (
    <div className="flex items-center gap-3 rounded-xl bg-green-500/20 border border-green-500/40 px-6 py-4 max-w-md">
      <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
      <p className="text-green-300 font-medium text-sm">You're on the list! We'll be in touch very soon.</p>
    </div>
  );

  return (
    <form onSubmit={submit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="email" value={email}
          onChange={e => { setEmail(e.target.value); setErr(''); }}
          placeholder={placeholder}
          className="flex-1 rounded-xl px-4 py-3.5 text-sm bg-[#1e293b] border border-slate-600 text-white placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
        />
        <button
          type="submit"
          className="group shrink-0 relative overflow-hidden rounded-xl px-5 py-3.5 font-semibold text-white text-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 55%, #EC4899 100%)' }}
        >
          <span className="relative z-10 flex items-center gap-2">{cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></span>
        </button>
      </div>
      {err && <p className="mt-2 text-red-400 text-xs">{err}</p>}
      {sub && !err && <p className="mt-2 text-slate-500 text-xs">{sub}</p>}
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

function Navigation() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scroll = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const langs: { code: Lang; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  const navLinks = [
    { label: t.nav.features, id: 'features' },
    { label: t.nav.pricing, id: 'pricing' },
    { label: t.nav.howItWorks, id: 'how-it-works' },
    { label: t.nav.faq, id: 'faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0F172A]/95 backdrop-blur-md shadow-2xl border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563EB, #EC4899)' }}>
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">ContentFlow</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scroll(l.id)} className="text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium">
                {l.label}
              </button>
            ))}
          </div>

          {/* Right: lang + CTA */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-white/5"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:block">{langs.find(l => l.code === lang)?.label}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 rounded-xl bg-[#1E293B] border border-white/10 shadow-2xl overflow-hidden z-50">
                  {langs.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors ${lang === l.code ? 'bg-blue-600/20 text-blue-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                    >
                      <span>{l.flag}</span><span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => scroll('cta')}
              className="hidden sm:flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03]"
              style={{ background: 'linear-gradient(135deg, #2563EB, #EC4899)' }}
            >
              {t.nav.cta}
            </button>

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-slate-400 hover:text-white">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0F172A]/98 border-t border-white/5 px-4 py-4 flex flex-col gap-2">
          {navLinks.map(l => (
            <button key={l.id} onClick={() => scroll(l.id)} className="text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              {l.label}
            </button>
          ))}
          <button onClick={() => scroll('cta')} className="mt-2 rounded-xl px-4 py-3 text-sm font-semibold text-white text-center" style={{ background: 'linear-gradient(135deg, #2563EB, #EC4899)' }}>
            {t.nav.cta}
          </button>
        </div>
      )}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────

function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Atmospheric orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #EC4899 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', filter: 'blur(100px)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div className="flex flex-col gap-7">
            <Fade>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-600/15 border border-blue-500/30 px-4 py-2 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-blue-300 text-xs font-semibold tracking-wide">{t.hero.badge}</span>
              </div>
            </Fade>

            <Fade delay={100}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
                <span className="text-slate-100">{t.hero.headline}</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">{t.hero.headlineAccent}</span>
              </h1>
            </Fade>

            <Fade delay={200}>
              <p className="text-slate-400 text-lg leading-relaxed max-w-lg">{t.hero.sub}</p>
            </Fade>

            <Fade delay={300}>
              <EmailCapture placeholder={t.hero.placeholder} cta={t.hero.cta} sub={t.hero.ctaSub} />
            </Fade>

            <Fade delay={400}>
              <div className="flex flex-wrap gap-4 pt-2">
                {[
                  { icon: <Users className="w-4 h-4 text-blue-400" />, text: t.stats.creatorNum + ' ' + t.stats.creators },
                  { icon: <Play className="w-4 h-4 text-pink-400" />, text: t.stats.videosNum + ' ' + t.stats.videos },
                  { icon: <Zap className="w-4 h-4 text-violet-400" />, text: t.stats.savedNum + ' ' + t.stats.saved },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                    {s.icon}
                    <span>{s.text}</span>
                  </div>
                ))}
              </div>
            </Fade>
          </div>

          {/* Right: mock editor visual */}
          <Fade delay={200} className="hidden lg:block">
            <div className="relative">
              {/* Main card */}
              <div className="rounded-2xl border border-white/10 bg-[#1E293B]/80 backdrop-blur-sm overflow-hidden shadow-2xl">
                {/* Toolbar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#0F172A]/60 border-b border-white/5">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/70" /><div className="w-3 h-3 rounded-full bg-yellow-500/70" /><div className="w-3 h-3 rounded-full bg-green-500/70" /></div>
                  <div className="flex-1 mx-4 rounded-md bg-white/5 h-5 flex items-center px-3"><span className="text-slate-600 text-xs">contentflow.ai/editor</span></div>
                </div>
                {/* Video preview area */}
                <div className="relative bg-[#0F172A] aspect-video flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)' }} />
                  {/* Grid lines */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                  {/* Center play button */}
                  <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-2 border-blue-500/50" style={{ background: 'rgba(37,99,235,0.2)' }}>
                    <Play className="w-7 h-7 text-blue-400 fill-blue-400 ml-1" />
                  </div>
                  {/* AI processing indicator */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-1.5 border border-white/10">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="w-1 rounded-full bg-blue-400 animate-bounce" style={{ height: `${8 + i * 4}px`, animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                    <span className="text-blue-300 text-xs font-medium">AI editing...</span>
                  </div>
                </div>
                {/* Timeline */}
                <div className="p-4 space-y-2">
                  {[
                    { label: 'Cut', color: 'bg-blue-500', w: 'w-3/4' },
                    { label: 'Color', color: 'bg-violet-500', w: 'w-1/2' },
                    { label: 'Audio', color: 'bg-pink-500', w: 'w-5/6' },
                    { label: 'FX', color: 'bg-emerald-500', w: 'w-2/3' },
                  ].map((track, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-slate-600 text-xs w-10 shrink-0">{track.label}</span>
                      <div className="flex-1 h-5 rounded bg-white/3 overflow-hidden">
                        <div className={`h-full ${track.w} ${track.color} opacity-60 rounded`} />
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-600 text-xs">00:00</span>
                    <div className="flex items-center gap-2 text-xs text-green-400 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Ready to publish
                    </div>
                    <span className="text-slate-600 text-xs">12:34</span>
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <div className="absolute -top-6 -right-6 rounded-xl bg-[#1E293B] border border-white/10 px-4 py-3 shadow-xl">
                <div className="text-2xl font-bold text-white">5min</div>
                <div className="text-xs text-slate-400">vs 4hr manual</div>
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-xl bg-[#1E293B] border border-white/10 px-4 py-3 shadow-xl">
                <div className="flex items-center gap-1.5 mb-0.5">
                  {[0,1,2,3,4].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
                </div>
                <div className="text-xs text-slate-400">98.7% satisfaction</div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURES
// ─────────────────────────────────────────────────────────────────────────────

const featureIcons = [
  <Zap className="w-6 h-6 text-blue-400" />,
  <Sparkles className="w-6 h-6 text-violet-400" />,
  <BarChart3 className="w-6 h-6 text-pink-400" />,
  <Globe className="w-6 h-6 text-emerald-400" />,
  <Award className="w-6 h-6 text-orange-400" />,
  <Brain className="w-6 h-6 text-cyan-400" />,
];

const featureIconBg = ['bg-blue-500/15', 'bg-violet-500/15', 'bg-pink-500/15', 'bg-emerald-500/15', 'bg-orange-500/15', 'bg-cyan-500/15'];

function FeaturesSection() {
  const { t } = useI18n();
  return (
    <section id="features" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Fade>
          <SectionHeader heading={t.features.heading} accent={t.features.headingAccent} sub={t.features.sub} />
        </Fade>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.items.map((f, i) => (
            <Fade key={i} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-7 hover:bg-white/6 hover:border-white/15 hover:scale-[1.02] transition-all duration-300 cursor-default">
                <div className={`w-12 h-12 rounded-xl ${featureIconBg[i]} flex items-center justify-center mb-5`}>
                  {featureIcons[i]}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────────────────────────────────────

const stepIcons = [
  <Upload className="w-5 h-5" />,
  <FileVideo className="w-5 h-5" />,
  <Wand2 className="w-5 h-5" />,
  <CheckCircle className="w-5 h-5" />,
  <Send className="w-5 h-5" />,
];

function HowItWorksSection() {
  const { t } = useI18n();
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-[#080E1A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Fade>
          <SectionHeader heading={t.hiw.heading} accent={t.hiw.headingAccent} sub={t.hiw.sub} />
        </Fade>
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-blue-600 via-violet-600 to-pink-600 hidden md:block" style={{ left: '2rem' }} />
          <div className="space-y-8">
            {t.hiw.steps.map((step, i) => (
              <Fade key={i} delay={i * 100}>
                <div className="flex gap-6 md:gap-8 items-start group">
                  <div className={`relative z-10 shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 group-hover:scale-110 ${i === 2 ? 'text-white shadow-lg shadow-blue-500/40' : 'text-slate-300 bg-[#1E293B] border border-white/10'}`}
                    style={i === 2 ? { background: 'linear-gradient(135deg, #2563EB, #7c3aed)' } : {}}>
                    {stepIcons[i]}
                  </div>
                  <div className="flex-1 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6 group-hover:bg-white/6 group-hover:border-white/15 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Step {i + 1}</span>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRICING
// ─────────────────────────────────────────────────────────────────────────────

function PricingSection() {
  const { t } = useI18n();
  const tiers = t.pricing.tiers;

  return (
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #2563EB 0%, transparent 60%)' }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Fade>
          <SectionHeader heading={t.pricing.heading} accent={t.pricing.headingAccent} sub={t.pricing.sub} />
        </Fade>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, i) => {
            const isHighlighted = i === 1;
            return (
              <Fade key={i} delay={i * 100}>
                <div className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  isHighlighted
                    ? 'bg-[#1a2744] border-2 border-blue-500 shadow-[0_0_60px_rgba(37,99,235,0.3)] scale-[1.03] z-10'
                    : 'bg-white/3 border border-white/10 hover:bg-white/5 hover:border-white/20 hover:scale-[1.01]'
                }`}>
                  {isHighlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="rounded-full px-4 py-1.5 text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #2563EB, #EC4899)' }}>
                        ✦ {t.pricing.popular}
                      </div>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-white font-bold text-xl mb-1">{tier.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{tier.desc}</p>
                  </div>
                  <div className="flex items-end gap-1 mb-8">
                    <span className={`text-5xl font-extrabold ${isHighlighted ? 'text-white' : 'text-slate-100'}`}>{tier.price}</span>
                    <span className="text-slate-400 text-sm mb-2">{t.pricing.perMonth}</span>
                  </div>
                  <button
                    className={`w-full rounded-xl py-3.5 font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mb-7 ${
                      isHighlighted ? 'text-white' : 'bg-white/8 border border-white/15 text-white hover:bg-white/15'
                    }`}
                    style={isHighlighted ? { background: 'linear-gradient(135deg, #2563EB, #EC4899)' } : {}}
                  >
                    {isHighlighted ? t.pricing.ctaPop : t.pricing.cta}
                  </button>
                  <ul className="space-y-3">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isHighlighted ? 'text-blue-400' : 'text-slate-500'}`} />
                        <span className={isHighlighted ? 'text-slate-200' : 'text-slate-400'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────────────────────

const avatarColors = ['bg-blue-600', 'bg-pink-600', 'bg-violet-600', 'bg-emerald-600'];

function TestimonialsSection() {
  const { t } = useI18n();
  const items = t.testimonials.items;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % items.length), 5500);
    return () => clearInterval(id);
  }, [items.length]);

  const prev = () => setActive(p => (p - 1 + items.length) % items.length);
  const next = () => setActive(p => (p + 1) % items.length);

  const item = items[active];
  const initials = item.name.split(' ').map(n => n[0]).join('');

  return (
    <section className="py-24 lg:py-32 bg-[#080E1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Fade>
          <SectionHeader heading={t.testimonials.heading} accent={t.testimonials.headingAccent} sub={t.testimonials.sub} />
        </Fade>
        <Fade delay={100}>
          <div className="relative rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm p-8 md:p-12">
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-slate-200 text-lg md:text-xl leading-relaxed mb-8 italic">
              "{item.quote}"
            </blockquote>

            {/* Author + metric */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${avatarColors[active]} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                  {initials}
                </div>
                <div>
                  <div className="text-white font-semibold">{item.name}</div>
                  <div className="text-slate-400 text-sm">{item.role}</div>
                </div>
              </div>
              <div className="rounded-xl bg-blue-600/15 border border-blue-500/25 px-5 py-3 text-center sm:text-left">
                <div className="text-white font-bold text-xl">{item.metric}</div>
                <div className="text-blue-300 text-xs">{item.metricLabel}</div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-300 ${i === active ? 'w-8 h-2 bg-blue-500' : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={prev} className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={next} className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${open ? 'border-blue-500/40 bg-blue-600/5' : 'border-white/8 bg-white/3 hover:border-white/15'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-white font-medium text-sm md:text-base">{q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-blue-400' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

function FAQSection() {
  const { t } = useI18n();
  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Fade>
          <SectionHeader heading={t.faq.heading} accent={t.faq.headingAccent} sub={t.faq.sub} />
        </Fade>
        <div className="space-y-3">
          {t.faq.items.map((item, i) => (
            <Fade key={i} delay={i * 60}>
              <FAQItem q={item.q} a={item.a} />
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA SECTION
// ─────────────────────────────────────────────────────────────────────────────

function CTASection() {
  const { t } = useI18n();
  const s = t.ctaSection;
  const trustIcons = [<Shield className="w-4 h-4" />, <Lock className="w-4 h-4" />, <Users className="w-4 h-4" />];

  return (
    <section id="cta" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Gradient bg */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.15) 0%, transparent 65%)' }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Fade>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-600/15 border border-blue-500/30 px-4 py-2 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold">Limited early access spots remaining</span>
          </div>
        </Fade>
        <Fade delay={80}>
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            <span className="text-slate-100">{s.heading} </span>
            <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">{s.headingAccent}</span>
          </h2>
        </Fade>
        <Fade delay={160}>
          <p className="text-slate-400 text-lg mb-10">{s.sub}</p>
        </Fade>
        <Fade delay={240}>
          <div className="flex justify-center mb-6">
            <EmailCapture placeholder={s.placeholder} cta={s.cta} sub={s.ctaSub} />
          </div>
        </Fade>
        <Fade delay={320}>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            {s.trust.map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-slate-600">{trustIcons[i]}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────

function Footer() {
  const { t } = useI18n();
  const f = t.footer;

  const cols = [
    { heading: f.product, links: [{ label: f.links.features, href: '#features' }, { label: f.links.pricing, href: '#pricing' }, { label: f.links.hiw, href: '#how-it-works' }, { label: f.links.changelog, href: '#' }] },
    { heading: f.company, links: [{ label: f.links.about, href: '#' }, { label: f.links.blog, href: '#' }, { label: f.links.careers, href: '#' }, { label: f.links.contact, href: '#' }] },
    { heading: f.legal, links: [{ label: f.links.privacy, href: '#' }, { label: f.links.terms, href: '#' }, { label: f.links.cookies, href: '#' }] },
  ];

  const socials = [
    { icon: <Twitter className="w-4 h-4" />, href: '#' },
    { icon: <Youtube className="w-4 h-4" />, href: '#' },
    { icon: <Instagram className="w-4 h-4" />, href: '#' },
    { icon: <Linkedin className="w-4 h-4" />, href: '#' },
  ];

  return (
    <footer className="bg-[#080E1A] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563EB, #EC4899)' }}>
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">ContentFlow</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-5 max-w-xs">{f.desc}</p>
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <a key={i} href={s.href} className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col, ci) => (
            <div key={ci}>
              <h4 className="text-white font-semibold text-sm mb-4">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map((link, li) => (
                  <li key={li}>
                    <a href={link.href} className="text-slate-500 text-sm hover:text-slate-300 transition-colors duration-200">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">{f.copy}</p>
          <p className="text-slate-700 text-xs">Made with ♥ for creators worldwide</p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const bl = navigator.language.split('-')[0];
      if (bl === 'fr') return 'fr';
      if (bl === 'es') return 'es';
    } catch {}
    return 'en';
  });

  const t = translations[lang] as unknown as typeof translations['en'];

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      <div className="min-h-screen bg-[#0F172A] text-slate-100 antialiased" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <Navigation />
        <main>
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </I18nContext.Provider>
  );
}
