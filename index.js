require("dotenv").config();
const conn = require("./db/conn");
const express = require("express");
const handlebars = require("express-handlebars");
const Usuario = require("./models/Usuario");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");



app.get("/", (req, res) => {
  res.render("home");
});

app.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.findAll({ raw: true });
  res.render("usuarios", { usuarios });
});

//Cadastrar Usuario
app.get("/usuarios/novo", (req, res) => {
  res.render("formUsuario");
});
app.post("/usuarios/novo", async (req, res) => {
  const dadosUsuario = {
    nickname: req.body.nickname,
    nome: req.body.nome,
  };

  const usuario = await Usuario.create(dadosUsuario);

  res.send(`Usuário criado com o ID ${usuario.id}!`);

});
//Atualizar Usuario
app.get("/usuarios/:id/update", async (req, res) => {
  const id = parseInt(req.params.id)
  const usuario = await Usuario.findByPk(id, { raw: true })

  if (usuario !== null) {
    res.render("formUsuario", { usuario })

  } else {
    res.redirect("/usuarios")
  }
})
app.post("/usuarios/:id/update", async (req, res) => {
  const id = parseInt(req.params.id);

  dadosUsuario = {
    nome: req.body.nome,
    nickname: req.body.nickname
  }
  Usuario.update(dadosUsuario, { where: { id: id } })

  res.redirect("/usuarios")
})


//deletar usuario
app.post("/usuarios/:id/delete", (req, res) => {
  const id = parseInt(req.params.id)
  Usuario.destroy({ where: { id: id } })
  res.redirect("/usuarios")
});




//servidor rodando
app.listen(process.env.SERVER_PORT, () => {
  console.log("SERVER rodando!");
})

conn
  .sync()
  .then(() => {
    console.log("Conectado com sucesso!");
  })
  .catch((err) => {
    console.log("Erro: " + err);
  });
