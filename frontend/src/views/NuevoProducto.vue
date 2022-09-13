<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="10">
                 <v-card>
                    <v-toolbar>
                        <v-icon>mdi-badge-account-horizontal</v-icon>
                        <v-spacer></v-spacer>
                        <v-toolbar-title>Subir Producto</v-toolbar-title>
                    </v-toolbar>
                    <v-img 
                    :src="foto || previewImage||imagen"
                     class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="400px"
                    >
                    Vista Previa de la imagen.
                    </v-img>
                    <v-card-text>
                        <v-form @submit.prevent="agregarProducto()">
                            <v-text-field label="Nombre" type="text" prepend-icon="mdi-account-box" v-model="nombre"/>
                            <v-text-field label="Descripcion" type="text" prepend-icon="mdi-rename-box" v-model="descripcion"/>
                            <v-text-field label="Precio" type="number" prepend-icon="mdi-cash-100" v-model="precio"/>
                            <v-text-field label="Introduzca la url de la imagen" type="text" prepend-icon="mdi-account-box" v-model="imagen"/>
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
                            <!-- <v-text-field type="text" label="Introduzca la url de la imagen" name="image" v-model="foto" prepend-icon="mdi-camera"> </v-text-field>                      
                            <label class="font-bold">Seleccione una imagen</label>
                            <div class="input-group">
                            <input
                                type="file"
                                ref="fileupload"
                                accept="image/*"
                                class="form-control-file"
                                @change="onImageChanged"
                                name="imagen"
                            />
                            </div>-->   
                            
                            <!-- <v-img :src="foto"></v-img> -->
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn color="blue darken-1" text @click="agregarProducto">Registrar Producto</v-btn>
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
  name: "NuevoProducto",
  data() {
    return {
      nombre: "",
      descripcion: "",
      precio: "",
      foto: "",
      categoria: "",
      estado: "",
      vendido: false,
      show: false,
      vendedor: this.$route.query.id,
      fileImage: "",
      previewImage: "",
      imagen: "",
      //comprador: "",
      categorias: ["Moda", "Hogar", "Deportes", "Tecnología"],
      estados: ["Nuevo", "Seminuevo", "Usado", "Muy usado"],
    };
  },

  methods: {
    agregarProducto: function() {
      if (
        this.nombre === undefined ||
        this.nombre === "" ||
        (this.descripcion === undefined || this.descripcion === "") ||
        (this.precio === undefined || this.precio === "") ||
        (this.estado === undefined || this.estado === "")
      ) {
        alert("Introduzca todos los parametros");
      } else {
        let body = {
          nombre: this.nombre,
          descripcion: this.descripcion,
          precio: this.precio,
          foto: this.imagen, //this.previewImage,
          categoria: this.categoria,
          estado: this.estado,
          vendido: this.vendido,
          vendedor: this.vendedor,
          show: this.show,
          //comprador: this.comprador,
        };
        axios.post(direccionIp + "/introducirProducto", body).then(response => {
          this.comprobarRespuesta(response.data);
          //console.log("Respuesta:" + response.data);
        });
      }
    },
    onImageChanged: function(event) {
      // Preview imagen
      this.fileImage = event.target.files[0];
      console.log(this.fileImage);
      console.log("IMAGEN " + this.fileImage);
      this.previewImage = URL.createObjectURL(this.fileImage);
      console.log("URL IMAGEN: " + this.previewImage);
    },
    comprobarRespuesta(respuesta) {
      if (respuesta === "si") {
        alert("Producto " + this.nombre + " Introducido");
        this.$emit("entro", this.vendedor);
      } else {
        alert("Ya existe el producto: " + this.nombre);
      }
    },
  },
};
</script>