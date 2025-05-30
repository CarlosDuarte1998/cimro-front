<script setup>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

</script>
<template>
   <div class="flex min-h-screen flex-col  text-gray-900">
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