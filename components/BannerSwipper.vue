<script setup lang="ts">

import { useConfigStore } from '#imports';

const configStore = useConfigStore();
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
    console.log(swiper.instance);
});
</script>

<template>
    <ClientOnly>
        <swiper-container ref="containerRef" :init="false">
            <swiper-slide class="relative" v-for="(slide, index) in configStore.bannerMain" :key="index">
                <div class="relative h-[700px] w-full">
                    <img :src="slide.image.url" alt="Banner Image 1"
                        class="w-full h-full object-cover" />
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-black/100 to-transparent flex items-center justify-start px-16">
                        <div>
                            <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl max-w-lg">
                                Tecnología de vanguardia para su salud {{ index }}
                            </h2>
                            <p class="text-lg text-white max-w-md">
                                Descubre cómo nuestras instalaciones y equipos avanzados pueden
                                mejorar tu bienestar.
                            </p>
                            <button
                                class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                Conoce nuestros servicios
                            </button>
                        </div>
                    </div>
                </div>
            </swiper-slide>

            <!-- <swiper-slide v-for="(slide, idx) in slides" :key="idx" style="background-color: black; color: white;">
                Slide {{ idx + 1 }}
            </swiper-slide> -->
        </swiper-container>

    </ClientOnly>
</template>

<style scoped></style>
