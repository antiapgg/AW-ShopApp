<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="10">
                 <v-card>
                    <v-toolbar>
                        <v-icon>mdi-badge-account-horizontal</v-icon>
                        <v-spacer></v-spacer>
                        <v-toolbar-title>Registro de usuario</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Nombre" type="text" prepend-icon="mdi-account-box" v-model="nombre"/>
                            <v-text-field label="DNI" type="text" prepend-icon="mdi-smart-card" v-model="dni"/>
                            <v-text-field label="telefono" type="number" prepend-icon="mdi-phone" v-model="telefono"/>
                            <v-text-field label="email" type="text" prepend-icon="mdi-gmail" v-model="email"/>
                            <v-text-field label="Contraseña" type="password" prepend-icon="mdi-lock" v-model="contraseña"/>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn color="blue ligthen-4" @click="mostrar">Registrar</v-btn>
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
  data: () => {
    return {
      nombre: "",
      dni: "",
      telefono: "",
      email: "",
      contraseña: "",
    };
  },
  methods: {
    mostrar: function() {
      if (
        this.nombre === undefined ||
        this.nombre === "" ||
        (this.dni === undefined || this.dni === "") ||
        (this.telefono === undefined || this.telefono === "") ||
        (this.email === undefined || this.email === "") ||
        (this.contraseña === undefined || this.contraseña === "")
      ) {
        alert("Introduzca todos los parametros");
      } else {
        if (this.comprobarFormulario() == false) {
          alert("Datos incompletos");
        } else {
          let body = {
            nombre: this.nombre,
            dni: this.dni,
            telefono: this.telefono,
            email: this.email,
            contraseña: this.contraseña,
          };
          axios
            .post(direccionIp + "/introducirPersona", body)
            .then(response => {
              this.comprobarRespuesta(response.data);
              //console.log("Respuesta:" + response.data);
            });
        }
      }
    },
    comprobarFormulario() {
      if (this.comprobarDNI() == false) {
        return false;
      }
      if (this.comprobarTelefono() == false) {
        return false;
      }
      if (this.comprobarEmail() == false) {
        return false;
      }
      if (this.comprobarContraseña() == false) {
        return false;
      }
      return true;
    },

    comprobarDNI() {
      if (this.dni.length != 9) {
        return false;
      } else {
        let auxNumerosDNI = this.dni.substring(0, 8);
        let auxLetraDNI = this.dni.substring(8, 9);
        for (let i = 0; i < auxNumerosDNI.length; i++) {
          if (this.compruebaNumeros(auxNumerosDNI[i]) == false) {
            return false;
          }
        }
        if (this.compruebaLetraDNI(auxLetraDNI) != true) {
          return false;
        }
      }
      return true;
    },
    comprobarTelefono() {
      if (this.telefono.length != 9) {
        return false;
      } else {
        for (let i = 0; i < this.telefono.length; i++) {
          if (this.compruebaNumeros(this.telefono[i] == false)) {
            return false;
          }
        }
      }
      return true;
    },
    comprobarEmail() {
      for (let i = 0; i < this.email.length; i++) {
        if (this.email[i] == "@") {
          return true;
        }
      }
      return false;
    },
    comprobarContraseña() {
      if (this.contraseña.length < 3) {
        return false;
      }
      return true;
    },
    compruebaNumeros(numero) {
      switch (numero) {
        case "0":
          return true;
        case "1":
          return true;
        case "2":
          return true;
        case "3":
          return true;
        case "4":
          return true;
        case "5":
          return true;
        case "6":
          return true;
        case "7":
          return true;
        case "8":
          return true;
        case "9":
          return true;
      }
      return false;
    },
    compruebaLetraDNI(letra) {
      var alf = "T,R,W,A,G,M,Y,F,P,D,X,B,N,J,Z,S,Q,V,H,L,C,K,E";
      for (let i = 0; i < alf.length; i++) {
        if (letra == alf[i]) {
          return true;
        }
      }
      return false;
    },
    comprobarRespuesta(respuesta) {
      if (respuesta === "si") {
        alert("Usuario " + this.dni + " Introducido");
        this.$emit("entro", this.dni);
      } else {
        alert("Ya existe un usuario con DNI:" + this.dni);
      }
    },
  },
};
</script>

