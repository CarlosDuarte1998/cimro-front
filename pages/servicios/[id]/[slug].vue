<script setup>
import { onMounted, ref } from "vue";
import { useServicesStore } from "#imports";

const route = useRoute();
const categorySlug = ref(route.params.id); // En realidad es el slug de la categoría
const serviceSlug = ref(route.params.slug); // Este es el slug del servicio

const servicesStore = useServicesStore();
const categoriesStore = useCategoriesStore();

// Variables reactivas para el servicio actual
const currentService = ref(null);
const currentCategory = ref(null);

onMounted(async () => {
  // Cargar categorías si no están disponibles
  if (!categoriesStore.hasCategories) {
    await categoriesStore.fetchCategories();
  }
  
  // Obtener la categoría por slug
  currentCategory.value = categoriesStore.getCategoryBySlug(categorySlug.value);
  
  if (currentCategory.value) {
    // Obtener los servicios de la categoría
    const services = await categoriesStore.fetchCategoryServices(currentCategory.value.id);
    
    // Encontrar el servicio específico por slug
    currentService.value = services.find(service => service.slug === serviceSlug.value);
    
    // Si encontramos el servicio, obtener sus detalles completos
    if (currentService.value) {
      // Usar el ID del servicio en lugar del slug
      await servicesStore.getServiceById(currentService.value.id);
    } else {
      console.error('Service not found with slug:', serviceSlug.value);
    }
  } else {
    console.error('Category not found with slug:', categorySlug.value);
  }
});

const items = ['Descripción', 'Preparación', 'Procedimiento', 'Preguntas Frecuentes']
const selected = ref('Descripción')

const setSelected = (item) => {
  selected.value = item
}
const openAccordion = ref('0')

// Computed properties para datos dinámicos
const serviceTitle = computed(() => {
  return currentService.value?.title?.rendered || 
         currentService.value?.title || 
         servicesStore.services?.title?.rendered || 
         'Servicio no encontrado';
});

const serviceDescription = computed(() => {
  return currentService.value?.excerpt?.rendered || 
         currentService.value?.excerpt || 
         'Descripción no disponible';
});

const imageUrl = computed(() => {
  // Priorizar la imagen del store que ahora tiene mejor calidad
  const finalUrl = servicesStore.imgServices || 
                   currentService.value?.featured_image || 
                   '/placeholder.svg';
  
  return finalUrl;
});

const shortDetails = computed(() => {
  return servicesStore.shortDetails || {
    time: 'No especificado',
    time_reponse: 'No especificado',
    preparation: 'No especificado'
  };
});

const longDetails = computed(() => {
  return servicesStore.longDetails || {
    description: 'Descripción no disponible',
    preparation: 'Preparación no disponible',
    Procedure: 'Procedimiento no disponible',
    faq: []
  };
});

const itemsAccodion = computed(() => [
  {
    label: 'Descripción',
    icon: 'i-lucide-file-text',
    description: longDetails.value.description,
    isHtml: true
  },
  {
    label: 'Preparación',
    icon: 'i-lucide-briefcase-medical',
    description: longDetails.value.preparation,
    isHtml: true
  },
  {
    label: 'Procedimiento',
    icon: 'i-lucide-list-checks',
    description: longDetails.value.Procedure,
    isHtml: true
  },
  {
    label: 'Preguntas Frecuentes',
    icon: 'i-lucide-help-circle',
    description: longDetails.value.faq,
    isHtml: false
  }
]);

// WhatsApp message dinámico
const whatsappMessage = computed(() => {
  const serviceName = serviceTitle.value;
  return `Hola, quisiera información de ${serviceName}`;
});

const whatsappUrl = computed(() => {
  return `https://wa.me/50377461474?text=${encodeURIComponent(whatsappMessage.value)}`;
});

// Meta tags dinámicos
useSeoMeta({
  title: computed(() => `${serviceTitle.value} - CIMRO`),
  description: computed(() => serviceDescription.value),
  ogTitle: computed(() => `${serviceTitle.value} - CIMRO`),
  ogDescription: computed(() => serviceDescription.value),
  ogImage: computed(() => imageUrl.value),
  twitterCard: 'summary_large_image'
});
</script>

<template>
  <section class="bg-blue-900 py-16 text-white">
    <div class="container px-4 md:px-6">
      <div class="mx-auto max-w-3xl text-center">
        <div v-if="!currentService" class="animate-pulse">
          <div class="h-8 bg-blue-800 rounded w-3/4 mx-auto mb-4"></div>
          <div class="h-4 bg-blue-800 rounded w-1/2 mx-auto"></div>
        </div>
        <div v-else>
          <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {{ serviceTitle }}
          </h1>
        </div>
      </div>
    </div>
  </section>
  
  <section class="py-16">
    <div class="container px-4 md:px-6">
      <div class="grid gap-12 lg:grid-cols-3">
        <div class="lg:col-span-1">
          <div class="sticky top-24 space-y-6">
            <div class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
              <div class="flex flex-col space-y-1.5 p-6">
                <div class="text-2xl font-semibold leading-none tracking-tight">
                  Información Rápida
                </div>
                <div class="text-sm text-muted-foreground">
                  Detalles importantes sobre el servicio
                </div>
              </div>
              <div class="p-6 pt-0 space-y-4">
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-clock mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <div>
                    <h4 class="font-medium">Duración</h4>
                    <p class="text-sm text-gray-500">
                      {{ shortDetails.time }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-file-text mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                    <path d="M10 9H8"></path>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                  </svg>
                  <div>
                    <h4 class="font-medium">Resultados</h4>
                    <p class="text-sm text-gray-500">
                      {{ shortDetails.time_reponse }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-shield-alert mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                    <path
                      d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z">
                    </path>
                    <path d="M12 8v4"></path>
                    <path d="M12 16h.01"></path>
                  </svg>
                  <div>
                    <h4 class="font-medium">Preparación</h4>
                    <p class="text-sm text-gray-500">
                      {{ shortDetails.preparation }}
                    </p>
                  </div>
                </div>
                <div data-orientation="horizontal" role="none"
                  class="shrink-0 bg-border border-gray-200 h-[1px] w-full"></div>
                <div class="flex justify-center">
                  <a class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-[#001871] text-white text-primary-foreground hover:bg-[#001871]/90 h-10 px-4 py-2 w-full"
                    :href="whatsappUrl" target="_blank">
                    <UIcon name="i-fa6-brands-whatsapp" class="size-5" />
                    Agendar Cita
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Navegación de regreso -->
            <div class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
              <div class="p-6">
                <NuxtLink :to="`/servicios/${categorySlug}`" class="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left h-4 w-4">
                    <path d="M12 19l-7-7 7-7"></path>
                    <path d="M19 12H5"></path>
                  </svg>
                  Volver a {{ currentCategory?.name || 'Categoría' }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        
        <div class="lg:col-span-2">
          <div class="mb-8 max-h-[500px] overflow-hidden rounded-lg">
            <img 
              :alt="serviceTitle" 
              loading="eager" 
              width="1200" 
              height="600" 
              decoding="async" 
              data-nimg="1"
              class="w-full lg:max-w-2/3 h-full max-h-[500px] lg:max-h-[300px] object-cover" 
              :src="imageUrl" 
              style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;"
            />
          </div>

          <div dir="ltr" data-orientation="horizontal">
            <UAccordion :items="itemsAccodion" v-model="openAccordion" v-if="$device.isMobile">
              <template #content="{ item }">
                <div v-if="item.isHtml">
                  <div v-html="item.description"></div>
                </div>
                <div v-else>
                  <ul>
                    <template v-for="(itemDescription, index) in item.description" :key="index">
                      <li>
                        <div class="rounded-lg p-4">
                          <div class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24"
                              height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                              stroke-linecap="round" stroke-linejoin="round"
                              class="lucide lucide-circle-help mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                              <path d="M12 17h.01"></path>
                            </svg>
                            <div>
                              <h4 class="font-medium">{{ itemDescription.faq_title }}</h4>
                              <p class="text-sm text-gray-600">
                                {{ itemDescription.faq_description }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </template>
                  </ul>
                </div>
              </template>
            </UAccordion>

            <!-- Version Desktop -->
            <div
              class="items-center justify-center rounded-md sm:gap-4 grid w-full grid-cols-3 sm:grid-cols-4 select-container p-1 breadcrumb" v-if="!$device.isMobile">
              <button v-for="(item, index) in items" :key="index" :class="[
                'text-sm font-medium transition duration-400 py-2 rounded-sm btn-breadcrumb',
                selected === item ? 'select-active' : 'cursor-pointer'
              ]" @click="setSelected(item)">
                {{ $device.isMobile && item === 'Preguntas Frecuentes' ? 'FAQ' : item }}
              </button>
            </div>

            <div
              class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-6" v-if="!$device.isMobile">

              <div v-if="selected === 'Descripción'" v-html="longDetails.description"></div>
              <div v-if="selected === 'Preparación'" v-html="longDetails.preparation"></div>
              <div v-if="selected === 'Procedimiento'" v-html="longDetails.Procedure"></div>
              <div v-if="selected === 'Preguntas Frecuentes'">
                <ul class="grid gap-3" v-if="longDetails.faq && longDetails.faq.length > 0">
                  <li v-for="(item, index) in longDetails.faq" :key="index">
                    <div class="rounded-lg border border-gray-200 p-4">
                      <div class="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-circle-help mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                          <path d="M12 17h.01"></path>
                        </svg>
                        <div>
                          <h4 class="font-medium">{{ item.faq_title }}</h4>
                          <p class="text-sm text-gray-600">
                            {{ item.faq_description }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-else class="text-center py-8 text-gray-500">
                  No hay preguntas frecuentes disponibles para este servicio.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.select-active {
  background-color: #001871;
  color: #fff;
  font-weight: 600;
}

.breadcrumb {
  background-color: #85bbeb27;
}

.btn-breadcrumb {
  transition: all 0.3s ease;
}
</style>
