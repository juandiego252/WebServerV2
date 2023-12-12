const Portfolio = require('../models/portafolio.js')

const renderAllPortafolios = async (req,res)=>{
    // Listar todos los portafolios y trasnformar en objetos
    const portfolios = await Portfolio.find().lean()
    res.render("portafolio/allPortfolios",{portfolios})

}

const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}
const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}
const createNewPortafolio =async(req,res)=>{
    const {title, category,description} = req.body
    const newPortfolio = new Portfolio({title,category,description})
    // Guardar en la base de datos
    await newPortfolio.save()
    // Mostrar el resultado
    res.json({newPortfolio})
}
const renderEditPortafolioForm = (req,res)=>{
    res.send('Formulario para editar un portafolio')
}
const updatePortafolio = (req,res)=>{
    res.send('Editar un portafolio')
}
const deletePortafolio = (req,res)=>{
    res.send('Eliminar un nuevo portafolio')
}


module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}