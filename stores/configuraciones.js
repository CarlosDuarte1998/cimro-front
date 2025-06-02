//Add pinia and axios imports

import { defineStore } from "pinia";
import axios from "axios";

export const useConfigStore = defineStore("config", {

    state: () => ({
        configuraciones: [],
        bannerMain: [],
        loaded: false,
        error: null,
    }),

    actions: {

        async fetchConfiguraciones() {
           if (this.configuraciones.length === 0) {
                this.loaded = false;
                try {
                    this.loaded = true;
                    const response = await axios.get(`https://cimro-back-dev.grupomonterroza.com/wp-json/acf/v3/opciones`);
                    this.configuraciones = response.data;
                    this.bannerMain = this.configuraciones["configuraciones"].bannerMain || [];
                } catch (error) {
                    console.error("Error fetching configuraciones:", error);
                    this.error = error;
                    this.loaded = false;
                }
                this.loaded = false;
            }
        
        },
    }
});
