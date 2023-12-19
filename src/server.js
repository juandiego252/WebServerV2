const express = require("express");
//Importancion de path
const path = require("path");
// Importacion de passport

const passport = require("passport");
const session = require("express-session");
//Inicializamos
const app = express();
require("./config/passport");
// Importar el metodo override
const methodOverride = require("method-override");

//Configuraciones
app.set("port", process.env.port || 3000);
app.set("views", path.join(__dirname, "views"));

const { engine } = require("express-handlebars");

// Configuraciones extras
//Establecer el path de la carpeta views
app.set("views", path.join(__dirname, "views"));
//Establecer las configuraciones extras
app.engine(
  ".hbs",
  engine({
    //Establecer el master page
    defaultLayout: "main",
    //establecer el path de la carpeta layouts
    layoutsDir: path.join(app.get("views"), "layouts"),
    //establecer el path de la carpeta partials
    partialsDir: path.join(app.get("views"), "partials"),
    //Establecer la extension de las paginas
    extname: ".hbs",
  })
);
//Establecer el motor de plantillas
app.set("view engine", ".hbs");

//Middlewars
//servidor va a trrabjar con la informacion en base a formularios0
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
// Inicializar passport js y session
app.use(passport.initialize());
app.use(passport.session());

// varibales globales

app.use((req, res, next) => {
  res.locals.user = req.user?.name || null;
  next();
});

//Primera ruta

//Archivos estaticos
//Definir archivo estaticos y publicos
app.use(require("./routers/portafolio.routes"));
app.use(require("./routers/index.routes"));

app.use(express.static(path.join(__dirname, "public")));
app.use(require("./routers/user.routes"));

module.exports = app;
