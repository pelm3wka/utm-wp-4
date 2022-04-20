import React, {useState} from "react";
import {Checkbox} from "@mui/material";

export default function AnsweringFormComponent ({question}) {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [counter, setCounter] = useState(0);
    const [canSubmit, setCanSubmit] = useState(false);
    const [tempAnswer, setTempAnswer] = useState(0);
    const [answer, setAnswer] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [correctAnswered, setCorrectAnswered] = useState(true);
    const [answered, setAnswered] = useState(false);

    const submitAnswer = (questionId) => {
      setTempAnswer(checked1==true ? 0 : 1);
      setAnswer(question.answers[tempAnswer]);
        let quizId = +localStorage.getItem('quizId');
        let userId = +localStorage.getItem('userId');
        const axios = require('axios').default
        axios.post(`https://pure-caverns-82881.herokuapp.com/api/v54/quizzes/${quizId}/submit`,
            {
                data: {
                    question_id: questionId,
                    answer: answer,
                    user_id: userId
                }
            }, {
                headers: {"X-Access-Token": process.env.REACT_APP_ACCESS_TOKEN}
            }). then((response) => {
                setCorrectAnswer(response.correct_answer);
                setAnswered(true);
                setCorrectAnswer(response.correct);
        }).catch((err) => console.log(err))


      setCounter(prevState => prevState+1);
      if(counter>=question.answers.length){
          setCanSubmit(true);
      }
    }

    return (
        <div>
            <h2 color="#123c69">{question.question}</h2>
            <div className="answers-list">
                <Checkbox
                    checked={checked1}
                    onChange={(event) => setChecked1(event.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />{question.answers[0]}
                <Checkbox
                    checked={checked2}
                    onChange={(event) => setChecked2(event.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />{question.answers[1]}
            </div>
            <button
                className="btn-signUp"
                style={(checked1 == checked2) ? {background: "gray"} : {}}
                disabled={checked1 == checked2 }
                onClick={(e) => submitAnswer(question.id)}>submit answers</button>
            { answered ?
                <div>
                    {!correctAnswered ?
                        <p>Correct answer is {correctAnswer}</p>
                        :
                        <p>Correct!</p>
                    }
                </div>
                :
                <></>
            }
        </div>
    )
}