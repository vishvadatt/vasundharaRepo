import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Add from './Components/Add';
import List from './Components/List';
import {BrowserRouter,Routes,Route} from "react-router-dom"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/Add' element={<Add />}/>
          <Route path='/List' element={<List />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
