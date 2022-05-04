const express = require('express')
const { param } = require('express/lib/request')
const sequelize = require('sequelize')
const app = express()
const porta = 3000

const database = new sequelize('pwbe_aluno', 'root','',{
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
})

const professores = database.define('prof_info',{
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: sequelize.STRING,
    idade: sequelize.INTEGER,  
    num_id: sequelize.INTEGER,
    cargo: sequelize.STRING
});



app.use(express.json())

app.get('/', (req, res) => {
    async function getData(){
        await database.sync()
        let requisition = await professores.findAll()
        let data = await requisition
        res.send(data)
    }
    getData()
})

app.post('/', (req, res) => {
    async function postData(){
        await database.sync()
        let request = await professores.create({
            nome: req.body.nome,
            idade: req.body.idade,
            num_id: req.body.num_id,
            cargo: req.body.cargo
        })
        res.send("Dado adicionado")
    }
    postData()
})

app.delete('/:id', (req, res) => {
    let index = req.params.id
    async function deleteData(){
        await database.sync()
        let request = await professores.destroy({where:{id:index}})
        res.send('Dado removido')
    }
    deleteData()
})

app.get('/:id', (req, res) => {
    let index = req.params.id
    async function getRegister(){
        await database.sync()
        let request = await professores.findAll({where:{id:index}})
        await res.send(request)
        await console.log(index)
    }
    getRegister()
})

app.put('/:id', (req, res) => {

})





app.listen(porta, () => console.log("Rodando.."))

 