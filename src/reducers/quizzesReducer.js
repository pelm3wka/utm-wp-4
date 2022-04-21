const SET_QUIZES = "SET_QUIZES"

const defaultState = {
    quizes: [],
    isFetching: true
}

export default function quizesReducer (state = defaultState, action){
    switch (action.type) {
        case SET_QUIZES:
            return {
                ...state,
                quizes: action.payload
            }
        default:
            return state
    }
}

export const setQuiz = (quizes) => ({type: SET_QUIZES, payload:quizes})
