import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/rootReducer";
import { getData, postData } from "../../utils/httpclient";

interface User {
    username: string,
    email: string
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
            const { username, email } = action.payload
            state.username = username
            state.email = email
            state.isAuthenticated = true
        }
    }
})

export const logout = (redirect: () => void): AppThunk => async dispatch => {
    const response = await getData('auth', 'logout')
    dispatch(clearSession())
    redirect()
}


export const signin = (
    email: string,
    password: string,
    redirect: () => void,
    setError: (msg: string) => void
): AppThunk => async dispatch => {
    try {
        const response = await getData('auth', 'login', { email, password })
        console.log("Signin worked: " + JSON.stringify(response))
        const user = { username: response.data.result, email }
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
    role: string,
    email: string,
    password: string,
    redirect: () => void,
    setServerError: (msg: string) => void
): AppThunk => async dispatch => {
    try {
        await postData('auth', 'register', { username, email, password, role })
        const user = { username, email }
        dispatch(initSession(user))
        redirect()
    }
    catch (e) {
        setServerError("Cet email est déjà associé à un compte") //TODO: error message should display when backend is down
    }
}

export const {
    clearSession,
    initSession
} = sessionSlice.actions

export default sessionSlice.reducer