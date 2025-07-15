/**
 * Composable para manejar posts/noticias
 * Proporciona utilidades comunes para trabajar con posts
 */

interface Post {
  id: number
  title: string
  content: string
  excerpt: string
  slug: string
  date: string
  modified: string
  author?: {
    name: string
    id: number
  }
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
  tags?: Array<{
    id: number
    name: string
    slug: string
  }>
  featured_image?: string
  featured_image_large?: string
  featured_image_alt?: string
}

interface ShareUrls {
  facebook: string
  twitter: string
  whatsapp: string
  linkedin: string
  email: string
}

interface SEOMeta {
  title: string
  description: string
  keywords: string
  ogTitle: string
  ogDescription: string
  ogImage?: string
  ogUrl: string
  ogType: string
  articleAuthor?: string
  articlePublishedTime: string
  articleModifiedTime: string
  articleSection?: string
  articleTag: string
}

export const usePosts = () => {
  const postsStore = usePostsStore()

  /**
   * Formatear fecha en español
   */
  const formatDate = (dateString: string, options: Intl.DateTimeFormatOptions = {}) => {
    const defaultOptions: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { ...defaultOptions, ...options })
  }

  /**
   * Limpiar excerpt de HTML y entidades
   */
  const cleanExcerpt = (excerpt: string): string => {
    if (!excerpt) return ''
    
    return excerpt
      .replace(/<[^>]*>/g, '')
      .replace(/&[^;]+;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  /**
   * Calcular tiempo de lectura estimado
   */
  const calculateReadingTime = (content: string, wordsPerMinute: number = 200): number => {
    if (!content) return 0
    
    const wordCount = content
      .replace(/<[^>]*>/g, '')
      .split(/\s+/)
      .length
    
    return Math.ceil(wordCount / wordsPerMinute)
  }

  /**
   * Generar URLs de compartir en redes sociales
   */
  const generateShareUrls = (post: Post, currentUrl: string): ShareUrls => {
    const title = encodeURIComponent(post.title)
    const description = encodeURIComponent(cleanExcerpt(post.excerpt))
    const url = encodeURIComponent(currentUrl)
    
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email: `mailto:?subject=${title}&body=${description}%20${url}`
    }
  }

  /**
   * Buscar posts relacionados
   */
  const findRelatedPosts = (currentPost: Post, limit: number = 3): Post[] => {
    if (!currentPost) return []
    
    const allPosts = postsStore.allPosts as Post[]
    
    // Buscar posts de la misma categoría
    const sameCategoryPosts = allPosts.filter(post => 
      post.id !== currentPost.id && 
      post.categories.some(cat => 
        currentPost.categories.some(currentCat => currentCat.id === cat.id)
      )
    )
    
    // Si hay suficientes posts de la misma categoría, usarlos
    if (sameCategoryPosts.length >= limit) {
      return sameCategoryPosts.slice(0, limit)
    }
    
    // Completar con posts recientes
    const recentPosts = (postsStore.postsByDate as Post[]).filter(post => 
      post.id !== currentPost.id && 
      !sameCategoryPosts.some(scp => scp.id === post.id)
    )
    
    return [...sameCategoryPosts, ...recentPosts].slice(0, limit)
  }

  /**
   * Copiar URL al portapapeles
   */
  const copyToClipboard = async (url: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(url)
      return true
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      return false
    }
  }

  /**
   * Obtener excerpt truncado
   */
  const getTruncatedExcerpt = (excerpt: string, maxLength: number = 150): string => {
    const cleanText = cleanExcerpt(excerpt)
    
    if (cleanText.length <= maxLength) {
      return cleanText
    }
    
    return cleanText.substring(0, maxLength).trim() + '...'
  }

  /**
   * Validar si un post tiene imagen destacada
   */
  const hasFeatureImage = (post: Post): boolean => {
    return !!(post.featured_image || post.featured_image_large)
  }

  /**
   * Obtener categorías únicas de una lista de posts
   */
  const getUniqueCategories = (posts: Post[]) => {
    const categories = new Map()
    
    posts.forEach(post => {
      post.categories.forEach(category => {
        if (!categories.has(category.id)) {
          categories.set(category.id, category)
        }
      })
    })
    
    return Array.from(categories.values())
  }

  /**
   * Filtrar posts por categoría
   */
  const filterPostsByCategory = (posts: Post[], categoryId: number): Post[] => {
    return posts.filter(post => 
      post.categories.some(category => category.id === categoryId)
    )
  }

  /**
   * Buscar posts por término de búsqueda
   */
  const searchPosts = (posts: Post[], searchTerm: string): Post[] => {
    if (!searchTerm) return posts
    
    const term = searchTerm.toLowerCase()
    
    return posts.filter(post => 
      post.title.toLowerCase().includes(term) ||
      cleanExcerpt(post.excerpt).toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term) ||
      post.categories.some(cat => cat.name.toLowerCase().includes(term))
    )
  }

  /**
   * Obtener meta información para SEO
   */
  const getPostSEOMeta = (post: Post, baseUrl: string = ''): SEOMeta => {
    const cleanDescription = getTruncatedExcerpt(post.excerpt, 160)
    
    return {
      title: post.title,
      description: cleanDescription,
      keywords: `CIMRO, ${post.title}, noticias, diagnóstico por imagen, ${post.categories.map(cat => cat.name).join(', ')}`,
      ogTitle: post.title,
      ogDescription: cleanDescription,
      ogImage: post.featured_image_large || post.featured_image,
      ogUrl: `${baseUrl}/noticias/${post.slug}`,
      ogType: 'article',
      articleAuthor: post.author?.name,
      articlePublishedTime: post.date,
      articleModifiedTime: post.modified,
      articleSection: post.categories[0]?.name,
      articleTag: post.categories.map(cat => cat.name).join(', ')
    }
  }

  return {
    // Store
    postsStore,
    
    // Formateo y utilidades
    formatDate,
    cleanExcerpt,
    calculateReadingTime,
    getTruncatedExcerpt,
    
    // Compartir
    generateShareUrls,
    copyToClipboard,
    
    // Búsqueda y filtrado
    findRelatedPosts,
    searchPosts,
    filterPostsByCategory,
    getUniqueCategories,
    
    // Validaciones
    hasFeatureImage,
    
    // SEO
    getPostSEOMeta
  }
}
