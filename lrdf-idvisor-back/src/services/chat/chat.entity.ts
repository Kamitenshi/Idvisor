import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import UserDB from "../user/user.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    private id!: number;
    @ManyToOne(type => UserDB, user => user.messages)
    public author!: UserDB
    @ManyToOne(type => Conversation, conv => conv.messages)
    public conversation!: Conversation
    @Column()
    public content!: string
    @CreateDateColumn()
    public createdAt!: string
}

@Entity()
export class Conversation {
    @PrimaryGeneratedColumn()
    private id!: number
    @OneToMany(type => Message, message => message.conversation)
    public messages!: Message[]
    @ManyToMany(type => UserDB, user => user.conversations)
    @JoinTable()
    public users!: UserDB[]
}