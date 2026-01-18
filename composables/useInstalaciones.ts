interface DetalleSucursal {
  titulo: string
  descripcion: string
  imagen: number
  imagen_url?: string
}

interface Sucursal {
  nombre: string,
  direccion: string,
  detalles: DetalleSucursal[]
}

interface Instalacion {
  id: number
  title: {
    rendered: string
  }
  slug: string
  date: string
  modified: string
  acf: {
    sucursales: {
      sucursal: Sucursal[]
    }
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
      media_details: {
        sizes: {
          large?: { source_url: string }
          medium?: { source_url: string }
          full: { source_url: string }
        }
      }
    }>
  }
}

interface ShareUrls {
  facebook: string
  twitter: string
  whatsapp: string
  linkedin: string
  email: string
}

export const useInstalaciones = () => {
  const API_URL = 'https://admin-cimro.gunssoft.tech/wp-json/wp/v2'

  const fetchInstalaciones = async (): Promise<Instalacion[]> => {
    return await $fetch<Instalacion[]>(`${API_URL}/instalacion?_embed`)
  }

  const fetchInstalacionBySlug = async (slug: string): Promise<Instalacion | null> => {
    const response = await $fetch<Instalacion[]>(`${API_URL}/instalacion?slug=${slug}&_embed`)
    return response?.[0] || null
  }

  const getImageUrl = async (
    imageId: number,
    size: 'thumbnail' | 'medium' | 'large' | 'full' = 'large'
  ): Promise<string> => {
    try {
      if (!imageId) return '/placeholder.svg'
      const response = await $fetch<any>(`${API_URL}/media/${imageId}`)
      if (response?.media_details?.sizes?.[size]) {
        return response.media_details.sizes[size].source_url
      }
      return response?.source_url || '/placeholder.svg'
    } catch {
      return '/placeholder.svg'
    }
  }

  /**
   * Procesar instalación con sucursales y detalles
   */
  const processInstalacion = async (instalacion: Instalacion) => {
    const sucursales = instalacion.acf?.sucursales?.sucursal || []

    const sucursalesProcesadas: Sucursal[] = []

    for (const s of sucursales) {
      const detallesProcesados: DetalleSucursal[] = []

      for (const d of s.detalles || []) {
        const imagenUrl = await getImageUrl(d.imagen, 'large')
        detallesProcesados.push({
          ...d,
          imagen_url: imagenUrl
        })
      }

      sucursalesProcesadas.push({
        nombre: s.nombre,
        direccion: s.direccion,
        detalles: detallesProcesados
      })
    }

    return {
      id: instalacion.id,
      title: instalacion.title.rendered,
      slug: instalacion.slug,
      date: instalacion.date,
      modified: instalacion.modified,
      sucursales: sucursalesProcesadas
    }
  }

  const formatDate = (dateString: string, options: Intl.DateTimeFormatOptions = {}) => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return new Date(dateString).toLocaleDateString('es-ES', { ...defaultOptions, ...options })
  }

  const generateShareUrls = (instalacion: any, currentUrl: string): ShareUrls => {
    const title = encodeURIComponent(instalacion.title)
    const url = encodeURIComponent(currentUrl)

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email: `mailto:?subject=${title}&body=${url}`
    }
  }

  const findRelatedInstalaciones = (currentInstalacion: any, limit: number = 3): any[] => {
    const allInstalaciones = useState<any[]>('allInstalaciones', () => [])
    return allInstalaciones.value
      .filter(inst => inst.id !== currentInstalacion.id)
      .slice(0, limit)
  }

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }

  const getInstalacionSEOMeta = (instalacion: any, siteUrl: string) => {
    const { corporateInfo, getKeywordsString, generateDescription } = useCIMROSEO()

    const title = `${instalacion.title} | Instalaciones ${corporateInfo.shortName}`
    const description = generateDescription(`Conoce nuestras instalaciones en ${corporateInfo.name}`)
    const pageUrl = `${siteUrl}/instalaciones/${instalacion.slug}`

    return {
      title,
      description,
      keywords: getKeywordsString([
        instalacion.title,
        'instalaciones CIMRO',
        'infraestructura médica'
      ]),
      ogTitle: title,
      ogDescription: description,
      ogUrl: pageUrl,
      ogType: 'article',
      articlePublishedTime: instalacion.date,
      articleModifiedTime: instalacion.modified
    }
  }

  return {
    fetchInstalaciones,
    fetchInstalacionBySlug,
    getImageUrl,
    processInstalacion,
    formatDate,
    generateShareUrls,
    findRelatedInstalaciones,
    copyToClipboard,
    getInstalacionSEOMeta
  }
}
