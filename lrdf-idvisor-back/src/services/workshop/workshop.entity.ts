import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Advisor, Skill, Student } from "../user/user.entity"

@Entity()
export class Workshop {
    @PrimaryGeneratedColumn()
    public id!: number
    @Column()
    public name!: string
    @ManyToMany(_ => Advisor, advisor => advisor.user)
    public advisors!: Advisor[]
    @ManyToMany(_ => Student, student => student.user)
    public students!: Student[]
    @ManyToMany(_ => Skill, skill => skill.field)
    public skills!: Skill[]
}
