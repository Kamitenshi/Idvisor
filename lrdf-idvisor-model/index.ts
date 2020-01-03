export type Role = 'admin' | 'advisor' | 'student'

export interface User {
    username: string,
    email: string,
}

export interface UserAccount {
    user: User,
    role: Role
}
