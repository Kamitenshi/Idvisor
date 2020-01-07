import { IsEmail, IsString } from 'class-validator'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Conversation, Message } from '../chat/chat.entity'
import { Workshop } from '../workshop/workshop.entity'

export type Role = "admin" | "student" | "advisor"

@Entity()
class UserDB {
  //TODO: add an id to simplify relationship tables
  @PrimaryGeneratedColumn()
  public id!: number
  @Column()
  public email!: string

  @Column()
  public username!: string

  @Column()
  public role!: Role

  @Column()
  public password!: string

  @OneToMany(type => Message, message => message.author, { onDelete: 'CASCADE' })
  public messages!: Message[]

  @ManyToMany(type => Conversation, conv => conv.users, { onDelete: 'CASCADE' })
  public conversations!: Conversation[]
}

@Entity()
export class Skill {
  @OneToOne(_ => Field, { primary: true })
  @JoinColumn()
  public field!: Field
  @Column()
  public level!: number
  @ManyToMany(_ => Student, student => student.user)
  public students!: Student[]
  @ManyToMany(_ => Workshop, w => w.id)
  public workshops!: Workshop[]
}

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  public id!: number
  @Column()
  public name!: string
  @ManyToMany(_ => Student, student => student.user)
  public students!: Student[]
}

@Entity()
export class Student {
  @OneToOne(type => UserDB, { primary: true })
  @JoinColumn()
  public user!: UserDB

  @ManyToMany(_ => Skill, skill => skill.field)
  @JoinTable()
  public skills!: Skill[]

  @ManyToMany(_ => Field, cof => cof.id)
  @JoinTable()
  public centerOfInterests!: Field[]

  @ManyToMany(_ => Workshop, workshop => workshop.id)
  @JoinTable()
  public workshops!: Workshop[]
}

@Entity()
export class Advisor {
  @OneToOne(type => UserDB, { primary: true })
  @JoinColumn()
  public user!: UserDB
  @ManyToMany(_ => Workshop, workshop => workshop.id)
  @JoinColumn()
  public workshops!: Workshop[]

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