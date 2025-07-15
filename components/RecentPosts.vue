<template>
  <section class="py-16 bg-gray-50">
    <div class="container px-4 md:px-6 max-w-[1200px] mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ subtitle }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
        <p class="mt-4 text-gray-600">Cargando noticias...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-8">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p class="text-red-600">{{ error }}</p>
        </div>
      </div>

      <!-- Posts Grid -->
      <div v-else-if="posts.length > 0" class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <PostCard 
          v-for="post in posts" 
          :key="post.id"
          :post="post"
          :show-author="showAuthor"
          :show-reading-time="showReadingTime"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">No hay noticias disponibles</h3>
        <p class="mt-2 text-gray-500">Pronto agregaremos nuevas noticias y actualizaciones.</p>
      </div>

      <!-- View All Button -->
      <div v-if="posts.length > 0 && showViewAllButton" class="text-center mt-12">
        <NuxtLink 
          to="/noticias"
          class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-900 hover:bg-blue-800 transition-colors"
        >
          {{ viewAllText }}
          <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  title: {
    type: String,
    default: 'Noticias Recientes'
  },
  subtitle: {
    type: String,
    default: ''
  },
  limit: {
    type: Number,
    default: 3
  },
  categoryId: {
    type: Number,
    default: null
  },
  showAuthor: {
    type: Boolean,
    default: true
  },
  showReadingTime: {
    type: Boolean,
    default: false
  },
  showViewAllButton: {
    type: Boolean,
    default: true
  },
  viewAllText: {
    type: String,
    default: 'Ver todas las noticias'
  }
})

// Store and composables
const postsStore = usePostsStore()

// Reactive state
const posts = ref([])
const isLoading = ref(true)
const error = ref(null)

// Fetch posts
const fetchPosts = async () => {
  try {
    isLoading.value = true
    error.value = null

    if (props.categoryId) {
      // Fetch all posts by category (no pagination)
      await postsStore.fetchPostsByCategory(props.categoryId, 1, 100) // Usar un número alto para obtener todos
      posts.value = postsStore.allPosts.filter(post => 
        post.categories.some(cat => cat.id === props.categoryId)
      ).slice(0, props.limit)
    } else {
      // Fetch all recent posts (no pagination)
      await postsStore.fetchPosts(1, 100) // Usar un número alto para obtener todos
      posts.value = postsStore.postsByDate.slice(0, props.limit)
    }
  } catch (err) {
    error.value = 'Error al cargar las noticias'
    console.error('Error fetching posts:', err)
  } finally {
    isLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchPosts()
})

// Watch for prop changes
watch(() => props.categoryId, () => {
  fetchPosts()
})

watch(() => props.limit, () => {
  fetchPosts()
})
</script>
