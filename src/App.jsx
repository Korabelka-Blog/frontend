import './App.css';
import './reset.css';

import Header from './components/Header/Header';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Registration />} />
            </Routes>
        </>
    );
}

export default App;
