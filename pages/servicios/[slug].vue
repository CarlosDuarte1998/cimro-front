<template>
    <section class="bg-blue-900 py-16 text-white">
        <div class="container px-4 md:px-6">
            <div class="mx-auto max-w-3xl text-center">
                <div v-if="categoriesStore.isLoading" class="animate-pulse">
                    <div class="h-8 bg-blue-800 rounded w-3/4 mx-auto mb-4"></div>
                    <div class="h-4 bg-blue-800 rounded w-1/2 mx-auto"></div>
                </div>
                <div v-else-if="currentCategory">
                    <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        {{ currentCategory.name }}
                    </h1>
                    <p v-if="currentCategory.description" class="mt-4 text-blue-100 md:text-xl">
                        {{ currentCategory.description }}
                    </p>
                </div>
                <div v-else>
                    <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Categoría no encontrada
                    </h1>
                    <p class="mt-4 text-blue-100 md:text-xl">
                        La categoría que buscas no existe o ha sido removida.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Content -->
    <section class="py-16">
        <div class="container max-w-[1300px] mx-auto px-4 md:px-6">
            <!-- Loading State -->
            <div v-if="categoriesStore.isLoading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="n in 6" :key="n" class="rounded-lg border border-gray-200 bg-white shadow-sm animate-pulse overflow-hidden">
                    <div class="h-48 bg-gray-300"></div>
                    <div class="p-6">
                        <div class="h-6 bg-gray-300 rounded mb-2"></div>
                        <div class="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="categoriesStore.error" class="text-center py-12">
                <div class="text-red-600 mb-4">
                    <svg class="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    <p class="text-lg font-semibold">Error al cargar los servicios</p>
                    <p class="text-sm text-gray-500">{{ categoriesStore.error }}</p>
                </div>
                <button @click="loadServices" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Reintentar
                </button>
            </div>

            <!-- Empty State -->
            <div v-else-if="!services || services.length === 0" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p class="text-lg font-semibold text-gray-900">No hay servicios disponibles</p>
                <p class="text-gray-500">Esta categoría no tiene servicios configurados.</p>
                <NuxtLink to="/servicios" class="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Ver todas las categorías
                </NuxtLink>
            </div>

            <!-- Services Grid -->
            <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <NuxtLink 
                    v-for="service in services" 
                    :key="service.id" 
                    :to="`/servicios/${route.params.slug}/${service.slug}`"
                    class="service-card rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer block"
                >
                    <!-- Service Image -->
                    <div class="h-48 overflow-hidden relative">
                        <img 
                            v-if="service.featured_image" 
                            :src="service.featured_image" 
                            :alt="service.featured_image_alt || service.title?.rendered || 'Imagen del servicio'"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            @error="handleImageError"
                        >
                        <div v-else class="image-placeholder w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <svg class="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <!-- Placeholder oculto para errores de carga -->
                        <div class="image-placeholder w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center absolute inset-0" style="display: none;">
                            <svg class="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                    </div>
                    
                    <!-- Service Content -->
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-4">{{ service.title?.rendered || service.title || 'Sin título' }}</h3>
                        <div class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                            Ver detalles →
                        </div>
                    </div>
                </NuxtLink>
            </div>

            <!-- Back to Services -->
            <div class="text-center mt-12">
                <NuxtLink to="/servicios" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Volver a todas las categorías
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup>
const route = useRoute()
const categoriesStore = useCategoriesStore()
const servicesStore = useServicesStore()

// Variables reactivas
const services = ref([])

// Computed para obtener la categoría actual
const currentCategory = computed(() => {
  return categoriesStore.getCategoryBySlug(route.params.slug)
})

// Función para cargar servicios
const loadServices = async () => {
  if (!currentCategory.value) return
  
  try {
    const response = await categoriesStore.fetchCategoryServices(currentCategory.value.id)
    // Validar que la respuesta sea un array y tenga datos válidos
    if (Array.isArray(response)) {
      services.value = response.map(service => ({
        ...service,
        // Asegurar que title existe
        title: service.title || { rendered: service.name || 'Sin título' },
        // Asegurar que excerpt existe
        excerpt: service.excerpt || { rendered: service.description || '' },
        // Asegurar que slug existe
        slug: service.slug || service.id || 'sin-slug',
        // Asegurar que la imagen existe (ya viene del store)
        featured_image: service.featured_image || null,
        featured_image_large: service.featured_image_large || null,
        featured_image_alt: service.featured_image_alt || 'Imagen del servicio'
      }))
    } else {
      services.value = []
    }
  } catch (error) {
    console.error('Error al cargar servicios:', error)
    services.value = []
  }
}

// Función para manejar errores de carga de imagen
const handleImageError = (event) => {
  const img = event.target
  const serviceCard = img.closest('.service-card')
  if (serviceCard) {
    // Ocultar la imagen y mostrar el placeholder
    img.style.display = 'none'
    const placeholder = serviceCard.querySelector('.image-placeholder')
    if (placeholder) {
      placeholder.style.display = 'flex'
    }
  }
}

// Cargar datos al montar el componente
onMounted(async () => {
  // Cargar categorías si no están disponibles
  if (!categoriesStore.hasCategories) {
    await categoriesStore.fetchCategories()
  }
  
  // Cargar servicios de la categoría actual
  await loadServices()
})

// Watcher para recargar servicios cuando cambie la ruta
watch(() => route.params.slug, async () => {
  await loadServices()
})

// Meta tags dinámicos
useSeoMeta({
  title: computed(() => currentCategory.value ? `${currentCategory.value.name} - CIMRO` : 'Categoría no encontrada - CIMRO'),
  description: computed(() => currentCategory.value?.description || 'Servicios de diagnóstico por imagen especializados'),
  ogTitle: computed(() => currentCategory.value ? `${currentCategory.value.name} - CIMRO` : 'Categoría no encontrada - CIMRO'),
  ogDescription: computed(() => currentCategory.value?.description || 'Servicios médicos especializados en diagnóstico por imagen'),
  ogImage: computed(() => currentCategory.value?.imagen_url || '/logo-horizontal.png'),
  twitterCard: 'summary_large_image'
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
