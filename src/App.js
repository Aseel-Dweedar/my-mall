import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import ItemDetails from './components/ItemDetails/ItemDetails';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container" >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/about/:id' element={<ItemDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
