<template>
    <section class="bg-blue-900 py-16 text-white">
        <div class="container px-4 md:px-6">
            <div class="mx-auto max-w-3xl text-center">
                <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nuestros Servicios</h1>
                <p class="mt-4 text-blue-100 md:text-xl">Ofrecemos una amplia gama de servicios de diagnóstico por
                    imagen con la más alta tecnología y personal especializado.</p>
            </div>
        </div>
    </section>

    <!-- Loading State -->
    <section v-if="categoriesStore.isLoading" class="py-16">
        <div class="container max-w-[1300px] mx-auto px-4 md:px-6">
            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 4xl:grid-cols-4">
                <div v-for="n in 8" :key="n" class="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <!-- Header Skeleton -->
                    <div class="flex flex-col space-y-1.5 p-6">
                        <div class="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md animate-shimmer skeleton-line"></div>
                        <div class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md w-2/3 animate-shimmer skeleton-line" style="animation-delay: 0.1s"></div>
                    </div>

                    <!-- Image and Content Skeleton -->
                    <div class="p-6 pt-0">
                        <!-- Image placeholder -->
                        <div class="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-4 animate-shimmer skeleton-image relative overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skeleton-shimmer"></div>
                        </div>
                        
                        <!-- Description lines -->
                        <div class="space-y-2">
                            <div class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer skeleton-line" style="animation-delay: 0.2s"></div>
                            <div class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-5/6 animate-shimmer skeleton-line" style="animation-delay: 0.3s"></div>
                            <div class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 animate-shimmer skeleton-line" style="animation-delay: 0.4s"></div>
                        </div>
                    </div>

                    <!-- Footer Skeleton -->
                    <div class="flex items-center p-6 pt-0">
                        <div class="flex items-center space-x-2">
                            <div class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-20 animate-shimmer skeleton-line" style="animation-delay: 0.5s"></div>
                            <div class="h-4 w-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer skeleton-line" style="animation-delay: 0.6s"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loading indicator -->
            <div class="text-center mt-8">
                <div class="inline-flex items-center space-x-2 text-gray-500">
                    <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span class="text-sm font-medium">Cargando categorías...</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Error State -->
    <section v-else-if="categoriesStore.error" class="py-16">
        <div class="container max-w-[1300px] mx-auto px-4 md:px-6 text-center">
            <div class="text-red-600 mb-4">
                <svg class="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <p class="text-lg font-semibold">Error al cargar las categorías</p>
                <p class="text-sm text-gray-500">{{ categoriesStore.error }}</p>
            </div>
            <button @click="loadCategories" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Reintentar
            </button>
        </div>
    </section>

    <!-- Categories Content -->
    <section v-else class="py-16">
        <div class="container max-w-[1300px] mx-auto px-4 md:px-6">
            <!-- Empty State -->
            <div v-if="!categoriesStore.hasCategories" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p class="text-lg font-semibold text-gray-900">No hay categorías disponibles</p>
                <p class="text-gray-500">Por favor, inténtalo más tarde.</p>
            </div>

            <!-- Categories Grid -->
            <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 4xl:grid-cols-4">
                <NuxtLink 
                    v-for="category in categoriesStore.categoriesWithServices" 
                    :key="category.id"
                    :to="`/servicios/${category.slug}`" 
                    class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm transition-all duration-500 ease-out hover:shadow-lg hover:scale-95"
                >
                    <!-- Header -->
                    <div class="flex flex-col space-y-1.5 p-6">
                        <div class="text-xl font-semibold leading-tight tracking-tight">
                            {{ category.name }}
                        </div>
                        <div class="text-sm text-muted-foreground">
                            {{ category.count }} {{ category.count === 1 ? 'servicio' : 'servicios' }} disponibles
                        </div>
                    </div>

                    <!-- Image and Description -->
                    <div class="p-6 pt-0">
                        <img 
                            :alt="category.name" 
                            loading="lazy" 
                            width="350" 
                            height="200"
                            decoding="async" 
                            class="mb-4 rounded-lg object-cover w-full h-48"
                            :src="category.imagen_url || 'https://via.placeholder.com/350x200?text=Sin+Imagen'" 
                            @error="handleImageError"
                        >
                        <p class="text-sm text-gray-500 line-clamp-3">
                            {{ category.description || 'Servicios de diagnóstico por imagen con tecnología de última generación y personal especializado.' }}
                        </p>
                    </div>

                    <!-- Footer -->
                    <div class="flex items-center justify-between p-6 pt-0">
                        <span class="flex items-center text-sm font-medium text-blue-600">
                            Ver servicios
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-arrow-right ml-1 h-4 w-4">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </span>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </section>


</template>


<script setup>
// Store de categorías
const categoriesStore = useCategoriesStore()

// Función para cargar categorías
const loadCategories = async () => {
  try {
    await categoriesStore.fetchCategories()
  } catch (error) {
    console.error('Error al cargar categorías:', error)
  }
}

// Función para manejar errores de imagen
const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/350x200?text=Sin+Imagen'
}

// Cargar categorías al montar el componente
onMounted(() => {
  if (!categoriesStore.hasCategories) {
    loadCategories()
  }
})

// Meta tags para SEO
useSeoMeta({
  title: 'Servicios de Diagnóstico por Imagen - CIMRO El Salvador',
  description: 'Descubra todos nuestros servicios de diagnóstico por imagen: Resonancia Magnética, Tomografía, Radiología, Ultrasonido y más. Tecnología de vanguardia en CIMRO.',
  keywords: 'servicios CIMRO, resonancia magnética El Salvador, tomografía computarizada, radiología digital, ultrasonido 4D, mamografía digital, densitometría ósea',
  ogTitle: 'Servicios de Diagnóstico por Imagen - CIMRO',
  ogDescription: 'Amplia gama de servicios de diagnóstico por imagen con tecnología de vanguardia y personal especializado.',
  ogImage: 'https://cimro.com.sv/logo-horizontal.png',
  ogUrl: 'https://cimro.com.sv/servicios'
});

// Structured Data para servicios médicos
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MedicalBusiness',
        name: 'CIMRO - Servicios de Diagnóstico por Imagen',
        url: 'https://cimro.com.sv/servicios',
        description: 'Servicios especializados de diagnóstico por imagen con tecnología de vanguardia.',
        medicalSpecialty: [
          'Resonancia Magnética',
          'Tomografía Computarizada', 
          'Radiología Digital',
          'Ultrasonido 4D',
          'Mamografía Digital',
          'Densitometría Ósea'
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios de Diagnóstico por Imagen',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'MedicalProcedure',
                name: 'Resonancia Magnética',
                description: 'Estudios de resonancia magnética con equipos de alta resolución'
              }
            },
            {
              '@type': 'Offer', 
              itemOffered: {
                '@type': 'MedicalProcedure',
                name: 'Tomografía Computarizada',
                description: 'Tomografías de última generación para diagnósticos precisos'
              }
            }
          ]
        }
      })
    }
  ]
});
</script>

<style scoped>
/* Animación suave para las cards */
.hover\:scale-95:hover {
  transform: scale(0.95);
}

/* Transiciones suaves */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.duration-500 {
  transition-duration: 500ms;
}

.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}

/* Limitador de líneas para la descripción */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Skeleton Loading Animations */
@keyframes shimmer {
  0% {
    opacity: 0.6;
    transform: translateX(-100%);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
    transform: translateX(100%);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Skeleton Elements */
.animate-shimmer {
  background-size: 200% 100%;
  animation: gradientShift 2s ease-in-out infinite;
}

.skeleton-line {
  position: relative;
  overflow: hidden;
}

.skeleton-line::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 2s infinite;
}

.skeleton-image {
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #e0e0e0 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
}

.skeleton-shimmer {
  animation: shimmer 2s infinite;
  opacity: 0.3;
}

/* Spinner Animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Staggered Animation Delays */
.skeleton-line:nth-child(1) { animation-delay: 0s; }
.skeleton-line:nth-child(2) { animation-delay: 0.1s; }
.skeleton-line:nth-child(3) { animation-delay: 0.2s; }
.skeleton-line:nth-child(4) { animation-delay: 0.3s; }
.skeleton-line:nth-child(5) { animation-delay: 0.4s; }

/* Card staggered appearance */
.grid > div:nth-child(1) { animation-delay: 0s; }
.grid > div:nth-child(2) { animation-delay: 0.1s; }
.grid > div:nth-child(3) { animation-delay: 0.2s; }
.grid > div:nth-child(4) { animation-delay: 0.3s; }
.grid > div:nth-child(5) { animation-delay: 0.4s; }
.grid > div:nth-child(6) { animation-delay: 0.5s; }
.grid > div:nth-child(7) { animation-delay: 0.6s; }
.grid > div:nth-child(8) { animation-delay: 0.7s; }

/* Hover effects mejorados */
.hover\:shadow-lg:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Responsive skeleton adjustments */
@media (max-width: 640px) {
  .skeleton-image {
    height: 12rem; /* h-48 equivalent */
  }
}

@media (max-width: 1024px) {
  .grid {
    gap: 1rem;
  }
}
</style>