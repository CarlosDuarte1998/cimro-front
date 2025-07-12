<script setup>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import { useConfigStore } from "#imports";

//store
const configStore = useConfigStore();

const socialMediaLinks = computed(() => configStore.socialMedia);
useHead({
  title: 'CIMRO - Centro de Imágenes Médicas y Radiología',
  script: [
    {
      src: 'https://widget.taggbox.com/embed.min.js',
      type: 'text/javascript',
      async: true
    }
  ]
})

</script>
<template>
   <div class="flex min-h-screen flex-col text-gray-900">
      <!-- Skip navigation link -->
      <a href="#main-content" class="skip-link">Saltar al contenido principal</a>
      
      <div class="py-1 bg-[#3d78bc] text-center text-white">
        <div class="container flex items-center justify-between px-4 md:px-6 max-w-[1380px] mx-auto">
          <div>
            <a href="https://www.google.com/maps/place/CIMRO/@13.980591,-89.556548,2188m/data=!3m1!1e3!4m6!3m5!1s0x8f62e8985656487b:0x58c9970ccf7141de!8m2!3d13.9805909!4d-89.5565483!16s%2Fg%2F11c54f45mc?hl=es&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D" 
               class="sm:px-3 hidden sm:flex justify-center gap-1 items-center px-2 text-sm font-medium" 
               target="_blank" 
               rel="noopener noreferrer"
               aria-label="Ver ubicación de CIMRO en Google Maps">
              <UIcon name="i-flowbite-map-pin-alt-solid" class="size-5" aria-hidden="true" />
              Urb San Miguelito, Santa Ana, El Salvador
            </a>
          </div>
          <div class="flex items-center gap-2">
            <a :href="socialMediaLinks.facebook" 
               v-if="socialMediaLinks.facebook" 
               target="_blank" 
               rel="noopener noreferrer"
               aria-label="Seguir a CIMRO en Facebook">
              <UIcon name="i-flowbite-facebook-solid" class="size-5" aria-hidden="true" />
            </a>
            <a :href="socialMediaLinks.instagram" 
               v-if="socialMediaLinks.instagram" 
               target="_blank" 
               rel="noopener noreferrer"
               aria-label="Seguir a CIMRO en Instagram">
              <UIcon name="i-flowbite-instagram-solid" class="size-5" aria-hidden="true" />
            </a>
            <a :href="socialMediaLinks.twitter" 
               v-if="socialMediaLinks.twitter" 
               target="_blank" 
               rel="noopener noreferrer"
               aria-label="Seguir a CIMRO en Twitter">
              <UIcon name="i-flowbite-twitter-solid" class="size-5" aria-hidden="true" />
            </a>
            <a :href="socialMediaLinks.youtube" 
               v-if="socialMediaLinks.youtube" 
               target="_blank" 
               rel="noopener noreferrer"
               aria-label="Suscribirse al canal de YouTube de CIMRO">
              <UIcon name="i-flowbite-youtube-solid" class="size-5" aria-hidden="true" />
            </a>
            <a :href="`tel:${socialMediaLinks.contact}`" 
               v-if="socialMediaLinks.contact" 
               class="ml-2" 
               target="_blank" 
               rel="noopener noreferrer"
               :aria-label="`Llamar a CIMRO al ${socialMediaLinks.contact}`">
              <UIcon name="i-flowbite-phone-solid" class="size-5" aria-hidden="true" />
            </a>
            <a :href="`mailto:${socialMediaLinks.email}`" 
               v-if="socialMediaLinks.email" 
               class="ml-2" 
               target="_blank" 
               rel="noopener noreferrer"
               :aria-label="`Enviar correo a CIMRO a ${socialMediaLinks.email}`">
              <UIcon name="i-flowbite-envelope-solid" class="size-5" aria-hidden="true" />
            </a>
          </div>
        </div>
    </div>
     <header class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        <Header />
    </header>
    <main id="main-content">
        <slot />
    </main>
    
    <footer>
        <Footer />
    </footer>
   </div>

</template>