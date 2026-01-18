<template class="flex flex-col items-center justify-center gap-4 px-4 py-8 md:px-6 lg:px-8 max-w-[1380px] mx-auto">
    <section class="bg-blue-900 py-16 text-white">
        <div class="container px-4 md:px-6">
            <div class="mx-auto max-w-3xl text-center">
                <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Quiénes Somos</h1>
                    <p class="mt-4 text-blue-100 md:text-xl">{{ qs.descripcion }}</p>
            </div>
        </div>
    </section>
    <section class="py-16">
        <div class="container px-4 md:px-6 max-w-[1300px] mx-auto">
            <div class="grid gap-12 md:grid-cols-2">
                <div>
                    <h2 class="mb-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nuestra Historia</h2>
                    <div class="space-y-4 text-gray-600 text-lg">
                        <div v-html="qs.getHistoriaHTML"></div>
                    </div>
                </div>
                <div class="flex items-center justify-center"><img alt="Instalaciones de CIMRO" loading="lazy"
                        width="500" height="400" decoding="async" data-nimg="1" class="rounded-lg object-cover"
                        src="https://admin-cimro.gunssoft.tech/wp-content/uploads/2025/07/PORTADA-scaled.jpg" style="color: transparent;"></div>
            </div>
        </div>
    </section>

    <section class="bg-gray-50 py-16">
        <div class="container px-4 md:px-6 max-w-[1300px] mx-auto">
            <div class="grid gap-8 md:grid-cols-3 text-lg">
                <div class="rounded-lg bg-white p-6 shadow-sm">
                    <h3 class="mb-4 text-xl font-bold text-gray-900">Misión</h3>
                    <p class="text-gray-600">{{qs.mision}} </p>
                </div>
                <div class="rounded-lg bg-white p-6 shadow-sm">
                    <h3 class="mb-4 text-xl font-bold text-gray-900">Visión</h3>
                    <p class="text-gray-600">{{qs.vision}} </p>
                </div>
                <div class="rounded-lg bg-white p-6 shadow-sm">
                    <h3 class="mb-4 text-xl font-bold text-gray-900">Valores</h3>
                    <ul class="space-y-2 text-gray-600">
                        <li v-for="(NombreValor, valor) in qs.valores" :key="valor" class="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-circle-check-big mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                <path d="m9 11 3 3L22 4"></path>
                            </svg>
                            <span>{{ NombreValor }}</span>
                        </li>
                    </ul>
                    <!-- <ul class="space-y-2 text-gray-600">
                        <li class="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-circle-check-big mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                <path d="m9 11 3 3L22 4"></path>
                            </svg><span>Confianza</span></li>
                        <li class="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-circle-check-big mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                <path d="m9 11 3 3L22 4"></path>
                            </svg><span>Empatía y Calidez</span></li>
                        <li class="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-circle-check-big mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                <path d="m9 11 3 3L22 4"></path>
                            </svg><span>Calidad</span></li>
                        <li class="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-circle-check-big mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                <path d="m9 11 3 3L22 4"></path>
                            </svg><span>Ética y Profesionalismo</span></li>
                        <li class="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-circle-check-big mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                <path d="m9 11 3 3L22 4"></path>
                            </svg><span>Trabajo en equipo</span></li>
                    </ul> -->
                </div>
            </div>
        </div>
    </section>

    <section class="py-16">
        <div class="container px-4 md:px-6 max-w-[1300px] mx-auto">
            <div class="mb-12 text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nuestro Equipo</h2>
                <p class="mx-auto mt-4 max-w-[700px] text-gray-500">Contamos con un equipo de profesionales altamente
                    calificados y comprometidos con su salud.</p>
            </div>
            <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <!-- INICIO DE PERSONAS -->
                 <div v-for="(persona, index) in (qs.equipo as any[])" :key="index" class="text-center">
                    <div class="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full">
                        <img :alt="(persona as any).nombre" :src="(persona as any).perfil" loading="lazy"
                            decoding="async" class="h-full w-full object-cover" style="color: transparent;" />
                    </div>

                    <h3 class="text-lg font-medium">
                        {{ (persona as any).nombre }}
                    </h3>
                    <p class="text-sm text-gray-500">
                        {{ (persona as any).puesto }}
                    </p>
                    <p class="mt-2 text-sm text-gray-600">
                        {{ (persona as any).descripcion }}
                    </p>
                </div>
                <!-- FIN DE PERSONAS -->
                <!-- <div class="text-center">
                    <div class="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full">
                        <img alt="Dr. Roberto Martínez" loading="lazy" width="160" height="160" decoding="async" data-nimg="1"
                            class="h-full w-full object-cover" 
                            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=160&h=160&fit=crop&crop=face&auto=format"
                            style="color: transparent;">
                    </div>
                    <h3 class="text-lg font-medium">Dr. Roberto Martínez</h3>
                    <p class="text-sm text-gray-500">Director Médico</p>
                    <p class="mt-2 text-sm text-gray-600">Especialista en Radiología Diagnóstica con más de 20 años de experiencia en tomografía computarizada.</p>
                </div>
                <div class="text-center">
                    <div class="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full">
                        <img alt="Dra. María Elena García" loading="lazy" width="160" height="160" decoding="async" data-nimg="1"
                            class="h-full w-full object-cover" 
                            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=160&h=160&fit=crop&crop=face&auto=format"
                            style="color: transparent;">
                    </div>
                    <h3 class="text-lg font-medium">Dra. María Elena García</h3>
                    <p class="text-sm text-gray-500">Radióloga Especialista</p>
                    <p class="mt-2 text-sm text-gray-600">Experta en Radiología Intervencionista y Diagnóstico por Imagen con certificación internacional.</p>
                </div>
                <div class="text-center">
                    <div class="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full">
                        <img alt="Dr. Carlos Hernández" loading="lazy" width="160" height="160" decoding="async" data-nimg="1"
                            class="h-full w-full object-cover" 
                            src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=160&h=160&fit=crop&crop=face&auto=format"
                            style="color: transparent;">
                    </div>
                    <h3 class="text-lg font-medium">Dr. Carlos Hernández</h3>
                    <p class="text-sm text-gray-500">Cardiólogo Intervencionista</p>
                    <p class="mt-2 text-sm text-gray-600">Especialista en Cardiología Intervencionista y Tomografía Cardíaca con más de 15 años de experiencia.</p>
                </div>
                <div class="text-center">
                    <div class="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full">
                        <img alt="Dra. Ana Sofía López" loading="lazy" width="160" height="160" decoding="async" data-nimg="1"
                            class="h-full w-full object-cover" 
                            src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=160&h=160&fit=crop&crop=face&auto=format"
                            style="color: transparent;">
                    </div>
                    <h3 class="text-lg font-medium">Dra. Ana Sofía López</h3>
                    <p class="text-sm text-gray-500">Radióloga Ginecológica</p>
                    <p class="mt-2 text-sm text-gray-600">Especialista en Ultrasonidos Ginecológicos, Obstétricos y Mamografía Digital.</p>
                </div> -->
            </div>
        </div>
    </section>

    <section class="bg-gray-50 py-16">
        <div class="container px-4 md:px-6 max-w-[1300px] mx-auto">
            <div class="mb-12 text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nuestras Instalaciones</h2>
            </div>
            <!-- INICIO DE INSTALACIONES --> 
            <div v-for="inst in instalaciones" :key="inst.id" class="mb-20">
                <template v-for="(sucursal, index) in inst.sucursales" :key="sucursal.nombre">
                    <!-- Nombre de sucursal -->
                    <div class="mb-12 text-center mt-8">
                        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                            {{ sucursal.nombre }}
                        </h2>
                        <p class="mx-auto mt-2 max-w-[700px] text-gray-500 text-sm">{{ sucursal.direccion }}</p>
                    </div>
                    <!-- Grid de imágenes -->
                    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div v-for="detalle in sucursal.detalles" :key="detalle.titulo">
                            <img :alt="detalle.titulo" loading="lazy" width="400" height="250"
                                class="mb-4 rounded-lg object-cover" :src="detalle.imagen_url || '/placeholder.svg'" />
                            <h3 class="mb-2 text-lg font-medium">
                                {{ detalle.titulo }}
                            </h3>
                            <p class="text-gray-600">
                                {{ detalle.descripcion }}
                            </p>
                        </div>
                    </div>

                    

                </template>

            </div>



            <!-- FIN DE INSTALACIONES -->

            <!-- <div class="mb-12 text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl">Santa Ana</h2>
                <p class="mx-auto mt-2 max-w-[700px] text-gray-500 text-sm">5A Avenida Sur, entre 25 y 27 calle oriente, Urb San Miguelito, Santa Ana.</p>
            </div>
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div><img alt="Recepción" loading="lazy" width="400" height="250" decoding="async" data-nimg="1"
                        class="mb-4 rounded-lg object-cover" src="https://admin-cimro.gunssoft.tech/wp-content/uploads/2025/07/quienes-somos.jpeg"
                        style="color: transparent;">
                    <h3 class="mb-2 text-lg font-medium">Edificio</h3>
                    <p class="text-gray-600">Contamos con amplias instalaciones</p>
                </div>
                <div><img alt="Sala de Tomografía" loading="lazy" width="400" height="250" decoding="async"
                        data-nimg="1" class="mb-4 rounded-lg object-cover"
                        src="https://admin-cimro.gunssoft.tech/wp-content/uploads/2025/07/SALA-DE-ESPERA.jpeg" style="color: transparent;">
                    <h3 class="mb-2 text-lg font-medium">Sala de espera</h3>
                    <p class="text-gray-600">Área de espera cómoda para nuestros pacientes.</p>
                </div>
                <div><img alt="Sala de Ultrasonido" loading="lazy" width="400" height="250" decoding="async"
                        data-nimg="1" class="mb-4 rounded-lg object-cover"
                        src="https://admin-cimro.gunssoft.tech/wp-content/uploads/2025/07/PARQUEO.jpeg" style="color: transparent;">
                    <h3 class="mb-2 text-lg font-medium">Parqueo</h3>
                    <p class="text-gray-600">Contamos con un amplio parqueo para tu vehículo.</p>
                </div>
            </div> -->
            <!-- <div class="mb-12 mt-5 text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl">Sonsonate</h2>
                <p class="mx-auto mt-2 max-w-[700px] text-gray-500 text-sm">Hospital Especializado Fray Flavián Mucci, Km. 63 Carretera de San Salvador a Sonsonate, Sonzacate, Sonsonate, El Salvador</p>
            </div>
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                
                <div><img alt="Recepción" loading="lazy" width="400" height="250" decoding="async" data-nimg="1"
                        class="mb-4 rounded-lg object-cover" src="https://admin-cimro.gunssoft.tech/wp-content/uploads/2025/07/quienes-somos.jpeg"
                        style="color: transparent;">
                    <h3 class="mb-2 text-lg font-medium">Edificio</h3>
                    <p class="text-gray-600">Contamos con amplias instalaciones</p>
                </div>
                <div><img alt="Sala de Tomografía" loading="lazy" width="400" height="250" decoding="async"
                        data-nimg="1" class="mb-4 rounded-lg object-cover"
                        src="https://admin-cimro.gunssoft.tech/wp-content/uploads/2025/07/SALA-DE-ESPERA.jpeg" style="color: transparent;">
                    <h3 class="mb-2 text-lg font-medium">Sala de espera</h3>
                    <p class="text-gray-600">Área de espera cómoda para nuestros pacientes.</p>
                </div>
                <div><img alt="Sala de Ultrasonido" loading="lazy" width="400" height="250" decoding="async"
                        data-nimg="1" class="mb-4 rounded-lg object-cover"
                        src="https://admin-cimro.gunssoft.tech/wp-content/uploads/2025/07/PARQUEO.jpeg" style="color: transparent;">
                    <h3 class="mb-2 text-lg font-medium">Parqueo</h3>
                    <p class="text-gray-600">Contamos con un amplio parqueo para tu vehículo.</p>
                </div>
            </div> -->
        </div>
    </section>




</template>

<script setup lang="ts">
const { corporateInfo, getKeywordsString, generateDescription } = useCIMROSEO();
const { fetchInstalaciones, processInstalacion } = useInstalaciones();
// Estado para instalaciones
const instalaciones = ref<any[]>([]);
const loadingInstalaciones = ref(true);
// Cargar instalaciones
onMounted(async () => {
    try {
        const rawInstalaciones = await fetchInstalaciones();

        // Procesar cada instalación para obtener URLs de imágenes
        const processed = await Promise.all(
            rawInstalaciones.map(inst => processInstalacion(inst))
        );

        instalaciones.value = processed;

        // Guardar en estado global para uso en páginas de detalle
        useState('allInstalaciones', () => processed);
    } catch (error) {
        console.error('Error loading instalaciones:', error);
    } finally {
        loadingInstalaciones.value = false;
    }
});

// SEO optimizado para página "Quiénes Somos"
useSeoMeta({
  title: `Quiénes Somos | ${corporateInfo.name}`,
  description: generateDescription(`Conoce la historia, misión y visión de ${corporateInfo.name}. Centro especializado en diagnóstico por imágenes en Santa Ana, El Salvador, comprometido con la excelencia médica y tecnología de vanguardia.`),
  keywords: getKeywordsString([
    'historia CIMRO',
    'misión centro radiológico Santa Ana',
    'visión diagnóstico por imágenes',
    'centro médico El Salvador historia',
    'radiología occidente El Salvador historia'
  ]),
  ogTitle: `Quiénes Somos - ${corporateInfo.shortName} Centro de Imágenes Santa Ana`,
  ogDescription: `Conoce la historia y compromiso de ${corporateInfo.name} con la excelencia en diagnóstico por imágenes en Santa Ana, El Salvador.`,
  ogImage: `${corporateInfo.website}/logo-horizontal.png`,
  ogUrl: `${corporateInfo.website}/quienes-somos`
});

// Schema.org para página institucional
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: `Quiénes Somos - ${corporateInfo.name}`,
        description: `Historia, misión y visión de ${corporateInfo.name}, centro especializado en diagnóstico por imágenes en Santa Ana, El Salvador`,
        mainEntity: {
          '@type': 'MedicalOrganization',
          name: corporateInfo.name,
          address: {
            '@type': 'PostalAddress',
            streetAddress: corporateInfo.address,
            addressLocality: 'Santa Ana',
            addressCountry: 'El Salvador'
          }
        }
      })
    }
  ]
});
import { useQuienesStore } from '~/stores/quienes';

const qs = useQuienesStore();

onMounted(async () => {
  await qs.fetchquienesSomos();
});
</script>