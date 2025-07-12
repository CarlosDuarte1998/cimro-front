<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useConfigStore } from '#imports';

// Store
const configStore = useConfigStore();

// Estado de carga
const isLoading = ref(true);

// Computed que devuelve los banners
const bannerMain = computed(() => configStore.bannerMain);

// Swiper
const containerRef = ref(null);

// SEO Keywords para CIMRO - Centro de Imágenes Radiológicas de Occidente
const seoKeywords = [
  'CIMRO', 'Centro de Imágenes Radiológicas de Occidente', 'Santa Ana',
  'tomografía computarizada Santa Ana', 'ultrasonidos Santa Ana', 'rayos x Santa Ana',
  'mamografía Santa Ana', 'cardiología Santa Ana', 'diagnóstico por imágenes El Salvador',
  'radiología occidente El Salvador', 'centro médico Santa Ana'
];

// Configuración del swiper - solo efecto fade sin conflictos
const swiperConfig = {
  effect: "fade",
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  fadeEffect: {
    crossFade: true, // Esto evita que se vean las imágenes superpuestas
  },
  speed: 1000, // Velocidad de transición más suave
  // Eliminamos creativeEffect ya que entra en conflicto con fade
};

onMounted(() => {
  // Simular tiempo de carga y luego mostrar el banner
  setTimeout(() => {
    isLoading.value = false;
    // Inicializar el swiper después de que el DOM se actualice
    nextTick(() => {
      if (containerRef.value) {
        // Asignar la configuración al elemento swiper
        Object.assign(containerRef.value, swiperConfig);
        // Inicializar el swiper
        containerRef.value.initialize();
      }
    });
  }, 2000); // Ajusta el tiempo según tus necesidades
});
</script>

<template>
  <!-- Skeleton Loader para CIMRO - Centro de Imágenes Radiológicas de Occidente -->
  <div 
    v-if="isLoading" 
    class="relative h-[500px] sm:h-[700px] w-full bg-gray-200 animate-pulse"
    aria-label="Cargando contenido de CIMRO Santa Ana"
  >
    <div class="absolute inset-0 bg-gradient-to-r from-gray-800/80 to-transparent flex items-center justify-start px-16">
      <div class="z-10 space-y-4">
        <!-- Skeleton para el título -->
        <div class="bg-gray-300 h-8 w-96 max-w-lg rounded animate-pulse"></div>
        <div class="bg-gray-300 h-8 w-80 max-w-lg rounded animate-pulse"></div>
        
        <!-- Skeleton para la descripción -->
        <div class="space-y-2 max-w-md">
          <div class="bg-gray-400 h-4 w-full rounded animate-pulse"></div>
          <div class="bg-gray-400 h-4 w-3/4 rounded animate-pulse"></div>
        </div>
        
        <!-- Skeleton para el botón -->
        <div class="bg-gray-500 h-12 w-32 rounded-md animate-pulse mt-6"></div>
      </div>
    </div>
  </div>

  <!-- Banner principal CIMRO - Centro de Imágenes Radiológicas de Occidente -->
  <swiper-container 
    v-if="!isLoading" 
    ref="containerRef" 
    :init="false"
    role="banner"
    aria-label="Banner principal de CIMRO - Centro de Imágenes Radiológicas de Occidente, Santa Ana El Salvador"
  >
    <template v-for="(slide, index) in bannerMain" :key="index">
      <swiper-slide 
        class="relative overflow-hidden" 
        :aria-label="`Slide ${index + 1}: ${slide.description.title || 'Servicios de CIMRO Santa Ana'}`"
      >
        <div class="relative h-[500px] sm:h-[700px] w-full overflow-hidden">
          <template v-for="(item, index2) in slide.images" :key="index2">
            <img 
              :src="item.url" 
              :alt="`CIMRO Centro de Imágenes Radiológicas de Occidente Santa Ana - ${slide.description.title || 'Servicios de diagnóstico por imágenes'}`" 
              class="w-full h-full object-cover hidden sm:block absolute inset-0" 
              v-if="index2 == 'desktop'" 
              loading="lazy"
            />
            <img 
              :src="item.url" 
              :alt="`CIMRO Centro de Imágenes Radiológicas de Occidente Santa Ana - ${slide.description.title || 'Servicios radiológicos El Salvador'}`" 
              class="sm:hidden w-full h-full object-cover absolute inset-0" 
              loading="lazy" 
              v-else
            />
          </template>

          <div
            class="absolute inset-0 bg-gradient-to-r from-black/100 to-transparent flex items-center justify-start px-16 z-10" 
            v-if="slide.description.title!=''"
            itemScope 
            itemType="https://schema.org/MedicalBusiness"
          >
            <div class="z-20">
              <h1 class="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl max-w-lg" itemProp="headline">
                {{ slide.description.title }}
              </h1>
              <p class="text-lg text-white max-w-md" v-if="slide.description.shortDescription" itemProp="description">
                {{ slide.description.shortDescription }}
              </p>
              <a :href="slide.description.link"
                class="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors min-h-[44px] min-w-[44px] font-medium"
                :aria-label="`${slide.description.btnLabel || 'Conocer más'} - ${slide.description.title} - CIMRO Centro de Imágenes Radiológicas de Occidente Santa Ana`"
                :title="`${slide.description.btnLabel || 'Conocer más'} sobre ${slide.description.title} en CIMRO Santa Ana`">
                {{ slide.description.btnLabel || 'Conocer más' }}
              </a>
            </div>
          </div>
        </div>
      </swiper-slide>
    </template>
  </swiper-container>

  <!-- Contenido SEO oculto para mejorar indexación -->
  <div class="sr-only" aria-hidden="true">
    <h2>CIMRO - Centro de Imágenes Radiológicas de Occidente Santa Ana</h2>
    <p>
      Servicios de diagnóstico por imágenes en Santa Ana, El Salvador. 
      Tomografía computarizada multicorte, ultrasonidos convencionales y especiales, 
      rayos X convencionales y dentales, mamografía digital, cardiología.
      Centro radiológico en el occidente de El Salvador con aseguradoras afiliadas.
    </p>
    <span>{{ seoKeywords.join(', ') }}</span>
  </div>
</template>

<style scoped>
/* Asegurar que no haya superposiciones en las transiciones */
swiper-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

swiper-slide {
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

swiper-slide.swiper-slide-active {
  opacity: 1;
}

/* Asegurar que las imágenes no se superpongan */
swiper-slide img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

/* Asegurar que el contenido de texto esté por encima */
swiper-slide .absolute {
  z-index: 10;
}

/* Prevenir cualquier overflow que pueda causar problemas visuales */
.relative {
  overflow: hidden;
}
</style>
