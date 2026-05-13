const express = require("express");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set('view engine', 'ejs');

const feedbacks = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/feedbacks/lista", (req, res) => {
  res.render('lista', { feedbacks });
});

app.post("/feedbacks/enviar", (req, res) => {
  const { nome, comentario } = req.body;
  feedbacks.push({ nome, comentario });
  res.redirect("/feedbacks/lista");
});

app.post("/feedbacks/remover", (req, res) => {
  const index = parseInt(req.body.index);
  feedbacks.splice(index, 1);
  res.redirect("/feedbacks/lista");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
