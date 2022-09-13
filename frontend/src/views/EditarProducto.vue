<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="10">
                 <v-card color="blue lighten-5">
                    <v-toolbar color="blue lighten-5">
                        <v-icon>mdi-badge-account-horizontal</v-icon>
                        <v-spacer></v-spacer>
                        <v-toolbar-title>Editar Producto</v-toolbar-title>
                    </v-toolbar>
                    <v-dialog v-model="dialog" width="600px">
                      <template v-slot:activator="{ on }">
                        <v-img
                        :src="foto"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="400px"
                        v-on="on"
                        >
                        Vista Previa de la imagen.
                        </v-img>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Vista Previa de Imagen</span>
                        </v-card-title>
                        <v-img
                          :src="foto"
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
                            <v-text-field label="Nombre" type="text" readonly prepend-icon="mdi-account-box" v-model="nombre"/>
                            <v-text-field label="Descripcion" type="text" prepend-icon="mdi-rename-box" v-model="descripcion"/>
                            <v-text-field label="Precio" type="number" prepend-icon="mdi-cash-100" v-model="precio"/>
                            <v-col class="d-flex" cols="12">
                                <v-select
                                :items="categorias"
                                label="Categoria"
                                v-model="categoria"
                                ></v-select>
                            </v-col>
                            <v-col class="d-flex" cols="12">
                                <v-select
                                :items="estados"
                                label="Estado"
                                v-model="estado"
                                ></v-select>
                            </v-col>
                            <v-text-field type="text" label="Introduzca la url de la imagen" name="image" v-model="foto" prepend-icon="mdi-camera"> </v-text-field>                            
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn color="blue darken-1" text  @click="modificarProducto">Guardar Cambios</v-btn>
                        <v-spacer/>
                        <v-dialog v-model="dialogB" width="600px">
                          <template v-slot:activator="{ on }">
                            <v-btn color="blue darken-1" text v-on="on">Eliminar Producto</v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="headline">Eliminar Producto</span>
                            </v-card-title>
                            <v-card-text>¿Está seguro de que desea eliminar este producto? Una vez eliminado no se podrá recuperar.</v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="dialogB = false">No eliminar</v-btn>
                              <v-btn color="blue darken-1" text @click="borrarProducto()">Eliminar</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-spacer></v-spacer>
                    </v-card-actions>
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
      IdProducto: this.$route.query.id,
      nombre: "",
      datos: null,
      descripcion: "",
      precio: "",
      foto: "",
      categoria: "",
      estado: "",
      vendido: false,
      show: false,
      dni: this.$route.query.idV,
      vendedor: this.$route.query.idV,
      dialog: false,
      dialogB: false,
      categorias: ["Moda", "Hogar", "Deportes", "Tecnología"],
      estados: ["Nuevo", "Seminuevo", "Usado", "Muy usado"],
    };
  },
  mounted() {
    axios
      .get(direccionIp + "/traerProducto", {
        params: {
          id: this.IdProducto,
        },
      })
      .then(response => {
        console.log("Respuesta:" + response.data.nombre);
        this.recogerDatos(response);
      });
    console.log("El id es:" + this.IdProducto);
    console.log("El vendedor es: " + this.vendedor);
  },
  methods: {
    recogerDatos(respuesta) {
      this.datos = respuesta.data;
      this.nombre = this.datos.nombre;
      this.descripcion = this.datos.descripcion;
      this.categoria = this.datos.categoria;
      this.estado = respuesta.data.estado;
      this.precio = respuesta.data.precio;
      this.foto = respuesta.data.foto;
      this.vendedor = respuesta.data.vendedor;
      this.vendido = respuesta.data.vendido;
      this.show = respuesta.data.show;
    },
    modificarProducto() {
      if (
        this.nombre === undefined ||
        this.nombre === "" ||
        (this.descripcion === undefined || this.descripcion === "") ||
        (this.precio === undefined || this.precio === "") ||
        (this.foto === undefined || this.foto === "")
      ) {
        alert("Introduzca todos los parametros");
      } else {
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
          IdProducto: this.IdProducto,
        };
        axios.post(direccionIp + "/modificarProducto", body).then(response => {
          this.comprobarRespuesta(response);
        });
      }
    },
    borrarProducto() {
      console.log("QUIERO BORRAR ESTE PRODUCTO " + this.IdProducto);
      this.dialogB = false;
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
        IdProducto: this.IdProducto,
      };
      axios.post(direccionIp + "/eliminarProducto", body).then(response => {
        this.comprobarRespuestaBorrado(response);
      });
      /*    if (response.data === "si") {
              alert("Producto " + this.nombre + " Eliminado");
            this.$emit("entro", this.vendedor);
          } else {
            alert("El producto " + this.nombre + " no se puede eliminar.");
          }
        });*/
    },
    comprobarRespuestaBorrado(respuesta) {
      if (respuesta.data === "si") {
        alert("Producto " + this.nombre + " Eliminado.");
        this.$emit("entro", this.dni);
      } else {
        alert("Error al Eliminar");
      }
    },

    comprobarRespuesta(respuesta) {
      if (respuesta.data === "si") {
        alert("Usuario " + this.dni + " Modificó producto con exito");
        this.$emit("entro", this.dni);
      } else {
        alert("Error al modificar");
      }
    },
  },
};
</script>