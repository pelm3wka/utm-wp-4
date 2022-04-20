import React, {useEffect} from "react";
import './QuizItem.css'
import {Box, Button, Card, CardActions, CardContent, Modal, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function QuizItemComponent (props) {
    const [open, setOpen] = React.useState(false);
    const quizInfo = useSelector(state => state.quizes.quizes);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const style = {
        color: 'black',
        background: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        border: '2px solid #000',
        boxShadow: 70,
        p: 4,
    };

    const quiz = props.quiz

    const viewQuiz = (e) => {
       setOpen(true);
    }

    const startQuiz = (id, e) => {
        localStorage.setItem('quizId', id);
        navigate('/quiz-in-progress');
    }

    return (
        <>
        <Card sx={{ width: '30%' }} className="quiz-card">
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    quiz name: {' ' + quiz.title}
                </Typography>
                <Typography color="#123c69">
                    questions: {' ' + quiz.questions_count}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={(e) => viewQuiz(e)} className="view-quiz-btn">View quiz</Button>
            </CardActions>
        </Card>
            {open ?
                <div>
                <Modal open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-title"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            quiz name: {' ' + quiz.title}
                        </Typography>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            questions: {' ' + quiz.questions_count}
                        </Typography>
                        <Button size={"medium"} onClick={(e) => startQuiz(quiz.id, e)} className="start-quiz-btn">start quiz</Button>
                    </Box>
                </Modal>
                </div>
                :
                <></>
            }
        </>
    )
}