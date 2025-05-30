<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const route = useRoute();
const slug = ref("");

onMounted(() => {
  slug.value = route.params.slug;
});
</script>

<template>
  <section class="bg-blue-900 py-16 text-white">
    <div class="container px-4 md:px-6">
      <div class="mx-auto max-w-3xl text-center">
        <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Tomografía Computarizada Multicorte
        </h1>
        <p class="mt-4 text-blue-100 md:text-xl">
          Diagnóstico preciso con imágenes de alta resolución utilizando
          tecnología de vanguardia.
        </p>
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
                      15-30 minutos aproximadamente
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
                      Disponibles en 24-48 horas
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
                      Puede requerir ayuno o medio de contraste
                    </p>
                  </div>
                </div>
                <div data-orientation="horizontal" role="none" class="shrink-0 bg-border border-gray-200 h-[1px] w-full"></div>
                <div class="flex justify-center">
                  <a class="inline-flex items-center justify-center gap-2  rounded-md text-sm font-medium  bg-black text-white text-primary-foreground hover:bg-black/90 h-10 px-4 py-2 w-full"
                    href="/agendar-cita">Agendar Cita</a>
                </div>
              </div>
            </div>
            <div class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
              <div class="flex flex-col space-y-1.5 p-6">
                <div class="text-2xl font-semibold leading-none tracking-tight">
                  Estudios Relacionados
                </div>
              </div>
              <div class="p-6 pt-0 space-y-4">
                <a class="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
                  href="/servicios/rayos-x"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-info h-4 w-4">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                  Rayos X Convencionales</a><a
                  class="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
                  href="/servicios/ultrasonidos"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-info h-4 w-4">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                  Ultrasonidos</a>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-2">
          <div class="mb-8">
            <img alt="Tomógrafo Multicorte" loading="lazy" width="800" height="400" decoding="async" data-nimg="1"
              class="rounded-lg object-cover" src="https://picsum.photos/800/400?random=1"
              style="color: transparent" />
          </div>
          <div dir="ltr" data-orientation="horizontal">
            <div role="tablist" aria-orientation="horizontal"
              class="h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground mb-6 grid w-full grid-cols-4"
              tabindex="0" data-orientation="horizontal" style="outline: none">
              <button type="button" role="tab" aria-selected="false" aria-controls="radix-«r36»-content-descripcion"
                data-state="inactive" id="radix-«r36»-trigger-descripcion"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
                Descripción</button><button type="button" role="tab" aria-selected="false"
                aria-controls="radix-«r36»-content-preparacion" data-state="inactive"
                id="radix-«r36»-trigger-preparacion"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
                Preparación</button><button type="button" role="tab" aria-selected="true"
                aria-controls="radix-«r36»-content-procedimiento" data-state="active"
                id="radix-«r36»-trigger-procedimiento"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                tabindex="0" data-orientation="horizontal" data-radix-collection-item="">
                Procedimiento</button><button type="button" role="tab" aria-selected="false"
                aria-controls="radix-«r36»-content-preguntas" data-state="inactive" id="radix-«r36»-trigger-preguntas"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
                Preguntas Frecuentes
              </button>
            </div>
            <div data-state="inactive" data-orientation="horizontal" role="tabpanel"
              aria-labelledby="radix-«r36»-trigger-descripcion" id="radix-«r36»-content-descripcion" tabindex="0"
              class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-6"
              style="" hidden=""></div>
            <div data-state="inactive" data-orientation="horizontal" role="tabpanel"
              aria-labelledby="radix-«r36»-trigger-preparacion" id="radix-«r36»-content-preparacion" tabindex="0"
              class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-6"
              hidden=""></div>
            <div data-state="active" data-orientation="horizontal" role="tabpanel"
              aria-labelledby="radix-«r36»-trigger-procedimiento" id="radix-«r36»-content-procedimiento" tabindex="0"
              class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-6">
              <div>
                <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900">
                  ¿Cómo se realiza la Tomografía?
                </h2>
                <p class="text-gray-600">
                  El procedimiento de la tomografía computarizada es rápido,
                  indoloro y no invasivo (a menos que se requiera medio de
                  contraste intravenoso). A continuación, se describe el proceso
                  paso a paso:
                </p>
              </div>
              <div class="space-y-4">
                <div class="rounded-lg border border-gray-200 p-4">
                  <h3 class="mb-2 text-lg font-medium text-gray-900">
                    1. Preparación
                  </h3>
                  <p class="text-gray-600">
                    Se le pedirá que se cambie a una bata hospitalaria y retire
                    cualquier objeto metálico que pueda interferir con el
                    estudio (joyas, anteojos, prótesis dentales removibles,
                    etc.). Si el estudio requiere medio de contraste, se le
                    colocará una vía intravenosa.
                  </p>
                </div>
                <div class="rounded-lg border border-gray-200 p-4">
                  <h3 class="mb-2 text-lg font-medium text-gray-900">
                    2. Posicionamiento
                  </h3>
                  <p class="text-gray-600">
                    Se le pedirá que se acueste en la mesa de exploración, que
                    se moverá lentamente a través del tomógrafo (un equipo en
                    forma de anillo). El técnico le ayudará a encontrar la
                    posición correcta y puede utilizar almohadas o correas para
                    ayudarle a mantener la posición adecuada.
                  </p>
                </div>
                <div class="rounded-lg border border-gray-200 p-4">
                  <h3 class="mb-2 text-lg font-medium text-gray-900">
                    3. Realización del Estudio
                  </h3>
                  <p class="text-gray-600">
                    Durante el estudio, la mesa se moverá lentamente a través
                    del tomógrafo mientras el equipo realiza múltiples imágenes.
                    Es importante permanecer completamente inmóvil durante la
                    exploración para evitar que las imágenes salgan borrosas. El
                    técnico le dará instrucciones a través de un
                    intercomunicador, como cuándo debe contener la respiración.
                  </p>
                </div>
                <div class="rounded-lg border border-gray-200 p-4">
                  <h3 class="mb-2 text-lg font-medium text-gray-900">
                    4. Administración de Contraste (si aplica)
                  </h3>
                  <p class="text-gray-600">
                    Si su estudio requiere medio de contraste, este se
                    administrará a través de la vía intravenosa durante la
                    exploración. Puede sentir una sensación de calor o un sabor
                    metálico en la boca durante la inyección, lo cual es normal.
                    En algunos casos, también puede ser necesario tomar
                    contraste oral antes del estudio.
                  </p>
                </div>
                <div class="rounded-lg border border-gray-200 p-4">
                  <h3 class="mb-2 text-lg font-medium text-gray-900">
                    5. Finalización
                  </h3>
                  <p class="text-gray-600">
                    Una vez completado el estudio, se retirará la vía
                    intravenosa (si se utilizó) y podrá reanudar sus actividades
                    normales. Si recibió medio de contraste, se le recomendará
                    beber abundante agua para ayudar a eliminar el contraste de
                    su organismo.
                  </p>
                </div>
              </div>
              <div>
                <h3 class="mb-3 text-xl font-bold text-gray-900">
                  Duración del Procedimiento
                </h3>
                <p class="text-gray-600">
                  El tiempo total del procedimiento varía según el tipo de
                  estudio, pero generalmente toma entre 15 y 30 minutos. La
                  exploración en sí suele durar solo unos minutos, mientras que
                  la mayor parte del tiempo se dedica a la preparación y
                  posicionamiento.
                </p>
              </div>
            </div>
            <div data-state="inactive" data-orientation="horizontal" role="tabpanel"
              aria-labelledby="radix-«r36»-trigger-preguntas" id="radix-«r36»-content-preguntas" tabindex="0"
              class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-6"
              hidden=""></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
