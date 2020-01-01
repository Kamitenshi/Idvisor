import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "../../app/rootReducer"
import { getData } from "../../utils/httpclient"


interface University {
    name: string
}

interface Curriculum {
    name: string
}

interface Field {
    name: string
}

type Recommandation = University | Curriculum

export interface StudentProfile {
    recommandations: Recommandation[]
    interests: Field[]
    skills: Field[]
}

let initialState: StudentProfile = {
    recommandations: [],
    interests: [],
    skills: [],
}

const studentSlice = createSlice({
    name: ('studentSlice'),
    initialState,
    reducers: {
        setRecommandations(state, action: PayloadAction<Recommandation[]>) {
            state.recommandations = action.payload
        },
        setInterests(state, action: PayloadAction<Field[]>) {
            state.interests = action.payload
        },
        setSkills(state, action: PayloadAction<Field[]>) {
            state.skills = action.payload
        }
    }
})

const {
    setRecommandations,
    setInterests,
    setSkills
} = studentSlice.actions

export const collectRecommandations = (): AppThunk => async dispatch => {
    const response = await getData('student', 'recommandation')
    dispatch(setRecommandations(response.data.result))
}

export const collectInterests = (): AppThunk => async dispatch => {
    const response = await getData('student', 'interests')
    dispatch(setInterests(response.data.result))

}
export const collectSkills = (): AppThunk => async dispatch => {
    const response = await getData('student', 'skills')
    dispatch(setSkills(response.data.result))
}

export const getRecommandations = (state: RootState) => state.student.recommandations
export const getInterests = (state: RootState) => state.student.interests
export const getSkills = (state: RootState) => state.student.skills

export default studentSlice.reducer