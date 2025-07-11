<script setup>
import { UButton } from '#components';
//Manejar formulario

let formData = ref({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
});

</script>

<template>
    <section class="bg-blue-900 py-16 text-white">
        <div class="container px-4 md:px-6">
            <div class="mx-auto max-w-3xl text-center">
                <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contáctanos</h1>
                <p class="mt-4 text-blue-100 md:text-xl">Estamos aquí para responder tus preguntas y ayudarte a agendar
                    tu cita.</p>
            </div>
        </div>
    </section>
    <pre>
        {{ formData }}
    </pre>

    <section class="py-16">
        <div class="container px-4 md:px-6 max-w-[1300px] mx-auto">
            <div class="grid gap-10 md:grid-cols-2">
                <div>
                    <h2 class="mb-6 text-2xl font-bold tracking-tight text-gray-900">Información de Contacto</h2>
                    <div class="space-y-6">
                        <div class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
                            <div class="flex items-start gap-4 p-6">
                                <UIcon name="lucide:map-pin" class="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                                <div>
                                    <h3 class="font-medium">Dirección</h3>
                                    <p class="text-sm text-gray-500">Av. Principal #123, Colonia Centro<br>Ciudad,
                                        Estado, País<br>Código Postal 12345</p>
                                </div>
                            </div>
                        </div>
                        <div class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
                            <div class="flex items-start gap-4 p-6">
                                <UIcon name="lucide:phone" class="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                                <div>
                                    <h3 class="font-medium">Teléfonos</h3>
                                    <p class="text-sm text-gray-500">+123 456 7890<br>+123 456 7891</p>
                                </div>
                            </div>
                        </div>
                        <div class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
                            <div class="flex items-start gap-4 p-6">
                                <UIcon name="lucide:mail" class="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                                <div>
                                    <h3 class="font-medium">Correo Electrónico</h3>
                                    <p class="text-sm text-gray-500">contacto@cimro.com<br>citas@cimro.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8">
                        <h3 class="mb-4 text-xl font-medium">Horario de Atención</h3>
                        <div class="space-y-2">
                            <div class="flex justify-between"><span class="font-medium">Lunes a
                                    Viernes:</span><span>8:00 AM - 8:00 PM</span></div>
                            <div class="flex justify-between"><span class="font-medium">Sábados:</span><span>8:00 AM -
                                    2:00 PM</span></div>
                            <div class="flex justify-between"><span
                                    class="font-medium">Domingos:</span><span>Cerrado</span></div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 class="mb-6 text-2xl font-bold tracking-tight text-gray-900">Envíanos un Mensaje</h2>
                    <div class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
                        <div class="flex flex-col space-y-1.5 p-6">
                            <div class="text-2xl font-semibold leading-none tracking-tight">Formulario de Contacto</div>
                            <div class="text-sm text-muted-foreground">Completa el formulario y nos pondremos en
                                contacto contigo lo antes posible.</div>
                        </div>
                        <div class="p-6 pt-0">
                            <form class="space-y-4" action="https://formspree.io/f/mldnkloa" method="POST">
                                <div class="space-y-2"><label
                                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        for="nombre">Nombre Completo</label><input
                                        v-model="formData.nombre"
                                        class="flex h-10 w-full rounded-md border border-gray-300 border-input bg-background px-3 py-2 text-base  placeholder:text-muted-foreground  md:text-sm"
                                        id="nombre" placeholder="Tu nombre completo" required="" value="" name="nombre">
                                </div>
                                <div class="space-y-2"><label
                                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        for="email">Correo Electrónico</label><input
                                        v-model="formData.email"
                                        class="flex h-10 w-full rounded-md border border-gray-300 border-input bg-background px-3 py-2 text-base  placeholder:text-muted-foreground  md:text-sm"
                                        id="email" placeholder="tu@email.com" required="" type="email" value=""
                                        name="email"></div>
                                <div class="space-y-2"><label
                                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        for="telefono">Teléfono</label><input
                                        v-model="formData.telefono"
                                        class="flex h-10 w-full rounded-md border border-gray-300 border-input bg-background px-3 py-2 text-base  placeholder:text-muted-foreground  md:text-sm"
                                        id="telefono" placeholder="Tu número de teléfono" required="" value=""
                                        name="telefono"></div>
                                <div class="space-y-2"><label
                                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        for="asunto">Asunto</label><input
                                        v-model="formData.asunto"
                                        class="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-base  placeholder:text-muted-foreground  md:text-sm"
                                        id="asunto" placeholder="Asunto de tu mensaje" required="" value=""
                                        name="asunto"></div>
                                <div class="space-y-2"><label
                                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        for="mensaje">Mensaje</label><textarea
                                        class="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground  md:text-sm"
                                        id="mensaje" name="message" placeholder="Escribe tu mensaje aquí..." rows="4"
                                        required="" v-model="formData.mensaje"></textarea></div><button
                                    class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                                    type="submit">Enviar Mensaje</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>