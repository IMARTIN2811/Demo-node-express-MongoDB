const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const db = require("./app/models");
db.mongoose.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{
    console.log("Conectado a la base de datos");
})
.catch(err =>{
    console.log("Error al conectar con la base de datos", err);
    process.exit();
});

app.get("/", (req, res)=>{
    res.json({ message: "Bienvenido a la aplicación" });
});

require("./app/routes/products.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log(`Servidor ejecutando en el puerto:${PORT}.`);
});