<script setup>




</script>
<template>


    <div class="container flex sm:h-23 items-center justify-between py-4 px-5 md:px-6 max-w-[1380px] mx-auto"><a
            class="flex items-center gap-2" href="/">
            <img alt="CIMRO Logo" width="140" height="60" decoding="async" data-nimg="1" class="h-12 sm:h-16 w-auto"
                style="color:transparent" src="/logo-horizontal.png"></a>
        <nav class="hidden lg:flex md:gap-6 lg:gap-10">
            <div class="flex items-center gap-6 lg:gap-8">
                <a class="4xl:text-lg text-sm font-bold text-gray-700 transition-colors hover:text-blue-600"
                    href="/">Inicio
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
                    <span class="flex justify-center gap-1 4xl:text-lg text-sm font-bold">
                        Servicios
                        <UButton icon="i-lucide-chevron-down" class="p-0 border-0 dropdown-style-none" color="neutral"
                            variant="outline" />
                    </span>
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
                <a class="items-center justify-center gap-2  rounded-md text-sm font-semibold  h-10 px-4 py-2 hidden bg-blue-600 hover:bg-blue-700 md:inline-flex text-white "
                    href="/agendar-cita">Agendar Cita</a>
            </div>
        </nav>

        <div class="lg:hidden">

            <USlideover title="Menu">
                <UButton icon="lucide:align-justify" color="neutral" class="btn-menu-mobile" variant="outline"
                    size="xl" />

                <template #body>

                    <div class="h-full flex flex-col justify-between">
                        <nav class="flex flex-col gap-4 p-4  ">
                            <a class="text-gray-700 hover:text-blue-600" href="/">Inicio</a>
                            <NuxtLink class="text-gray-700 hover:text-blue-600" to="/quienes-somos">Quiénes Somos
                            </NuxtLink>
                            <div class="">
                                <NuxtLink class="text-gray-700 hover:text-blue-600" to="/servicios">Servicios</NuxtLink>
                                <div class="pl-5 hidden">
                                    <template v-for="(item, index) in items">
                                        <NuxtLink class="text-gray-700 hover:text-blue-600" :to="item.href"
                                            v-if="index !== 0">
                                            {{ item.label }}
                                        </NuxtLink>
                                    </template>
                                </div>
                            </div>
                            <NuxtLink class="text-gray-700 hover:text-blue-600" to="/noticias">Noticias</NuxtLink>
                            <NuxtLink class="text-gray-700 hover:text-blue-600" to="/videos">Vídeos</NuxtLink>
                            <NuxtLink class="text-gray-700 hover:text-blue-600" to="/turismo-salud">Turismo Salud
                            </NuxtLink>
                            <NuxtLink class="text-gray-700 hover:text-blue-600" to="/contactanos">Contáctanos</NuxtLink>
                            <a class="text-gray-700 hover:text-blue-600" href="/agendar-cita">Agendar Cita</a>
                        </nav>
                        <div class="p-4 text-center text-gray-700">
                            <img src="/logo-horizontal.png" alt="Logo" srcset="" class="mx-auto mb-4 h-12 w-auto" loading="lazy" 
                            height="60" width="140">
                            
                        </div>
                    </div>

                </template>
            </USlideover>


        </div>

    </div>

</template>