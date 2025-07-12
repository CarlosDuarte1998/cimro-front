// Plugin de servidor para optimizaciones SEO adicionales
export default defineNitroPlugin(async (nitroApp) => {
  
  // Configurar headers de seguridad y SEO
  nitroApp.hooks.hook('request', async (event) => {
    const url = event.node.req.url

    // Headers de seguridad para mejorar SEO
    if (url) {
      // Header de seguridad para contenido
      event.node.res.setHeader('X-Content-Type-Options', 'nosniff')
      
      // Header para sitemap.xml
      if (url.includes('sitemap')) {
        event.node.res.setHeader('Content-Type', 'application/xml; charset=utf-8')
      }
      
      // Header para robots.txt
      if (url.includes('robots')) {
        event.node.res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      }
    }
  })

  console.log('✅ Plugin de SEO cargado correctamente')
})
