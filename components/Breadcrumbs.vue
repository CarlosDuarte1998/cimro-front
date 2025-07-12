<template>
  <nav class="flex mb-6" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          <UIcon name="i-heroicons-home" class="w-4 h-4 mr-2" />
          Inicio
        </NuxtLink>
      </li>
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <div class="flex items-center">
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-gray-400 mx-1" />
          <NuxtLink 
            v-if="crumb.to && index < breadcrumbs.length - 1"
            :to="crumb.to"
            class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
          >
            {{ crumb.label }}
          </NuxtLink>
          <span 
            v-else
            class="ml-1 text-sm font-medium text-gray-500 md:ml-2"
          >
            {{ crumb.label }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface Breadcrumb {
  label: string
  to?: string
}

interface Props {
  breadcrumbs: Breadcrumb[]
}

defineProps<Props>()

// Structured Data para breadcrumbs
const props = defineProps<Props>()

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: 'https://cimro.com.sv'
          },
          ...props.breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 2,
            name: crumb.label,
            item: crumb.to ? `https://cimro.com.sv${crumb.to}` : undefined
          }))
        ]
      })
    }
  ]
})
</script>
