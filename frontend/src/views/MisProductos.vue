<template>
    <v-container>
        <v-card
        class="mx-auto"
        max-width="700"
        color="blue lighten-3"
        >
            <!-- Separador -->
            <v-spacer></v-spacer>
            <v-container fluid>
                <v-row dense> 
                <!-- Lista de productos mostrados -->
                <v-col
                    v-for="card in cards"
                    :key="card.title"
                > 
                    <v-card>
                    <v-img
                    :src="card.foto"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="300px"
                    @click="informacionProducto(card.IdProducto)"
                    >
                    </v-img>

                    <v-card-title v-text="card.nombre"></v-card-title>
                    <v-card-subtitle v-text="card.estado"></v-card-subtitle>
                    <v-card-subtitle v-text="card.precio"/>

                    <v-card-actions>

                        <v-btn icon>
                        <v-icon @click="editarProducto(card.IdProducto)">mdi-rename-box</v-icon>
                        </v-btn>

                        <v-dialog v-model="dialog" width="600px">
                          <template v-slot:activator="{ on }">
                            <v-btn icon>
                              <v-icon v-on="on">mdi-delete</v-icon>
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="headline">Eliminar Producto</span>
                            </v-card-title>
                            <v-card-text>¿Está seguro de que desea eliminar este producto con id {{ card.IdProducto}}? Una vez eliminado no se podrá recuperar.</v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="dialog = false">No eliminar</v-btn>
                              <v-btn color="blue darken-1" text @click="borrarProducto(card.IdProducto)">Eliminar</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-spacer></v-spacer>

                        <v-btn
                        icon
                        @click="card.show = !card.show"
                        >
                        <v-icon>{{ card.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
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
            </v-container>
            <!-- Separador -->
            <v-spacer></v-spacer>
        </v-card>
    </v-container>
</template>

<script>
const axios = require("axios");
const direccionIp = "http://127.0.0.1:3000";
export default {
  data() {
    return {
      IdProducto: "",
      nombre: "",
      datos: null,
      descripcion: "",
      precio: "",
      foto: "",
      categoria: "",
      estado: "",
      vendido: false,
      show: false,
      vendedor: this.$route.query.id,
      cards: [],
      dialog: false,
      dni: this.$route.query.id,
      aux: {},
    };
  },
  mounted() {
    axios
      .get(direccionIp + "/traerProductosVendedor", {
        params: {
          id: this.vendedor,
        },
      })
      .then(response => {
        if (response.data != "no") {
          console.log(response);
          //this.rellenarCartas(response);
          this.cards = response.data;
        }
      });
    console.log(
      "Mostrando los productos del vendedor con dni:" + this.vendedor
    );
  },
  methods: {
    rellenarCartas(respuesta) {
      //console.log("Tamaño:" + respuesta);
      let body = {};
      for (let i = 0; i < respuesta.data.length; i++) {
        body = {
          nombre: respuesta.data[i].nombre,
          descripcion: respuesta.data[i].descripcion,
          show: false,
          precio: respuesta.data[i].precio,
          estado: respuesta.data[i].estado,
          IdProducto: respuesta.data[i].IdProducto,
        };
        console.log(body);
        console.log("AUX: " + this.aux);
        //this.cards.push(body);
      }
    },
    recogerDatos(respuesta) {
      this.datos = respuesta.data;
      this.nombre = this.datos.nombre;
      this.descripcion = this.datos.descripcion;
      this.categoria = this.datos.categoria;
      this.estado = this.datos.estado;
      this.precio = this.datos.precio;
      this.foto = this.datos.foto;
      console.log("IMG: " + this.foto);
      this.vendedor = this.datos.vendedor;
      this.vendido = this.datos.vendido;
      if (this.datos.show == 0) {
        this.show = false;
      } else {
        this.show = true;
      }
    },

    borrarProducto(borrado) {
      console.log("QUIERO BORRAR ESTE PRODUCTO " + borrado);
      let body = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        foto: this.foto,
        categoria: this.categoria,
        estado: this.estado,
        vendido: this.vendido,
        vendedor: this.vendedor,
        show: this.show,
        IdProducto: borrado,
      };
      axios.post(direccionIp + "/eliminarProducto", body).then(response => {
        this.comprobarRespuesta(response);
      });
      /*    if (response.data === "si") {
              alert("Producto " + this.nombre + " Eliminado");
            this.$emit("entro", this.vendedor);
          } else {
            alert("El producto " + this.nombre + " no se puede eliminar.");
          }
        });*/
      this.dialog = false;
      return false;
    },
    comprobarRespuesta(respuesta) {
      if (respuesta.data === "si") {
        alert("Producto " + this.nombre + " Eliminado.");
        this.$emit("entro", this.dni);
      } else {
        alert("Error al Eliminar");
      }
    },
    editarProducto(pantalla) {
      this.idProd = pantalla;
      this.$router.replace({
        path: "/editarProducto/:idV/:id",
        query: { idV: this.vendedor, id: this.idProd },
      });
    },
  },
  computed: {
    filtrarVendedor: function() {
      return this.cards.filter(card => {
        return card.vendedor.match(this.vendedor);
      });
    },
  },
};
</script>