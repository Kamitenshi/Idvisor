import express from 'express'
import { getRepository } from 'typeorm'
import Controller from "../../utils/controller"
import { checkToken } from '../../utils/jwt'
import { Conversation, Message } from './chat.entity'


class ChatController implements Controller {
    public path = '/chat'
    public router = express.Router()
    private socket: SocketIO.Server
    private activeUsers: string[]
    private messagesRepository = getRepository(Message)
    private conversationRepository = getRepository(Conversation)

    constructor(socket: SocketIO.Server) {
        this.socket = socket
        this.activeUsers = []
        this.listen()
    }

    private listen() {
        this.socket.on('connect', (socket) => {
            console.log("Client connected with socket")

            socket.on('init', (cookie) => {
                const token = checkToken(cookie)
                this.activeUsers.push(token.email)
            })
        })
    }
}

export default ChatController