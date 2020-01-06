export type Role = 'admin' | 'advisor' | 'student'

export type User = { role: Role } & UserData

export interface UserData {
    id: number
    username: string
    email: string
}
