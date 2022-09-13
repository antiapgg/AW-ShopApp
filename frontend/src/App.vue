<template>
  <v-app>  
    <v-app-bar color="blue ligthen-4" app dense dark>
      <v-app-bar-nav-icon @click="comprobarEntrada"/>
      <v-toolbar-title v-model="titulo">{{dni}}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app color="blue ligthen-4">
          <!-- Bucle que recorre los elementos de la lista items -->
          <template v-for="(item, i) in items">
            <v-divider
              v-if="item.divider"
              :key="i"
              dark
              class="my-4"
            />
            <v-list-item
              v-else
              :key="i"
              link
              @click="cambiarPantalla(item.btn)"
              color="blue ligthen-4"
              class="v-list-item"
            >
              <v-list-item-action >
                <v-icon color="white">{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content color="white">
                <v-list-item-title class="white--text">
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
    </v-navigation-drawer>

    <v-content>
      <router-view @entro="cambiar"/>
    </v-content>

  </v-app>
</template>

<script>
//import Registro from './components/Registro';
import Principal from "./views/Principal.vue";

export default {
  name: "App",

  components: {
    //Registro,
    //<Registro v-if="mostrarRegistro" @registrado="cambiar"/>
  },

  data: () => ({
    mostrarRegistro: false,
    titulo: "prueba",
    drawer: false,
    search: Principal.search,
    menuCategorias: false,
    barraLateral: false,
    items: [
      { divider: true },
      { icon: "mdi-home", text: "Inicio.", btn: "/principal/:id" },
      { divider: true },
      {
        icon: "mdi-cash-100",
        text: "Mis productos.",
        btn: "/misProductos/:id",
      },
      { divider: true },
      {
        icon: "mdi-cart-outline",
        text: "Productos adquiridos.",
        btn: "/productosAdquiridos/:id",
      },
      { divider: true },
      {
        icon: "mdi-plus-box",
        text: "Nuevo producto.",
        btn: "/nuevoProducto/:id",
      },
      /*      { divider: true },
      {
        icon: "mdi-rename-box",
        text: "Editar productos.",
        btn: "/editarProducto/:id",
      }, */
      { divider: true },
      { icon: "mdi-heart", text: "Lista de deseos.", btn: "/listaDeseos/:id" },
      { divider: true },
      {
        icon: "mdi-settings",
        text: "Editar perfil.",
        btn: "/editarPerfil/:id",
      },
      { divider: true },
      { icon: "mdi-exit-to-app", text: "Cerrar sesión.", btn: "/Entrada" },
      { divider: true },
    ],
    dni: null,
  }),
  methods: {
    cambiar(nombre) {
      this.dni = nombre;
      this.barraLateral = true;
      this.$router.replace({ path: "/principal/:id", query: { id: this.dni } });
    },
    comprobarEntrada() {
      if (this.barraLateral != false) {
        this.drawer = !this.drawer;
        this.menuCategorias = !this.menuCategorias;
      }
    },
    cambiarPantalla(pantalla) {
      if (pantalla == "/Entrada") {
        console.log("Se ha pulsado cerrar sesion.");
        this.barraLateral = false;
        this.drawer = !this.drawer;
        this.menuCategorias = !this.menuCategorias;
        this.barraLateral = false;
        this.dni = "";
        this.$router.replace("/entrada");
      } else {
        this.$router.push({ path: pantalla, query: { id: this.dni } });
      }
    },
  },
  mounted() {
    console.log("Estamos en Mounted");
    this.$router.replace("Entrada");
    //this.dni = "12";
    //this.barraLateral = true;
  },
};
</script>

