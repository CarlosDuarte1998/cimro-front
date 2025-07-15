<template>
  <div>
    <!-- Loading State -->
    <section v-if="pending" class="py-16">
      <div class="container px-4 md:px-6 max-w-[800px] mx-auto">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p class="mt-4 text-gray-600">Cargando noticia...</p>
        </div>
      </div>
    </section>

    <!-- Error State -->
    <section v-else-if="error" class="py-16">
      <div class="container px-4 md:px-6 max-w-[800px] mx-auto">
        <div class="text-center">
          <div class="bg-red-50 border border-red-200 rounded-lg p-6">
            <h1 class="text-2xl font-bold text-red-800 mb-2">Noticia no encontrada</h1>
            <p class="text-red-600 mb-4">La noticia que buscas no existe o ha sido eliminada.</p>
            <NuxtLink 
              to="/noticias"
              class="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Ver todas las noticias
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Post Content -->
    <article v-else-if="post" class="py-8">
      <!-- Breadcrumbs -->
      <section class="border-b border-gray-200 pb-4">
        <div class="container px-4 md:px-6 max-w-[800px] mx-auto">
          <Breadcrumbs :breadcrumbs="breadcrumbItems" />
        </div>
      </section>

      <!-- Post Header -->
      <header class="py-8 border-b border-gray-200">
        <div class="container px-4 md:px-6 max-w-[800px] mx-auto">
          <div class="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <!-- Category -->
            <span 
              v-if="post.categories.length > 0"
              class="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
            >
              {{ post.categories[0].name === 'Uncategorized' ? 'Blog' : post.categories[0].name }}
            </span>
            
            <!-- Date -->
            <span class="flex items-center gap-1">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              {{ formatDate(post.date) }}
            </span>

            <!-- Author -->
            <span v-if="post.author" class="flex items-center gap-1">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {{ post.author.name }}
            </span>

            <!-- Reading Time -->
            <span class="flex items-center gap-1">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
              {{ readingTime }} min de lectura
            </span>
          </div>

          <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            {{ post.title }}
          </h1>

          <!-- Excerpt -->
          <div 
            v-if="post.excerpt" 
            class="text-lg text-gray-600 leading-relaxed mb-6"
            v-html="cleanExcerpt(post.excerpt)"
          ></div>

          <!-- Featured Image -->
          <div v-if="post.featured_image" class="w-full max-w-2xl mx-auto mb-6">
            <div class="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <img 
                :src="post.featured_image_large || post.featured_image"
                :alt="post.featured_image_alt"
                class="w-full h-full object-cover object-center"
                loading="lazy"
              >
            </div>
          </div>
        </div>
      </header>

      <!-- Post Content -->
      <section class="py-8">
        <div class="container px-4 md:px-6 max-w-[800px] mx-auto">
          <div 
            class="prose prose-lg prose-blue max-w-none"
            v-html="post.content"
          ></div>
        </div>
      </section>

      <!-- Post Footer -->
      <footer class="border-t border-gray-200 pt-8">
        <div class="container px-4 md:px-6 max-w-[800px] mx-auto">
          <!-- Tags -->
          <div v-if="post.tags && post.tags.length > 0" class="mb-8">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Etiquetas:</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in post.tags" 
                :key="tag.id"
                class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {{ tag.name }}
              </span>
            </div>
          </div>

          <!-- Social Share -->
          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Compartir:</h3>
            <div class="flex gap-3">
              <a 
                :href="shareUrls.facebook"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                aria-label="Compartir en Facebook"
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
                aria-label="Compartir en Twitter"
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
                aria-label="Compartir en WhatsApp"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>

              <button 
                @click="handleCopyToClipboard"
                class="flex items-center justify-center w-10 h-10 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                aria-label="Copiar enlace"
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

          <!-- Navigation -->
          <div class="border-t border-gray-200 pt-8">
            <div class="flex justify-between items-center">
              <NuxtLink 
                to="/noticias"
                class="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Volver a noticias
              </NuxtLink>
            </div>
          </div>
        </div>
      </footer>
    </article>

    <!-- Related Posts -->
    <section v-if="relatedPosts.length > 0" class="py-16 bg-gray-50">
      <div class="container px-4 md:px-6 max-w-[1200px] mx-auto">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-8 text-center">
          Noticias Relacionadas
        </h2>
        
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div 
            v-for="relatedPost in relatedPosts" 
            :key="relatedPost.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div class="relative h-48 w-full">
              <img
                :alt="relatedPost.featured_image_alt"
                :src="relatedPost.featured_image || '/placeholder.svg'"
                class="object-cover w-full h-full"
                loading="lazy"
              >
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 line-clamp-2 mb-2">
                {{ relatedPost.title }}
              </h3>
              <p class="text-sm text-gray-600 line-clamp-2 mb-3">
                {{ cleanExcerpt(relatedPost.excerpt) }}
              </p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">
                  {{ formatDate(relatedPost.date) }}
                </span>
                <NuxtLink 
                  :to="`/noticias/${relatedPost.slug}`"
                  class="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Leer más
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Composables
const { 
  formatDate, 
  cleanExcerpt, 
  calculateReadingTime, 
  generateShareUrls, 
  findRelatedPosts, 
  copyToClipboard, 
  getPostSEOMeta 
} = usePosts()

// Get route params
const route = useRoute()
const { slug } = route.params

// Store
const postsStore = usePostsStore()

// Reactive state
const post = ref(null)
const error = ref(null)
const pending = ref(true)
const copied = ref(false)

// Fetch post data
const { data, error: fetchError } = await useLazyAsyncData(`post-${slug}`, async () => {
  try {
    return await postsStore.fetchPostBySlug(slug)
  } catch (err) {
    throw err
  }
})

// Handle data and errors
watchEffect(() => {
  if (data.value) {
    post.value = data.value
    error.value = null
  } else if (fetchError.value) {
    error.value = fetchError.value
    post.value = null
  }
  pending.value = false
})

// Computed properties
const breadcrumbItems = computed(() => [
  { label: 'Noticias', to: '/noticias' },
  { label: post.value?.title || 'Cargando...' }
])

const readingTime = computed(() => {
  if (!post.value?.content) return 0
  return calculateReadingTime(post.value.content)
})

const shareUrls = computed(() => {
  if (!post.value) return {}
  
  const baseUrl = useRuntimeConfig().public.SITE_URL || 'https://cimro.com.sv'
  const currentUrl = `${baseUrl}/noticias/${post.value.slug}`
  return generateShareUrls(post.value, currentUrl)
})

const relatedPosts = computed(() => {
  if (!post.value) return []
  return findRelatedPosts(post.value, 3)
})

// Methods
const handleCopyToClipboard = async () => {
  const baseUrl = useRuntimeConfig().public.SITE_URL || 'https://cimro.com.sv'
  const currentUrl = `${baseUrl}/noticias/${post.value.slug}`
  const success = await copyToClipboard(currentUrl)
  
  if (success) {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

// SEO
if (post.value) {
  const seoMeta = getPostSEOMeta(post.value, useRuntimeConfig().public.SITE_URL)
  useCIMROSEO(seoMeta)
}

// Handle 404
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Noticia no encontrada'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Prose styles for content */
:deep(.prose) {
  color: #374151;
  line-height: 1.75;
}

:deep(.prose h1) {
  color: #1f2937;
  font-weight: 800;
  font-size: 2.25em;
  margin-top: 0;
  margin-bottom: 0.8888889em;
  line-height: 1.1111111;
}

:deep(.prose h2) {
  color: #1f2937;
  font-weight: 700;
  font-size: 1.5em;
  margin-top: 2em;
  margin-bottom: 1em;
  line-height: 1.3333333;
}

:deep(.prose h3) {
  color: #1f2937;
  font-weight: 600;
  font-size: 1.25em;
  margin-top: 1.6em;
  margin-bottom: 0.6em;
  line-height: 1.6;
}

:deep(.prose p) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}

:deep(.prose img) {
  margin-top: 2em;
  margin-bottom: 2em;
  border-radius: 0.5rem;
}

:deep(.prose blockquote) {
  font-weight: 500;
  font-style: italic;
  color: #1f2937;
  border-left-width: 0.25rem;
  border-left-color: #e5e7eb;
  quotes: "\201C""\201D""\2018""\2019";
  margin-top: 1.6em;
  margin-bottom: 1.6em;
  padding-left: 1em;
}

:deep(.prose ul) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-left: 1.625em;
}

:deep(.prose ol) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-left: 1.625em;
}

:deep(.prose li) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
</style>
