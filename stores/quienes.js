import { defineStore } from "pinia";
import axios from "axios";

export const useQuienesStore = defineStore("quienes", {
    
    state: () => ({
        quienesSomos: {},
        descripcion: "",
        historia: "",
        mision: "",
        vision: "",
        valores: {},
        descripcionequipo: "",
        // equipo: {
        // perfil: '',
        // nombre: '',
        // puesto: '',
        // descripcion: ''
        // },
        equipo: [],
        descripcion_certificaciones: [],
        detalles_certificacion: [],
        isLoading: false,
        loaded: false,
        error: null,
    }),

    actions: {
        async fetchquienesSomos() {
            if (!this.loaded) {
                this.isLoading = true;
                this.error = null;

                try {
                    const response = await axios.get(
                        `https://admin-cimro.gunssoft.tech/wp-json/acf/v3/opciones`
                    );
                    const data = response.data;
                    this.quienesSomos = data;
                    const detalles = data.detalles || {};
                    //this.descripcion = data.descripcion || "";
                    this.descripcion = data.detalles.descripcion || "";
                    //this.historia = data.historia || "";
                    this.historia = data.detalles.historia || "";
                    // this.mision = data.mision || "";
                    this.mision = data.detalles?.mision || "";
                    // this.vision = data.vision || "";
                    this.vision = data.detalles?.vision || "";
                    
                    //this.valores = Array.isArray(data.valores)? data.valores.map(item => item.valor) : [];
                    this.valores = Array.isArray(data.detalles.valores)? data.detalles.valores.map(item => item.valor) : [];
                    //this.descripcionequipo = data.descripcionequipo || "";
                    
                    this.equipo = data.detalles.equipo?.map(item => ({
                    perfil: item.detalles_equipo?.perfil || '',
                    nombre: item.detalles_equipo?.nombre || '',
                    puesto: item.detalles_equipo?.puesto || '',
                    descripcion: item.detalles_equipo?.descripcion || ''
                    })) || [];
                    
                    this.descripcion_certificaciones = data.descripcion_certificaciones || [];
                    this.detalles_certificacion = data.detalles_certificaciones?.map(item => ({
                    titulo_certificacion: item.certificacion?.titulo_certificacion || '',
                    descripcion_certificacion: item.certificacion?.descripcion_certificacion || '',
                    imagen_certificacion: item.certificacion?.imagen_certificacion || '',
                    pdf_certificacion: item.certificacion?.pdf_certificacion || ''
                    })) || [];

                    this.loaded = true;

                } catch (error) {
                    console.error("Error fetching quienesSomos:", error);
                    this.error = error;
                } finally {
                    this.isLoading = false;
                }
            }

        },
    },

    getters: {
        getHistoriaHTML: (state) => state.historia,
        getValoresHTML: (state) => state.valores,
        hasHistoria: (state) => !!state.historia,
        hasValores: (state) => !!state.valores
    },
});
