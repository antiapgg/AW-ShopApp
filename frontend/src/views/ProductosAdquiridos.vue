<template>
<v-container>
    <v-btn @click="volverAInicio">Volver a inicio</v-btn>
    <v-data-table
        :headers="headers"
        :items="cards"
        @click:row="muestraInformacion"
    ></v-data-table>
    <v-card v-show="productoCompradoObtenido">
        <v-img 
        :src="productoComprado.foto"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="400px"
        >
        </v-img>

        <v-card-text>
        <v-form>
            <v-text-field label="Nombre" readonly type="text" prepend-icon="mdi-account-box" v-model="productoComprado.nombre"/>
            <v-text-field label="Descripcion" readonly type="text" prepend-icon="mdi-rename-box" v-model="productoComprado.descripcion"/>
            <v-text-field label="Precio" readonly type="number" prepend-icon="mdi-cash-100" v-model="productoComprado.precio"/>
            <v-text-field label="estado" readonly type="text" prepend-icon="mdi-comment-search" v-model="productoComprado.estado"/>
            <v-text-field label="Categoria" readonly type="text" prepend-icon="mdi-new-box" v-model="productoComprado.categoria"/>
        </v-form>
        </v-card-text>
    </v-card>
    
</v-container>
  
</template>
<script>
const axios = require("axios");

const direccionIp = "http://127.0.0.1:3000";
export default {
  data() {
    return {
      dni: this.$route.query.id,
      productoCompradoObtenido: false,
      cards: [],
      headers: [
        { text: "DNI", value: "usuarioDNI" },
        { text: "ID Producto", value: "productoIdProducto" },
      ],
      productoComprado: {},
    };
  },

  methods: {
    muestraInformacion(carta) {
      console.log("La carta es:" + carta.productoIdProducto);
      this.productoComprado = carta;

      axios
        .get(direccionIp + "/traerProducto", {
          params: {
            id: carta.productoIdProducto,
          },
        })
        .then(response => {
          this.productoComprado = response.data;
          this.productoCompradoObtenido = true;
          console.log(response.data);
        });
    },
    volverAInicio() {
      this.$emit("entro", this.dni);
    },
  },
  mounted() {
    console.log("El dni es:" + this.dni);
    axios
      .get(direccionIp + "/traerCompra", {
        params: {
          dni: this.dni,
        },
      })
      .then(response => {
        this.cards = response.data;
        console.log(this.cards[3].productoIdProducto);
      });
  },
};
</script>

