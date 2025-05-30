<script setup>




</script>
<template>
    
        <div class="container flex h-16 items-center justify-between px-4 md:px-6 max-w-[1380px] mx-auto"><a
                class="flex items-center gap-2" href="/">
                <img alt="CIMRO Logo" width="140" height="60" decoding="async" data-nimg="1" class="h-16 w-auto"
                    style="color:transparent"
                    src="https://www.pierrecardin.com.sv/test/assets/logoPierre-DNhuipje.png"></a>
            <nav class="hidden md:flex md:gap-6 lg:gap-10">
                <NuxtLink class="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600" to="/">Inicio
                </NuxtLink>

                <NuxtLink class="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
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
                ]" class="p-0 border-0" :ui="{
                    content: 'w-48'
                }">
                    <span class="flex justify-center gap-1 text-sm font-medium">
                        Servicios
                        <UButton icon="i-lucide-chevron-down" class="p-0 border-0 dropdown-style-none" color="neutral"
                            variant="outline" />
                    </span>
                </UDropdownMenu>

                <NuxtLink class="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
                    to="/noticias">Noticias</NuxtLink>
                <NuxtLink class="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600" to="/videos">
                    Vídeos</NuxtLink>
                <NuxtLink class="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
                    to="/turismo-salud">Turismo Salud</NuxtLink>
                <NuxtLink class="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
                    to="/contactanos">Contáctanos</NuxtLink>
            </nav>
            <div class="flex items-center gap-4">
                <NuxtLink class="items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 hidden bg-blue-600 hover:bg-blue-700 md:inline-flex text-white"
                    href="/agendar-cita">Agendar Cita</NuxtLink><button
                    class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 md:hidden"
                    type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-«Rbdb»"
                    data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-menu h-5 w-5">
                        <line x1="4" x2="20" y1="12" y2="12"></line>
                        <line x1="4" x2="20" y1="6" y2="6"></line>
                        <line x1="4" x2="20" y1="18" y2="18"></line>
                    </svg><span class="sr-only">Toggle menu</span></button>
            </div>
        </div>

</template>