<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="5">
                <v-card>
                    <v-card-title>
                        <v-row align="center" justify="center">
                            <v-icon size="200">mdi-account</v-icon>
                        </v-row>    
                    </v-card-title>
                    <v-card-text>
                        <v-row align="center" justify="center">
                            <v-btn text large @click="iniciaSesion"><p><b><u>Iniciar Sesión</u></b></p></v-btn>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-btn text large @click="registrarse"><p><b><u>Registrarse</u></b></p></v-btn>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name:'Entrada',

    methods:{
        iniciaSesion(){
            console.log("Se ha pulsado inicia sesion");
            this.$router.push('IniciarSesion');
        },
        registrarse(){
            console.log("Se ha pulsado registrarse");
            this.$router.push('Registro');
        }
    }
}
</script>

