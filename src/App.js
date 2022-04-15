import Pages from './pages';
import './app.css';
import './styles/style.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Pages />
      </div>
    </BrowserRouter>
  );
}

export default App;
