import { defineStore } from 'pinia'

export const useVideosStore = defineStore('videos', {
  state: () => ({
    isLoading: false,
    videos: [],
    selectedVideo: null,
    error: null,
    API_BASE_URL: useRuntimeConfig().public.API_BASE_URL + '/v2',
  }),

  getters: {
    allVideos: (state) => state.videos,
    
    videosByDate: (state) => {
      return [...state.videos].sort((a, b) => new Date(b.date) - new Date(a.date))
    },
    
    getVideoById: (state) => (id) => {
      return state.videos.find(video => video.id === parseInt(id))
    },
    
    getVideoBySlug: (state) => (slug) => {
      return state.videos.find(video => video.slug === slug)
    },
    
    totalVideos: (state) => state.videos.length,
    
    hasVideos: (state) => state.videos.length > 0,

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
    async fetchAllVideos() {
      this.isLoading = true
      this.error = null
      
      try {
        const videos = await $fetch(`${this.API_BASE_URL}/video?_embed`)
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

    async fetchVideoBySlug(slug) {
      this.isLoading = true
      this.error = null
      
      try {
        let video = this.getVideoBySlug(slug)
        
        if (!video) {
          const videos = await $fetch(`${this.API_BASE_URL}/video?slug=${slug}&_embed`)
          if (videos && videos.length > 0) {
            video = videos[0]
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

    async fetchVideoById(id) {
      this.isLoading = true
      this.error = null
      
      try {
        let video = this.getVideoById(id)
        
        if (!video) {
          video = await $fetch(`${this.API_BASE_URL}/video/${id}?_embed`)
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

    clearSelectedVideo() {
      this.selectedVideo = null
    },

    clearError() {
      this.error = null
    },

    clearState() {
      this.videos = []
      this.selectedVideo = null
      this.error = null
      this.isLoading = false
    },

    // Obtener URL del iframe de YouTube
    getYouTubeEmbedUrl(video) {
      if (!video?.acf?.detalles?.url) return null
      
      if (video.acf.detalles.url.includes('/embed/')) {
        return video.acf.detalles.url
      }
      
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
