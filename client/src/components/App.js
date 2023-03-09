import 'bulma/css/bulma.min.css';
import '../App.css';
import Login from './Login';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className='container'>
      <h1>Tasty Noods</h1>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
   
  );
}

export default App;
