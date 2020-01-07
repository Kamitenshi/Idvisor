import { University } from "lrdf-idvisor-model"
import UniversityDB from "services/university/university.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class CurriculumDB {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column()
    public name!: string

    @Column()
    public description!: string

    @Column()
    public skills!: string[]

    @ManyToOne(_ => UniversityDB, university => university.name)
    public university!: University
}