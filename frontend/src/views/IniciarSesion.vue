<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="6">
                <v-card>
                    <v-card-title class="justify-center">
                        Iniciar Sesión
                    </v-card-title>
                    <v-card-text>
                        <v-text-field v-model="dni" type="text" label="Usuario(DNI)" outlined ></v-text-field>
                        <v-text-field v-model="contraseña" type="password" label="Contraseña" outlined ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn text @click="comprobarInicioSesion">Iniciar sesion</v-btn>
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
  name: "IniciarSesion",
  data: () => {
    return {
      dni: "",
      contraseña: "",
    };
  },
  methods: {
    comprobarInicioSesion() {
      //if(this.dni===undefined||this.dni===''||this.contraseña===undefined||this.contraseña===''){
      //    console.log("Hay algun campo vacio");
      //}else{
      let body = { dni: this.dni, contraseña: this.contraseña };
      axios.post(direccionIp + "/datosEntrada", body).then(response => {
        this.comprobarRespuesta(response.data);
        //console.log("Respuesta:" + response.data);
      });
      //}

      //console.log();
      //this.$emit('entro',this.dni);
    },
    comprobarRespuesta(respuesta) {
      /*if (respuesta === "si") {
        alert("Datos correctos");
        this.$emit("entro", this.dni);
      } else {
        alert("Datos incorrectos");
      }*/
      if (respuesta.DNI === undefined) {
        alert("Datos mal introducidos");
      } else {
        alert("Bienvenido " + respuesta.DNI);
        this.$emit("entro", this.dni);
      }
      //console.log(respuesta.DNI);
    },
  },
};
</script>

