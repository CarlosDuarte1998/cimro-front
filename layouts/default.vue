<script setup>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

useHead({
  title: 'CIMRO - Centro de Imágenes Médicas y Radiología',
  script: [
    {
      src: 'https://widget.taggbox.com/embed.min.js',
      type: 'text/javascript'
    }
  ]
})

</script>
<template>
   <div class="flex min-h-screen flex-col  text-gray-900">
      <div class="py-1 bg-[#3d78bc] text-center text-white  ">
        <div class="container flex  items-center justify-between px-4 md:px-6 max-w-[1380px] mx-auto">
          <div><a href="https://www.google.com/maps/place/CIMRO/@13.980591,-89.556548,2188m/data=!3m1!1e3!4m6!3m5!1s0x8f62e8985656487b:0x58c9970ccf7141de!8m2!3d13.9805909!4d-89.5565483!16s%2Fg%2F11c54f45mc?hl=es&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D" class="sm:px-3 flex justify-center gap-1 items-center px-2 text-sm font-medium" target="_blank" rel="noopener noreferrer">
              <UIcon name="i-flowbite-map-pin-alt-solid" class="size-5" />
              Urb San Miguelito, Santa Ana, El Salvador
          </a></div>
          <div>
            
          </div>
        </div>
    </div>
     <header class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        <Header />
    </header>
    <main>
        <slot />
    </main>
    
    <footer>
        <Footer />
    </footer>
   </div>

</template>