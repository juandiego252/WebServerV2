const Portfolio = require("../models/portafolio.js");

const renderAllPortafolios = async (req, res) => {
    // Listar todos los portafolios y trasnformar en objetos
    const portfolios = await Portfolio.find().lean();
    res.render("portafolio/allPortfolios", { portfolios });
};

const renderPortafolio = (req, res) => {
    res.send("Mostrar el detalle de un portafolio");
};
const renderPortafolioForm = (req, res) => {
    res.render("portafolio/newFormPortafolio");
};
const createNewPortafolio = async (req, res) => {
    const { title, category, description } = req.body;
    const newPortfolio = new Portfolio({ title, category, description });
    // Guardar en la base de datos
    await newPortfolio.save();
    // Mostrar el resultado
    res.json({ newPortfolio });
    res.redirect("/portafolios");
};
const renderEditPortafolioForm = async (req, res) => {
    const portfolio = await Portfolio.findById(req.params.id).lean();
    res.render("portafolio/editPortfolio", { portfolio });
};
const updatePortafolio = async(req, res) => {
    const { title, category, description } = req.body
    await Portfolio.findByIdAndUpdate(req.params.id, { title, category, description })
    res.redirect('/portafolios')
};
const deletePortafolio = async (req, res) => {
    //Capturar el id del portafolio
    await Portfolio.findByIdAndDelete(req.params.id);
    res.redirect("/portafolios");
};

module.exports = {
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio,
};
