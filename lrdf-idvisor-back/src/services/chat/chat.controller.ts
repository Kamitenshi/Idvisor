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
- try catch
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

            let conversation = users[0].conversations
                .flatMap((conv1) => users[1].conversations
                    .filter((conv2) => conv1.id === conv2.id))[0] //TODO: to allow multiple user discussion should be changed
            console.log('Conversation: ' + JSON.stringify(conversation));

            if (!conversation) {
                const newConversation = new Conversation()
                newConversation.users = users
                conversation = await this.conversationRepo.save(newConversation)
            }

            const messages = (await this.messagesRepo.find({ select: ["content", "author"], where: { conversation: conversation }, relations: ['author'], order: { createdAt: 'ASC' } }))
                .map((msg) => ({ content: msg.content, userId: msg.author.id }))
            socket.emit('conversation', conversation.id, messages)
        })
    }

    private message(socket: SocketIO.Socket) {
        socket.on('message', async ({ authorId, conversationId, msg }) => {
            const newMessage = new Message()
            //@ts-ignore
            newMessage.author = { id: authorId }
            //@ts-ignore
            newMessage.conversation = { id: conversationId }
            newMessage.content = msg
            await this.messagesRepo.save(newMessage)
        })
    }
}

export default ChatController