
<script setup>
import { useConfigStore } from '#imports';

const configStore = useConfigStore();

// Initialize the config store

onMounted(async() => {
  await configStore.fetchConfiguraciones();
});

</script>

<template>
  <NuxtLayout name="default">
    <NuxtPage />
  </NuxtLayout>
</template>
