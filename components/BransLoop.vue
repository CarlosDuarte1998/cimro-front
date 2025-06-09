<script setup>
import { onMounted } from 'vue'

import { useConfigStore } from '#imports';

const configStore = useConfigStore();
let insurances = computed(() => configStore.insurance || []);

onMounted(() => {
    const logos = document.getElementById("slider")?.cloneNode(true);
    if (logos) {
        document.getElementById("logos")?.appendChild(logos);
    }
});




</script>


<template>
    <!-- Brans Loop infinity -->




    <div class="logos" id="logos">

        <div class="logos-slide flex" id="slider">
            <template v-for="item in insurances">

                <img :src="item.imagen" alt="" srcset="" class="" />


            </template>

        </div>

    </div>


</template>

<style scoped>
.logos {
    width: 80%;
    display: flex;
    margin: auto;
    overflow: hidden;
    background: white;
    white-space: nowrap;
    position: relative;
    padding: px 0;
}

.logos-slide {
    animation: 20s slide infinite linear;

    img {
        display: inline-block;
        width: 150px;
        margin: 0px 70px;
        aspect-ratio: 1/1;
        object-fit: contain;
    }
}

.logos::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    content: "";
    background: linear-gradient(to left, rgb(255, 255, 255, 0), rgb(255, 255, 255));
    z-index: 1;
}

.logos::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 100%;
    content: "";
    background: linear-gradient(to right, rgb(255, 255, 255, 0), rgb(255, 255, 255));
    z-index: 1;
}

/* Animacion */
@keyframes slide {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}
</style>