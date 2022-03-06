const fs = require("fs");

class Container {
  constructor(file) {
    this.file = file;
    this.data = [];
  }

    //save(Object)
  async save(object) {
    try {
      if (!fs.existsSync(this.file)) {
        //Si el archivo no existe, o bien no tiene info, lo creo.
        return this.createFile(object);
      } else {
        this.data = await this.getAll();
        return this.createFile(object);
      }
    } catch (err) {
      console.log(
        `Error al agregar ${object.title} en Archivo: ${this.file}: ${err}`
      );
    }
  }

    //readFile()
  async readFile() {
    try {
      return await fs.promises.readFile(this.file, "utf-8");
    } catch (err) {
      console.log(`Error al leer el archivo: "${this.file}" : ${err}`);
    }
  }

    //createFile()
  async createFile(object) {
    try {
        object.id = this.getMaxId() + 1;
      this.data.push(object);
      await fs.promises.writeFile(this.file, JSON.stringify(this.data));
      console.log(
        `Se agrega objeto: "${object.title}" en Archivo "${this.file}"  Resultado ID: "${obj.id}"`
      );
      return object.id;
    } catch (err) {
      console.log(`Error al crear Archivo: "${this.file}" ERROR: ${err}`);
    }
  }

    //getAll()
  async getAll() {
    try {     
        let buffer = await fs.promises.readFile(this.file, 'utf-8')
        return JSON.parse(buffer);
    }
      catch (err) { 
        console.log('No existen Productos.');
        return null;     
   }      
}
    //deleteAll()
  async deleteAll() {
    fs.unlink(this.file, (err) => {
      if (err) {
        console.log(
          `Error al eliminar Archivo: "${this.file}" ERROR: ${err}`
        );
      } else {
        console.log(`Se eliminó Archivo: "${this.file}" `);
      }
    });
  }

  getMaxId() {
    var maxValue = Number.MIN_VALUE;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id > maxValue) {
        maxValue = this.data[i].id;
      }
    }
    return maxValue;
  }

    //getById(Number)
  async getById(id) {
    try {
      let prod = await this.getAll();
      return prod.find((object) => object.id == id) || null;
    } catch (err) {
      console.log(
        `Error al obtener elemento con ID "${id}" en archivo: "${this.file}" ERROR: ${err}`
      );
    }
  }

    //deleteById(Number)
  async deleteById(id) {
    let prod = await this.getAll();
    let fx = prod.findIndex((object) => object.id == id);
    prod.splice(fx, 1);
    await fs.promises.writeFile(this.file, JSON.stringify(prod));
    console.log(
      `Se eliminó el objeto con ID: "${id}" del archivo: "${this.file}"`
    );
  }
}
// TEST ------------------------------------------------------------------------------ //
//
//
//async function Process() {
//
//    const planta1 = {
//        title: 'Stromanthe Tricolor',                                                                                                                                 
//        price: 259,                                                                                                                                     
//        thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/41ONAv1rouL._AC_UL604_SR604,400_.jpg',             
//    }
//
//    const planta2 = {
//        title: 'Alocasia California',                                                                                                                                 
//        price: 150,                                                                                                                                     
//        thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/51W62vjdAAL._AC_UL604_SR604,400_.jpg',             
//    }
//
//    const plantas = new Container('productos.json');
//
//    await plantas.save(planta1);
//    await plantas.save(planta2);
//
//    var p = await plantas.getAll();
//    console.log(p)
//    
//    //Buscamos por ID
//    p = await plantas.getById(1);
//    console.log(`Producto: "${JSON.stringify(p)}"`);
//
//    //Eliminamos
//    await plantas.deleteById(1);
//
//    //Buscamos nuevamente
//    p = await plantas.getById(1);
//    console.log(`Producto no se encuentra: "${JSON.stringify(p)}"`)
//
//    //Borramos archivo
//    await plantas.deleteAll()
//
//}

// Process();


module.exports.Container = Container;