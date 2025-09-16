// Validacion biometrica
// Datos personales
// Datos laborales
// Perfil de inversionista
// Asociar cuenta bancaria
// Expectativa de inversion
// Firmar contrato

export const data = [
  {
    title: "Fondos de Inversión",
    subtitle: "Diversifica tu portafolio con fondos administrados profesionalmente",
    icon: "star",
    descripcion: "Los fondos de inversión son vehículos de inversión que reúnen dinero de múltiples inversionistas para comprar acciones, bonos u otros valores. Son administrados por profesionales y ofrecen diversificación instantánea.",
    posiblesUsos: [
      "Inversión a largo plazo para el retirement",
      "Diversificación sin necesidad de seleccionar acciones individuales",
      "Acceso a mercados internacionales",
      "Inversión automática con aportaciones programadas"
    ]
  },
  {
    title: "Análisis Técnico",
    subtitle: "Herramientas para analizar tendencias y patrones del mercado",
    icon: "line-chart",
    descripcion: "El análisis técnico utiliza gráficos y indicadores estadísticos para predecir movimientos de precios futuros basándose en datos históricos del mercado y volumen de operaciones.",
    posiblesUsos: [
      "Identificar puntos de entrada y salida",
      "Determinar niveles de soporte y resistencia",
      "Evaluar la fuerza de las tendencias",
      "Timing del mercado para operaciones de corto plazo"
    ]
  },
  {
    title: "Bienes Raíces",
    subtitle: "Inversión en propiedades residenciales y comerciales",
    icon: "house.fill",
    descripcion: "La inversión inmobiliaria involucra la compra, posesión, administración, alquiler o venta de bienes raíces con fines de lucro. Es considerada una inversión tangible y tradicionalmente estable.",
    posiblesUsos: [
      "Generar ingresos pasivos por renta",
      "Apreciación de capital a largo plazo",
      "Protección contra la inflación",
      "Diversificación del portafolio de inversión"
    ]
  },
  {
    title: "Análisis Fundamental",
    subtitle: "Evaluación del valor intrínseco de empresas y activos",
    icon: "bar-chart",
    descripcion: "Método de evaluación que examina los fundamentos económicos y financieros de una empresa para determinar su valor intrínseco y potencial de crecimiento futuro.",
    posiblesUsos: [
      "Seleccionar acciones subvaluadas",
      "Evaluar la salud financiera de empresas",
      "Tomar decisiones de inversión a largo plazo",
      "Comparar empresas dentro del mismo sector"
    ]
  },
  {
    title: "REITs",
    subtitle: "Fideicomisos de inversión inmobiliaria para inversores",
    icon: "apartment",
    descripcion: "Los REITs son empresas que poseen, operan o financian bienes raíces que generan ingresos. Permiten invertir en inmuebles sin necesidad de comprar propiedades directamente.",
    posiblesUsos: [
      "Acceder al mercado inmobiliario con menor capital",
      "Diversificar en diferentes tipos de propiedades",
      "Obtener dividendos regulares",
      "Liquidez superior a la inversión directa en inmuebles"
    ]
  },
  {
    title: "Trading de CFDs",
    subtitle: "Contratos por diferencia para operaciones apalancadas",
    icon: "area-chart",
    descripcion: "Los CFDs son instrumentos derivados que permiten especular sobre movimientos de precios sin poseer el activo subyacente, utilizando apalancamiento para amplificar ganancias y pérdidas.",
    posiblesUsos: [
      "Operar con apalancamiento en múltiples mercados",
      "Posiciones cortas para beneficiarse de caídas",
      "Trading intradia y de corto plazo",
      "Acceso a mercados globales desde una plataforma"
    ]
  },
  {
    title: "Commodities",
    subtitle: "Inversión en materias primas y recursos naturales",
    icon: "event-seat",
    descripcion: "Las materias primas son bienes básicos utilizados en comercio que son intercambiables con otros del mismo tipo, incluyendo metales preciosos, energía, agricultura y ganadería.",
    posiblesUsos: [
      "Cobertura contra la inflación",
      "Diversificación del portafolio",
      "Aprovechamiento de ciclos económicos",
      "Protección en tiempos de incertidumbre geopolítica"
    ]
  },
  {
    title: "Inversión Industrial",
    subtitle: "Oportunidades en el sector manufacturero e industrial",
    icon: "factory",
    descripcion: "Inversiones enfocadas en empresas del sector industrial, incluyendo manufactura, construcción, maquinaria y servicios industriales con potencial de crecimiento sostenido.",
    posiblesUsos: [
      "Beneficiarse del crecimiento industrial",
      "Exposición a la automatización y tecnología",
      "Inversiones en infraestructura y desarrollo",
      "Participar en la transformación energética"
    ]
  }
];



export const faqData = [
  {
    id: 1,
    title: "¿Qué riesgo tienen las inversiones?",
    content: "Las inversiones conllevan diferentes niveles de riesgo. Los fondos de renta fija son más conservadores, mientras que las acciones tienen mayor volatilidad pero también mayor potencial de crecimiento a largo plazo."
  },
  {
    id: 2,
    title: "¿Cuál es el monto mínimo para invertir?",
    content: "Puedes comenzar a invertir desde $500 pesos o su equivalente en las demas monedas. Ofrecemos diferentes instrumentos financieros que se adaptan a tu capacidad de inversión inicial."
  },
  {
    id: 3,
    title: "¿Por cuánto tiempo debo invertir?",
    content: "El plazo ideal depende de tus metas financieras. Para objetivos a corto plazo (1-2 años) recomendamos instrumentos conservadores. Para el largo plazo (5+ años), puedes considerar opciones con mayor rendimiento."
  },
  {
    id: 4,
    title: "¿Cómo diversifico mi portafolio?",
    content: "La diversificación reduce el riesgo. Recomendamos combinar diferentes tipos de activos: renta fija (60%), renta variable (30%) y alternativos (10%), ajustado a tu perfil de riesgo."
  },
  {
    id: 5,
    title: "¿Cuándo puedo retirar mi dinero?",
    content: "Tus inversiones están disponibles en cualquier momento. Los fondos de inversión permiten retiros diarios, aunque algunos instrumentos pueden tener periodos de liquidación de 1-3 días hábiles."
  },
  {
    id: 6,
    title: "¿Qué comisiones cobran?",
    content: "Cobramos una comisión de administración anual del 1.5% sobre el saldo promedio mensual. Sin comisiones por apertura, depósitos o retiros anticipados."
  },
  {
    id: 7,
    title: "¿Qué rendimientos puedo esperar?",
    content: "Los rendimientos varían según el instrumento: CETES 10-11% anual, fondos de deuda 8-12%, fondos de renta variable 12-15%. Los rendimientos pasados no garantizan resultados futuros."
  },
  {
    id: 8,
    title: "¿Están protegidas mis inversiones?",
    content: "Estamos regulados por la CNBV y somos miembros del IPAB. Tus inversiones están protegidas hasta por 400,000 UDIS (~$3.2 millones de pesos) por institución."
  },
  {
    id: 9,
    title: "¿Cómo protejo mi dinero de la inflación?",
    content: "Para protegerte de la inflación (4-6% anual), necesitas inversiones que generen rendimientos superiores. Los UDIBONOS y fondos de renta variable históricamente han superado la inflación."
  },
  {
    id: 10,
    title: "¿Cómo empiezo a invertir?",
    content: "1) Completa tu perfil de inversionista, 2) Realiza tu primer depósito desde $500, 3) Selecciona los instrumentos según tu perfil, 4) Monitorea tu portafolio desde la app."
  }
];
