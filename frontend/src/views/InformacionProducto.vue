<template>
   <v-container>
        <v-row align="center" justify="center">
            <v-col cols="10">
                 <v-card color="blue lighten-5">
                    <v-toolbar color="blue lighten-5">
                        <v-icon>mdi-badge-account-horizontal</v-icon>
                        <v-spacer></v-spacer>
                        <v-toolbar-title>Información del Producto</v-toolbar-title>
                    </v-toolbar>
                    <v-dialog v-model="dialog" width="600px">
                      <template v-slot:activator="{ on }">
                        <v-img
                        :src="src"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="400px"
                        v-on="on"
                        >
                        </v-img>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Vista Previa de Imagen</span>
                        </v-card-title>
                        <v-img
                          :src="src"
                          class="white--text align-end"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                          height="600px"
                          v-on="on"
                          >
                        </v-img>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue lighten-1" text @click="dialog = false">Vale</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Nombre" type="text" readonly prepend-icon="mdi-tag" v-model="nombre"/>
                            <v-text-field label="ID" type="number" readonly prepend-icon="mdi-lock" v-model="idProd"/>
                            <v-text-field label="Descripción" type="text" readonly prepend-icon="mdi-rename-box" v-model="descripcion"/>
                            <v-text-field label="Precio" type="number" readonly prepend-icon="mdi-cash-100" v-model="precio"/>
                            <v-text-field label="Categoría" type="text" readonly prepend-icon="mdi-playlist-check" v-model="categoria"/>
                            <v-text-field label="Estado del producto" type="text" readonly prepend-icon="mdi-timer-sand-empty" v-model="estado"/>
                            <v-text-field label="Vendedor" type="text" readonly prepend-icon="mdi-account-box" v-model="vendedor"/>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
const axios = require("axios");
const direccionIp = "http://127.0.0.1:3000";
export default {
  data() {
    return {
      id: this.$route.query.id,
      dni: this.$route.query.dni,
      datos: null,
      idProd: "",
      nombre: "",
      descripcion: "",
      precio: "",
      categoria: "",
      estado: "",
      src: "",
      show: false,
      vendedor: "",
      vendido: false,
      dialog: false,
    };
  },
  mounted() {
    axios
      .get(direccionIp + "/traerProducto", {
        params: {
          id: this.id,
        },
      })
      .then(response => {
        this.recogerDatos(response);
      });
  },
  methods: {
    comprar() {
      let body = {
        dni: this.dni,
        nombreProducto: this.nombre,
      };
      axios.post(direccionIp + "/comprarProducto", body).then(response => {
        this.comprobarRespuesta(response.data, this.nombre);
      });
    },
    favorito() {
      let body = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        foto: this.src,
        categoria: this.categoria,
        estado: this.estado,
        vendido: this.vendido,
        show: this.show,
        usuarioDNI: this.dni,
        productoIdProducto: this.id,
      };
      console.log(body);
      axios.post(direccionIp + "/introducirDeseo", body).then(response => {
        // this.comprobarRespuestaDeseos(response.data, nombreProducto);
        console.log("RESPUESTA:" + response.data);
      });
    },
    verFotoProducto(respuesta) {
      alert(respuesta);
    },
    comprobarRespuesta(respuesta, nombre) {
      if (respuesta == "si") {
        alert("Producto:" + nombre + " comprado");
        this.$emit("entro", this.dni);
      }
    },
    recogerDatos(respuesta) {
      this.datos = respuesta.data;
      this.nombre = this.datos.nombre;
      this.idProd = this.datos.IdProducto;
      this.precio = this.datos.precio;
      this.descripcion = this.datos.descripcion;
      this.categoria = this.datos.categoria;
      this.estado = this.datos.estado;
      this.src = this.datos.foto;
      this.show = this.datos.show;
      this.vendedor = this.datos.usuarioDNI;
      this.vendido = this.datos.vendido;
    },
  },
};
</script>