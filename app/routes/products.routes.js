module.exports = app=>{
    const products = require("../controllers/product.controller");
    
    var router = require("express").Router();

    /*Configuración  de la rutas*/
    
    /*Ruta para crear un nuevo producto */
    router.post("/create", products.createProd);

    /*Ruta para recuperar todos los productos */
    router.get("/all", products.findAllProd);

    /*Ruta para recuperar solo un producto */
    router.get("/:id", products.findOneProd);

    /*Ruta para actuaizar un producto*/
    router.put("/update/:id", products.updateProd);

    /*Ruta para eliminar un solo producto*/
    router.delete("/api/delete/:id", products.deleteProd);

    /*Ruta para eliminar todos los productos*/
    router.delete("/api/delete/all", products.deleteAllProd);

    app.use("/api/products", router);
};