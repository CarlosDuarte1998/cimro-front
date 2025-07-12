export const useCIMROSEO = () => {
  // Información corporativa de CIMRO
  const corporateInfo = {
    name: 'CIMRO - Centro de Imágenes Radiológicas de Occidente',
    shortName: 'CIMRO',
    location: 'Santa Ana, El Salvador',
    address: '5A Avenida Sur, entre 25 y 27 calle oriente, Urb San Miguelito, Santa Ana',
    phone: '+503 2484-5500',
    email: 'comercializacioncimro@gmail.com',
    whatsapp: '+503 7746-1474',
    website: 'https://cimro.com.sv'
  };

  // Palabras clave SEO principales
  const mainKeywords = [
    'CIMRO',
    'Centro de Imágenes Radiológicas de Occidente',
    'Santa Ana',
    'tomografía computarizada Santa Ana',
    'ultrasonidos Santa Ana',
    'rayos x Santa Ana',
    'mamografía Santa Ana',
    'cardiología Santa Ana',
    'diagnóstico por imágenes El Salvador',
    'radiología occidente El Salvador',
    'centro médico Santa Ana'
  ];

  // Servicios médicos
  const services = [
    'Tomografía Computarizada Multicorte',
    'Cardiología',
    'Ultrasonidos Convencionales y Especiales',
    'Ultrasonidos Ginecológicos y Obstétricos',
    'Rayos X Convencionales y Especiales',
    'Rayos X Dentales',
    'Mamografía'
  ];

  // Aseguradoras afiliadas
  const insuranceCompanies = [
    'SISA',
    'ACSA',
    'Aseguradora MAPFRE',
    'Seguros Azul',
    'Aseguradora ABANK',
    'Aseguradora Panamerican Life',
    'Aseguradora SURA',
    'Atlántida Vida'
  ];

  // Palabras clave Long Tail para SEO
  const longTailKeywords = [
    'tomografía computarizada multicorte Santa Ana',
    'ultrasonidos ginecológicos Santa Ana',
    'rayos x dentales Santa Ana El Salvador',
    'mamografía digital Santa Ana',
    'centro de imágenes radiológicas occidente',
    'estudios médicos con aseguradoras Santa Ana',
    'diagnóstico por imágenes Santa Ana El Salvador',
    'radiología SISA Santa Ana',
    'tomografía MAPFRE Santa Ana',
    'ultrasonidos ACSA El Salvador',
    'diagnóstico Seguros Azul Santa Ana'
  ];

  // Todas las palabras clave combinadas
  const allKeywords = [...mainKeywords, ...longTailKeywords, ...insuranceCompanies];

  // Horarios de atención
  const businessHours = {
    weekdays: 'Lunes a Viernes: 7:30 a.m a 5:30 p.m',
    saturday: 'Sábado: 7:30 a.m. a 1:00 p.m',
    structured: ['Mo-Fr 07:30-17:30', 'Sa 07:30-13:00']
  };

  // Meta descripción base
  const baseDescription = `${corporateInfo.name} en ${corporateInfo.location}. Servicios de diagnóstico por imágenes con tecnología de vanguardia: ${services.slice(0, 3).join(', ')} y más. Aseguradoras afiliadas.`;

  // Generar meta keywords string
  const getKeywordsString = (additionalKeywords: string[] = []) => {
    return [...allKeywords, ...additionalKeywords].join(', ');
  };

  // Generar título SEO
  const generateTitle = (pageTitle: string, includeLocation = true) => {
    const location = includeLocation ? ' Santa Ana' : '';
    return `${pageTitle} | ${corporateInfo.name}${location}`;
  };

  // Generar descripción SEO
  const generateDescription = (customDescription?: string) => {
    return customDescription || baseDescription;
  };

  // Schema.org data para páginas
  const getSchemaData = (pageType: 'homepage' | 'service' | 'about' | 'contact' = 'homepage') => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': 'MedicalOrganization',
      name: corporateInfo.name,
      url: corporateInfo.website,
      logo: `${corporateInfo.website}/logo-horizontal.png`,
      description: baseDescription,
      address: {
        '@type': 'PostalAddress',
        streetAddress: corporateInfo.address,
        addressLocality: 'Santa Ana',
        addressCountry: 'El Salvador'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: corporateInfo.phone,
        contactType: 'customer service',
        email: corporateInfo.email
      },
      openingHours: businessHours.structured,
      medicalSpecialty: services,
      sameAs: [
        'https://www.facebook.com/cimro',
        'https://www.instagram.com/cimrosadecv'
      ]
    };

    return baseSchema;
  };

  return {
    corporateInfo,
    mainKeywords,
    services,
    insuranceCompanies,
    longTailKeywords,
    allKeywords,
    businessHours,
    baseDescription,
    getKeywordsString,
    generateTitle,
    generateDescription,
    getSchemaData
  };
};
