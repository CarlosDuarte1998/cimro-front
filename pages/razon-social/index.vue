<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-blue-900 py-16 text-white">
      <div class="container px-4 md:px-6">
        <div class="mx-auto max-w-3xl text-center">
          <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Razón Social</h1>
          <p class="mt-4 text-blue-100 md:text-xl">
            Información corporativa, políticas y documentación oficial de CIMRO.
          </p>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <section v-if="razonSocialStore.isLoading && !razonSocialStore.hasPosts" class="py-16">
      <div class="container px-4 md:px-6 max-w-[1300px] mx-auto">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p class="mt-4 text-gray-600">Cargando información de razón social...</p>
        </div>
      </div>
    </section>

    <!-- Error State -->
    <section v-else-if="razonSocialStore.error" class="py-16">
      <div class="container px-4 md:px-6 max-w-[1300px] mx-auto">
        <div class="text-center">
          <div class="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 class="text-lg font-medium text-red-800 mb-2">Error al cargar la información</h3>
            <p class="text-red-600 mb-4">{{ razonSocialStore.error }}</p>
            <button 
              @click="loadPosts"
              class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Posts Content -->
    <section v-if="!razonSocialStore.isLoading || razonSocialStore.hasPosts" class="py-16">
      <div class="container px-4 md:px-6 max-w-[1300px] mx-auto">
        <!-- Search Bar -->
        <div class="mb-8">
          <div class="relative max-w-md mx-auto">
            <input
              v-model="searchTerm"
              @input="handleSearch"
              type="text"
              placeholder="Buscar información de razón social..."
              class="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
            <svg 
              class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        <!-- Content based on state -->
        <div v-if="razonSocialStore.hasPosts">
          <!-- Posts Grid -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {{ searchTerm ? `Resultados para "${searchTerm}"` : 'Información de Razón Social' }}
            </h2>
            <div class="h-[1px] w-full bg-gray-200 mt-4"></div>
          </div>

          <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <PostCard 
              v-for="post in displayedPosts" 
              :key="post.id"
              :post="post"
              :show-author="true"
              :show-reading-time="false"
            />
          </div>

        <!-- No Results -->
        <div v-if="searchTerm && displayedPosts.length === 0" class="text-center py-12">
          <div class="max-w-md mx-auto">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <h3 class="mt-4 text-lg font-medium text-gray-900">No se encontraron resultados</h3>
            <p class="mt-2 text-gray-500">
              No encontramos información de razón social que coincida con tu búsqueda "{{ searchTerm }}". 
              Intenta con otros términos.
            </p>
            <button 
              @click="clearSearch"
              class="mt-4 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Ver toda la información
            </button>
          </div>
        </div>
        </div>
      </div>
    </section>

    <!-- Empty State -->
    <section v-else class="py-16">
      <div class="container px-4 md:px-6 max-w-[1300px] mx-auto">
        <div class="text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">No hay información de razón social disponible</h3>
          <p class="mt-2 text-gray-500">
            Pronto agregaremos información corporativa y documentación oficial. Vuelve a visitarnos.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Composables
const { formatDate, cleanExcerpt } = usePosts()

// SEO y meta
useCIMROSEO({
  title: 'Razón Social - CIMRO',
  description: 'Información corporativa, políticas y documentación oficial de CIMRO. Conoce nuestra estructura organizacional y documentos legales.',
  keywords: 'CIMRO razón social, información corporativa, políticas empresariales, documentación legal, estructura organizacional'
})

// Stores
const razonSocialStore = useRazonSocialStore()

// Estado reactivo
const searchTerm = ref('')
const searchTimeout = ref(null)

// Computed properties
const displayedPosts = computed(() => {
  if (searchTerm.value) {
    return razonSocialStore.allPosts
  }
  // Mostrar todos los posts de razón social ordenados por fecha
  return razonSocialStore.postsByDate
})

// Métodos
const loadPosts = async () => {
  try {
    await razonSocialStore.fetchRazonSocialPosts(1, 100) // Cargar posts de razón social
  } catch (error) {
    console.error('Error loading razon social posts:', error)
  }
}

const handleSearch = () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  
  searchTimeout.value = setTimeout(async () => {
    if (searchTerm.value.trim()) {
      try {
        await razonSocialStore.searchPosts(searchTerm.value.trim())
      } catch (error) {
        console.error('Error searching razon social posts:', error)
      }
    } else {
      await loadPosts()
    }
  }, 500)
}

const clearSearch = () => {
  searchTerm.value = ''
  loadPosts()
}

// Lifecycle
onMounted(() => {
  loadPosts()
})

onBeforeUnmount(() => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
