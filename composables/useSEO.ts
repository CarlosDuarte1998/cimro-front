// Composable para gestión de SEO y accesibilidad
export const useSEO = () => {
  const config = useRuntimeConfig()
  
  const setSEO = (seoData: {
    title?: string
    description?: string
    keywords?: string
    image?: string
    url?: string
    type?: 'website' | 'article' | 'profile'
    lang?: string
  }) => {
    const {
      title = 'CIMRO - Centro de Imágenes Médicas',
      description = 'Centro especializado en diagnóstico por imagen con tecnología de vanguardia en El Salvador.',
      keywords = 'CIMRO, radiología, diagnóstico por imagen, El Salvador',
      image = '/logo-horizontal.png',
      url = config.public.SITE_URL as string,
      type = 'website' as const,
      lang = 'es'
    } = seoData

    useSeoMeta({
      title,
      description,
      keywords,
      ogTitle: title,
      ogDescription: description,
      ogImage: image.startsWith('http') ? image : `${config.public.SITE_URL}${image}`,
      ogUrl: url,
      ogType: type,
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: image.startsWith('http') ? image : `${config.public.SITE_URL}${image}`,
      twitterCard: 'summary_large_image'
    })

    // Canonical URL y atributos de accesibilidad
    useHead({
      htmlAttrs: {
        lang
      },
      link: [
        { rel: 'canonical', href: url }
      ]
    })
  }

  const setStructuredData = (data: any) => {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(data)
        }
      ]
    })
  }

  const setMedicalOrganizationStructuredData = (orgData: {
    name: string
    description: string
    address: {
      streetAddress: string
      addressLocality: string
      addressCountry: string
    }
    telephone?: string
    email?: string
    url?: string
    sameAs?: string[]
    medicalSpecialty?: string[]
  }) => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'MedicalOrganization',
      name: orgData.name,
      description: orgData.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: orgData.address.streetAddress,
        addressLocality: orgData.address.addressLocality,
        addressCountry: orgData.address.addressCountry
      },
      telephone: orgData.telephone,
      email: orgData.email,
      url: orgData.url || config.public.SITE_URL,
      sameAs: orgData.sameAs || [],
      medicalSpecialty: orgData.medicalSpecialty || [
        'Radiología',
        'Resonancia Magnética',
        'Tomografía Computarizada',
        'Ultrasonido',
        'Rayos X'
      ],
      openingHours: [
        'Mo-Fr 08:00-20:00',
        'Sa 08:00-14:00'
      ]
    }

    setStructuredData(structuredData)
  }

  return {
    setSEO,
    setStructuredData,
    setMedicalOrganizationStructuredData
  }
}
