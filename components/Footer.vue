<template>
    <footer class="bg-[#003e71] text-white">
        <div class="container m-auto px-4 py-12 md:px-6">
            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div class="space-y-4"><img alt="CIMRO Logo" loading="lazy" width="120" height="40" decoding="async"
                        data-nimg="1" class="h-10 w-auto" style="color:transparent"
                        src="/public/logo-white-horizontal.png">
                    <p class="text-sm text-blue-100">Centro de Imágenes Radiológicas de Occidente, ofreciendo servicios
                        de diagnóstico por imagen con tecnología avanzada y atención humanizada.</p>
                </div>
                <div>
                    <h3 class="mb-4 text-lg font-medium">Enlaces Rápidos</h3>
                    <ul class="space-y-2 text-sm text-blue-100">
                        <li><a class="transition-colors hover:text-white hover:underline" href="/">Inicio</a></li>
                        <li><a class="transition-colors hover:text-white hover:underline" href="/quienes-somos">Quiénes
                                Somos</a></li>
                        <li><a class="transition-colors hover:text-white hover:underline"
                                href="/servicios">Servicios</a></li>
                        <li><a class="transition-colors hover:text-white hover:underline" href="/noticias">Noticias</a>
                        </li>
                        <li><a class="transition-colors hover:text-white hover:underline" href="/videos">Vídeos</a></li>
                        <li><a class="transition-colors hover:text-white hover:underline" href="/turismo-salud">Turismo
                                Salud</a></li>
                        <li><a class="transition-colors hover:text-white hover:underline"
                                href="/contactanos">Contáctanos</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="mb-4 text-lg font-medium">Contacto</h3>
                    <ul class="space-y-3 text-sm text-blue-100">
                        <li class="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-map-pin mt-0.5 h-4 w-4 shrink-0">
                                <path
                                    d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0">
                                </path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg><span>Av. Principal #123, Colonia Centro, Ciudad, País</span></li>
                        <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-phone h-4 w-4 shrink-0">
                                <path
                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                                </path>
                            </svg><span>+123 456 7890</span></li>
                        <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-mail h-4 w-4 shrink-0">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </svg><span>contacto@cimro.com</span></li>
                    </ul>
                </div>
                <div>
                    <h3 class="mb-4 text-lg font-medium">Síguenos</h3>
                    <div class="flex gap-4"><a class="text-blue-100 transition-colors hover:text-white" href="#"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-facebook h-5 w-5">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg><span class="sr-only">Facebook</span></a><a
                            class="text-blue-100 transition-colors hover:text-white" href="#"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-instagram h-5 w-5">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                            </svg><span class="sr-only">Instagram</span></a><a
                            class="text-blue-100 transition-colors hover:text-white" href="#"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-twitter h-5 w-5">
                                <path
                                    d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z">
                                </path>
                            </svg><span class="sr-only">Twitter</span></a><a
                            class="text-blue-100 transition-colors hover:text-white" href="#"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-youtube h-5 w-5">
                                <path
                                    d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17">
                                </path>
                                <path d="m10 15 5-3-5-3z"></path>
                            </svg><span class="sr-only">YouTube</span></a></div>
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

