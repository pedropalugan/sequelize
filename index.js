//Variables
const express = require('express')
const Sequelize = require('Sequelize')
const app = express()
const porta = 3000

//Conect to database pwbe_aluno
const database = new Sequelize('pwbe_aluno', 'root','',{
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
})


//Creation of the table if it does not exist - prof_info
const professores = database.define('prof_info',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: Sequelize.STRING,
    idade: Sequelize.INTEGER,  
    num_id: Sequelize.INTEGER,
    cargo: Sequelize.STRING
});

app.use(express.json())


//Functions to 
app.get('/', async(req, res) => {
    await database.sync()
    let requisition = await professores.findAll({raw:true})
    res.send(requisition)
})

app.get('/:id', async(req, res) => {
    await database.sync()
    let index = req.params.id
    let requisition = await professores.findByPk(index, {raw:true})
    res.send(requisition)
})



app.post('/', async(req, res) => {
    let dadoAdd = req.body
    await database.sync()
    let request = await professores.create(req.body)
    res.send("Dado adicionado")
})

app.delete('/:id', async(req, res) => {
    let index = req.params.id
    await database.sync()
    let request = await professores.destroy({where:{id:index}})
    res.send('Dado removido')
})


app.put('/:id', async(req, res)=>{
    let index = req.params.id 
    let content = req.body
    await database.sync()
    const request = professores.update(
        content,{where: {id:index}}
    );
    res.send("Dado atualizado")
})


app.listen(porta, () => console.log("Rodando na porta "+porta))
