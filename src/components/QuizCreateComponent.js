import React, { useState } from "react";
import './QuizCreate.css';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function QuizCreateComponent() {
    const [title, setTitle] = useState("");
    const [questionName, setQuestionName] = useState("");
    const [answer1Name, setAnswer1Name] = useState("");
    const [answer2Name, setAnswer2Name] = useState("");
    const [titleError, setTitleError] = useState("title field can't be empty");
    const [questionAdded, setQuestionAdded] = useState("question added!");
    const [titleDirty, setTitleDirty] = useState(false);
    const [firstQuestion, setFirstQuestion] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState('');

    let navigate = useNavigate();

    const [data, setData] = useState({
        title: '',
        questions: [{
            question: '',
            answers: [],
            correct_answer: ''
        }
        ]
    })

    let tempQuiz = [];


    const titleHandler = (e) => {
        setTitle(e.target.value);
        if (!e.target.value) {
            setTitleError("Full name field can't be empty");
        } else {
            setTitleError("");
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'title':
                setTitleDirty(true)
                break
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const axios = require('axios').default
        axios.post('https://pure-caverns-82881.herokuapp.com/api/v54/quizzes', { data }, {
            headers: { "X-Access-Token": process.env.REACT_APP_ACCESS_TOKEN }
        }).catch((err) => console.log(err));
        navigate("/quiz-list");
    }


    const addQuestion = () => {
        let quiz = data.questions.concat();
        let answers = [answer1Name, answer2Name];
        quiz.push({ question: questionName, answers: answers, correct_answer: answers[correctAnswer] });
        if (!firstQuestion) {
            quiz.splice(0, 1);
        }
        setFirstQuestion(true);

        setData({ title: title, questions: quiz })
        setQuestionName('');
        setAnswer1Name('');
        setAnswer2Name('');
        setCorrectAnswer('');
    }

    const onSelectCorrectAnswer = (e) => {
        setCorrectAnswer(e.target.value);
    }

    const goBackHandler = (e) => {
        e.preventDefault();
        navigate("/quiz-list");
    }

    return (
        <div className="wrapper">
            <h1 className="header">create a quiz</h1>
            <div className="form">
                <form onSubmit={submitHandler} className="form-quiz-create">
                    {(titleError && titleDirty) && <span className="error">{titleError}</span>}
                    <input type="text"
                        placeholder="quiz title"
                        value={title}
                        name="title"
                        onBlur={e => blurHandler(e)}
                        onChange={titleHandler}
                        disabled={firstQuestion} />
                    <input type="text"
                        placeholder="question"
                        value={questionName}
                        onChange={(e) => setQuestionName(e.target.value)} />
                    <input type="text"
                        placeholder="first answer"
                        value={answer1Name}
                        onChange={(e) => setAnswer1Name(e.target.value)} />
                    <input type="text"
                        placeholder="second answer"
                        value={answer2Name}
                        onChange={(e) => setAnswer2Name(e.target.value)} />
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">correct answer</InputLabel>
                            <Select
                                value={correctAnswer}
                                className="select-correct"
                                label="Correct answer"
                                onChange={onSelectCorrectAnswer}
                            >
                                <MenuItem value={0}>first</MenuItem>
                                <MenuItem value={1}>second</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <div className="btn-quiz">
                        <Button size={"medium"} onClick={addQuestion} className="create-btns">add question</Button>
                        <Button size={"medium"} onClick={goBackHandler} className="create-btns">go back</Button>
                        <Button size={"medium"} type="submit" className="create-btns">submit</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}