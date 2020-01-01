import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/rootReducer";
import { getData, postData } from "../../utils/httpclient";

export type Role = 'admin' | 'advisor' | 'student'

interface User {
    username: string,
    email: string,
    role: Role
}

type Authentication = {
    password: string
} & User

type CurrentSession = {
    isAuthenticated: boolean
} & User

let initialState: CurrentSession = {
    username: '',
    email: '',
    role: 'student',
    isAuthenticated: false,
}

const sessionSlice = createSlice({
    name: ('sessionSlice'),
    initialState,
    reducers: {
        clearSession(state) {
            state.username = ''
            state.email = ''
            state.isAuthenticated = false
        },
        initSession(state, action: PayloadAction<User>) {
            const { username, email, role } = action.payload
            state.role = role
            state.username = username
            state.email = email
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
        const user = { username, email, role }
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
        await postData('auth', 'register', { username, email, password, role })
        const user = { username, email, role }
        dispatch(initSession(user))
        redirect()
    }
    catch (e) {
        setServerError("Cet email est déjà associé à un compte") //TODO: error message should display when backend is down
    }
}

export const getUsername = (state: RootState) => state.session.username
export const getRole = (state: RootState) => state.session.role

export const {
    clearSession,
    initSession
} = sessionSlice.actions

export default sessionSlice.reducer