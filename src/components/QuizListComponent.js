import React, {useEffect} from "react";
import './QuizList.css'
import QuizItemComponent from "./QuizItemComponent";
import {useDispatch, useSelector} from "react-redux";
import {getQuizzes} from "../quiz-fetchers/getQuizzes";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function QuizListComponent () {
    const dispatch = useDispatch();
    const quizes = useSelector(state => state.quizes.quizes);
    let navigate = useNavigate();

    const onAddQuizHandler = () => {
        navigate("/add-quiz")
    }

    useEffect(()=>{
        dispatch(getQuizzes())
    }, [dispatch])

    return(
        <div className={"quiz-list-wrapper"}>
            <div className="quiz-list">
            {quizes.map((quiz, index) =>
                <QuizItemComponent quiz={quiz} key={quiz.id}/>
            )}
            <Button onClick={onAddQuizHandler} size="large" className="quiz-list-btn-add-quiz">
                create a quiz
            </Button>
            </div>
        </div>
    )
}