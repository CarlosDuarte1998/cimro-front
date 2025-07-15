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
    <section v-if="typedCategoriesStore.isLoading" class="py-16">
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
    <section v-else-if="typedCategoriesStore.error" class="py-16">
        <div class="container max-w-[1300px] mx-auto px-4 md:px-6 text-center">
            <div class="text-red-600 mb-4">
                <svg class="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <p class="text-lg font-semibold">Error al cargar las categorías</p>
                <p class="text-sm text-gray-500">{{ typedCategoriesStore.error }}</p>
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
            <div v-if="!typedCategoriesStore.hasCategories" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p class="text-lg font-semibold text-gray-900">No hay categorías disponibles</p>
                <p class="text-gray-500">Por favor, inténtalo más tarde.</p>
            </div>

            <!-- Categories Grid -->
            <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 4xl:grid-cols-4">
                <NuxtLink 
                    v-for="category in typedCategoriesStore.categoriesWithServices" 
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

    <!-- Métodos de Pago Section -->
    <section class="py-16 bg-gray-50">
        <div class="container max-w-[1300px] mx-auto px-4 md:px-6">
            <div class="mb-12 text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Facilidades de Pago</h2>
                <p class="mx-auto mt-4 max-w-[700px] text-gray-500">Ofrecemos diversas opciones de pago para que pueda acceder fácilmente a nuestros servicios médicos especializados.</p>
            </div>
            
            <div class="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto">
                <!-- Tasa 0 -->
                <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div class="relative z-10">
                        <div class="mb-6 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <UIcon name="i-heroicons-percent-badge" class="w-8 h-8 text-white" />
                        </div>
                        <h3 class="mb-4 text-2xl font-bold">Tasa 0%</h3>
                        <p class="text-green-100 mb-6 leading-relaxed">Financiamiento sin intereses para hacer más accesibles nuestros servicios de diagnóstico por imagen.</p>
                        <div class="inline-flex items-center text-sm font-semibold">
                           
                        </div>
                    </div>
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                </div>

                <!-- Tarjetas de Crédito y Débito -->
                <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div class="relative z-10">
                        <div class="mb-6 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <UIcon name="i-heroicons-credit-card" class="w-8 h-8 text-white" />
                        </div>
                        <h3 class="mb-4 text-2xl font-bold">Tarjetas</h3>
                        <p class="text-blue-100 mb-6 leading-relaxed">Aceptamos tarjetas de crédito y débito, tanto nacionales como internacionales.</p>
                        <div class="flex gap-2 flex-wrap">
                            <span class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">Nacional</span>
                            <span class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">Internacional</span>
                        </div>
                    </div>
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                </div>

                <!-- Cheque -->
                <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div class="relative z-10">
                        <div class="mb-6 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <UIcon name="i-heroicons-document-text" class="w-8 h-8 text-white" />
                        </div>
                        <h3 class="mb-4 text-2xl font-bold">Cheque</h3>
                        <p class="text-purple-100 mb-6 leading-relaxed">Método de pago tradicional y seguro para mayor control de sus transacciones médicas.</p>
                        <div class="inline-flex items-center text-sm font-semibold">
                            <span class="mr-2">Seguro y confiable</span>
                            <UIcon name="i-heroicons-shield-check" class="w-4 h-4" />
                        </div>
                    </div>
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                </div>
            </div>

            <!-- Call to Action -->
            <div class="mt-16 text-center">
                <div class="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-200">
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">¿Necesita información sobre nuestros métodos de pago?</h3>
                    <p class="text-gray-600 mb-8 leading-relaxed">
                        Nuestro equipo está listo para asesorarle sobre las mejores opciones de pago según sus necesidades. 
                        No permita que el aspecto financiero sea un obstáculo para cuidar su salud.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            class="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 h-12 px-8 font-medium transition-colors shadow-md hover:shadow-lg"
                            href="https://api.whatsapp.com/send/?phone=50377461474&text=Hola%2C+quisiera+informaci%C8%AFn+sobre+los+m%C3%A9todos+de+pago+para+los+servicios&type=phone_number&app_absent=0" 
                            target="_blank"
                        >
                            <UIcon name="i-flowbite-whatsapp-solid" class="mr-2 h-5 w-5" />
                            Consultar Opciones de Pago
                        </a>
                        <NuxtLink 
                            class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 h-12 px-8 font-medium transition-colors"
                            to="/contactanos"
                        >
                            <UIcon name="i-heroicons-phone" class="mr-2 h-4 w-4" />
                            Contactar Directamente
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>


</template>


<script setup lang="ts">
// Definir la interfaz para las categorías
interface Category {
  id: number | string
  name: string
  slug: string
  description?: string
  count: number
  imagen_url?: string
  parent?: number
}

const { corporateInfo, getKeywordsString, generateDescription, services } = useCIMROSEO();
const categoriesStore = useCategoriesStore()

// Type assertion para el store
const typedCategoriesStore = categoriesStore as {
  isLoading: boolean
  error: string | null
  hasCategories: boolean
  categoriesWithServices: Category[]
  fetchCategories: () => Promise<void>
}

// SEO optimizado para página de servicios
useSeoMeta({
  title: `Servicios de Diagnóstico por Imágenes | ${corporateInfo.name}`,
  description: generateDescription(`Servicios especializados de diagnóstico por imágenes en Santa Ana, El Salvador. ${services.join(', ')}. Centro médico con tecnología de vanguardia y aseguradoras afiliadas.`),
  keywords: getKeywordsString([
    'servicios radiológicos Santa Ana',
    'estudios médicos Santa Ana',
    'centro radiológico El Salvador',
    'diagnósticos médicos occidente El Salvador'
  ]),
  ogTitle: `Servicios de Diagnóstico por Imágenes - ${corporateInfo.shortName} Santa Ana`,
  ogDescription: `Conoce todos los servicios de diagnóstico por imágenes que ofrece ${corporateInfo.name}. Tecnología de vanguardia y personal especializado.`,
  ogImage: `${corporateInfo.website}/logo-horizontal.png`,
  ogUrl: `${corporateInfo.website}/servicios`
});

// Schema.org para servicios médicos
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MedicalOrganization',
        name: corporateInfo.name,
        url: `${corporateInfo.website}/servicios`,
        description: `Servicios especializados de diagnóstico por imágenes en Santa Ana, El Salvador`,
        medicalSpecialty: services,
        address: {
          '@type': 'PostalAddress',
          streetAddress: corporateInfo.address,
          addressLocality: 'Santa Ana',
          addressCountry: 'El Salvador'
        }
      })
    }
  ]
});

// Función para cargar categorías
const loadCategories = async () => {
  try {
    await typedCategoriesStore.fetchCategories()
  } catch (error) {
    console.error('Error al cargar categorías:', error)
  }
}

// Función para manejar errores de imagen
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/350x200?text=Sin+Imagen'
}

// Cargar categorías al montar el componente
onMounted(() => {
  if (!typedCategoriesStore.hasCategories) {
    loadCategories()
  }
})
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