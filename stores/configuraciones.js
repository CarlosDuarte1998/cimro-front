//Add pinia and axios imports

import { defineStore } from "pinia";
import axios from "axios";

export const useConfigStore = defineStore("config", {

    state: () => ({
        configuraciones: [],
        bannerMain: [],
        insurance: [],
        socialMedia: [],
        contactInfo: {},
        businessHours: {},
        isLoading: false,
        loaded: false,
        error: null,
        URL_CONFIG: useRuntimeConfig().public.API_BASE_URL,
    }),

    actions: {

        async fetchConfiguraciones() {
           
           if (this.configuraciones.length === 0) {
                this.isLoading = true;
                this.loaded = false;
                this.error = null;
                
                try {
                    const response = await axios.get(`${this.URL_CONFIG}/acf/v3/opciones`);
                    this.configuraciones = response.data;

                    this.bannerMain = this.configuraciones["configuraciones"].bannerMain || [];
                    this.insurance = this.configuraciones["configuraciones"].insurance || [];
                    this.socialMedia = this.configuraciones["configuraciones"].socialmedia || [];
                    
                    // Extraer información de contacto
                    this.contactInfo = {
                        address: this.configuraciones["configuraciones"].direccion || '',
                        phone: this.configuraciones["configuraciones"].telefono || '',
                        whatsapp: this.configuraciones["configuraciones"].whatsapp || '',
                        email: this.configuraciones["configuraciones"].email || '',
                        website: this.configuraciones["configuraciones"].website || ''
                    };
                    
                    // Extraer horarios de atención
                    this.businessHours = {
                        weekdays: this.configuraciones["configuraciones"].horario_semana || '',
                        saturday: this.configuraciones["configuraciones"].horario_sabado || '',
                        weekdays_corto: this.configuraciones["configuraciones"].horario_semana_corto || '',
                        saturday_corto: this.configuraciones["configuraciones"].horario_sabado_corto || ''
                    };
                    
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
        
        // Getter para información de contacto
        getContactInfo: (state) => state.contactInfo,
        
        // Getter para horarios de atención
        getBusinessHours: (state) => state.businessHours,
    },
});