import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuiz } from "../actions/getQuiz";
import AnsweringFormComponent from "./AnsweringFormComponent";
import './Quiz.css'

export default function CompletingQuizComponent() {
    const quiz = useSelector(state => state.quiz.quiz);
    const dispatch = useDispatch();

    useEffect(() => {
        let quizId = +localStorage.getItem('quizId');
        dispatch(getQuiz(quizId));
    }, [])

    return (
        <div className="wrapper">
            {quiz?.questions?.length > 0 && (
                <>
                    <h1>{quiz.title}</h1>
                    <div>
                        {quiz.questions.map((question) =>
                            <AnsweringFormComponent question={question} key={question.id} />)}
                    </div>
                </>)}
        </div>
    )
}