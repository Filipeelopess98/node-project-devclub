const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())

/*
- Query params => meusite.com/users?name=filipe&age=25 // FILTROS
- Route params => /users/2  //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
- Request Body => {"name":"filipe","age":}

- GET  => Buscar informação no back-end
- POST => Criar informação no back-end
- PUT/ PATCH => Alterar/Atualizar informação no back-end
- DELETE => Deletar informação no back-end

- Middlewares => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição
(É UMA FUNÇÃO)

const myFirstMiddleware = (request, response, next ) => {

PARA CHAMAR A FUNÇÃO DO Middlewares

app.use(nome da função)

} 

*/

const users = []

const checkUsedId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {
    return response.json(users)

})

app.post('/users', (request, response) => {
    const { name, age, phone, email } = request.body

    const user = { id: uuid.v4(), name, age, phone, email }

    users.push(user)

    return response.status(201).json(user)
})


app.put('/users/:id', checkUsedId, (request, response) => {
    const { name, age, phone, email } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age, phone, email }

    users[index] = updateUser
    return response.json(updateUser)
})


app.delete('/users/:id', checkUsedId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)
    return response.status(204).json({ error: "User not found" })
})


app.listen(3000, () => {
    console.log(`🚀💥server starting ${port}`)
})


