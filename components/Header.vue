<script setup>

// Accion slideover
const open = ref(false);

const toggleSlideover = () => {
    open.value = !open.value;
};

// Manejar el estado del dropdown para accesibilidad
const dropdownOpen = ref(false);

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

// Obtener la ruta actual
const route = useRoute();

// Usar Lenis para scroll suave (opcional)
const { scrollToTop } = useLenis();

// Función para manejar el scroll al top cuando se hace clic en el logo
const handleLogoClick = () => {
    if (route.path === '/') {
        scrollToTop();
    }
};

</script>
<template>


    <div class="container flex sm:h-23 items-center justify-between py-4 px-5 md:px-6 max-w-[1380px] mx-auto">
        <a class="flex items-center gap-2" href="/" aria-label="CIMRO - Centro de Imágenes Radiológicas de Occidente, ir al inicio" @click="handleLogoClick">
            <img alt="CIMRO - Centro de Imágenes Radiológicas de Occidente Santa Ana" width="140" height="60" decoding="async" data-nimg="1" class="h-12 sm:h-16 w-auto"
                style="color:transparent" src="https://admin-cimro.gunssoft.tech/wp-content/uploads/2025/09/Recurso-31@2x.png">
        </a>
        <nav class="hidden lg:flex md:gap-6 lg:gap-10" role="navigation" aria-label="Navegación principal">
            <div class="flex items-center gap-6 lg:gap-8">
                <NuxtLink class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600 pb-1 border-b-2 border-transparent"
                    :class="{ 'border-blue-600 text-blue-600': route.path === '/' }"
                    to="/">Inicio
                </NuxtLink>

                <NuxtLink class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600 pb-1 border-b-2 border-transparent"
                    :class="{ 'border-blue-600 text-blue-600': route.path === '/quienes-somos' }"
                    to="/quienes-somos">Quiénes Somos</NuxtLink>
 <NuxtLink class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600 pb-1 border-b-2 border-transparent"
                    :class="{ 'border-blue-600 text-blue-600': route.path.startsWith('/servicios') }"
                    to="/servicios">Servicios</NuxtLink>

                <NuxtLink class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600 pb-1 border-b-2 border-transparent"
                    :class="{ 'border-blue-600 text-blue-600': route.path === '/noticias' }"
                    to="/noticias">Noticias</NuxtLink>
                <NuxtLink class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600 pb-1 border-b-2 border-transparent"
                    :class="{ 'border-blue-600 text-blue-600': route.path === '/videos' }"
                    to="/videos">
                    Vídeos</NuxtLink>
                <!-- <NuxtLink class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600 pb-1 border-b-2 border-transparent"
                    :class="{ 'border-blue-600 text-blue-600': route.path === '/turismo-salud' }"
                    to="/turismo-salud">Turismo Salud</NuxtLink> -->
                <NuxtLink class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600 pb-1 border-b-2 border-transparent"
                    :class="{ 'border-blue-600 text-blue-600': route.path === '/contactanos' }"
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
                            <NuxtLink class="text-gray-700 hover:text-blue-600 py-2 border-l-4 border-transparent pl-2"
                                :class="{ 'border-blue-600 text-blue-600 bg-blue-50': route.path === '/' }"
                                to="/" @click="toggleSlideover">Inicio</NuxtLink>
                            <NuxtLink class="text-gray-700 hover:text-blue-600 py-2 border-l-4 border-transparent pl-2"
                                :class="{ 'border-blue-600 text-blue-600 bg-blue-50': route.path === '/quienes-somos' }"
                                to="/quienes-somos" @click="toggleSlideover">Quiénes Somos
                            </NuxtLink>
                            <NuxtLink class="text-gray-700 hover:text-blue-600 py-2 border-l-4 border-transparent pl-2"
                                :class="{ 'border-blue-600 text-blue-600 bg-blue-50': route.path.startsWith('/servicios') }"
                                to="/servicios" @click="toggleSlideover">Servicios</NuxtLink>

                            <NuxtLink @click="toggleSlideover" class="text-gray-700 hover:text-blue-600 py-2 border-l-4 border-transparent pl-2"
                                :class="{ 'border-blue-600 text-blue-600 bg-blue-50': route.path === '/noticias' }"
                                to="/noticias">Noticias</NuxtLink>
                            <NuxtLink @click="toggleSlideover" class="text-gray-700 hover:text-blue-600 py-2 border-l-4 border-transparent pl-2"
                                :class="{ 'border-blue-600 text-blue-600 bg-blue-50': route.path === '/videos' }"
                                to="/videos">Vídeos</NuxtLink>
                            <!-- <NuxtLink @click="toggleSlideover" class="text-gray-700 hover:text-blue-600 py-2 border-l-4 border-transparent pl-2"
                                :class="{ 'border-blue-600 text-blue-600 bg-blue-50': route.path === '/turismo-salud' }"
                                to="/turismo-salud">Turismo Salud
                            </NuxtLink> -->
                            <NuxtLink @click="toggleSlideover" class="text-gray-700 hover:text-blue-600 py-2 border-l-4 border-transparent pl-2"
                                :class="{ 'border-blue-600 text-blue-600 bg-blue-50': route.path === '/contactanos' }"
                                to="/contactanos">Contáctanos</NuxtLink>
                           
                            
                        </nav>
                        <div class="p-4 text-center text-gray-700">
                            <img src="https://admin-cimro.gunssoft.tech/wp-content/uploads/2025/09/Recurso-31@2x.png" alt="Logo CIMRO" srcset="" class="mx-auto mb-4 h-12 w-auto" loading="lazy" 
                            height="60" width="140">
                            
                        </div>
                    </div>

                </template>
            </USlideover>


        </div>

    </div>

</template>

<style scoped>
/* Estilos para el menú desktop - línea horizontal abajo */
.border-blue-600.border-b-2 {
    border-bottom-color: #2563eb !important;
    border-bottom-width: 2px !important;
}

/* Estilos para el menú móvil - línea vertical a la izquierda */
.border-l-4.border-blue-600 {
    border-left-color: #2563eb !important;
    border-left-width: 4px !important;
}

/* Asegurar que las transiciones funcionen suavemente */
.transition-colors {
    transition: color 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
}

/* Fondo activo para móvil */
.bg-blue-50 {
    background-color: #eff6ff !important;
}
</style>