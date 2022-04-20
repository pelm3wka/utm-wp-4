import React, { useEffect, useState } from "react";
import './CreateUser.css'
import { useNavigate } from "react-router-dom";

export default function LogInComponent() {
    const [Name, setName] = useState("");
    const [NameError, setNameError] = useState("name field can't be empty");
    const [NameDirty, setNameDirty] = useState(false);
    const [Surname, setSurname] = useState("");
    const [SurNameError, setSurNameError] = useState("surname field can't be empty");
    const [SurNameDirty, setSurNameDirty] = useState(false);
    const [formValid, setFormValid] = useState(false);

    let navigate = useNavigate();

    const NameHandler = (e) => {
        setName(e.target.value);
        if (!e.target.value) {
            setNameError("full name field can't be empty");
        } else {
            setNameError("")
        }
    }

    const SurNameHandler = (e) => {
        setSurname(e.target.value);
        if (!e.target.value) {
            setSurNameError("full name field can't be empty");
        } else {
            setSurNameError("")
        }
    }


    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'Name':
                setNameDirty(true)
                break
            case 'SurName':
                setSurNameDirty(true)
                break
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const axios = require('axios').default
        axios.post('https://pure-caverns-82881.herokuapp.com/api/v54/users', {
            data: {
                name: Name,
                surname: Surname
            }
        }, {
            headers: {
                "X-Access-Token": process.env.REACT_APP_ACCESS_TOKEN
            }
        })
            .then((response) => {
                localStorage.setItem('userId', response.data.id);
            }).catch((err) => {
                console.log(err);
            })

        navigate("/quiz-list");
    }

    useEffect(() => {
        if (NameError || SurNameError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [NameError, SurNameError])

    return (
        <div className="wrapper">
            <h1 className="header">welcome to the quiz app</h1>
            <div className="form">
                <form onSubmit={submitHandler}>
                    {(NameError && NameDirty) && <span className="error">{NameError}</span>}
                    <input type="text" placeholder="enter the name"
                        value={Name}
                        name="Name" onBlur={e => blurHandler(e)}
                        onChange={(e) => NameHandler(e)} />
                    {(SurNameError && SurNameDirty) && <span className="error">{SurNameError}</span>}
                    <input type="text" placeholder="enter the surname"
                        value={Surname}
                        name="SurName" onBlur={e => blurHandler(e)}
                        onChange={(e) => SurNameHandler(e)} />
                    <button disabled={!formValid}
                        type="submit"
                        className="btn-signUp"
                        style={!formValid ? { background: "#123c69" } : {}}
                    >create user</button>
                </form>
            </div>
        </div>
    )

}