import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/rootReducer";
import { getData, postData } from "../../utils/httpclient";

export type Role = 'admin' | 'advisor' | 'student'

export interface User {
    username: string,
    email: string,
}

interface UserSession {
    user: User,
    role: Role
}

type CurrentSession = {
    userSession: UserSession
    isAuthenticated: boolean
}

let initialState: CurrentSession = {
    userSession: {
        user: {
            username: '',
            email: '',
        },
        role: 'student'
    },
    isAuthenticated: false,
}

const sessionSlice = createSlice({
    name: ('sessionSlice'),
    initialState,
    reducers: {
        clearSession(state) {
            state.userSession.user.username = ''
            state.userSession.user.email = ''
            state.isAuthenticated = false
        },
        initSession(state, action: PayloadAction<UserSession>) {
            const { user, role } = action.payload
            state.userSession.role = role
            state.userSession.user.username = user.username
            state.userSession.user.email = user.email
            state.isAuthenticated = true
        }
    }
})

export const logout = (): AppThunk => async dispatch => {
    const response = await getData('auth', 'logout')
    dispatch(clearSession())
}


export const signin = (
    email: string,
    password: string,
    redirect: () => void,
    setError: (msg: string) => void
): AppThunk => async dispatch => {
    try {
        const response = await getData('auth', 'login', { email, password })
        const { username, role } = response.data.result
        const user = { user: { username, email }, role }
        dispatch(initSession(user))
        redirect()
    }
    catch (err) {
        setError("Les identifiants ne sont pas valides") //TODO: error message should display when backend is down
    }
}

export const signupStudent = (
    username: string,
    email: string,
    password: string,
    redirect: () => void,
    setServerError: (msg: string) => void
): AppThunk => async dispatch => {
    const role = 'student'
    dispatch(signup(username, role, email, password, redirect, setServerError))
}

export const signup = (
    username: string,
    role: Role,
    email: string,
    password: string,
    redirect: () => void,
    setServerError: (msg: string) => void
): AppThunk => async dispatch => {
    try {
        await postData('auth', 'register/student', { username, email, password, role })
        const user = { user: { username, email }, role }
        dispatch(initSession(user))
        redirect()
    }
    catch (e) {
        setServerError("Cet email est déjà associé à un compte") //TODO: error message should display when backend is down
    }
}

export const modifyField = (
    newValue: string,
    field: string,
    currentPassword: string,
    setServerError: (msg: string) => void
): AppThunk => async dispatch => {
    try {
        const result = await postData('user', 'modify', { field: newValue })
        const { username, email, role } = result.data.result
        const user = { user: { username, email }, role }
        dispatch(initSession(user))
    }
    catch (e) {
        setServerError('Mot de passe invalide')
    }
}

export const getUsername = (state: RootState) => state.session.userSession.user.username
export const getRole = (state: RootState) => state.session.userSession.role
export const getEmail = (state: RootState) => state.session.userSession.user.email
export const getUser = (state: RootState) => state.session.userSession.user

export const {
    clearSession,
    initSession
} = sessionSlice.actions

export default sessionSlice.reducer