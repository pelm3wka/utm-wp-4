import axios from "axios";
import {setQuiz} from "../reducers/quizzesReducer";

export const getQuizzes = () => {
    return async (dispatch) => {
        const response = await axios.get("https://pure-caverns-82881.herokuapp.com/api/v54/quizzes", {
            headers: {
                "X-Access-Token": process.env.REACT_APP_ACCESS_TOKEN
            }})
        dispatch(setQuiz(response.data))
    }
}