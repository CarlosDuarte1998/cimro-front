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
                const response = await axios.get(`${this.API_BASE_URL}/wp/v2/servicios?_embed`);
                this.allServices = response.data;
            } catch (error) {
                console.error('Error fetching all services:', error);
            }
        },

        async getServiceBySlug(slug){
            try {
                const response = await axios.get(`${this.API_BASE_URL}/wp/v2/servicio/${slug}?_embed`);
                this.services = response.data;
                this.shortDetails = response.data.acf?.detalles?.info_short || {};
                this.longDetails = response.data.acf?.detalles?.info_long || {};
                
                // Obtener imagen en mejor calidad
                const featuredMedia = response.data._embedded?.['wp:featuredmedia']?.[0];
                if (featuredMedia) {
                    // Priorizar imagen en tamaño original o el más grande disponible
                    this.imgServices = featuredMedia.media_details?.sizes?.full?.source_url || 
                                     featuredMedia.media_details?.sizes?.large?.source_url ||
                                     featuredMedia.source_url || '';
                } else {
                    this.imgServices = '';
                }
            } catch (error) {
                console.error('Error fetching service by slug:', error);
                // Resetear datos en caso de error
                this.services = {};
                this.shortDetails = {};
                this.longDetails = {};
                this.imgServices = '';
            }
        },

        async getServiceById(id){
            try {
                const response = await axios.get(`${this.API_BASE_URL}/wp/v2/servicio/${id}?_embed`);
                
                this.services = response.data;
                this.shortDetails = response.data.acf?.detalles?.info_short || {};
                this.longDetails = response.data.acf?.detalles?.info_long || {};
                
                // Obtener imagen en mejor calidad
                const featuredMedia = response.data._embedded?.['wp:featuredmedia']?.[0];
                
                if (featuredMedia) {
                    // Priorizar imagen en tamaño original o el más grande disponible
                    this.imgServices = featuredMedia.media_details?.sizes?.full?.source_url || 
                                     featuredMedia.media_details?.sizes?.large?.source_url ||
                                     featuredMedia.media_details?.sizes?.medium_large?.source_url ||
                                     featuredMedia.source_url || '';
                } else {
                    this.imgServices = '';
                }
            } catch (error) {
                console.error('Error fetching service by ID:', error);
                // Resetear datos en caso de error
                this.services = {};
                this.shortDetails = {};
                this.longDetails = {};
                this.imgServices = '';
            }
        }
    }

});