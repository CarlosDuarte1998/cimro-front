// Composable para usar Lenis en componentes
export const useLenis = () => {
  const lenis = ref<any>(null)

  onMounted(() => {
    if (process.client && window.lenis) {
      lenis.value = window.lenis
    }
  })

  // Función para hacer scroll a un elemento específico
  const scrollTo = (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => {
    if (lenis.value) {
      lenis.value.scrollTo(target, {
        offset: options?.offset || 0,
        duration: options?.duration || 1.2
      })
    }
  }

  // Función para hacer scroll al top
  const scrollToTop = (duration = 1.2) => {
    if (lenis.value) {
      lenis.value.scrollTo(0, { duration })
    }
  }

  // Función para pausar/reanudar el scroll suave
  const stop = () => {
    if (lenis.value) {
      lenis.value.stop()
    }
  }

  const start = () => {
    if (lenis.value) {
      lenis.value.start()
    }
  }

  return {
    lenis: readonly(lenis),
    scrollTo,
    scrollToTop,
    stop,
    start
  }
}
