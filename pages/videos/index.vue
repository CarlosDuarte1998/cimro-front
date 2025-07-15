<template>
  <div>
    <!-- Lo      <!-- Header Section -->
      <section class="bg-blue-900 py-16 text-white">
        <div class="container px-4 md:px-6 max-w-[1200px] mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros Videos
          </h1>
          <p class="text-xl text-blue-100 max-w-3xl mx-auto">
            Conoce más sobre CIMRO a través de nuestros videos institucionales, testimonios de pacientes y presentación de servicios médicos especializados.
          </p>
        </div>
      </section> -->
    <section v-if="pending" class="py-16">
      <div class="container px-4 md:px-6 max-w-[1200px] mx-auto">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p class="mt-4 text-gray-600">Cargando videos...</p>
        </div>
      </div>
    </section>

    <!-- Error State -->
    <section v-else-if="error" class="py-16">
      <div class="container px-4 md:px-6 max-w-[1200px] mx-auto">
        <div class="text-center">
          <div class="bg-red-50 border border-red-200 rounded-lg p-6">
            <h1 class="text-2xl font-bold text-red-800 mb-2">Error al cargar videos</h1>
            <p class="text-red-600 mb-4">No se pudieron cargar los videos en este momento.</p>
            <button 
              @click="refresh()"
              class="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Videos Content -->
    <div v-else>
      <!-- Videos Grid -->
      <section class="py-16">
        <div class="container px-4 md:px-6 max-w-[1200px] mx-auto">
          <div v-if="videos && videos.length > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            <div 
              v-for="video in videos" 
              :key="video.id"
              class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <!-- Video Iframe Container -->
              <div class="relative aspect-video bg-gray-100">
                <iframe
                  :src="video.acf.detalles.url"
                  :title="video.title.rendered"
                  class="w-full h-full rounded-t-xl"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  loading="lazy"
                ></iframe>
              </div>

              <!-- Video Info -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-3">
                  {{ video.title.rendered }}
                </h3>
                
                <p class="text-gray-600 mb-4 leading-relaxed">
                  {{ video.acf.detalles.detalles }}
                </p>

                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-500">
                    {{ formatDate(video.date) }}
                  </span>
                  
                  <button 
                    @click="shareVideo(video)"
                    class="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                    </svg>
                    Compartir
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-16">
            <div class="bg-gray-50 rounded-lg p-8">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <h3 class="text-xl font-semibold text-gray-700 mb-2">No hay videos disponibles</h3>
              <p class="text-gray-500">Próximamente tendremos más contenido para ti.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="py-16 bg-gray-50">
        <div class="container px-4 md:px-6 max-w-[800px] mx-auto text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            ¿Necesitas más información?
          </h2>
          <p class="text-lg text-gray-600 mb-8">
            Contáctanos para conocer más sobre nuestros servicios médicos especializados
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink 
              to="/contactanos"
              class="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
            >
              Contactar ahora
            </NuxtLink>
            <NuxtLink 
              to="/servicios"
              class="bg-white text-blue-900 border-2 border-blue-900 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Ver servicios
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>

    <!-- Share Modal -->
    <div 
      v-if="showShareModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeShareModal"
    >
      <div 
        class="bg-white rounded-lg p-6 max-w-md w-full"
        @click.stop
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Compartir video</h3>
          <button 
            @click="closeShareModal"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <p class="text-gray-600 mb-4">{{ selectedVideoForShare?.title.rendered }}</p>
        
        <div class="flex gap-3">
          <a 
            :href="shareUrls.facebook"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          
          <a 
            :href="shareUrls.twitter"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-10 h-10 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          
          <a 
            :href="shareUrls.whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </a>

          <button 
            @click="copyToClipboard"
            class="flex items-center justify-center w-10 h-10 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
          >
            <svg v-if="!copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Store
const videosStore = useVideosStore()

// Reactive state
const showShareModal = ref(false)
const selectedVideoForShare = ref(null)
const copied = ref(false)

// Fetch videos using the store
const { data: videos, error, pending, refresh } = await useLazyAsyncData('videos', async () => {
  try {
    return await videosStore.fetchAllVideos()
  } catch (err) {
    throw err
  }
})

// Computed properties
const shareUrls = computed(() => {
  if (!selectedVideoForShare.value) return {}
  
  const baseUrl = useRuntimeConfig().public.SITE_URL || 'https://cimro.com.sv'
  const videoUrl = `${baseUrl}/videos`
  const title = selectedVideoForShare.value.title.rendered
  const description = selectedVideoForShare.value.acf.detalles.detalles
  
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(videoUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${videoUrl}`)}`
  }
})

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const shareVideo = (video) => {
  selectedVideoForShare.value = video
  showShareModal.value = true
}

const closeShareModal = () => {
  showShareModal.value = false
  selectedVideoForShare.value = null
  copied.value = false
}

const copyToClipboard = async () => {
  try {
    const baseUrl = useRuntimeConfig().public.SITE_URL || 'https://cimro.com.sv'
    const videoUrl = `${baseUrl}/videos`
    await navigator.clipboard.writeText(videoUrl)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err)
  }
}

// SEO
const { setSEO } = useSEO()
setSEO({
  title: 'Videos - CIMRO',
  description: 'Conoce más sobre CIMRO a través de nuestros videos institucionales, testimonios de pacientes y presentación de servicios médicos especializados.',
  keywords: 'CIMRO videos, testimonios pacientes, videos institucionales, servicios médicos',
  image: '/logo-horizontal.png'
})
</script>

<style scoped>
.aspect-video {
  aspect-ratio: 16 / 9;
}

/* Smooth animations for modals */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>