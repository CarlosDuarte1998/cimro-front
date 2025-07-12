<script setup lang="ts">
import BannerSwipper from '~/components/BannerSwipper.vue';

const categoriesStore = useCategoriesStore();

// SEO Meta Tags para la página principal
useSeoMeta({
  title: 'Centro de Imágenes Médicas y Radiología - CIMRO El Salvador',
  description: 'CIMRO es el centro líder en diagnóstico por imagen en El Salvador. Ofrecemos resonancia magnética, tomografía, radiología y más con tecnología de vanguardia. Agende su cita.',
  keywords: 'CIMRO, radiología El Salvador, resonancia magnética, tomografía, diagnóstico por imagen, centro médico Santa Ana, rayos X, ultrasonido',
  ogTitle: 'CIMRO - Centro de Imágenes Médicas y Radiología El Salvador',
  ogDescription: 'Centro líder en diagnóstico por imagen con tecnología de vanguardia. Resonancia magnética, tomografía, radiología y más servicios médicos especializados.',
  ogImage: 'https://cimro.com.sv/logo-horizontal.png',
  ogUrl: 'https://cimro.com.sv',
  twitterTitle: 'CIMRO - Centro de Imágenes Médicas El Salvador',
  twitterDescription: 'Diagnóstico por imagen con tecnología de vanguardia. Agende su cita en CIMRO.',
  twitterImage: 'https://cimro.com.sv/logo-horizontal.png',
});

// Structured Data para SEO local
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MedicalOrganization',
        name: 'CIMRO - Centro de Imágenes Médicas y Radiología',
        url: 'https://cimro.com.sv',
        logo: 'https://cimro.com.sv/logo-horizontal.png',
        description: 'Centro especializado en diagnóstico por imagen con tecnología de vanguardia en El Salvador.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Urb San Miguelito',
          addressLocality: 'Santa Ana',
          addressCountry: 'El Salvador'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+503-2440-0000',
          contactType: 'customer service'
        },
        medicalSpecialty: [
          'Radiología',
          'Resonancia Magnética',
          'Tomografía Computarizada',
          'Ultrasonido',
          'Rayos X'
        ],
        sameAs: [
          'https://www.facebook.com/cimro',
          'https://www.instagram.com/cimro'
        ]
      })
    }
  ]
});

// Cargar categorías al montar el componente
onMounted(async () => {
  if (!categoriesStore.hasCategories) {
    await categoriesStore.fetchCategories();
  }
});

// Obtener las primeras 3 categorías para mostrar en homepage
const mainCategories = computed(() => {
  const categories = categoriesStore.categories || [];
  return categories.slice(0, 3) as any[];
});
</script>

<template>
   <section class="relative">
      <BannerSwipper />
   </section>

   <section class="w-full">

      <div class="max-w-[1300px] m-auto py-5 mt-10">
         <div class="text-center">
            <h1 class=" text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
               Nuestros Servicios
            </h1>
            <p class="mx-auto mt-4 max-w-[700px] text-gray-500">Ofrecemos una amplia gama de servicios de diagnóstico
               por imagen con la más alta tecnología y personal especializado.</p>

            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10 px-5 md:px-0">
               <NuxtLink 
                  v-for="(category, index) in mainCategories" 
                  :key="category?.id || index"
                  :to="`/servicios/${category?.slug || ''}`"
                  class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm transition-all duration-500 ease-out hover:shadow-lg hover:scale-95"
               >
                  <!-- Header -->
                  <div class="flex flex-col space-y-1.5 p-6">
                     <div class="text-xl font-semibold leading-tight tracking-tight">
                        {{ category?.name || 'Categoría' }}
                     </div>
                     <div class="text-sm text-muted-foreground">
                        {{ category?.count || 0 }} {{ (category?.count === 1) ? 'servicio' : 'servicios' }} disponibles
                     </div>
                  </div>

                  <!-- Image and Description -->
                  <div class="p-6 pt-0">
                     <img 
                        :alt="`Servicios de ${category?.name || 'diagnóstico por imagen'} en CIMRO El Salvador`" 
                        loading="lazy" 
                        width="350" 
                        height="200"
                        decoding="async" 
                        class="mb-4 rounded-lg object-cover w-full h-48"
                        :src="category?.imagen_url || category?.image || `https://picsum.photos/350/200?random=${category?.id || index}`"
                     />
                     <p class="text-sm text-gray-500 line-clamp-3">
                        {{ category?.description || 'Servicios de diagnóstico por imagen con tecnología de última generación y personal especializado.' }}
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
               
               <!-- Mensaje de carga si no hay categorías -->
               <div v-if="mainCategories.length === 0" class="col-span-full text-center py-8">
                  <div class="animate-pulse">
                     <div class="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                     <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  </div>
               </div>
            </div>

            <div class="mt-10 text-center">
               <NuxtLink
                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium   disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0   hover:bg-black/90 bg-black text-white h-10 px-4 py-2"
                  to="/servicios">Ver todos los servicios</NuxtLink>
            </div>



         </div>
      </div>

   </section>

   <section class="bg-gray-50 py-16">
      <div class="container m-auto px-4 md:px-6">
         <div class="mb-12 text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">¿Por qué elegirnos?</h2>
            <p class="mx-auto mt-4 max-w-[700px] text-gray-500">En CIMRO nos distinguimos por ofrecer un servicio de
               excelencia con tecnología de vanguardia.</p>
         </div>
         <div class="grid gap-8 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            <div class="flex flex-col items-center text-center">
               <div class="mb-4 rounded-full bg-blue-100 p-3 text-blue-600"><svg xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield h-6 w-6">
                     <path
                        d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z">
                     </path>
                  </svg></div>
               <h3 class="mb-2 text-xl font-medium">Tecnología Avanzada</h3>
               <p class="text-gray-500">Contamos con equipos de última generación para garantizar diagnósticos precisos
                  y confiables.</p>
            </div>
            <div class="flex flex-col items-center text-center">
               <div class="mb-4 rounded-full bg-blue-100 p-3 text-blue-600"><svg xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-pulse h-6 w-6">
                     <path
                        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z">
                     </path>
                     <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"></path>
                  </svg></div>
               <h3 class="mb-2 text-xl font-medium">Atención Humanizada</h3>
               <p class="text-gray-500">Nuestro personal está comprometido con brindar un trato cálido y respetuoso a
                  cada paciente.</p>
            </div>
            <div class="flex flex-col items-center text-center">
               <div class="mb-4 rounded-full bg-blue-100 p-3 text-blue-600"><svg xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big h-6 w-6">
                     <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                     <path d="m9 11 3 3L22 4"></path>
                  </svg></div>
               <h3 class="mb-2 text-xl font-medium">Médicos Especialistas</h3>
               <p class="text-gray-500">Contamos con un equipo de radiólogos certificados con amplia experiencia en
                  diagnóstico por imagen.</p>
            </div>
            <div class="flex flex-col items-center text-center">
               <div class="mb-4 rounded-full bg-blue-100 p-3 text-blue-600"><svg xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock h-6 w-6">
                     <circle cx="12" cy="12" r="10"></circle>
                     <polyline points="12 6 12 12 16 14"></polyline>
                  </svg></div>
               <h3 class="mb-2 text-xl font-medium">Resultados Rápidos</h3>
               <p class="text-gray-500">Entregamos los resultados en el menor tiempo posible, con la opción de consulta
                  en línea.</p>
            </div>
            <div class="flex flex-col items-center text-center">
               <div class="mb-4 rounded-full bg-blue-100 p-3 text-blue-600"><svg xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar h-6 w-6">
                     <path d="M8 2v4"></path>
                     <path d="M16 2v4"></path>
                     <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                     <path d="M3 10h18"></path>
                  </svg></div>
               <h3 class="mb-2 text-xl font-medium">Citas Flexibles</h3>
               <p class="text-gray-500">Ofrecemos horarios extendidos y la posibilidad de agendar citas en línea para su
                  comodidad.</p>
            </div>
            <div class="flex flex-col items-center text-center">
               <div class="mb-4 rounded-full bg-blue-100 p-3 text-blue-600"><svg xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search h-6 w-6">
                     <circle cx="11" cy="11" r="8"></circle>
                     <path d="m21 21-4.3-4.3"></path>
                  </svg></div>
               <h3 class="mb-2 text-xl font-medium">Diagnósticos Precisos</h3>
               <p class="text-gray-500">Nuestro compromiso es ofrecer diagnósticos de alta precisión que contribuyan a
                  su salud.</p>
            </div>
         </div>
      </div>
   </section>

   <section class="relative bg-gradient-to-r bg-[#003a73] py-20 text-white">
      <div class="container relative z-10 px-4 md:px-6 m-auto">
         <div class="grid gap-6 md:grid-cols-2 md:gap-12">
            <div class="flex flex-col justify-center space-y-4">
               <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Diagnóstico por imagen con
                  tecnología avanzada</h2>
               <p class="max-w-[600px] text-blue-100 md:text-xl">En CIMRO combinamos la más alta tecnología con un
                  equipo médico especializado para ofrecerle un diagnóstico preciso y confiable.</p>
               <div class="flex flex-col gap-3 sm:flex-row"><a
                     class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-11 rounded-md px-8 bg-white text-blue-900 hover:bg-blue-50"
                     href="/agendar-cita">Agendar Cita</a><a
                     class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border bg-background hover:text-accent-foreground h-11 rounded-md px-8 border-white text-white hover:bg-white/10"
                     href="/servicios">Conocer Servicios</a></div>
            </div>
            <div class="flex items-center justify-center"><img alt="Equipo médico avanzado de CIMRO - Centro de diagnóstico por imagen en El Salvador" loading="lazy" width="500"
                  height="400" decoding="async" data-nimg="1" class="rounded-lg object-cover" style="color:transparent"
                  src="https://picsum.photos/400/500?random=1"></div>
         </div>
      </div>
      <div class="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
   </section>

   <section>

   </section>

   <section class="py-16">
      <div class="container px-4 md:px-6 max-w-[1300px] m-auto">
         <div class="mb-12 text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Lo que dicen nuestros pacientes</h2>
            <p class="mx-auto mt-4 max-w-[700px] text-gray-500">La satisfacción de nuestros pacientes es nuestro mayor
               orgullo.</p>
         </div>
         <div class="taggbox" style="width:100%;height:100%;overflow:auto;" data-widget-id="285784" website="1"></div>
      </div>
   </section>

   <section>
      <div class="mb-6 text-center">
         <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">Aseguradoras Afiliadas</h2>

      </div>
      <BransLoop />
   </section>

   <section class="bg-[#3d78bc] py-16 text-white">
      <div class="container px-4 md:px-6 m-auto">
         <div class="mx-auto max-w-3xl text-center">
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Estamos para servirle</h2>
            <p class="mx-auto mt-4 max-w-[700px] text-blue-100">Agende su cita hoy mismo y experimente la atención de
               calidad que merece.</p>
            <div class="mt-8 flex flex-col justify-center gap-4 sm:flex-row"><a
                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-11 rounded-md px-8 bg-white text-blue-600 hover:bg-blue-50"
                  href="/agendar-cita">Agendar Cita</a><a
                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border bg-background hover:text-accent-foreground h-11 rounded-md px-8 border-white text-white hover:bg-white/10"
                  href="/contactanos">Contactar</a></div>
         </div>
      </div>
   </section>



</template>

<style scoped>
/* Animación suave para las cards */
.hover\:scale-95:hover {
  transform: scale(0.99);
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

/* Truncado de texto */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>