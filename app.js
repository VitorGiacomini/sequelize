const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const sequelize = require('./db/conn');
require('dotenv').config();
const Evento = require('./models/Evento');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.engine('handlebars', exphbs.engine({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
}));
app.set('view engine', 'handlebars');

// Sincronizar o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });

app.get('/', (req, res) => {
  res.redirect('eventos');
});

app.get('/eventos/novo', (req, res) => {
  res.render('forms', { action: '/eventos/novo', isUpdate: false });
});

app.post('/eventos/novo', async (req, res) => {
  const { nomeEvento, dataEvento, horaEvento, localEvento, valorIngresso } = req.body;

  try {
    await Evento.create({ nomeEvento, dataEvento, horaEvento, localEvento, valorIngresso });
    res.redirect('/eventos');
  } catch (err) {
    console.error('Erro ao criar evento:', err);
    res.status(500).send('Erro ao criar evento');
  }
});

app.get('/eventos', async (req, res) => {
  try {
    const eventos = await Evento.findAll();
    res.render('eventos', { eventos });
  } catch (err) {
    console.error('Erro ao listar eventos:', err);
    res.status(500).send('Erro ao listar eventos');
  }
});

app.get('/eventos/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const evento = await Evento.findByPk(id);
    res.render('evento', { evento });
  } catch (err) {
    console.error('Erro ao buscar evento:', err);
    res.status(500).send('Erro ao buscar evento');
  }
});

app.get('/eventos/:id/atualizar', async (req, res) => {
  const id = req.params.id;

  try {
    const evento = await Evento.findByPk(id);
    res.render('forms', { evento, action: `/eventos/${id}/atualizar`, isUpdate: true });
  } catch (err) {
    console.error('Erro ao buscar evento:', err);
    res.status(500).send('Erro ao buscar evento');
  }
});

app.post('/eventos/:id/atualizar', async (req, res) => {
  const id = req.params.id;
  const { nomeEvento, dataEvento, horaEvento, localEvento, valorIngresso } = req.body;

  try {
    await Evento.update({ nomeEvento, dataEvento, horaEvento, localEvento, valorIngresso }, {
      where: { id }
    });
    res.redirect('/eventos');
  } catch (err) {
    console.error('Erro ao atualizar evento:', err);
    res.status(500).send('Erro ao atualizar evento');
  }
});

app.post('/eventos/excluir/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await Evento.destroy({ where: { id } });
    res.redirect('/eventos');
  } catch (err) {
    console.error('Erro ao excluir evento:', err);
    res.status(500).send('Erro ao excluir evento');
  }
});

app.listen(3001, () => {
  console.log('Server rodando na porta 3001');
});
