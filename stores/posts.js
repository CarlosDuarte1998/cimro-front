import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
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
    // Obtener todos los posts
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
    // Obtener todos los posts con paginación
    async fetchPosts(page = 1, perPage = 10) {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await $fetch(`${this.API_BASE_URL}/posts`, {
          params: {
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
        this.error = 'Error al cargar los posts'
        console.error('Error fetching posts:', error)
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
        
        // Actualizar el post en el array si ya existe
        const existingIndex = this.posts.findIndex(post => post.id === parseInt(id))
        if (existingIndex !== -1) {
          this.posts[existingIndex] = normalizedPost
        } else {
          this.posts.unshift(normalizedPost)
        }
        
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
            slug,
            _embed: true
          }
        })
        
        if (response && response.length > 0) {
          const normalizedPost = this.normalizePost(response[0])
          
          // Actualizar el post en el array si ya existe
          const existingIndex = this.posts.findIndex(post => post.slug === slug)
          if (existingIndex !== -1) {
            this.posts[existingIndex] = normalizedPost
          } else {
            this.posts.unshift(normalizedPost)
          }
          
          return normalizedPost
        } else {
          throw new Error('Post no encontrado')
        }
      } catch (error) {
        this.error = `Error al cargar el post con slug ${slug}`
        console.error('Error fetching post by slug:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Buscar posts por texto
    async searchPosts(searchTerm, page = 1, perPage = 10) {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await $fetch(`${this.API_BASE_URL}/posts`, {
          params: {
            search: searchTerm,
            page,
            per_page: perPage,
            _embed: true
          }
        })
        
        const normalizedPosts = response.map(post => this.normalizePost(post))
        
        if (page === 1) {
          this.posts = normalizedPosts
        } else {
          this.posts.push(...normalizedPosts)
        }
        
        return normalizedPosts
      } catch (error) {
        this.error = 'Error al buscar posts'
        console.error('Error searching posts:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Obtener posts por categoría
    async fetchPostsByCategory(categoryId, page = 1, perPage = 10) {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await $fetch(`${this.API_BASE_URL}/posts`, {
          params: {
            categories: categoryId,
            page,
            per_page: perPage,
            _embed: true
          }
        })
        
        const normalizedPosts = response.map(post => this.normalizePost(post))
        
        if (page === 1) {
          this.posts = normalizedPosts
        } else {
          this.posts.push(...normalizedPosts)
        }
        
        return normalizedPosts
      } catch (error) {
        this.error = `Error al cargar posts de la categoría ${categoryId}`
        console.error('Error fetching posts by category:', error)
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
        author: post._embedded?.author?.[0] || null,
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
      return await this.fetchPosts(nextPage, this.pagination.postsPerPage)
    }
  }
})
