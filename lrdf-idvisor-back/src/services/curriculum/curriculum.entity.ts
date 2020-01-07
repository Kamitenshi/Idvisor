import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import UniversityDB from "../../services/university/university.entity"


@Entity()
export class CurriculumDB {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column()
    public name!: string

    @Column()
    public description!: string

    @ManyToOne(_ => UniversityDB, university => university.name)
    public university!: UniversityDB
}