const GET_QUIZ = "GET_QUIZ";

const defaultStateQuiz = {
    quiz: [],
    isFetchingQuiz: true
}

export default function quizReducer (state = defaultStateQuiz, action) {
    switch (action.type) {
        case GET_QUIZ:
            return{
                ...state,
                quiz: action.payload
            }
        default:
            return state
    }
}

export const setQuizById = (quiz) => ({type: GET_QUIZ, payload: quiz})