import { defineStore } from 'pinia'

export const useRazonSocialStore = defineStore('razonSocial', {
  state: () => ({
    isLoading: false,
    posts: [],
    selectedPost: null,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalPosts: 0,
      postsPerPage: 10
    },
    API_BASE_URL: useRuntimeConfig().public.API_BASE_URL + '/v2',
  }),

  getters: {
    // Obtener todos los posts de razón social
    allPosts: (state) => state.posts,
    
    // Posts ordenados por fecha (más recientes primero)
    postsByDate: (state) => {
      return [...state.posts].sort((a, b) => new Date(b.date) - new Date(a.date))
    },
    
    // Posts con imagen destacada
    postsWithFeaturedImage: (state) => {
      return state.posts.filter(post => post.featured_image)
    },
    
    // Buscar post por ID
    getPostById: (state) => (id) => {
      return state.posts.find(post => post.id === parseInt(id))
    },
    
    // Buscar post por slug
    getPostBySlug: (state) => (slug) => {
      return state.posts.find(post => post.slug === slug)
    },
    
    // Total de posts
    totalPosts: (state) => state.posts.length,
    
    // Verificar si hay posts
    hasPosts: (state) => state.posts.length > 0,

    // Posts recientes (últimos 5)
    recentPosts: (state) => {
      return [...state.posts]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
    }
  },

  actions: {
    // Obtener posts de razón social por categoría slug
    async fetchRazonSocialPosts(page = 1, perPage = 100) {
      this.isLoading = true
      this.error = null
      
      try {
        // Obtener las categorías de WordPress (no las categorías de servicios)
        const categoriesResponse = await $fetch(`${this.API_BASE_URL}/categories`)
        
        // Buscar la categoría "razon-social" por slug
        const razonSocialCategory = categoriesResponse.find(cat => cat.slug === 'razon-social')
        
        if (!razonSocialCategory) {
          throw new Error('No se encontró la categoría "razon-social"')
        }
        
        // Obtener posts de esta categoría específica
        const response = await $fetch(`${this.API_BASE_URL}/posts`, {
          params: {
            categories: razonSocialCategory.id,
            page,
            per_page: perPage,
            _embed: true
          }
        })
        
        // Normalizar los datos de los posts
        const normalizedPosts = response.map(post => this.normalizePost(post))
        
        if (page === 1) {
          this.posts = normalizedPosts
        } else {
          this.posts.push(...normalizedPosts)
        }
        
        // Actualizar información de paginación
        this.pagination.currentPage = page
        this.pagination.postsPerPage = perPage
        
        return normalizedPosts
      } catch (error) {
        this.error = 'Error al cargar los posts de razón social'
        console.error('Error fetching razon social posts:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Obtener un post específico por ID
    async fetchPostById(id) {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await $fetch(`${this.API_BASE_URL}/posts/${id}?_embed`)
        const normalizedPost = this.normalizePost(response)
        this.selectedPost = normalizedPost
        return normalizedPost
      } catch (error) {
        this.error = `Error al cargar el post con ID ${id}`
        console.error('Error fetching post by ID:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Obtener un post específico por slug
    async fetchPostBySlug(slug) {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await $fetch(`${this.API_BASE_URL}/posts`, {
          params: {
            slug: slug,
            _embed: true
          }
        })
        
        if (response.length === 0) {
          throw new Error(`No se encontró el post con slug: ${slug}`)
        }
        
        const normalizedPost = this.normalizePost(response[0])
        this.selectedPost = normalizedPost
        return normalizedPost
      } catch (error) {
        this.error = `Error al cargar el post con slug ${slug}`
        console.error('Error fetching post by slug:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Buscar posts de razón social
    async searchPosts(searchTerm) {
      this.isLoading = true
      this.error = null
      
      try {
        // Obtener las categorías de WordPress (no las categorías de servicios)
        const categoriesResponse = await $fetch(`${this.API_BASE_URL}/categories`)
        
        // Buscar la categoría "razon-social" por slug
        const razonSocialCategory = categoriesResponse.find(cat => cat.slug === 'razon-social')
        
        if (!razonSocialCategory) {
          throw new Error('No se encontró la categoría "razon-social"')
        }
        
        const response = await $fetch(`${this.API_BASE_URL}/posts`, {
          params: {
            search: searchTerm,
            categories: razonSocialCategory.id,
            per_page: 50,
            _embed: true
          }
        })
        
        const normalizedPosts = response.map(post => this.normalizePost(post))
        this.posts = normalizedPosts
        
        return normalizedPosts
      } catch (error) {
        this.error = 'Error al buscar posts de razón social'
        console.error('Error searching razon social posts:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Normalizar datos del post
    normalizePost(post) {
      return {
        id: post.id,
        title: post.title?.rendered || 'Sin título',
        content: post.content?.rendered || '',
        excerpt: post.excerpt?.rendered || '',
        slug: post.slug,
        date: post.date,
        modified: post.modified,
        author: { name: 'CIMRO', id: 1 },
        categories: post._embedded?.['wp:term']?.[0] || [],
        tags: post._embedded?.['wp:term']?.[1] || [],
        link: post.link,
        status: post.status,
        // Obtener la imagen destacada
        featured_image: post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium?.source_url || 
                       post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
        featured_image_large: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
        featured_image_alt: post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || 
                           post._embedded?.['wp:featuredmedia']?.[0]?.title?.rendered || 'Imagen del post',
        // Metadatos adicionales
        meta: post.meta || {},
        acf: post.acf || {},
        class_list: post.class_list || []
      }
    },

    // Seleccionar un post
    selectPost(post) {
      this.selectedPost = post
    },

    // Limpiar post seleccionado
    clearSelectedPost() {
      this.selectedPost = null
    },

    // Limpiar errores
    clearError() {
      this.error = null
    },

    // Reiniciar el store
    resetStore() {
      this.isLoading = false
      this.posts = []
      this.selectedPost = null
      this.error = null
      this.pagination = {
        currentPage: 1,
        totalPages: 1,
        totalPosts: 0,
        postsPerPage: 10
      }
    },

    // Cargar más posts (paginación infinita)
    async loadMorePosts() {
      const nextPage = this.pagination.currentPage + 1
      return await this.fetchRazonSocialPosts(nextPage, this.pagination.postsPerPage)
    }
  }
})