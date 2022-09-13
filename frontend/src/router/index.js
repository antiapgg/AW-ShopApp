import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Registro from "../views/Registro.vue";
import Entrada from "../views/Entrada.vue";
import IniciarSesion from "../views/IniciarSesion.vue";
import NuevoProducto from "../views/NuevoProducto.vue";
import EditarPerfil from "../views/EditarPerfil.vue";
import Principal from "../views/Principal.vue";
import EditarProducto from "../views/EditarProducto.vue";
import MisProductos from "../views/MisProductos.vue";
import InformacionProducto from "../views/InformacionProducto.vue";
import ProductosAdquiridos from "../views/ProductosAdquiridos.vue";
import ListaDeseos from "../views/listaDeseos";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
 
  {
    path: "/registro",
    name: "Registro",
    component: Registro,
  },
  {
    path: "/entrada",
    name: "Entrada",
    component: Entrada,
  },
  {
    path: "/iniciarSesion",
    name: "IniciarSesion",
    component: IniciarSesion,
  },
  {
    path: "/nuevoProducto",
    name: "NuevoProducto",
    component: NuevoProducto,
  },
  {
    path: "/editarPerfil/:id",
    name: "EditarPerfil",
    component: EditarPerfil,
  },
  {
    path: "/principal/:id",
    name: "Principal",
    component: Principal,
  },
  {
    path: "/nuevoProducto/:id",
    name: "NuevoProducto",
    component: NuevoProducto,
  },
  {
    path: "/editarProducto/:idV/:id",
    name: "EditarProducto",
    component: EditarProducto,
  },
  {
    path: "/misProductos/:id",
    name: "MisProductos",
    component: MisProductos,
  },
  {
    path: "/informacionProducto/:id",
    name: "InformacionProducto",
    component: InformacionProducto,
  },
  {
    path: "/productosAdquiridos/:id",
    name: "ProductosAdqquiridos",
    component: ProductosAdquiridos,
  },
  {
    path: "/listaDeseos/:id",
    name: "ListaDeseos",
    component: ListaDeseos,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
