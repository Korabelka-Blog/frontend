import React from 'react';

import {
    CssBaseline,
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
} from '@mui/material';

import {
    lightTheme,
    darkTheme,
    typographyTheme,
    changeLightTheme,
    changeDarkTheme,
} from './themeCustom';
import { selectTheme } from './redux/Slices/theme';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './redux/hooks';

import Header from './components/Header/Header';
import NavigationMobile from './components/NavigationMobile/NavigationMobile';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Registration from './pages/Registration';

import s from './App.module.scss';
import './reset.css';

function App() {
    const themeMode = useAppSelector(selectTheme);

    let theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: themeMode,
                    ...(themeMode === 'light' ? lightTheme : darkTheme),
                },
                typography: typographyTheme,
            }),
        [themeMode]
    );
    theme = createTheme(theme, {
        palette: {
            ...(themeMode === 'light'
                ? {
                      changeLightTheme,
                      text: {
                          primary: '#6941c6',
                          secondary: '#101828',
                          text: {
                              gray: theme.palette.augmentColor({
                                  color: {
                                      main: '#475467',
                                  },
                                  name: 'gray',
                              }),
                          },
                      },
                  }
                : {
                      changeDarkTheme,
                      text: {
                          primary: '#7f56d9',
                          secondary: 'rgba(255, 255, 255, 0.7)',
                          text: {
                              gray: theme.palette.augmentColor({
                                  color: {
                                      main: '#475467',
                                  },
                                  name: 'gray',
                              }),
                          },
                      },
                  }),
        },
    });
    theme = responsiveFontSizes(theme);
    return (
        <>
            <ThemeProvider theme={theme}>
                <div className={s.container}>
                    <CssBaseline />
                    <Header />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Registration />} />
                        <Route path='/profile' element={<Profile />} />
                    </Routes>
                    <NavigationMobile />
                </div>
            </ThemeProvider>
        </>
    );
}

export default App;
