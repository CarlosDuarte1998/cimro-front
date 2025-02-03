<script setup>

    import { ref } from 'vue';



const activeSection = ref(false);
</script>

<template>
    <div>
        <button @click="activeSection = !activeSection">
            Click me
        </button>


    </div>
</template>

<style scoped>

</style>