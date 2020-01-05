import express from 'express'
import Controller from "../../utils/controller"
import { checkToken } from '../../utils/jwt'


class ChatController implements Controller {
    public path = '/chat'
    public router = express.Router()
    private socket: SocketIO.Server
    private activeUsers: string[]

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