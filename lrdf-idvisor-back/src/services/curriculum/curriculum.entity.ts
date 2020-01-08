import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import UniversityDB from "../../services/university/university.entity"
import { Field } from "../user/user.entity"


@Entity()
export class CurriculumDB {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column()
    public name!: string

    @Column()
    public description!: string

    @Column()
    public url!: string

    @ManyToOne(_ => UniversityDB, university => university.name)
    public university!: UniversityDB

    @ManyToMany(_ => Field, f => f.curriculums)
    public fields!: Field[]
}