//Add pinia and axios imports

import { defineStore } from "pinia";
import axios from "axios";

export const useContactStore = defineStore("contact", {
    state: () => ({
        isLoading: false,
        contacts: [],
        API_BASE_URL: useRuntimeConfig().public.API_BASE_URL,
    }),
    actions: {
        async submitContactForm(data) {
            this.isLoading = true;
            try {
                const response = await axios.post(`${this.API_BASE_URL}/wp/v1/submit-form`, data);
                this.contacts = response.data;
                return response.data;
            } catch (error) {
                console.error("Error submitting contact form:", error);
                throw error;
            } finally {
                this.isLoading = false;
            }
        },
    },
});
    
