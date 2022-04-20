import './App.css';
import CreateUserComponent from "./components/CreateUserComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import QuizListComponent from "./components/QuizListComponent";
import QuizCreateComponent from "./components/QuizCreateComponent";
import QuizComponent from "./components/QuizComponent";


const App = () => {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<CreateUserComponent/>}/>
            <Route path="/quiz-list"  element={<QuizListComponent/>}/>
            <Route path="/add-quiz" element = {<QuizCreateComponent/>}/>
            <Route path="/quiz-in-progress" element = {<QuizComponent/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
