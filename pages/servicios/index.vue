<template>
    <section class="bg-blue-900 py-16 text-white">
        <div class="container px-4 md:px-6">
            <div class="mx-auto max-w-3xl text-center">
                <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nuestros Servicios</h1>
                <p class="mt-4 text-blue-100 md:text-xl">Ofrecemos una amplia gama de servicios de diagnóstico por
                    imagen con la más alta tecnología y personal especializado.</p>
            </div>
        </div>
    </section>

    <section class="py-16">
        <div class="container max-w-[1300px] mx-auto px-4 md:px-6">
            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 4xl:grid-cols-4">
                <NuxtLink to="/servicios/tomografia" class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm transition-all hover:shadow-md" v-for="service in 6" :key="service">
                    <div class="flex flex-col space-y-1.5 p-6">
                        <div class="text-2xl font-semibold leading-none tracking-tight">Tomografía Computarizada
                            Multicorte</div>
                        <div class="text-sm text-muted-foreground">Imágenes detalladas de alta resolución</div>
                    </div>
                    <div class="p-6 pt-0"><img alt="Tomografía Computarizada" loading="lazy" width="350" height="200"
                            decoding="async" data-nimg="1" class="mb-4 rounded-lg object-cover"
                            :src="`https://picsum.photos/400/500?random=${service}`" style="color: transparent;">
                        <p class="text-sm text-gray-500">Nuestros equipos de última generación permiten obtener imágenes
                            precisas con la menor dosis de radiación posible. Realizamos estudios simples y contrastados
                            de todas las regiones del cuerpo.</p>
                    </div>
                    <div class="flex items-center p-6 pt-0"><a
                            class="flex items-center text-sm font-medium text-blue-600" href="/servicios/tomografia">Más
                            información <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-arrow-right ml-1 h-4 w-4">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg></a></div>
                        </NuxtLink>
              
            </div>
        </div>
    </section>


</template>


<script>

</script>