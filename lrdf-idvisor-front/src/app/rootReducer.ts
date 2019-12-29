import { Action, combineReducers } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import sessionReducer from "../features/session/sessionSlice";

const rootReducer = combineReducers({
    session: sessionReducer
})

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default rootReducer