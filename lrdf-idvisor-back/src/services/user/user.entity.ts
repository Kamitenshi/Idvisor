import { IsEmail, IsString } from 'class-validator'
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm"
import { Conversation, Message } from '../chat/chat.entity'

export type Role = "admin" | "student" | "advisor"

@Entity()
class UserDB {
  //TODO: add an id to simplify relationship tables
  @PrimaryColumn()
  public email!: string

  @Column()
  public username!: string

  @Column()
  public role!: Role

  @Column()
  public password!: string

  @OneToMany(type => Message, message => message.author)
  public messages!: Message[]

  @ManyToMany(type => Conversation, conv => conv.users)
  public conversations!: Conversation[]
}

export class RegisteringUser {
  @IsEmail()
  public email!: string

  @IsString()
  public username!: string

  @IsString()
  public password!: string
}

export class LoggingUser {
  @IsEmail()
  public email!: string

  @IsString()
  public password!: string
}

export default UserDB