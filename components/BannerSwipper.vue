<script setup>
import { ref, computed, onMounted } from 'vue';
import { useConfigStore } from '#imports';

// Store
const configStore = useConfigStore();

// Computed que devuelve los banners
const bannerMain = computed(() => configStore.bannerMain);

// Swiper
const containerRef = ref(null);
const slides = ref(Array.from({ length: 10 }));

const swiper = useSwiper(containerRef, {
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
});

onMounted(() => {
 
});
</script>

<template>
  <swiper-container ref="containerRef" :init="false">
    <template v-for="(slide, index) in bannerMain" :key="index">
      <swiper-slide class="relative">
        <div class="relative h-[700px] w-full">
          <template v-for="(item, index2) in slide.images" :key="index2">
            <img :src="item.url" :alt="`Banner Image ${index2}`" class="w-full h-full object-cover hidden sm:block"  v-if="index2 == 'desktop'" loading="lazy"/>
            <img :src="item.url" :alt="`Banner Image ${index2}`" class="sm:hidden" srcset="" loading="lazy" v-else>
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
              <button
                class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
               <a :href="slide.description.link">{{ 
               slide.description.btnLabel || 'Ir'
               }}</a>
              </button>
            </div>
          </div>
        </div>
      </swiper-slide>
    </template>
  </swiper-container>
</template>

<style scoped></style>
