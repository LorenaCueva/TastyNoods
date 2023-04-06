import 'bulma/css/bulma.min.css';
import '../App.css';
import Login from './Login';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { UserProvider } from './UserContext';
import User from './User';
import Navbar from './Navbar';
import Noods from './Noods';
import Pantry from './Pantry';
import NewNoodForm from './NewNoodForm';
import ReviewComments from './ReviewComments';
import About from './About';
import { useState } from 'react';



function App() {

  const [resetNoods, setResetNoods] = useState(null);

  function handleGoToNoods(){
    setResetNoods(true);
  }


  return (
    <UserProvider>
      <div className='container' >
        <BrowserRouter>
          <Routes>
            <Route index element={<Login/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/logout' element={<Login logout={true}/>}></Route>
            <Route path='/signup' element={<Login isSignup={true}/>}></Route>
            <Route element={<Navbar goToNoods={handleGoToNoods}/>}>
              <Route path='/user' element={<User/>}></Route>
              <Route path='/noods' element={<Noods resetNoods={resetNoods} setResetNoods={setResetNoods}/>}></Route>
              <Route path='/pantry' element={<Pantry/>}></Route>
              <Route path='/noods/new' element={<NewNoodForm/>}></Route>
              <Route path='/about' element={<About/>}></Route>
              <Route path='/comments/review' element={<ReviewComments/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
    </UserProvider>
   
  );
}

export default App;
