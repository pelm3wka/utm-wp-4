import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuiz } from "../quiz-fetchers/getQuiz";
import AnsweringFormComponent from "./AnsweringFormComponent";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import './Quiz.css'

export default function QuizComponent() {
    const quiz = useSelector(state => state.quiz.quiz);
    const dispatch = useDispatch();
    let navigate = useNavigate;

    const goBackHandler = (e) => {
        e.preventDefault();
        navigate("/quiz-list");
    }

    useEffect(() => {
        let quizId = +localStorage.getItem('quizId');
        dispatch(getQuiz(quizId));
    }, [])

    

    return (
        <div className="wrapper">
            {
                quiz?.questions?.length > 0 && (
                    <>
                        <h1>{quiz.title}</h1>
                        <div>
                            {quiz.questions.map((question) =>
                                <AnsweringFormComponent question={question} key={question.id} className="list-item" />)}
                        </div>
                        <Button onClick={goBackHandler} size="large" className="quiz-goback-btn">
                            leave
                        </Button>
                    </>
                )
            }
        </div>
    )
}