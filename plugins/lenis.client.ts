import Lenis from 'lenis'

// Declarar el tipo para window.lenis
declare global {
  interface Window {
    lenis: Lenis
  }
}

export default defineNuxtPlugin(() => {
  if (process.client) {
    // Inicializar Lenis solo en el cliente con configuración básica
    const lenis = new Lenis({
      duration: 1.2, // Duración de la animación
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Función de easing suave
    })

    // Función de animación
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    // Iniciar el loop de animación
    requestAnimationFrame(raf)

    // Hacer Lenis disponible globalmente
    if (typeof window !== 'undefined') {
      window.lenis = lenis
    }

    // Cleanup cuando la aplicación se destruye
    onBeforeUnmount(() => {
      lenis.destroy()
    })

    return {
      provide: {
        lenis
      }
    }
  }
})
