import { IsEmail, IsIn, IsString } from 'class-validator';
import { Column, Entity, PrimaryColumn } from "typeorm";

export type Role = "admin" | "student" | "advisor";

@Entity()
class User {
  @PrimaryColumn()
  public email!: string;

  @Column()
  public role!: Role;

  @Column()
  public password!: string;
}

export class RegisteringUser {
  @IsEmail()
  public email!: string;

  @IsIn(['admin', 'advisor', 'student'])
  public role!: Role;

  @IsString()
  public password!: string;
}

export class LoggingUser {
  @IsEmail()
  public email!: string;

  @IsString()
  public password!: string;
}

export default User;