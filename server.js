const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const messagesController = require('./src/helpers/messagesController')
const productsController = require('./src/helpers/productsController')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//Middlewares
app.set('views', 'src/views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

httpServer.listen(8080, () => console.log('Server ONLINE'))

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id)
    socket.emit('socketConnected', 'success')

    socket.on('productListRequest', async () => {
        const allProducts = await productsController.getAllProduct()
        socket.emit('updateProductList', allProducts)
    })

    socket.on('chatMessagesRequest', async () => {
        const allMessages = await messagesController.getAllMessages()
        socket.emit('updateChat', allMessages)
    })

    socket.on('addNewProduct', async (newProduct) => {
        await productsController.addNewProduct(newProduct)
        const allProducts = await productsController.getAllProduct()
        socket.emit('updateProductList', allProducts)
    })

    socket.on('addNewMessage', async (newMessage) => {
        await messagesController.addNewMessage(newMessage)
        const allMessages = await messagesController.getAllMessages()
        socket.emit('updateChat', allMessages)
    })
})