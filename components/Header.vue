<script setup>

//Accion slideover

const open = ref(false);

const toggleSlideover = () => {
    open.value = !open.value;
};

// Manejar el estado del dropdown para accesibilidad
const dropdownOpen = ref(false);

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

</script>
<template>


    <div class="container flex sm:h-23 items-center justify-between py-4 px-5 md:px-6 max-w-[1380px] mx-auto">
        <a class="flex items-center gap-2" href="/" aria-label="CIMRO - Centro de Imágenes Médicas, ir al inicio">
            <img alt="CIMRO Logo" width="140" height="60" decoding="async" data-nimg="1" class="h-12 sm:h-16 w-auto"
                style="color:transparent" src="/logo-horizontal.png">
        </a>
        <nav class="hidden lg:flex md:gap-6 lg:gap-10" role="navigation" aria-label="Navegación principal">
            <div class="flex items-center gap-6 lg:gap-8">
                <a class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600"
                    href="/" aria-current="page">Inicio
                </a>

                <NuxtLink class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600"
                    to="/quienes-somos">Quiénes Somos</NuxtLink>

                <UDropdownMenu arrow :items="items = [
                    {
                        label: 'Todos los Servicios',
                        href: '/servicios'
                    },
                    {
                        label: 'Tomografía',
                        href: '/servicios/35'
                    },
                    {
                        label: 'Resonancia Magnética',
                        href: '/servicios/85'
                    }
                ]" class="p-0 border-0 " :ui="{
                    content: ' font-bold',
                }">
                    <UButton 
                        class="flex justify-center gap-1 4xl:text-lg text-sm font-bold p-0 border-0 dropdown-style-none" 
                        color="neutral"
                        variant="outline"
                        aria-label="Menú de servicios"
                        aria-haspopup="true"
                        :aria-expanded="dropdownOpen"
                        @click="toggleDropdown">
                        Servicios
                        <UIcon name="i-lucide-chevron-down" class="ml-1" aria-hidden="true" />
                    </UButton>
                </UDropdownMenu>

                <NuxtLink class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600"
                    to="/noticias">Noticias</NuxtLink>
                <NuxtLink class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600"
                    to="/videos">
                    Vídeos</NuxtLink>
                <NuxtLink class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600"
                    to="/turismo-salud">Turismo Salud</NuxtLink>
                <NuxtLink class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600"
                    to="/contactanos">Contáctanos</NuxtLink>
                <a class="items-center justify-center gap-2 rounded-md text-sm font-semibold h-10 px-4 py-2 hidden bg-blue-600 hover:bg-blue-700 md:inline-flex text-white min-h-[44px]"
                    href="https://wa.me/50377461474?text=Hola,%20quisiera%20informaci%C8%AFn"
                    aria-label="Contactar por WhatsApp para información">
                    Contáctanos
                </a>
            </div>
        </nav>

        <div class="lg:hidden">
            <UButton icon="lucide:align-justify" 
                color="neutral" 
                class="btn-menu-mobile min-h-[44px] min-w-[44px]" 
                variant="outline"
                size="xl" 
                @click="toggleSlideover"
                aria-label="Abrir menú de navegación"
                :aria-expanded="open"
                aria-controls="mobile-menu" />

            <USlideover title="Menú de navegación" v-model:open="open" id="mobile-menu">
                <template #body>

                    <div class="h-full flex flex-col justify-between">
                        <nav class="flex flex-col gap-4 p-4" role="navigation" aria-label="Navegación móvil">
                            <a class="text-gray-700 hover:text-blue-600 py-2" href="/">Inicio</a>
                            <NuxtLink class="text-gray-700 hover:text-blue-600 py-2" to="/quienes-somos" @click="toggleSlideover">Quiénes Somos
                            </NuxtLink>
                            <div class="">
                                <NuxtLink class="text-gray-700 hover:text-blue-600 py-2" to="/servicios" @click="toggleSlideover">Servicios</NuxtLink>
                                <div class="pl-5 hidden">
                                    <template v-for="(item, index) in items">
                                        <NuxtLink @click="toggleSlideover" class="text-gray-700 hover:text-blue-600 py-2" :to="item.href"
                                            v-if="index !== 0">
                                            {{ item.label }}
                                        </NuxtLink>
                                    </template>
                                </div>
                            </div>
                            <NuxtLink @click="toggleSlideover" class="text-gray-700 hover:text-blue-600 py-2" to="/noticias">Noticias</NuxtLink>
                            <NuxtLink @click="toggleSlideover" class="text-gray-700 hover:text-blue-600 py-2" to="/videos">Vídeos</NuxtLink>
                            <NuxtLink @click="toggleSlideover" class="text-gray-700 hover:text-blue-600 py-2" to="/turismo-salud">Turismo Salud
                            </NuxtLink>
                            <NuxtLink @click="toggleSlideover" class="text-gray-700 hover:text-blue-600 py-2" to="/contactanos">Contáctanos</NuxtLink>
                            <a class="text-gray-700 hover:text-blue-600 py-2" href="/agendar-cita">Agendar Cita</a>
                            
                        </nav>
                        <div class="p-4 text-center text-gray-700">
                            <img src="/logo-horizontal.png" alt="Logo CIMRO" srcset="" class="mx-auto mb-4 h-12 w-auto" loading="lazy" 
                            height="60" width="140">
                            
                        </div>
                    </div>

                </template>
            </USlideover>


        </div>

    </div>

</template>