import { defineStore } from 'pinia'

export const useVideosStore = defineStore('videos', {
  state: () => ({
    isLoading: false,
    videos: [],
    selectedVideo: null,
    error: null,
    API_BASE_URL: 'https://cimro-back-dev.grupomonterroza.com/wp-json/wp',
  }),

  getters: {
    // Obtener todos los videos
    allVideos: (state) => state.videos,
    
    // Videos ordenados por fecha (más recientes primero)
    videosByDate: (state) => {
      return [...state.videos].sort((a, b) => new Date(b.date) - new Date(a.date))
    },
    
    // Buscar video por ID
    getVideoById: (state) => (id) => {
      return state.videos.find(video => video.id === parseInt(id))
    },
    
    // Buscar video por slug
    getVideoBySlug: (state) => (slug) => {
      return state.videos.find(video => video.slug === slug)
    },
    
    // Total de videos
    totalVideos: (state) => state.videos.length,
    
    // Verificar si hay videos
    hasVideos: (state) => state.videos.length > 0,

    // Videos recientes (últimos 3)
    recentVideos: (state) => {
      return [...state.videos]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3)
    },

    // Videos con URL válida de YouTube
    validVideos: (state) => {
      return state.videos.filter(video => 
        video.acf?.detalles?.url && 
        video.acf.detalles.url.includes('youtube.com')
      )
    }
  },

  actions: {
    // Obtener todos los videos
    async fetchAllVideos() {
      this.isLoading = true
      this.error = null
      
      try {
        const videos = await $fetch(`${this.API_BASE_URL}/video`)
        this.videos = videos || []
        return videos
      } catch (error) {
        console.error('Error fetching videos:', error)
        this.error = error.message || 'Error al cargar los videos'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Obtener un video por slug
    async fetchVideoBySlug(slug) {
      this.isLoading = true
      this.error = null
      
      try {
        // Primero intentar encontrar en el estado local
        let video = this.getVideoBySlug(slug)
        
        if (!video) {
          // Si no existe, hacer petición a la API
          const videos = await $fetch(`${this.API_BASE_URL}/video?slug=${slug}`)
          if (videos && videos.length > 0) {
            video = videos[0]
            // Agregar al estado si no existe
            if (!this.getVideoById(video.id)) {
              this.videos.push(video)
            }
          }
        }
        
        if (!video) {
          throw new Error('Video no encontrado')
        }
        
        this.selectedVideo = video
        return video
      } catch (error) {
        console.error('Error fetching video by slug:', error)
        this.error = error.message || 'Error al cargar el video'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Obtener un video por ID
    async fetchVideoById(id) {
      this.isLoading = true
      this.error = null
      
      try {
        // Primero intentar encontrar en el estado local
        let video = this.getVideoById(id)
        
        if (!video) {
          // Si no existe, hacer petición a la API
          video = await $fetch(`${this.API_BASE_URL}/video/${id}`)
          // Agregar al estado si no existe
          if (video && !this.getVideoById(video.id)) {
            this.videos.push(video)
          }
        }
        
        if (!video) {
          throw new Error('Video no encontrado')
        }
        
        this.selectedVideo = video
        return video
      } catch (error) {
        console.error('Error fetching video by ID:', error)
        this.error = error.message || 'Error al cargar el video'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Limpiar video seleccionado
    clearSelectedVideo() {
      this.selectedVideo = null
    },

    // Limpiar errores
    clearError() {
      this.error = null
    },

    // Limpiar el estado
    clearState() {
      this.videos = []
      this.selectedVideo = null
      this.error = null
      this.isLoading = false
    },

    // Obtener URL del iframe de YouTube
    getYouTubeEmbedUrl(video) {
      if (!video?.acf?.detalles?.url) return null
      
      // Si ya es una URL de embed, la devolvemos
      if (video.acf.detalles.url.includes('/embed/')) {
        return video.acf.detalles.url
      }
      
      // Si es una URL normal de YouTube, extraer el ID del video
      const match = video.acf.detalles.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}`
      }
      
      return video.acf.detalles.url
    },

    // Obtener miniatura del video de YouTube
    getYouTubeThumbnail(video, quality = 'maxresdefault') {
      if (!video?.acf?.detalles?.url) return '/placeholder.svg'
      
      const match = video.acf.detalles.url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\n?#]+)/)
      if (match) {
        return `https://img.youtube.com/vi/${match[1]}/${quality}.jpg`
      }
      
      return '/placeholder.svg'
    }
  }
})
