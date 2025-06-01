<script setup>




</script>
<template>
  
    
        <div class="container flex h-23 items-center justify-between md:px-6 max-w-[1380px] mx-auto"><a
                class="flex items-center gap-2" href="/">
                <img alt="CIMRO Logo" width="140" height="60" decoding="async" data-nimg="1" class="h-16 w-auto"
                    style="color:transparent"
                    src="/public/logo-horizontal.png"></a>
            <nav class="hidden md:flex md:gap-6 lg:gap-10">
               <div class="flex items-center gap-6 lg:gap-8">
                 <NuxtLink class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600" to="/">Inicio
                </NuxtLink>

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
                    <span class="flex justify-center gap-1 4xl:text-lg text-sm font-bold">
                        Servicios
                        <UButton icon="i-lucide-chevron-down" class="p-0 border-0 dropdown-style-none" color="neutral"
                            variant="outline" />
                    </span>
                </UDropdownMenu>

                <NuxtLink class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600"
                    to="/noticias">Noticias</NuxtLink>
                <NuxtLink class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600" to="/videos">
                    Vídeos</NuxtLink>
                <NuxtLink class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600"
                    to="/turismo-salud">Turismo Salud</NuxtLink>
                <NuxtLink class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600"
                    to="/contactanos">Contáctanos</NuxtLink>
                    <NuxtLink class="items-center justify-center gap-2  rounded-md text-sm font-semibold  h-10 px-4 py-2 hidden bg-blue-600 hover:bg-blue-700 md:inline-flex text-white "
                    href="/agendar-cita">Agendar Cita</NuxtLink>
               </div>
            </nav>
         
        </div>

</template>