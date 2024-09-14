import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home } from './Pages/Home';
import { AddEmployee } from './Pages/AddEmployee';
import { EditDetails } from './Pages/EditDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/addemployee' element={<AddEmployee/>} />
        <Route path='/editdetails/:id' element={<EditDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
