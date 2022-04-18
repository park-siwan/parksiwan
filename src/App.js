import Pages from './pages';
import './app.css';
import './styles/style.css';
import { BrowserRouter } from 'react-router-dom';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import koLocale from 'date-fns/locale/ko';
import { RecoilRoot } from 'recoil';
function App() {
  return (
    <RecoilRoot>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
        <BrowserRouter>
          <div className='App'>
            <Pages />
          </div>
        </BrowserRouter>
      </LocalizationProvider>
    </RecoilRoot>
  );
}

export default App;
