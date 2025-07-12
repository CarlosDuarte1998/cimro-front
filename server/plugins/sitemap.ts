// Plugin de servidor para optimizaciones SEO adicionales de CIMRO
export default defineNitroPlugin(async (nitroApp) => {
  
  // Configurar headers de seguridad y SEO para CIMRO - Centro de Imágenes Radiológicas de Occidente
  nitroApp.hooks.hook('request', async (event) => {
    const url = event.node.req.url

    // Headers de seguridad para mejorar SEO
    if (url) {
      // Header de seguridad para contenido
      event.node.res.setHeader('X-Content-Type-Options', 'nosniff')
      
      // Header para sitemap.xml con información de CIMRO
      if (url.includes('sitemap')) {
        event.node.res.setHeader('Content-Type', 'application/xml; charset=utf-8')
        event.node.res.setHeader('Cache-Control', 'public, max-age=86400') // Cache por 24 horas
      }
      
      // Header para robots.txt
      if (url.includes('robots')) {
        event.node.res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      }

      // Headers adicionales para SEO local de Santa Ana
      if (url === '/' || url.includes('/servicios') || url.includes('/contactanos')) {
        event.node.res.setHeader('X-Business-Location', 'Santa Ana, El Salvador')
        event.node.res.setHeader('X-Business-Type', 'Medical Imaging Center')
      }
    }
  })
})
