//Packages
const Controller = require('../../fileSystem')
const messagesDB = new Controller('messages')

//Product Routes
const messagesController = {
    getAllMessages: async () => {
        try {
            const allMessages = await messagesDB.getAll()
            return allMessages
        } catch(err) {
            console.log(err)
        }
    },

    addNewMessage: async (message) => {
        try {
            const prevMessages = await messagesDB.getAll()

            const getNewId = () => {
                let lastID = 0
                if (prevMessages.length) {
                    lastID = prevMessages[prevMessages.length - 1].id
                }
                return lastID + 1
            }

            const newMessage = {
                id: getNewId(),
                user: message.user ? message.user : 'anonymous',
                messageText: message.messageText ? message.messageText : '(Mensaje vacio)'
            }

            await messagesDB.add(newMessage)
        } catch(err) {
            console.log(err)
        }
    }
}

//Export
module.exports = messagesController