export type Role = 'admin' | 'advisor' | 'student'

export type User = { role: Role } & UserData

export interface UserData {
    id: number
    username: string
    email: string
}

export type University = {
    name: string
    description: string
    address: string
    city: string
    postalCode: string
    curriculums: Curriculum[]
}

export type Curriculum = {
    id: number
    name: string
    description: string
    university: University
    skills: string[]
}
