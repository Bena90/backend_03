const {Container} = require ('./container.js');
const express = require ('express');

const products = new Container ('./db/products.txt')
const app = express();
const PORT = 8080
const server = app.listen(PORT, () =>{
    console.log("Server run in port 8080");
})

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get ('/', async (req, res) =>{
    res.send ('Hello World!')
})

app.get('/products', async (req, res) => {
    const list = await products.getAll()
    res.send (list)
})

const random = (num) => parseInt (Math.random() * num)

app.get('/random', async (req, res) => {
    try{
        const list = await products.getAll();
        res.send (list[random(list.length)])
    }catch (error){
        console.log(error)
    }
})