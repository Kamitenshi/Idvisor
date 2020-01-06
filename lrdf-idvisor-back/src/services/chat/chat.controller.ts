import express from 'express'
import { getRepository } from 'typeorm'
import Controller from "../../utils/controller"
import { checkToken } from '../../utils/jwt'
import UserDB from '../user/user.entity'
import { Conversation, Message } from './chat.entity'

/*
TODO: 
- add proper error messages
- delete socket when no more required
*/

type email = string

class ChatController implements Controller {
    public path = '/chat'
    public router = express.Router()
    private socketServer: SocketIO.Server
    private activeUsers: Map<email, SocketIO.Socket> = new Map()
    private messagesRepo = getRepository(Message)
    private conversationRepo = getRepository(Conversation)
    private userRepo = getRepository(UserDB)

    constructor(socket: SocketIO.Server) {
        this.socketServer = socket
        this.listen()
    }

    private listen() {
        this.socketServer.on('connect', (socket) => {
            console.log("Client connected with socket") //TODO: remove
            this.init(socket)
            this.message(socket)
            this.createConversation(socket)
        })
    }

    private init(socket: SocketIO.Socket) {
        socket.on('init', async (cookie) => {
            try {
                const token = checkToken(cookie)
                const user = await this.userRepo.findOne(token.id)
                if (user)
                    this.activeUsers.set(user.email, socket)
                else {
                    console.log("User does not exist");
                }
            }
            catch (e) {
                console.log("Error during socket initialization: " + e);
            }
        })
    }

    private createConversation(socket: SocketIO.Socket) {
        socket.on('createConversation', async ({ usersIds, cookie }) => {
            const token = checkToken(cookie)
            const user = await this.userRepo.findOne({ where: { id: token.id }, relations: ['conversations'] })
            if (!user) {
                console.log('User does not exist');
                return
            }
            let users: UserDB[] = await this.userRepo.findByIds(usersIds, { relations: ['conversations'] })
            users.push(user)

            const conversation = users[0].conversations.filter((value) => users[1].conversations.indexOf(value)) //TODO: to allow multiple user discussion should be changed
            console.log(JSON.stringify(conversation));

            if (conversation.length === 0) {
                const newConversation = new Conversation()
                newConversation.users = users
                this.conversationRepo.save(newConversation)
                console.log("New conversation");
            }
        })
    }

    private message(socket: SocketIO.Socket) {
        socket.on('message', async (msg) => {
            this.activeUsers.forEach((s, user) => { console.log("In for each: " + user); s.emit('coucou', 'tranquile ?') })
        })
    }
}

export default ChatController