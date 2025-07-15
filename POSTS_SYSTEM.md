# Sistema de Posts/Noticias para CIMRO

## Resumen
He implementado un sistema completo para gestionar y mostrar posts/noticias en el sitio web de CIMRO. El sistema está integrado con la API de WordPress y proporciona una experiencia de usuario moderna y responsiva.

## Archivos Creados

### 1. Store - Gestión de Estado
- **`stores/posts.js`**: Store principal de Pinia para manejar el estado de los posts
  - Gestión de posts, paginación, búsqueda y errores
  - Integración con la API de WordPress v2
  - Normalización de datos de la API
  - Métodos para obtener posts por categoría, slug, ID
  - Funcionalidad de búsqueda y paginación infinita

### 2. Composable - Utilidades Reutilizables
- **`composables/usePosts.ts`**: Composable con utilidades para trabajar con posts
  - Formateo de fechas en español
  - Limpieza de excerpts (eliminar HTML)
  - Cálculo de tiempo de lectura
  - Generación de URLs para compartir en redes sociales
  - Búsqueda de posts relacionados
  - Funciones de búsqueda y filtrado
  - Generación de meta tags SEO

### 3. Páginas
- **`pages/noticias/index.vue`**: Página principal de noticias
  - Lista de todos los posts con paginación
  - Post destacado (primer post)
  - Búsqueda en tiempo real
  - Estados de carga, error y vacío
  - Funcionalidad "cargar más"
  - Responsive design

- **`pages/noticias/[slug].vue`**: Página individual de post
  - Vista completa del post con contenido
  - Breadcrumbs de navegación
  - Información del autor y fecha
  - Tiempo de lectura estimado
  - Botones para compartir en redes sociales
  - Posts relacionados
  - Meta tags SEO dinámicos

### 4. Componentes
- **`components/PostCard.vue`**: Tarjeta reutilizable para mostrar posts
  - Imagen destacada con overlay de categoría
  - Título, fecha, autor, excerpt
  - Efectos hover y transiciones
  - Props configurables para diferentes usos

- **`components/RecentPosts.vue`**: Sección de posts recientes
  - Puede mostrar posts por categoría o recientes
  - Estados de carga y error
  - Botón "Ver todas las noticias"
  - Completamente configurable via props

### 5. Integración en Página Principal
- **`pages/index.vue`**: Actualizada para incluir sección de noticias recientes

## Características Implementadas

### 🔍 Búsqueda y Filtrado
- Búsqueda en tiempo real con debounce
- Filtrado por categorías
- Búsqueda en título, contenido y categorías

### 📱 Diseño Responsivo
- Grid adaptativo (1, 2, 3 columnas)
- Imágenes optimizadas y lazy loading
- Tipografía responsive

### ⚡ Performance
- Lazy loading de imágenes
- Paginación eficiente
- Estados de carga optimizados
- Debounce en búsqueda

### 🎨 UX/UI
- Transiciones suaves
- Estados de hover interactivos
- Loading skeletons
- Estados de error amigables
- Breadcrumbs de navegación

### 🔗 Compartir Social
- Facebook, Twitter, WhatsApp, LinkedIn
- Copiar enlace al portapapeles
- Meta tags Open Graph completos

### 📊 SEO Optimizado
- Meta tags dinámicos por post
- Structured data (JSON-LD)
- URLs amigables
- Tiempo de lectura
- Alt text en imágenes

### 🎯 Posts Relacionados
- Algoritmo inteligente que prioriza:
  1. Posts de la misma categoría
  2. Posts recientes si no hay suficientes de la categoría

## Estructura de Datos

### Post Object
```javascript
{
  id: number,
  title: string,
  content: string,
  excerpt: string,
  slug: string,
  date: string,
  modified: string,
  author: {
    name: string,
    id: number
  },
  categories: Array<{
    id: number,
    name: string,
    slug: string
  }>,
  featured_image: string,
  featured_image_large: string,
  featured_image_alt: string
}
```

## Configuración API

El sistema está configurado para trabajar con la API de WordPress:
- **Endpoint**: `{API_BASE_URL}/v2/posts`
- **Parámetros**: `?_embed` para obtener medios y metadatos
- **Normalización**: Los datos se normalizan para consistencia

## Uso de Componentes

### PostCard
```vue
<PostCard 
  :post="post"
  :show-author="true"
  :show-reading-time="false"
  read-more-text="Leer más"
/>
```

### RecentPosts
```vue
<RecentPosts 
  title="Últimas Noticias"
  subtitle="Mantente informado"
  :limit="3"
  :category-id="null"
  :show-author="false"
  :show-view-all-button="true"
/>
```

## Funcionalidades del Store

```javascript
// Obtener posts
await postsStore.fetchPosts(page, perPage)

// Buscar posts
await postsStore.searchPosts(searchTerm)

// Posts por categoría
await postsStore.fetchPostsByCategory(categoryId)

// Post individual
await postsStore.fetchPostBySlug(slug)
await postsStore.fetchPostById(id)

// Getters disponibles
postsStore.allPosts
postsStore.postsByDate
postsStore.recentPosts
postsStore.totalPosts
```

## Configuración SEO

El sistema genera automáticamente:
- Títulos optimizados
- Meta descriptions
- Open Graph tags
- Twitter Cards
- Structured data
- Canonical URLs

## Responsive Breakpoints

- **Mobile**: 1 columna
- **Tablet**: 2 columnas (sm:grid-cols-2)
- **Desktop**: 3 columnas (lg:grid-cols-3)

## Estados Manejados

- ✅ Loading
- ✅ Error
- ✅ Empty/No results
- ✅ Success with data
- ✅ Search no results

## Próximas Mejoras Sugeridas

1. **Comentarios**: Sistema de comentarios en posts
2. **Newsletter**: Suscripción a noticias
3. **Archivos**: Vista de posts por fecha
4. **Tags**: Navegación por etiquetas
5. **Favoritos**: Guardar posts favoritos
6. **Analytics**: Tracking de vistas y engagement

El sistema está completamente funcional y listo para usar con los datos reales de la API de WordPress proporcionada.
