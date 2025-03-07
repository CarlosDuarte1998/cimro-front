<template>
    <div class="">
        <div class="flex justify-between text-white  bg-blue-950 sm:px-20 py-2">
            <div>Jl. Gatot Subroto Barat, Denpasar Utara</div>
            <div>
            </div>
        </div>
    </div>
    <nav class="sm:px-20 py-4 bg-white">
        <div class="w-full flex justify-between items-center">
            <div>
                <img src="~/assets/images/logo-cimro.png" alt="logo" class="w-38" />
            </div>
            <div class="flex justify-end ">
                <ul class="flex gap-3">
                    <li>
                        <nuxt-link to="/" class="text-blue-950">Home</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/about" class="text-blue-950">Quienes somos</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/services" class="text-blue-950">Servicios</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/contact" class="text-blue-950">Noticias</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/contact" class="text-blue-950">Videos</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/contact" class="text-blue-950">Galeria</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/contact" class="py-1 px-2  bg-black text-white rounded-sm">Contacto</nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="h-screen bg-amber-100"></div>
</template>
<style scoped>
</style>