//Add pinia and axios imports

import { defineStore } from "pinia";
import axios from "axios";

export const useContactStore = defineStore("contact", {
    state: () => ({
        contacts: [],
    }),
    actions: {
        async fetchContacts(data) {
            const response = await axios.post("/v1/submit-form", { params: data });
            this.contacts = response.data;
        },
    },
});
    
