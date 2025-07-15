<script setup>
import { UButton } from '#components';
import {useContactStore, useConfigStore} from '#imports';

const { corporateInfo, getKeywordsString, generateDescription, businessHours } = useCIMROSEO();
const configStore = useConfigStore();

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

// SEO Meta Tags para página de contacto
useSeoMeta({
  title: `Contacto - Agende su Cita | ${corporateInfo.name}`,
  description: generateDescription(`Contáctenos para agendar su cita de diagnóstico por imágenes en ${corporateInfo.location}. ${businessHours.weekdays}. ${businessHours.saturday}. Atención personalizada y tecnología de vanguardia.`),
  keywords: getKeywordsString([
    'contacto CIMRO Santa Ana',
    'agendar cita radiología Santa Ana',
    'teléfono CIMRO',
    'dirección centro imágenes Santa Ana',
    'horarios CIMRO El Salvador',
    'cita diagnóstico por imágenes'
  ]),
  ogTitle: `Contacto - ${corporateInfo.shortName} Centro de Imágenes Santa Ana`,
  ogDescription: `Agende su cita de diagnóstico por imágenes en ${corporateInfo.name}. Contáctenos para más información sobre nuestros servicios especializados.`,
  ogImage: `${corporateInfo.website}/logo-horizontal.png`,
  ogUrl: `${corporateInfo.website}/contactanos`
});

// Structured Data para información de contacto
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        mainEntity: {
          '@type': 'MedicalOrganization',
          name: corporateInfo.name,
          address: {
            '@type': 'PostalAddress',
            streetAddress: contactInfo.value.address,
            addressLocality: 'Santa Ana',
            addressCountry: 'El Salvador'
          },
          contactPoint: [
            {
              '@type': 'ContactPoint',
              telephone: contactInfo.value.phone,
              contactType: 'customer service',
              email: contactInfo.value.email,
              availableLanguage: 'Spanish'
            },
            {
              '@type': 'ContactPoint',
              contactType: 'emergency',
              telephone: contactInfo.value.phone
            }
          ],
          openingHours: businessHours.structured
        }
      })
    }
  ]
});

// Manejar formulario
let formData = ref({
    firstname: '',
    lastname: '',
    email: '',
    contact: '',
    subject: '',
    message: '',
    consultation: 'CONSULTA',
    examinations: 'CONSULTA',
});

const contactStore = useContactStore();

// Estado para las notificaciones
const showSuccessToast = ref(false);
const showErrorToast = ref(false);

onMounted(async () => {
    // Asegurar que las configuraciones estén cargadas
    if (!configStore.hasDataLoaded) {
        await configStore.fetchConfiguraciones();
    }
});

const handleSubmit = async () => {
    try {
        await contactStore.submitContactForm(formData.value);
        
        // Reset form after successful submission
        formData.value = {
            firstname: '',
            lastname: '',
            email: '',
            contact: '',
            subject: '',
            message: '',
            consultation: 'CONSULTA',
            examinations: 'CONSULTA',
        };
        
        // Mostrar toast de éxito
        showSuccessToast.value = true;
        setTimeout(() => {
            showSuccessToast.value = false;
        }, 5000);
        
    } catch (error) {
        console.error('Error submitting form:', error);
        
        // Mostrar toast de error
        showErrorToast.value = true;
        setTimeout(() => {
            showErrorToast.value = false;
        }, 5000);
    }
};


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

    <section class="py-16">
        <div class="container px-4 md:px-6 max-w-[1300px] mx-auto">
            <div class="grid gap-10 md:grid-cols-2">
                <div>
                    <h2 class="mb-6 text-2xl font-bold tracking-tight text-gray-900">Información de Contacto</h2>
                    
                    <!-- Loading state -->
                    <div v-if="configStore.isCurrentlyLoading" class="space-y-6">
                        <div class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm animate-pulse">
                            <div class="flex items-start gap-4 p-6">
                                <div class="mt-0.5 h-5 w-5 bg-gray-300 rounded"></div>
                                <div class="flex-1">
                                    <div class="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                                    <div class="h-3 bg-gray-200 rounded w-full"></div>
                                </div>
                            </div>
                        </div>
                        <div class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm animate-pulse">
                            <div class="flex items-start gap-4 p-6">
                                <div class="mt-0.5 h-5 w-5 bg-gray-300 rounded"></div>
                                <div class="flex-1">
                                    <div class="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                                    <div class="h-3 bg-gray-200 rounded w-full"></div>
                                </div>
                            </div>
                        </div>
                        <div class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm animate-pulse">
                            <div class="flex items-start gap-4 p-6">
                                <div class="mt-0.5 h-5 w-5 bg-gray-300 rounded"></div>
                                <div class="flex-1">
                                    <div class="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                                    <div class="h-3 bg-gray-200 rounded w-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Content when loaded -->
                    <div v-else class="space-y-6">
                        <div class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
                            <div class="flex items-start gap-4 p-6">
                                <UIcon name="lucide:map-pin" class="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                                <div>
                                    <h3 class="font-medium">Dirección</h3>
                                    <p class="text-sm text-gray-500">{{ contactInfo.address }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
                            <div class="flex items-start gap-4 p-6">
                                <UIcon name="lucide:phone" class="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                                <div>
                                    <h3 class="font-medium">Teléfonos</h3>
                                    <p class="text-sm text-gray-500">
                                        <a :href="`tel:${contactInfo.phone}`" class="hover:text-blue-600 transition-colors">
                                            {{ contactInfo.phone }}
                                        </a>
                                        <br>
                                        <a :href="`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`" 
                                           target="_blank" 
                                           class="hover:text-blue-600 transition-colors">
                                            {{ contactInfo.whatsapp }} (WhatsApp)
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
                            <div class="flex items-start gap-4 p-6">
                                <UIcon name="lucide:mail" class="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                                <div>
                                    <h3 class="font-medium">Correo Electrónico</h3>
                                    <p class="text-sm text-gray-500">
                                        <a :href="`mailto:${contactInfo.email}`" class="hover:text-blue-600 transition-colors">
                                            {{ contactInfo.email }}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Business Hours Section -->
                    <div class="mt-8" v-if="!configStore.isCurrentlyLoading">
                        <h3 class="mb-4 text-xl font-medium">Horario de Atención</h3>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="font-medium">{{ hours.weekdays.split(':')[0] }}:</span>
                                <span>{{ hours.weekdays.split(':').slice(1).join(':').trim() }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="font-medium">{{ hours.saturday.split(':')[0] }}:</span>
                                <span>{{ hours.saturday.split(':').slice(1).join(':').trim() }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="font-medium">Domingos:</span>
                                <span>{{ hours.sunday || 'Cerrado' }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Métodos de Pago Section -->
                    <div class="mt-8" v-if="!configStore.isCurrentlyLoading">
                        <h3 class="mb-6 text-xl font-medium">Métodos de Pago Disponibles</h3>
                        <div class="grid gap-4 sm:grid-cols-3">
                            <!-- Tasa 0 -->
                            <div class="flex flex-col items-center text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                                <div class="mb-3 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                    <UIcon name="i-heroicons-percent-badge" class="w-6 h-6 text-white" />
                                </div>
                                <h4 class="text-sm font-semibold text-green-700 mb-1">Tasa 0%</h4>
                                <p class="text-xs text-gray-600">Sin intereses</p>
                            </div>

                            <!-- Tarjetas -->
                            <div class="flex flex-col items-center text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                                <div class="mb-3 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                                    <UIcon name="i-heroicons-credit-card" class="w-6 h-6 text-white" />
                                </div>
                                <h4 class="text-sm font-semibold text-blue-700 mb-1">Tarjetas</h4>
                                <p class="text-xs text-gray-600">Nacional e internacional</p>
                            </div>

                            <!-- Cheque -->
                            <div class="flex flex-col items-center text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                                <div class="mb-3 w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                                    <UIcon name="i-heroicons-document-text" class="w-6 h-6 text-white" />
                                </div>
                                <h4 class="text-sm font-semibold text-purple-700 mb-1">Cheque</h4>
                                <p class="text-xs text-gray-600">Pago tradicional</p>
                            </div>
                        </div>
                        <div class="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p class="text-sm text-blue-800 text-center">
                                💳 Facilitamos el acceso a nuestros servicios con múltiples opciones de pago
                            </p>
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
                            <form class="space-y-4" @submit.prevent="handleSubmit">
                                <div class="space-y-2">
                                    <label
                                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        for="nombre">Nombre Completo</label>
                                    <input
                                        v-model="formData.firstname"
                                        class="flex h-10 w-full rounded-md border border-gray-300 border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground md:text-sm"
                                        id="nombre" 
                                        placeholder="Tu nombre completo" 
                                        required 
                                        name="nombre"
                                        type="text">
                                </div>
                                <div class="space-y-2">
                                    <label
                                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        for="email">Correo Electrónico</label>
                                    <input
                                        v-model="formData.email"
                                        class="flex h-10 w-full rounded-md border border-gray-300 border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground md:text-sm"
                                        id="email" 
                                        placeholder="tu@email.com" 
                                        required 
                                        type="email" 
                                        name="email">
                                </div>
                                <div class="space-y-2">
                                    <label
                                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        for="telefono">Teléfono</label>
                                    <input
                                        v-model="formData.contact"
                                        class="flex h-10 w-full rounded-md border border-gray-300 border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground md:text-sm"
                                        id="telefono" 
                                        placeholder="Tu número de teléfono" 
                                        required 
                                        name="telefono"
                                        type="tel">
                                </div>
                                <div class="space-y-2">
                                    <label
                                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        for="asunto">Asunto</label>
                                    <input
                                        v-model="formData.subject"
                                        class="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-base placeholder:text-muted-foreground md:text-sm"
                                        id="asunto" 
                                        placeholder="Asunto de tu mensaje" 
                                        required 
                                        name="asunto"
                                        type="text">
                                </div>
                                <div class="space-y-2">
                                    <label
                                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        for="mensaje">Mensaje</label>
                                    <textarea
                                        class="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground md:text-sm"
                                        id="mensaje" 
                                        name="message" 
                                        placeholder="Escribe tu mensaje aquí..." 
                                        rows="4"
                                        required 
                                        v-model="formData.message">
                                    </textarea>
                                </div>
                                
                                <button
                                    class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-[#0068c9] h-10 px-4 py-2 w-full text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    type="submit"
                                    :disabled="contactStore.isLoading">
                                    <UIcon 
                                        v-if="contactStore.isLoading" 
                                        name="i-lucide-loader-2" 
                                        class="animate-spin h-4 w-4" 
                                    />
                                    <template v-else>
                                        Enviar Mensaje
                                    </template>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Toast Success -->
    <Transition 
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform opacity-0 translate-y-2"
        enter-to-class="transform opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="transform opacity-100 translate-y-0"
        leave-to-class="transform opacity-0 translate-y-2">
        <div v-if="showSuccessToast" class="fixed top-4 right-4 z-50 max-w-sm bg-green-500 text-white p-4 rounded-lg shadow-lg">
            <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-check-circle" class="h-6 w-6 text-white flex-shrink-0 mt-0.5" />
                <div class="flex-1">
                    <h4 class="font-semibold">¡Formulario enviado exitosamente!</h4>
                    <p class="text-sm text-green-100 mt-1">Nos pondremos en contacto contigo lo antes posible.</p>
                </div>
                <button @click="showSuccessToast = false" class="text-green-200 hover:text-white">
                    <UIcon name="i-heroicons-x-mark" class="h-5 w-5" />
                </button>
            </div>
        </div>
    </Transition>
    
    <!-- Toast Error -->
    <Transition 
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform opacity-0 translate-y-2"
        enter-to-class="transform opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="transform opacity-100 translate-y-0"
        leave-to-class="transform opacity-0 translate-y-2">
        <div v-if="showErrorToast" class="fixed top-4 right-4 z-50 max-w-sm bg-red-500 text-white p-4 rounded-lg shadow-lg">
            <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-x-circle" class="h-6 w-6 text-white flex-shrink-0 mt-0.5" />
                <div class="flex-1">
                    <h4 class="font-semibold">Error al enviar el formulario</h4>
                    <p class="text-sm text-red-100 mt-1">Por favor, inténtalo de nuevo o contacta con nosotros directamente.</p>
                </div>
                <button @click="showErrorToast = false" class="text-red-200 hover:text-white">
                    <UIcon name="i-heroicons-x-mark" class="h-5 w-5" />
                </button>
            </div>
        </div>
    </Transition>
</template>