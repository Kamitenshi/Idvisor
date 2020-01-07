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

  @OneToMany(_ => Message, message => message.author)
  public messages!: Message[]

  @ManyToMany(_ => Conversation, conv => conv.users)
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
  @ManyToMany(_ => Workshop, w => w.skills)
  @JoinTable()
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
  @PrimaryGeneratedColumn()
  public id!: number
  @OneToOne(_ => UserDB, { onDelete: 'CASCADE' })
  @JoinColumn()
  public user!: UserDB

  @ManyToMany(_ => Skill, skill => skill.students)
  @JoinTable()
  public skills!: Skill[]

  @ManyToMany(_ => Field, cof => cof.students)
  @JoinTable()
  public centerOfInterests!: Field[]

  @ManyToMany(_ => Workshop, workshop => workshop.students)
  @JoinTable()
  public workshops!: Workshop[]
}

@Entity()
export class Advisor {
  @PrimaryGeneratedColumn()
  public id!: number
  @OneToOne(_ => UserDB, { onDelete: 'CASCADE' })
  @JoinColumn()
  public user!: UserDB
  @ManyToMany(_ => Workshop, workshop => workshop.advisors)
  @JoinTable()
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