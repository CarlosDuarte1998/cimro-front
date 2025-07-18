import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    isLoading: false,
    categories: [],
    selectedCategory: null,
    error: null,
    API_BASE_URL: useRuntimeConfig().public.API_BASE_URL+ '/v2',
  }),

  getters: {
    // Obtener todas las categorías
    allCategories: (state) => state.categories,
    
    // Categorías ordenadas por nombre
    categoriesByName: (state) => {
      return [...state.categories].sort((a, b) => a.name.localeCompare(b.name))
    },
    
    // Categorías que tienen servicios (count > 0)
    categoriesWithServices: (state) => {
      return state.categories.filter(category => category.count > 0)
    },
    
    // Buscar categoría por ID
    getCategoryById: (state) => (id) => {
      return state.categories.find(category => category.id === id)
    },
    
    // Buscar categoría por slug
    getCategoryBySlug: (state) => (slug) => {
      return state.categories.find(category => category.slug === slug)
    },
    
    // Total de categorías
    totalCategories: (state) => state.categories.length,
    
    // Verificar si hay categorías
    hasCategories: (state) => state.categories.length > 0
  },

  actions: {
    // Obtener todas las categorías
    async fetchCategories() {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await $fetch(`${this.API_BASE_URL}/categoria`)
        this.categories = response
        return response
      } catch (error) {
        this.error = 'Error al cargar las categorías'
        console.error('Error fetching categories:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Obtener una categoría específica por ID
    async fetchCategoryById(id) {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await $fetch(`${this.API_BASE_URL}/categoria/${id}`)
        return response
      } catch (error) {
        this.error = `Error al cargar la categoría con ID ${id}`
        console.error('Error fetching category by ID:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Obtener servicios de una categoría específica
    async fetchCategoryServices(categoryId) {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await $fetch(`${this.API_BASE_URL}/servicio?categoria=${categoryId}&_embed`)
        
        // Validar que la respuesta sea un array
        if (!Array.isArray(response)) {
          console.warn('La respuesta de servicios no es un array:', response)
          return []
        }
        
        // Normalizar los datos de los servicios
        const normalizedServices = response.map(service => ({
          ...service,
          // Asegurar que los campos críticos existan
          id: service.id || Math.random().toString(36),
          title: service.title || { rendered: service.name || 'Sin título' },
          excerpt: service.excerpt || { rendered: service.description || '' },
          slug: service.slug || service.id || 'sin-slug',
          // Obtener la imagen destacada del servicio
          featured_image: service._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium?.source_url || 
                         service._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
          featured_image_large: service._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
          featured_image_alt: service._embedded?.['wp:featuredmedia']?.[0]?.alt_text || 
                             service._embedded?.['wp:featuredmedia']?.[0]?.title?.rendered || 'Imagen del servicio'
        }))
        
        return normalizedServices
      } catch (error) {
        this.error = `Error al cargar los servicios de la categoría ${categoryId}`
        console.error('Error fetching category services:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Seleccionar una categoría
    selectCategory(category) {
      this.selectedCategory = category
    },

    // Limpiar categoría seleccionada
    clearSelectedCategory() {
      this.selectedCategory = null
    },

    // Buscar categorías por texto
    searchCategories(searchTerm) {
      if (!searchTerm) return this.categories
      
      const term = searchTerm.toLowerCase()
      return this.categories.filter(category => 
        category.name.toLowerCase().includes(term) ||
        category.description.toLowerCase().includes(term) ||
        category.slug.toLowerCase().includes(term)
      )
    },

    // Obtener categorías padre (parent = 0)
    getParentCategories() {
      return this.categories.filter(category => category.parent === 0)
    },

    // Obtener subcategorías de una categoría padre
    getSubCategories(parentId) {
      return this.categories.filter(category => category.parent === parentId)
    },

    // Limpiar errores
    clearError() {
      this.error = null
    },

    // Reiniciar el store
    resetStore() {
      this.isLoading = false
      this.categories = []
      this.selectedCategory = null
      this.error = null
    }
  }
})