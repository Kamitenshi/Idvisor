import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookie from 'js-cookie';
import { Role, UserData } from "lrdf-idvisor-model";
import { AppThunk, RootState } from "../../app/rootReducer";
import { getData, patchData, postData, socket } from "../../utils/httpclient";

export interface UserAccount {
    user: UserData,
    role: Role
}

type CurrentSession = {
    userSession: UserAccount
    isAuthenticated: boolean
}

let initialState: CurrentSession = {
    userSession: {
        user: {
            id: -1,
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
        initSession(state, action: PayloadAction<UserAccount>) {
            const { user, role } = action.payload
            state.userSession.role = role
            state.userSession.user.username = user.username
            state.userSession.user.email = user.email
            state.isAuthenticated = true
        }
    }
})

export const logout = (): AppThunk => async dispatch => {
    await getData('auth', 'logout')
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
        const { username, role, id } = response.data.result
        const user = { user: { username, email, id }, role }
        dispatch(initSession(user))
        socket.emit('init', Cookie.get('jwt'))
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
    socket.emit('init', Cookie.get('jwt'))
}

export const signup = (
    username: string,
    role: Role,
    oldEmail: string,
    password: string,
    redirect: () => void,
    setServerError: (msg: string) => void
): AppThunk => async dispatch => {
    try {
        const response = await postData('auth', `register/${role}`, { username, email: oldEmail, password, role })
        if (role === "student") {
            const { username, role, email, id } = response.data.result
            const user = { user: { username, email, id }, role }
            dispatch(initSession(user))
            dispatch(signin(oldEmail, password, redirect, setServerError))
        }
        else {
            redirect()
        }
    }
    catch (e) {
        setServerError("Cet email est déjà associé à un compte") //TODO: error message should display when backend is down
    }
}

export const modifyField = (
    email: string,
    newValue: string,
    field: string,
    password: string,
    redirect: () => void,
    setServerError: (msg: string) => void
): AppThunk => async dispatch => {
    try {
        const result = await patchData('user', 'modify', { field, newValue }, { email, password })
        const { username, role, id } = result.data.result
        email = result.data.result.email
        const user = { user: { username, email, id }, role }
        dispatch(initSession(user))
        redirect()
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