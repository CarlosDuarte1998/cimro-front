<template>

    <section class="overflow-hidden py-20 text-white">
        <div class="container relative px-4 md:px-6">
            <div class="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
            <div class="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl"></div>
            <div
                class="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/10 blur-2xl">
            </div>
            <div class="relative">
                <div class="mx-auto max-w-4xl text-center">
                    <div
                        class="mb-6 inline-flex items-center rounded-full border border-blue-200/30 bg-blue-900/30 px-4 py-2 backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-plane mr-2 h-4 w-4 text-blue-200">
                            <path
                                d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z">
                            </path>
                        </svg><span class="text-sm font-medium text-blue-100">Salud y Bienestar Internacional</span>
                    </div>
                    <h1 class="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Turismo de Salud <span
                            class="text-blue-200">en CIMRO</span></h1>
                    <p class="mx-auto mb-8 max-w-2xl text-lg text-blue-100">Combine atención médica de excelencia con
                        una experiencia turística inolvidable. Ofrecemos paquetes personalizados para pacientes
                        internacionales con servicios de diagnóstico de primer nivel.</p>
                    <div class="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                            <p class="text-3xl font-bold text-white">+500</p>
                            <p class="text-sm text-blue-100">Pacientes Internacionales</p>
                        </div>
                        <div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                            <p class="text-3xl font-bold text-white">15+</p>
                            <p class="text-sm text-blue-100">Países Atendidos</p>
                        </div>
                        <div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                            <p class="text-3xl font-bold text-white">98%</p>
                            <p class="text-sm text-blue-100">Satisfacción</p>
                        </div>
                        <div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                            <p class="text-3xl font-bold text-white">24/7</p>
                            <p class="text-sm text-blue-100">Asistencia</p>
                        </div>
                    </div>
                    <div class="flex flex-col items-center justify-center gap-4 sm:flex-row"><button
                            class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium  h-11 rounded-md px-8 min-w-[180px] bg-white text-blue-700 hover:bg-blue-50">Solicitar
                            Información</button><button
                            class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium  border bg-background hover:text-accent-foreground h-11 rounded-md px-8 min-w-[180px] border-blue-200 text-white hover:bg-white/10">Ver
                            Paquetes</button></div>
                </div>
            </div>
            <div class="mx-auto mt-16 max-w-5xl">
                <div class="relative h-[200px] w-full overflow-hidden rounded-xl md:h-[250px]"><img
                        alt="Destinos de turismo médico" loading="lazy" decoding="async" data-nimg="fill"
                        class="object-cover" src="/placeholder.svg?height=250&amp;width=1200"
                        style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;">
                    <div class="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-6 text-center">
                        <p class="text-lg font-medium text-white">Destinos de turismo médico de clase mundial</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>