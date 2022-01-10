import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routing from './Routes';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div style={{ marginTop: 50 }}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
