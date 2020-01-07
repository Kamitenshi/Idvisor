import { IsEmail, IsString } from 'class-validator'
import { Column, Entity, PrimaryColumn } from "typeorm"

export type Role = "admin" | "student" | "advisor"

@Entity()
class UserDB {
  @PrimaryColumn()
  public email!: string

  @Column()
  public username!: string

  @Column()
  public role!: Role

  @Column()
  public password!: string
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