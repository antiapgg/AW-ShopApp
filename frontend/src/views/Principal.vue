<template>
  <v-container>
    <v-card class="mx-auto" max-width="700" color="blue lighten-3">
      <!-- Separador -->
      <v-spacer></v-spacer>
      <v-container fluid>
        <v-row dense>
          <!-- Lista de productos mostrados -->
          <v-col
            v-for="card in filtrarNombre"
            :key="card.title"
            :cols="flex"
            v-show="!card.vendido"
          >
            <v-card>
              <v-img
                :src="card.foto"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="350px"
                @click="informacionProducto(card.IdProducto)"
              >
              </v-img>

              <v-card-title v-text="card.nombre"></v-card-title>
              <v-card-subtitle v-text="card.estado"></v-card-subtitle>
              <v-card-subtitle v-text="card.precio" />

              <v-card-actions>
                <v-btn icon @click="listaDeseos(card)">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon @click="comprarProducto(card.nombre)">
                  <v-icon>mdi-cart-outline</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn icon @click="card.show = !card.show">
                  <v-icon>{{
                    card.show ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="card.show">
                  <v-divider></v-divider>
                  <v-card-text v-text="card.descripcion"></v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
        <v-spacer />
      </v-container>
      <!-- Separador -->
      <v-spacer></v-spacer>
      <v-spacer />
    </v-card>
    <!-- Separador -->
    <v-spacer></v-spacer>
    <!-- Separador -->
    <v-spacer></v-spacer>
    <!-- Barra busqueda inferior (filtrado por nombre) -->
    <v-bottom-navigation
      hide-on-scroll:false
      fixed
      center
      color="blue lighten-3"
    >
      <v-toolbar flat height="60" color="blue lighten-3">
        <!-- Separador -->
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="customSortD"
          >Ordenar por precio de menor a mayor</v-btn
        >
        <!-- Separador -->
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          type="text"
          label="Buscar nombre"
        ></v-text-field>
        <!-- Separador -->
        <v-spacer />
        <v-btn color="blue darken-1" text @click="customSortA"
          >Ordenar por precio de mayor a menor</v-btn
        >
        <!-- Separador -->
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-bottom-navigation>
  </v-container>
</template>

<script>
const axios = require("axios");

const direccionIp = "http://127.0.0.1:3000";

export default {
  data() {
    return {
      search: "",
      valorFiltroCategorias: "",
      flex: 15,
      dni: this.$route.query.id,
      cards: [],
      categorias: ["Moda", "Hogar", "Deporte", "Tecnología"],
      tiposOrden: ["Mayor a menor precio", "Menor a mayor precio"],
    };
  },

  methods: {
    mostrarinfo(value) {
      return (value = !value);
    },
    informacionProducto(pantalla) {
      console.log("ID producto" + pantalla);
      this.$router.replace({
        path: "/informacionProducto/:id",
        query: { id: pantalla, dni: this.dni },
      });
    },
    comprarProducto(nombreProducto) {
      console.log(
        "El nombre del producto es:" +
          nombreProducto +
          " y el dni es:" +
          this.dni
      );

      let body = {
        dni: this.dni,
        nombreProducto: nombreProducto,
      };
      axios.post(direccionIp + "/comprarProducto", body).then(response => {
        this.comprobarRespuesta(response.data, nombreProducto);
      });
    },

    comprobarRespuesta(respuesta, nombreProducto) {
      if (respuesta == "si") {
        alert("Producto comprado");
        /*axios
          .get(direccionIp + "/traerProductos", {
            params: {
              id: this.dni,
            },
          })
          .then(response => {
            this.comprobarDatos(response);
            //console.log("Estamos en la promesa:" + response.data[0].nombre);
          });*/
        let pos = 0;
        for (let i = 0; i < this.cards.length; i++) {
          if (this.cards[i].nombre == nombreProducto) {
            pos = i;
          }
        }
        this.cards[pos].vendido = true;
      } else {
        alert("Problema al comprar el producto");
      }
    },
    listaDeseos(producto) {
      let body = {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        foto: producto.foto,
        categoria: producto.categoria,
        estado: producto.estado,
        vendido: producto.vendido,
        show: producto.show,
        usuarioDNI: this.dni,
        productoIdProducto: producto.IdProducto,
      };
      console.log(body);
      axios.post(direccionIp + "/introducirDeseo", body).then(response => {
        this.comprobarRespuestaDeseos(response.data,body.nombre);
        console.log("RESPUESTA:" + response.data);
      });
    },
    comprobarRespuestaDeseos(respuesta, nombreProducto) {
      if (respuesta == "si") {
        alert("Producto añadido a la lista de deseos");
        let pos = 0;
        for (let i = 0; i < this.cards.length; i++) {
          if (this.cards[i].nombre == nombreProducto) {
            pos = i;
          }
        }
        this.cards[pos].anadidoListaDeseos = true;
      } else {
        alert("Problema al añadir el producto a la lista de deseos");
      }
    },
    comprobarDatos(response) {
      console.log("Estoy en comprobar datos");
      for (let i = 0; i < response.data.length; i++) {
        let aux = response.data[i];
        let carta = {
          nombre: aux.nombre,
          descripcion: aux.descripcion,
          precio: aux.precio,
          foto: aux.foto,
          categoria: aux.categoria,
          estado: aux.estado,
          vendido: aux.vendido,
          anadidoListaDeseos: aux.anadidoListaDeseos,
          vendedor: aux.usuarioDNI,
          show: this.show,
        };
        if (carta.show == 0) {
          carta.show = false;
        } else {
          carta.show = true;
        }
        //console.log("El nombre :" + carta.nombre + " foto:" + carta.foto);
        this.cards.push(aux);
        aux = {};
      }
      for (let i = 0; i < this.cards.length; i++) {
        console.log("Mensajes:" + this.cards[i].nombre);
        console.log("\tID PRODUCTO:" + this.cards[i].IdProducto);
      }
    },
    customSortA: function() {
      console.log("ORDENO ASCENDENTE");
      this.cards.sort(function(a, b) {
        return b.precio - a.precio;
      });
      return this.cards;
    },
    customSortD: function() {
      console.log("ORDENO DESCENDENTE");
      this.cards.sort(function(a, b) {
        return a.precio - b.precio;
      });
      return this.cards;
    },
  },
  mounted() {
    console.log("El dni es:" + this.dni);
    axios
      .get(direccionIp + "/traerListaProductos", {
        params: {
          dni: this.dni,
        },
      })
      .then(response => {
        this.comprobarDatos(response);
        this.cards = response.data;
        //console.log("Estamos en la promesa:" + response.data[0].nombre);
      });
  },
  computed: {
    filtrarNombre: function() {
      return this.cards.filter(card => {
        return card.nombre.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
};
</script>
