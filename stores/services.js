import { defineStore } from "pinia";
import axios from "axios";

export const useServicesStore = defineStore("services", {

    
    state: () => ({
        API_BASE_URL: useRuntimeConfig().public.API_BASE_URL,
        allServices:[],
        services:[],
        shortDetails:[],
        longDetails:[],
    }),

    actions: {
     
        async fetchServices() {

        try {

            const response = await axios.get(`${this.API_BASE_URL}/v2/servicio/31?_embed`)
            this.services = response.data

        } catch (error) {
        }
        },

        async getServiceBySlug(slug){
            try {
                const response = await axios.get(`${this.API_BASE_URL}/v2/servicio/${slug}?_embed`);
                this.services = response.data;
                this.shortDetails = response.data.acf.detalles.info_short;
                this.longDetails = response.data.acf.detalles.info_long;
            } catch (error) {
                console.log(error)
            }

        }
    }

});