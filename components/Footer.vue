<script setup>
import { useConfigStore } from "#imports";

//store
const configStore = useConfigStore();
const { corporateInfo, businessHours } = useCIMROSEO();

// Usar información de contacto de la API o fallback al composable
const contactInfo = computed(() => {
    if (configStore.hasDataLoaded && configStore.getContactInfo) {
        return {
            address: configStore.getContactInfo.address || corporateInfo.address,
            phone: configStore.getContactInfo.phone || corporateInfo.phone,
            whatsapp: configStore.getContactInfo.whatsapp || corporateInfo.whatsapp,
            email: configStore.getContactInfo.email || corporateInfo.email,
            website: configStore.getContactInfo.website || corporateInfo.website
        };
    }
    return corporateInfo;
});

// Usar horarios de la API o fallback al composable
const hours = computed(() => {
    if (configStore.hasDataLoaded && configStore.getBusinessHours) {
        return {
            weekdays: configStore.getBusinessHours.weekdays || businessHours.weekdays,
            saturday: configStore.getBusinessHours.saturday || businessHours.saturday,
            sunday: configStore.getBusinessHours.sunday || 'Cerrado'
        };
    }
    return businessHours;
});

const socialMediaLinks = computed(() => configStore.socialMedia);
</script>

<template>
    <footer class="bg-[#003e71] text-white">
        <div class="container m-auto px-4 py-12 md:px-6">
            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div class="space-y-4">
                    <img alt="CIMRO - Centro de Imágenes Radiológicas de Occidente Santa Ana" loading="lazy" width="120" height="40" decoding="async" data-nimg="1"
                        class="h-16 w-auto" style="color: transparent" src="/logo-white-horizontal.png" />
                    <p class="text-sm text-blue-100">
                        {{ corporateInfo.name }}, ofreciendo servicios
                        de diagnóstico por imágenes con tecnología avanzada y atención
                        humanizada en Santa Ana, El Salvador.
                    </p>
                </div>
                <div>
                    <h3 class="mb-4 text-lg font-medium">Enlaces Rápidos</h3>
                    <ul class="space-y-2 text-sm text-blue-100">
                        <li>
                            <a class="transition-colors hover:text-white hover:underline" href="/">Inicio
                            </a>
                        </li>
                        <li>
                            <NuxtLink class="transition-colors hover:text-white hover:underline" to="/quienes-somos">
                                Quiénes Somos</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink class="transition-colors hover:text-white hover:underline" to="/servicios">
                                Servicios</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink class="transition-colors hover:text-white hover:underline" to="/noticias">Noticias
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink class="transition-colors hover:text-white hover:underline" to="/videos">Vídeos
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink class="transition-colors hover:text-white hover:underline" to="/turismo-salud">
                                Turismo Salud</NuxtLink>
                        </li>
                        <li>
                            <a class="transition-colors hover:text-white hover:underline" to="/agendar-cita">
                                Agendar Cita</a>
                        </li>
                        <li>
                            <NuxtLink class="transition-colors hover:text-white hover:underline" to="/contactanos">
                                Contáctanos</NuxtLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 class="mb-4 text-lg font-medium">Contacto</h3>
                    <ul class="space-y-3 text-sm text-blue-100">
                        <li class="flex items-start gap-2">
                            <a href="https://www.google.com/maps/place/CIMRO/@13.980591,-89.556548,2188m/data=!3m1!1e3!4m6!3m5!1s0x8f62e8985656487b:0x58c9970ccf7141de!8m2!3d13.9805909!4d-89.5565483!16s%2Fg%2F11c54f45mc?hl=es&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D"
                                class="flex items-center gap-2 transition-colors hover:text-white hover:underline"
                                target="_blank" rel="noopener noreferrer"
                                aria-label="Ver ubicación de CIMRO Centro de Imágenes Radiológicas de Occidente en Google Maps">
                                <UIcon name="i-lucide-map-pin" class="size-5" aria-hidden="true" />
                                <span>{{ contactInfo.address }}</span>
                            </a>
                        </li>
                        <li class="flex items-center gap-2">
                            <a :href="`tel:${contactInfo.phone}`"
                                class="flex items-center gap-2 transition-colors hover:text-white hover:underline"
                                target="_blank" rel="noopener noreferrer"
                                :aria-label="`Llamar a CIMRO al ${contactInfo.phone}`">
                                <UIcon name="i-lucide-phone" class="size-5" aria-hidden="true" />
                                <span>{{ contactInfo.phone }}</span>
                            </a>
                        </li>
                        <li class="flex items-center gap-2">
                            <a :href="`mailto:${contactInfo.email}`"
                                class="flex items-center gap-2 transition-colors hover:text-white hover:underline"
                                target="_blank" rel="noopener noreferrer"
                                :aria-label="`Enviar correo a CIMRO a ${contactInfo.email}`">
                                <UIcon name="i-lucide-mail" class="size-5" aria-hidden="true" />
                                <span>{{ contactInfo.email }}</span>
                            </a>
                        </li>
                        <li class="flex items-start gap-2">
                            <UIcon name="i-lucide-clock" class="size-5 mt-0.5" aria-hidden="true" />
                            <div>
                                <div>{{ hours.weekdays }}</div>
                                <div>{{ hours.saturday }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 class="mb-4 text-lg font-medium">Síguenos</h3>
                    <div class="flex gap-4">
                        <a class="text-blue-100 transition-colors hover:text-white" :href="socialMediaLinks.facebook"
                            v-if="socialMediaLinks.facebook" target="_blank" rel="noopener noreferrer"
                            aria-label="Seguir a CIMRO en Facebook">
                            <UIcon name="i-fa6-brands-facebook" class="size-5" aria-hidden="true" />
                        </a>
                        <a class="text-blue-100 transition-colors hover:text-white"
                            :href="socialMediaLinks.instagram" v-if="socialMediaLinks.instagram" target="_blank" rel="noopener noreferrer"
                            aria-label="Seguir a CIMRO en Instagram">
                            <UIcon name="i-fa6-brands-instagram" class="size-5" aria-hidden="true" />
                        </a>
                        <a class="text-blue-100 transition-colors hover:text-white" :href="socialMediaLinks.twitter"
                            v-if="socialMediaLinks.twitter" target="_blank" rel="noopener noreferrer"
                            aria-label="Seguir a CIMRO en Twitter">
                            <UIcon name="i-fa6-brands-twitter" class="size-5" aria-hidden="true" />
                        </a>

                        <a class="text-blue-100 transition-colors hover:text-white" :href="socialMediaLinks.youtube"
                            v-if="socialMediaLinks.youtube" target="_blank" rel="noopener noreferrer"
                            aria-label="Suscribirse al canal de YouTube de CIMRO">
                            <UIcon name="i-fa6-brands-youtube" class="size-5" aria-hidden="true" />
                        </a>
                        <!-- whatsapp -->


                        <a class="text-blue-100 transition-colors hover:text-white" :href="socialMediaLinks.whatsapp"
                            v-if="socialMediaLinks.whatsapp" target="_blank" rel="noopener noreferrer"
                            aria-label="Contactar a CIMRO por WhatsApp">
                            <UIcon name="i-fa6-brands-whatsapp" class="size-5" aria-hidden="true" />
                        </a>

                       
                    </div>

                    <div class="mt-6">
                        <h4 class="mb-2 text-sm font-medium">Horario de Atención</h4>
                        <p class="text-sm text-blue-100">
                            {{ hours.weekdays }}
                        </p>
                        <p class="text-sm text-blue-100">{{ hours.saturday }}</p>
                    </div>
                </div>
            </div>
            <div class="mt-8 border-t border-gray-500 pt-8 text-center text-sm text-blue-100">
                <p>
                    © 2025 {{ corporateInfo.name }}. Todos los derechos reservados.
                </p>
                <p class="mt-2">
                    Centro especializado en diagnóstico por imágenes en Santa Ana, El Salvador
                </p>
            </div>
        </div>
    </footer>
</template>
