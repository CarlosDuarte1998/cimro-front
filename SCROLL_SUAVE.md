# Implementación de Scroll Suave con Lenis

## 📋 Resumen

Se ha implementado scroll suave en el proyecto usando **Lenis**, una librería moderna y performante para scroll suave que proporciona una experiencia de usuario más fluida y profesional.

## 🚀 Características Implementadas

### 1. Plugin de Lenis (`plugins/lenis.client.ts`)
- **Solo cliente**: Se ejecuta únicamente en el navegador
- **Configuración optimizada**: Duración de 1.2s con easing suave
- **Auto-cleanup**: Se destruye automáticamente al cambiar de página
- **Accesible globalmente**: Disponible como `window.lenis`

### 2. Composable useLenis (`composables/useLenis.ts`)
Proporciona funciones útiles para controlar el scroll:

```javascript
const { scrollTo, scrollToTop, stop, start } = useLenis()

// Scroll al top de la página
scrollToTop()

// Scroll a un elemento específico
scrollTo('#mi-seccion', { offset: -100, duration: 1.5 })

// Pausar/reanudar scroll suave
stop()
start()
```

### 3. Ejemplo en Header
- El logo ahora hace scroll suave al top cuando estás en la página de inicio
- Demuestra el uso del composable `useLenis`

## 🎛️ Configuración Actual de Lenis

```javascript
const lenis = new Lenis({
  duration: 1.2,           // Duración de la animación
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Easing suave
})
```

## 🔧 Cómo Usar

### Uso Básico
El scroll suave funciona automáticamente en toda la aplicación. No necesitas hacer nada adicional.

### Uso Avanzado en Componentes
```vue
<script setup>
const { scrollTo, scrollToTop } = useLenis()

const handleScrollToSection = () => {
  scrollTo('#mi-seccion')
}
</script>

<template>
  <button @click="scrollToTop">Ir al inicio</button>
  <button @click="handleScrollToSection">Ir a sección</button>
</template>
```

### Control Programático
```javascript
// Acceso directo a la instancia de Lenis
if (window.lenis) {
  window.lenis.scrollTo(0) // Scroll al top
  window.lenis.stop()      // Pausar
  window.lenis.start()     // Reanudar
}
```

## 📱 Compatibilidad

- **Desktop**: Scroll suave completo
- **Mobile**: Configurado para usar scroll nativo del dispositivo (`smoothTouch: false`)
- **Todos los navegadores modernos**

## 🎨 Personalización

Para ajustar la configuración, edita `plugins/lenis.client.ts`:

```javascript
const lenis = new Lenis({
  duration: 2.0,        // Más lento
  // easing: personalizado
  // Otras opciones según documentación de Lenis
})
```

## 📚 Referencias

- [Documentación de Lenis](https://lenis.studiofreight.com/)
- [GitHub de Lenis](https://github.com/studio-freight/lenis)

---

✨ **El scroll suave está ahora activo en toda la aplicación!**
