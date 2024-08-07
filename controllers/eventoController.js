const Evento = require('../models/Evento');

const getEventos = async (req, res) => {
    const eventos = await Evento.findAll();
    res.render('eventos', { eventos });
};

const getEvento = async (req, res) => {
    const evento = await Evento.findByPk(req.params.id);
    res.render('evento', { evento, cadastroOuAtt: true, pagInicio: true });
};

const mostraForm = async (req, res) => {
    const evento = req.params.id ? await Evento.findByPk(req.params.id) : {};
    res.render('forms', {
        evento,
        action: req.params.id ? `/eventos/${req.params.id}/atualizar` : '/eventos/novo',
        isUpdate: !!req.params.id,
        cadastroOuAtt: true,
        pagInicio: true,
    });
};

const createEvento = async (req, res) => {
    await Evento.create(req.body);
    res.redirect('/');
};

const updateEvento = async (req, res) => {
    const evento = await Evento.findByPk(req.params.id);
    await evento.update(req.body);
    res.redirect('/');
};

const deleteEvento = async (req, res) => {
    const evento = await Evento.findByPk(req.params.id);
    await evento.destroy();
    res.redirect('/');
};

module.exports = {
    getEventos,
    getEvento,
    mostraForm,
    createEvento,
    updateEvento,
    deleteEvento,
};
