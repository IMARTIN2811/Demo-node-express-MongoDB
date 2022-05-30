const { products } = require("../models");
const db = require("../models");
const Products = db.products;

/*Crea y guarda el producto */
exports.createProd = (req,res)=>{
    /*Valida la solicitud*/
    if (!req.body.title) {
        res.status(400).send({ message:"Content can not be empty"});
        return;
    }

    /*Crea un nuevo producto */
    const products = new Products({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    /*Guarda el producto */
    products.save(products).then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({ message: err.message || "Ocurrió algún error al crear el producto" });
    });
};

/*Recupera todos los productos de la BD*/
exports.findAllProd = (req,res)=>{
    const title = req.query.id;
    const condicion = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    
    products.find(condicion)
        .then(data=>{
            res.send(data);           
        })
        .catch(err =>{
            res.status(500).send({ message: err.message || "Se produjo un error al recuperar los productos" });
        });
}

/*Recupera le producto mediante ID */
exports.findOneProd = (req,res)=>{
    const id = req.params.id;

    products.findById(id)
        .then(data =>{
            if (!data)
                res.status(404).send({ message: "Producto no encontrado con id" + id });
            else res.send(data);
        })
        .catch(err =>{
            res.status(500).send({ message: "Error al recuperar el producto con id" + id });           
        });
};

/*Actualiza un producto por el ID */
exports.updateProd = (req,res)=>{
    if (!req.body) {
        return res.status(400).send({ message: "Los datos para actualizar no pueden estar vacíos!" });
    }

    const id = req.params.id;
    products.findByIdAndUpdate(id, req.body, { useFindAndModify:false })
        .then(data =>{
            if (!data) {
                res.status(404).send({ message: `No se puede actualizar el producto con id=${id}. Quizá no se encontreo el producto!` });
            } else res.send({ message: "Producto actualizado correctamente." });
        })
        .catch(err =>{
            res.status(500).send({ message: "Error al actualizar el producto con id=" + id });
        });
};

/*Elimina un producto con id */
exports.deleteProd = (req,res) => {
    const id = req.params.id;

    products.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data=>{
            if (!data) {
                res.status(404).send({ message: `No se puede eliminar el producto con id=${id}. Quizá no se encontró el producto!` });
            } else {
                res.send({ message: "Producto eliminado correctamente!" });
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "No se pudo eliminar el producto con id=" + id });
        });   
};

/*Eliminar todos los productos */
exports.deleteAllProd = (req,res)=>{
    products.deleteMany({})
        .then(data =>{
            res.send({ message: `${data.deletedCount} Los productos eliminados con éxito!` });
        })
        .catch(err =>{
            res.status(500).send({ message: err.message || "Se produjo un error al eliminar todos los productos" });
        });
};