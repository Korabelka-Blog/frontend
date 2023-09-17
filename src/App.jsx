import './App.css';
import './reset.css';
import Header from './components/Header/Header';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTheme } from './redux/Slices/theme';
import React from 'react';

function App() {
    const themeMode = useSelector(selectTheme);
    let theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: themeMode,
                    primary: {
                        main: '#7f56d9',
                    },
                    secondary: {
                        main: '#E0C2FF',
                        light: '#F5EBFF',
                        contrastText: '#47008F',
                    },
                },
                typography: {
                    tag: {
                        color: '#6941c6',
                    },
                    caption: {
                        color: '#7f56d9',
                    },
                    body1: {
                        fontSize: '12px',
                        color: '#475467',
                    },
                    subtitle2: {
                        color: '#101828',
                    },
                    h1: {
                        color: '#101828',
                        fontWeight: 500,
                    },
                    h2: {
                        color: '#101828',
                        fontWeight: 500,
                    },
                    h4: {
                        color: '#101828',
                        fontWeight: 500,
                    },
                },
            }),
        [themeMode]
    );
    theme = responsiveFontSizes(theme);
    console.log(themeMode);
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Registration />} />
                </Routes>
            </ThemeProvider>
        </>
    );
}

export default App;
