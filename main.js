const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 8080;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "CANDIACORP",
  password: "#R1c0#",
  port: "5432",
});

// Modelo
class Model {
  async getItems() {
    const { rows } = await pool.query("select * from usuarios;");
    return rows;
  }

  async getItemById(id) {
    const { rows } = await pool.query("select * from usuarios where cedula_identidad = $1;", [  id   ]);
    return rows[0];
  }
  async getPromedioEdad() {
    const { rows }= await pool.query("SELECT AVG(EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento))) AS promedioEdad FROM usuarios;");
    return rows[0];
  }
  async addItem(ci,nombre,ap1,ap2,fechanac) {
    await pool.query("INSERT INTO usuarios values ($1,$2,$3,$4,$5)", [ci,nombre,ap1,ap2,fechanac]);
  }

  async updateItem(ci, nombre,ap1) {
    await pool.query("UPDATE usuarios SET nombre = $1,primer_apellido=$2 WHERE cedula_identidad = $3", [nombre,ap1, ci]);
  }

  async deleteItem(ci) {
    await pool.query("DELETE FROM usuarios WHERE cedula_identidad = $1", [ci]);
  }
}

//Controlador
class Controller {
  constructor(model) {
    this.model = model;
  }
  async Estado(req, res) {
    const nameSystem = "api-users";
    const version = "0.0.1";
    const developer = "Ricardo Candia";
    const email = "ricardo.candia@gmail.com";
    var data = JSON.stringify({"nameSystem": nameSystem, "version": version, "developer":developer, "email":email});
    res.send(data);
  }
  async getItems(req, res) {
    const data = await this.model.getItems();
    res.send(data);
  }

  async getItemById(req, res) {
    const id = req.params.id;
    const data = await this.model.getItemById(id);
    res.send(data);
  }

  async getPromedioEdad(req, res) {
    const data = await this.model.getPromedioEdad();
    res.send(data);
  }

  async addItem(req, res) {
    const ci = req.body.ci;
    const nombre = req.body.nombre;
    const ap1 = req.body.ap1;
    const ap2 = req.body.ap2;
    const fechanac = req.body.fechanac;
    await this.model.addItem(ci,nombre,ap1,ap2,fechanac);
    res.sendStatus(201);
  }

  async updateItem(req, res) {
    const ci = req.params.ci;
    const nombre = req.body.nombre;
    const ap1 = req.body.ap1;
    await this.model.updateItem(ci, nombre,ap1);
    res.sendStatus(200);
  }

  async deleteItem(req, res) {
    const ci = req.params.ci;
    await this.model.deleteItem(ci);
    res.sendStatus(200);
  }
}

//Instanciación
const model = new Model();
const controller = new Controller(model);

app.use(express.json());

app.get("/estado", controller.Estado.bind(controller));
app.get("/usuarios", controller.getItems.bind(controller));
app.get("/usuarios/:id", controller.getItemById.bind(controller));
app.get("/promedioEdad", controller.getPromedioEdad.bind(controller));
app.post("/usuarios", controller.addItem.bind(controller));
app.put("/usuarios/:ci", controller.updateItem.bind(controller));
app.delete("/usuarios/:ci", controller.deleteItem.bind(controller));

app.listen(port, () => {
  console.log(`Este servidor se ejecuta en http://localhost:${port}`);
});
