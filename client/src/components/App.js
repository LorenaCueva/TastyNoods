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



function App() {

  return (
    <UserProvider>
      <div className='container' >
        <BrowserRouter>
          <Routes>
            <Route index element={<Login/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/logout' element={<Login loggout={true}/>}></Route>
            <Route path='/signup' element={<Login isSignup={true}/>}></Route>
            <Route element={<Navbar/>}>
              <Route path='/user' element={<User/>}></Route>
              <Route path='/noods' element={<Noods/>}></Route>
              <Route path='/pantry' element={<Pantry/>}></Route>
              <Route path='/noods/new' element={<NewNoodForm/>}></Route>
              <Route path='/comments/review' element={<ReviewComments/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
    </UserProvider>
   
  );
}

export default App;
