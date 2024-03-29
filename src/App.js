import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar/>
          <Alert alert = {alert}/>
          <Routes>
            <Route exact path='/' element={<Home showAlert = {showAlert}/>}></Route>
            <Route exact path='/about' element={<About />}></Route>
            <Route exact path='/login' element={<Login showAlert = {showAlert}/>}></Route>
            <Route exact path='/signup' element={<SignUp showAlert = {showAlert}/>}></Route>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
