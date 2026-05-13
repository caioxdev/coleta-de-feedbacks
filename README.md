# 📋 Feedback App

Aplicação simples de coleta de feedbacks de alunos, desenvolvida com **Node.js** e **Express.js**. Os dados são mantidos em memória durante a execução do servidor.

---

## 🚀 Como rodar

**Pré-requisitos:** Node.js instalado.

```bash
# Instalar dependências
npm install

# Iniciar o servidor
node server.js
```

Acesse em: [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura do projeto

```
├── public/
│   ├── index.html        # Página inicial com formulário
│   └── styles/
│       └── index.css     # Estilos (neumorfismo)
├── views/
│   └── lista.ejs         # Template da listagem de feedbacks
├── server.js             # Servidor Express
├── package.json
└── README.md
```

---

## 🛣️ Rotas

| Método | Rota                  | Descrição                              |
|--------|-----------------------|----------------------------------------|
| GET    | `/`                   | Página inicial com formulário          |
| POST   | `/feedbacks/enviar`   | Recebe e armazena o feedback           |
| GET    | `/feedbacks/lista`    | Lista todos os feedbacks               |
| POST   | `/feedbacks/remover`  | Remove um feedback pelo índice         |

---

## ⚙️ Tecnologias

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [EJS](https://ejs.co/) — template engine para renderização da listagem

---

## 📦 Dependências

| Pacote    | Versão   | Descrição                                      |
|-----------|----------|------------------------------------------------|
| express   | ^5.2.1   | Framework web para criação do servidor e rotas |
| ejs       | ^5.0.2   | Template engine para renderizar HTML dinâmico  |
| nodemon   | ^3.1.14  | Reinicia o servidor automaticamente ao salvar  |

Para rodar em desenvolvimento com hot reload:

```bash
npm run dev
```

---

## 🔄 Duas abordagens para renderização da lista

### Abordagem utilizada — EJS

O servidor passa o array de feedbacks para o template `.ejs`, que renderiza o HTML no servidor.

```js
// server.js
app.get('/feedbacks/lista', (req, res) => {
  res.render('lista', { feedbacks });
});
```

```html
<!-- views/lista.ejs -->
<% feedbacks.forEach((feedback, index) => { %>
  <li>
    <%= feedback.nome %>: <%= feedback.comentario %>
    <form action="/feedbacks/remover" method="post">
      <input type="hidden" name="index" value="<%= index %>">
      <button>Remover</button>
    </form>
  </li>
<% }) %>
```

---

### Abordagem alternativa — HTML puro no `res.send`

Sem template engine, o HTML é montado diretamente no servidor via template literal.

```js
app.get('/feedbacks/lista', (req, res) => {
  const itens = feedbacks
    .map((feedback, index) => `
      <li>${feedback.nome}: ${feedback.comentario}
        <form method="post" action="/feedbacks/remover">
          <input type="hidden" name="index" value="${index}">
          <button>Remover</button>
        </form>
      </li>
    `)
    .join('');

  res.send(`
    <html>
      <body>
        <ul>${itens}</ul>
      </body>
    </html>
  `);
});
```

> A abordagem com EJS é mais organizada pois separa HTML do JavaScript, facilitando manutenção e estilização.

---

## 📌 Observações

- Nenhum banco de dados é utilizado — os dados são perdidos ao reiniciar o servidor.
- Nenhuma API externa é consumida.