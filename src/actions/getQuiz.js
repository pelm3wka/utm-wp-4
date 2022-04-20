import axios from "axios";
import {setQuizById} from "../reducers/quizReducer";

export const getQuiz = (quizId) => {
    return async (dispatch) => {
        const response = await axios.get(`https://pure-caverns-82881.herokuapp.com/api/v54/quizzes/${quizId}`,
            {
                headers: {
                    "X-Access-Token": process.env.REACT_APP_ACCESS_TOKEN
                }
            })
        dispatch(setQuizById(response.data))
    }

}