// Composable para gestión de SEO
export const useSEO = () => {
  const config = useRuntimeConfig()
  
  const setSEO = (seoData: {
    title?: string
    description?: string
    keywords?: string
    image?: string
    url?: string
    type?: 'website' | 'article' | 'profile'
  }) => {
    const {
      title = 'CIMRO - Centro de Imágenes Médicas',
      description = 'Centro especializado en diagnóstico por imagen con tecnología de vanguardia en El Salvador.',
      keywords = 'CIMRO, radiología, diagnóstico por imagen, El Salvador',
      image = '/logo-horizontal.png',
      url = config.public.SITE_URL as string,
      type = 'website' as const
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

    // Canonical URL
    useHead({
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

  return {
    setSEO,
    setStructuredData
  }
}
