import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { AppThunk } from "../../app/rootReducer";

interface User {
    username: string,
    email: string
}

type Authentication = {
    password: string
} & User

type CurrentSession = {
    jwt: string
} & User

let initialState: CurrentSession = {
    username: '',
    email: '',
    jwt: '',
}

const sessionSlice = createSlice({
    name: ('sessionSlice'),
    initialState,
    reducers: {
        logout(state, _) {
            state.username = ''
            state.email = ''
            state.jwt = ''
        },
        initSession(state, action: PayloadAction<User>) {
            const { username, email } = action.payload
            state.username = username
            state.email = email
        }
    }
})

const createUrl = (service: string, action?: string) => {
    const protocol = "http"
    const domain = "localhost"
    const port = 4000
    const url = protocol + '://' + domain + ':' + port + '/' + service

    return action ? url + '/' + action : url
}

const postFormData = async (service: string, action: string, body: any) => {
    const url = createUrl(service, action)
    const result = axios.post(url, body)
    console.log("Request successfully created: " + JSON.stringify(body)) // TODO: remove
    return result

}

export const signin = (
    email: string,
    password: string,
    redirect: () => void,
    setError: (msg: string) => void
): AppThunk => async dispatch => {
    try {
        const response = await postFormData('auth', 'login', { email, password })
        console.log("Signin worked: " + JSON.stringify(response))
        const user = { username: response.data.result, email }
        dispatch(initSession(user))
        redirect()
    }
    catch (err) {
        setError("Les identifiants ne sont pas valides")
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
        const response = await postFormData('auth', 'register', { username, email, password, role })
        const user = { username, email }
        dispatch(initSession(user))
        redirect()
    }
    catch (e) {
        setServerError("Cet email est déjà associé à un compte")
    }
}

export const {
    logout,
    initSession
} = sessionSlice.actions

export default sessionSlice.reducer