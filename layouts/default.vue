<script setup>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

</script>
<template>
    <header>
        <Header />
    </header>
    <main>
        <slot />
    </main>
    <footer>
        <Footer />
    </footer>

</template>