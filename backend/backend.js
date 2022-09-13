var express = require("express");
var http = require("http");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var cors = require("cors");
var Sequelize = require("sequelize");

const sequelize = new Sequelize("tienda", "root", "sistemasdeinfo", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "La conexion a la base de datos se realizo de forma satisfactoria"
    );
  })
  .catch((err) => {
    console.error(
      "No se realizo la conexion con la base de datos y el error es:" + err
    );
  });

const Usuario = sequelize.define("usuario", {
  DNI: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  nombre: { type: Sequelize.STRING, allowNull: false },
  contraseña: { type: Sequelize.TEXT, allowNull: false },
  email: { type: Sequelize.TEXT, allowNull: false },
  telefono_movil: { type: Sequelize.INTEGER, allowNull: false, unique: true },
});

const Producto = sequelize.define("producto", {
  IdProducto: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: { type: Sequelize.STRING, allowNull: false, unique: true },
  descripcion: { type: Sequelize.TEXT, allowNull: false },
  precio: { type: Sequelize.INTEGER, allowNull: false },
  foto: { type: Sequelize.TEXT, allowNull: false },
  categoria: { type: Sequelize.STRING, allowNull: false },
  estado: { type: Sequelize.STRING, allowNull: false },
  vendido: { type: Sequelize.TINYINT, allowNull: false },
  show: { type: Sequelize.TINYINT, allowNull: false },
});

const Venta = sequelize.define("venta", {
  idVenta: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
const Deseo = sequelize.define("deseo", {
  idDeseo: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: { type: Sequelize.STRING, allowNull: false, unique: true },
  descripcion: { type: Sequelize.TEXT, allowNull: false },
  precio: { type: Sequelize.INTEGER, allowNull: false },
  foto: { type: Sequelize.TEXT, allowNull: false },
  categoria: { type: Sequelize.STRING, allowNull: false },
  estado: { type: Sequelize.STRING, allowNull: false },
  vendido: { type: Sequelize.TINYINT, allowNull: false },
  show: { type: Sequelize.TINYINT, allowNull: false },
});

Usuario.hasOne(Deseo);
Producto.hasOne(Deseo);

Usuario.hasOne(Venta);
Producto.hasOne(Venta);

Usuario.hasMany(Producto);

sequelize.sync();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

var myJson = [
  {
    nombre: "12",
    dni: "12",
    telefono: "1212122",
    email: "pepe@.com",
    contraseña: "12",
  },
];

var myJsonProducto = [
  {
    nombre: "Consola Nintendo DS",
    IdProd: "1",
    descripcion:
      "Videoconsola portátil de la marca Nintendo, que permite la reproducción de videojuegos y multimedia. Podemos interactuar con el juego mediante el uso de la pantalla táctil.",
    precio: 100,
    categoria: "teconologia",
    estado: "Usado",
    src: "https://i.ebayimg.com/images/g/M8kAAOSwfa9ZuWI8/s-l300.jpg",
    show: false,
    vendido: false,
    vendedor: "12",
  },
];

///////////////////////////////
//         USUARIOS          //
///////////////////////////////
app.get("/datos", function (req, res) {
  Usuario.findAll()
    .then((respuesta) => {
      res.send(respuesta);
    })
    .catch((err) => {
      res.send("Error producido:" + err);
    });
});

app.post("/introducirPersona", (req, res) => {
  console.log(req.body);
  Usuario.create({
    DNI: req.body.dni,
    nombre: req.body.nombre,
    contraseña: req.body.contraseña,
    email: req.body.email,
    telefono_movil: req.body.telefono,
  })
    .then(() => {
      res.send("si");
    })
    .catch(() => {
      res.send("no");
    });
});
app.post("/modificarPersona", (req, res) => {
  console.log(req.body);
  Usuario.update(
    {
      nombre: req.body.nombre,
      contraseña: req.body.contraseña,
      email: req.body.email,
      telefono_movil: req.body.telefono,
    },
    { where: { DNI: req.body.dni } }
  )
    .then(() => {
      res.send("si");
    })
    .catch(() => {
      res.send("no");
    });
});

app.post("/datosEntrada", (req, res) => {
  let existe = false;
  const { Op } = require("sequelize");
  Usuario.findOne({
    where: {
      [Op.and]: [{ DNI: req.body.dni }, { contraseña: req.body.contraseña }],
    },
  }).then((respuesta) => {
    res.send(respuesta);
  });
});

app.get("/traerPersona", function (req, res) {
  id = req.query.dni;
  console.log("EL DNI ES:" + id);
  Usuario.findOne({ where: { DNI: id } })
    .then((respuesta) => {
      res.send(respuesta);
    })
    .catch((err) => {
      res.send("no");
    });
});

///////////////////////////////
//         PRODUCTOS         //
///////////////////////////////
app.post("/introducirProducto", (req, res) => {
  console.log(req.body);
  Producto.create({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    foto: req.body.foto,
    categoria: req.body.categoria,
    estado: req.body.estado,
    vendido: req.body.vendido,
    show: req.body.show,
    usuarioDNI: req.body.vendedor,
  })
    .then(() => {
      res.send("si");
      //console.log("Introducida");
    })
    .catch((err) => {
      console.log("No introducido y el error es:" + err);
      res.send("no");
    });
});

app.post("/modificarProducto", (req, res) => {
  console.log(req.body);
  Producto.update(
    {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      foto: req.body.foto,
      categoria: req.body.categoria,
      estado: req.body.estado,
      vendido: req.body.vendido,
      show: req.body.show,
      vendedor: req.body.vendedor,
    },
    { where: { IdProducto: req.body.IdProducto } }
  )
    .then(() => {
      res.send("si");
    })
    .catch(() => {
      res.send("no");
    });
});

app.get("/traerProducto", function (req, res) {
  id = req.query.id;
  console.log("EL ID DEL PRODUCTO ES:" + id);
  Producto.findOne({ where: { IdProducto: id } })
    .then((respuesta) => {
      res.send(respuesta);
    })
    .catch(() => {
      res.send("no");
    });
});

app.get("/traerProductosVendedor", function (req, res) {
  id = req.query.id;

  console.log("\n\nEL ID Del VENDEDOR ES:" + id + "\n\n\n");

  const { Op } = require("sequelize");
  Producto.findAll({
    where: {
      [Op.and]: [{ usuarioDNI: req.query.id }, { vendido: 0 }],
    },
  })
    .then((respuesta) => {
      console.log("LA RESPUESTA EN TRAER PRODUCTO VENDEDOR:");
      console.log(respuesta);
      res.send(respuesta);
    })
    .catch(() => {
      res.send("no");
    });
});

app.get("/traerListaProductos", function (req, res) {
  id = req.query.dni;
  console.log("\n\nEL ID ES:" + id + "\n\n\n");

  const { Op } = require("sequelize");
  Producto.findAll({
    where: {
      [Op.and]: [{ usuarioDNI: { [Op.not]: id } }, { vendido: 0 }],
    },
  })
    .then((respuesta) => {
      res.send(respuesta);
    })
    .catch(() => {
      res.send("no");
    });
});
app.post("/eliminarProducto", (req, res) => {
  console.log("ELIMINANDO : " + req.body.IdProducto);
  Producto.destroy({ where: { IdProducto: req.body.IdProducto } })
    .then((respuesta) => {
      res.send("si");
    })
    .catch((err) => {
      console.log(err);
    });
});

///////////////////////////////
//  COMPRA: USUARIO-PRODUCTO //
///////////////////////////////

app.post("/comprarProducto", (req, res) => {
  Producto.update(
    {
      vendido: true,
    },
    { where: { nombre: req.body.nombreProducto } }
  );
  Producto.findOne({ where: { nombre: req.body.nombreProducto } }).then(
    (respuesta) => {
      Venta.create({
        usuarioDNI: req.body.dni,
        productoIdProducto: respuesta.IdProducto,
      })
        .then(() => {
          res.send("si");
        })
        .catch(() => {
          res.send("no");
        });
    }
  );
  Deseo.destroy({
    where: { nombre: req.body.nombreProducto },
  });
});

app.get("/traerCompra", (req, res) => {
  Venta.findAll({ where: { usuarioDNI: req.query.dni } }).then((r) => {
    res.send(r);
  });
});

///////////////////////////////
//  DESEO: USUARIO-PRODUCTO //
///////////////////////////////
app.post("/introducirDeseo", (req, res) => {
  Deseo.create({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    foto: req.body.foto,
    categoria: req.body.categoria,
    estado: req.body.estado,
    vendido: req.body.vendido,
    show: req.body.show,
    usuarioDNI: req.body.usuarioDNI,
    productoIdProducto: req.body.productoIdProducto,
  })
    .then(() => {
      res.send("si");
    })
    .catch((err) => {
      console.log("No introducido y el error es:" + err);
      res.send("no");
    });
});

app.get("/traerDeseos", (req, res) => {
  console.log("TRAER LOS PRODUCTOS DESEASDOS DE:" + req.query.dni);
  Deseo.findAll({ where: { usuarioDNI: req.query.dni } }).then((response) => {
    res.send(response);
  });
});

app.post("/eliminarDeseo", (req, res) => {
  console.log("ID PRODUCTO:" + req.body.idProducto);
  //res.send("Borrado");
  Deseo.destroy({
    where: { productoIdProducto: req.body.idProducto },
  }).then((response) => {
    res.send("si");
  });
});

///////////////////////////////
//         APPLISTEN         //
///////////////////////////////
app.listen(3000, function () {
  console.log("¡Aplicación escuchando en el puerto 3000!");
});
