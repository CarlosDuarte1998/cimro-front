<template>
  <NuxtLink 
    :to="`/noticias/${post.slug}`"
    class="block rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
  >
    <!-- Image -->
    <div class="relative h-48 w-full overflow-hidden">
      <img
        :alt="post.featured_image_alt"
        :src="post.featured_image || '/placeholder.svg'"
        class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      >
      <!-- Category Badge -->
      <div 
        v-if="post.categories.length > 0" 
        class="absolute top-3 left-3"
      >
        <span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 backdrop-blur-sm">
          {{ post.categories[0].name === 'Uncategorized' ? 'Blog' : post.categories[0].name }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Meta Info -->
      <div class="mb-3 flex items-center gap-3 text-sm text-gray-500">
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

        <!-- Reading Time -->
        <span v-if="showReadingTime" class="flex items-center gap-1">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12,6 12,12 16,14"></polyline>
          </svg>
          {{ readingTime }} min
        </span>
      </div>

      <!-- Title -->
      <h3 class="text-lg font-semibold leading-tight text-gray-900 line-clamp-2 mb-3 group-hover:text-blue-900 transition-colors">
        {{ post.title }}
      </h3>

      <!-- Excerpt -->
      <div 
        class="text-gray-600 line-clamp-3 mb-4 text-sm leading-relaxed" 
        v-html="cleanExcerpt(post.excerpt)"
      ></div>

      <!-- Footer -->
      <div class="flex items-center justify-between">
        <!-- Author -->
        <div v-if="post.author && showAuthor" class="flex items-center gap-2 text-sm text-gray-500">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          {{ post.author.name }}
        </div>

        <!-- Read More Indicator -->
        <div class="flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
          {{ readMoreText }}
          <svg class="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
// Composable
const { formatDate, cleanExcerpt, calculateReadingTime } = usePosts()

// Props
const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  showAuthor: {
    type: Boolean,
    default: true
  },
  showReadingTime: {
    type: Boolean,
    default: false
  },
  readMoreText: {
    type: String,
    default: 'Leer más'
  }
})

// Computed properties
const readingTime = computed(() => {
  return calculateReadingTime(props.post.content)
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
