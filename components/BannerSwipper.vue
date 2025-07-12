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
const slides = ref(Array.from({ length: 10 }));

// Configuración del swiper
const swiperConfig = {
  effect: "fade",
  loop: true,
  autoplay: {
    delay: 5000,
  },
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      shadow: true,
      translate: [0, 0, -400],
    },
  },
};

const swiper = useSwiper(containerRef, swiperConfig);

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
  <!-- Skeleton Loader -->
  <div v-if="isLoading" class="relative h-[500px] sm:h-[700px] w-full bg-gray-200 animate-pulse">
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

  <!-- Banner real -->
  <swiper-container v-else ref="containerRef" :init="false" v-show="!isLoading">
    <template v-for="(slide, index) in bannerMain" :key="index">
      <swiper-slide class="relative">
        <div class="relative h-[500px] sm:h-[700px] w-full">
          <template v-for="(item, index2) in slide.images" :key="index2">
            <img :src="item.url" :alt="`Banner Image ${index2}`" class="w-full h-full object-cover hidden sm:block"  v-if="index2 == 'desktop'" loading="lazy"/>
            <img :src="item.url" :alt="`Banner Image ${index2}`" class="sm:hidden w-full h-full object-cover" srcset="" loading="lazy" v-else>
          </template>

          <div
            class="absolute inset-0 bg-gradient-to-r from-black/100 to-transparent flex items-center justify-start px-16" v-if="slide.description.title!=''">
            <div class="z-10">
              <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl max-w-lg">
                {{ slide.description.title }}
              </h2>
              <p class="text-lg text-white max-w-md" v-if="slide.description.shortDescription">
                {{ slide.description.shortDescription }}
              </p>
              <a :href="slide.description.link"
                class="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors min-h-[44px] min-w-[44px] font-medium"
                :aria-label="`${slide.description.btnLabel || 'Ir'} - ${slide.description.title}`">
                {{ slide.description.btnLabel || 'Ir' }}
              </a>
            </div>
          </div>
        </div>
      </swiper-slide>
    </template>
  </swiper-container>
</template>

<style scoped></style>
