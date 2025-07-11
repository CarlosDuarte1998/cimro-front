import { defineStore } from "pinia";
import axios from "axios";

export const useServicesStore = defineStore("services", {

    
    state: () => ({
        API_BASE_URL: useRuntimeConfig().public.API_BASE_URL,
        allServices:[],
        services:[],
        shortDetails:[],
        longDetails:[],
        imgServices:[],
    }),

    actions: {
     
        async getAllServices() {
            try {
                const response = await axios.get(`${this.API_BASE_URL}/v2/servicios?_embed`);
                this.allServices = response.data;
            } catch (error) {
                console.log(error);
            }
        },

        async getServiceBySlug(slug){
            try {
                const response = await axios.get(`${this.API_BASE_URL}/v2/servicio/${slug}?_embed`);
                this.services = response.data;
                this.shortDetails = response.data.acf.detalles.info_short;
                this.longDetails = response.data.acf.detalles.info_long;
                this.imgServices = response.data._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
            } catch (error) {
                console.log(error)
            }

        }
    }

});