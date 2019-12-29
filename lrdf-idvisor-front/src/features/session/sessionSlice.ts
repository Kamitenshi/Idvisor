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
    try {

        const result = axios.post(url, body)
        console.log("Request successfully created: " + JSON.stringify(body)) // TODO: remove
        return result
    }
    catch (err) {
        console.error("An error has occured: " + err) // TODO: manage properly errors
    }

}

export const signin = (
    email: string,
    password: string
): AppThunk => async dispatch => {
    try {
        const response = await postFormData('auth', 'login', { email, password })
        console.log("Signin worked: " + JSON.stringify(response))
        const user = { username: 'test', email }
        dispatch(initSession(user))
    }
    catch (err) {
        console.log("An error has occured: " + err);
    }
}

export const signup = (
    email: string,
    password: string
): AppThunk => async dispatch => {
    const role = 'admin'
    const response = await postFormData('auth', 'register', { email, password, role })
    const user = { username: 'test', email }
    dispatch(initSession(user))

}

export const {
    logout,
    initSession
} = sessionSlice.actions

export default sessionSlice.reducer