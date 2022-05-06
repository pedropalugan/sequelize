//Variables
const express = require('express')
const Sequelize = require('Sequelize')
const app = express()
const porta = 3000

//Conect to database
const database = new Sequelize('pwbe_aluno', 'root','',{
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
})
//Creation of the table if it does not exist
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


app.put('/:id', (req, res)=>{
    let index = req.params.id 
    let content = req.body
    async function updateData(){
    await database.sync()
    const request = professores.update(
        content,{where: {id:index}}
    );
    res.send("Dado atualizado")
}
updateData()
})


app.listen(porta, () => console.log("Rodando.."))

