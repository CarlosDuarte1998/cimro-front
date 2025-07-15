//Add pinia and axios imports

import { defineStore } from "pinia";
import axios from "axios";

export const useConfigStore = defineStore("config", {

    state: () => ({
        configuraciones: [],
        bannerMain: [],
        insurance: [],
        socialMedia: [],
        isLoading: false,
        loaded: false,
        error: null,
    }),

    actions: {

        async fetchConfiguraciones() {
           
           if (this.configuraciones.length === 0) {
                this.isLoading = true;
                this.loaded = false;
                this.error = null;
                
                try {
                    const response = await axios.get(`https://cimro-back-dev.grupomonterroza.com/wp-json/acf/v3/opciones`);
                    this.configuraciones = response.data;

                    this.bannerMain = this.configuraciones["configuraciones"].bannerMain || [];
                    this.insurance = this.configuraciones["configuraciones"].insurance || [];
                    this.socialMedia = this.configuraciones["configuraciones"].socialmedia || [];
                    
                    this.loaded = true;
                } catch (error) {
                    console.error("Error fetching configuraciones:", error);
                    this.error = error;
                    this.loaded = false;
                } finally {
                    this.isLoading = false;
                }
            }
        
        },
    },
    getters: {
        // Getter para saber si está cargando
        isCurrentlyLoading: (state) => state.isLoading,
        
        // Getter para saber si los datos están disponibles
        hasDataLoaded: (state) => state.loaded && !state.isLoading,
        
        // Getter para verificar si hay banners disponibles
        hasBanners: (state) => state.bannerMain.length > 0,
        
        // Getter para verificar si hay seguros disponibles
        hasInsurance: (state) => state.insurance.length > 0,
    },
});
