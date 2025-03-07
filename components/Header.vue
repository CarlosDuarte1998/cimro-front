<template>
    <div class="">
        <div class="flex justify-between text-white  bg-blue-950 sm:px-20 py-2">
            <div>Jl. Gatot Subroto Barat, Denpasar Utara</div>
            <div>
                <ul>
                    <li>
                        <a href="#" class="hover:text-yellow-500">
                            <font-awesome icon="user" style="font-size: 30px" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <nav class="sm:px-20 py-4 bg-white">
        <div class="w-full flex justify-between items-center">
            <div>
                <img src="~/assets/images/logo-cimro.png" alt="logo" class="w-38" />
            </div>
            <div class="flex justify-end ">
                <ul class="flex gap-4 font-medium">
                    <li>
                        <nuxt-link to="/" class="">Home</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/about" class="">Quienes somos</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/services" class="">Servicios</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/contact" class="">Noticias</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/contact" class="">Videos</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/contact" class="">Galeria</nuxt-link>
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