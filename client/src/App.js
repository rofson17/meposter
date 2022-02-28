import { Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Contact from './pages/Contact';
import Error404 from './pages/Error404';
import NavBar from './components/Navbar/NavBar';
import SingIn from './pages/SingIn';
import SingUp from './pages/SingUp';
import Posts from './pages/Posts';
import { useReducer, useState } from 'react';

const reducer = (state, action) => {
  if (action.type === "LOGIN")
    return true;
  if (action.type === "LOGOUT")
    return false;
  return state
}

function App() {
  const [state, dispatch] = useReducer(reducer, false);

  return (
    <>
      <NavBar state={state} dispatch={dispatch} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/posts" element={<Posts />} />
        <Route exact path="/singin" element={<SingIn dispatch={dispatch} />} />
        <Route exact path="/singup" element={<SingUp />} />
        <Route path="*" element={<Error404 />} />
      </Routes>

    </>
  );
}

export default App;
