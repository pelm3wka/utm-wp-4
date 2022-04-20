import {applyMiddleware, combineReducers, createStore} from "redux";
import quizzesReducer, {setQuiz} from "./quizzesReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import quizReducer from "./quizReducer";

const rootReducer = combineReducers({
    quizes: quizzesReducer,
    quiz: quizReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))