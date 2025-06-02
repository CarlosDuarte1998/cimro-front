<script setup>
import { useConfigStore } from '#imports';

const configStore = useConfigStore();

const contact = ref([]);





</script>

<template>

<pre>
    {{ configStore.social }}
</pre>
    
    <footer class="bg-[#003e71] text-white">
        <div class="container m-auto px-4 py-12 md:px-6">
            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div class="space-y-4"><img alt="CIMRO Logo" loading="lazy" width="120" height="40" decoding="async"
                        data-nimg="1" class="h-16 w-auto" style="color:transparent"
                        src="/logo-white-horizontal.png">
                    <p class="text-sm text-blue-100">Centro de Imágenes Radiológicas de Occidente, ofreciendo servicios
                        de diagnóstico por imagen con tecnología avanzada y atención humanizada.</p>
                </div>
                <div>
                    <h3 class="mb-4 text-lg font-medium">Enlaces Rápidos</h3>
                    <ul class="space-y-2 text-sm text-blue-100">
                        <li><NuxtLink class="transition-colors hover:text-white hover:underline" to="/">Inicio</NuxtLink></li>
                        <li><NuxtLink class="transition-colors hover:text-white hover:underline" to="/quienes-somos">Quiénes
                                Somos</NuxtLink></li>
                        <li><NuxtLink class="transition-colors hover:text-white hover:underline" to="/servicios">Servicios</NuxtLink></li>
                        <li><NuxtLink class="transition-colors hover:text-white hover:underline" to="/noticias">Noticias</NuxtLink></li>
                        <li><NuxtLink class="transition-colors hover:text-white hover:underline" to="/videos">Vídeos</NuxtLink></li>
                        <li><NuxtLink class="transition-colors hover:text-white hover:underline" to="/turismo-salud">Turismo
                                Salud</NuxtLink></li>
                        <li><NuxtLink class="transition-colors hover:text-white hover:underline" to="/agendar-cita">Agendar Cita</NuxtLink></li>
                        <li><NuxtLink class="transition-colors hover:text-white hover:underline" to="/contactanos">Contáctanos</NuxtLink></li>
                    </ul>
                </div>
                <div>
                    <h3 class="mb-4 text-lg font-medium">Contacto</h3>
                    <ul class="space-y-3 text-sm text-blue-100">
                        <li class="flex items-start gap-2">
                        <a href="https://www.google.com/maps/place/CIMRO/@13.980591,-89.556548,2188m/data=!3m1!1e3!4m6!3m5!1s0x8f62e8985656487b:0x58c9970ccf7141de!8m2!3d13.9805909!4d-89.5565483!16s%2Fg%2F11c54f45mc?hl=es&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D" class="flex items-center gap-2 transition-colors hover:text-white hover:underline" target="_blank" rel="noopener noreferrer">
                            <UIcon name="i-lucide-map-pin" class="size-5" />
                            <span> 5A Avenida Sur, entre 25 y 27 calle oriente, Urb San Miguelito, Santa Ana</span>
                        </a>    
                        </li>
                        <li class="flex items-center gap-2">
                             <a href="tel:+50324845500" class="flex items-center gap-2 transition-colors hover:text-white hover:underline" target="_blank" rel="noopener noreferrer">
                                 <UIcon name="i-lucide-phone" class="size-5" />
                              <span>+503 2484-5500</span>
                             </a>
                        </li>
                        <li class="flex items-center gap-2">
                            <a href="mailto:comercializacioncimro@gmail.com" class="flex items-center gap-2 transition-colors hover:text-white hover:underline" target="_blank" rel="noopener noreferrer">
                                <UIcon name="i-lucide-mail" class="size-5" />
                                <span>comercializacioncimro@gmail.com</span></a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 class="mb-4 text-lg font-medium">Síguenos</h3>
                    <div class="flex gap-4"><a class="text-blue-100 transition-colors hover:text-white" href="#">
                        <UIcon name="i-lucide-facebook" class="size-5" />
                        <span class="sr-only">Facebook</span></a><a
                            class="text-blue-100 transition-colors hover:text-white" href="#">
                            <UIcon name="i-lucide-instagram" class="size-5" />	
                            <span class="sr-only">Instagram</span></a><a
                            class="text-blue-100 transition-colors hover:text-white" href="#">
                            <UIcon name="i-lucide-twitter" class="size-5" />
                            <span class="sr-only">Twitter</span></a><a
                            class="text-blue-100 transition-colors hover:text-white" href="#">
                            <UIcon name="i-lucide-youtube" class="size-5" />
                            <span class="sr-only">YouTube</span></a></div>
                    <div class="mt-6">
                        <h4 class="mb-2 text-sm font-medium">Horario de Atención</h4>
                        <p class="text-sm text-blue-100">Lunes a Viernes: 8:00 AM - 8:00 PM</p>
                        <p class="text-sm text-blue-100">Sábados: 8:00 AM - 2:00 PM</p>
                    </div>
                </div>
            </div>
            <div class="mt-8 border-t border-gray-500 pt-8 text-center text-sm text-blue-100">
                <p>© <!-- -->2025<!-- --> CIMRO. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
</template>

