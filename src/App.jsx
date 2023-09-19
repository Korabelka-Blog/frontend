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
import Profile from './pages/Profile';
function App() {
    const themeMode = useSelector(selectTheme);
    let theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: themeMode,

                    ...(themeMode === 'light'
                        ? {
                              primary: {
                                  main: '#7f56d9',
                              },
                              secondary: {
                                  main: '#101828',
                              },
                              text: {
                                  primary: '#101828',
                                  secondary: '#6941c6',
                              },
                          }
                        : {
                              primary: {
                                  main: '#7f56d9',
                              },
                              secondary: {
                                  main: 'rgba(255, 255, 255, 0.7)',
                              },
                              text: {
                                  primary: '#6941c6',
                                  secondary: 'rgba(255, 255, 255, 0.7)',
                              },
                          }),
                },
                typography: {
                    tag: {},
                    caption: {},
                    subtitle2: {},
                    body1: {
                        fontSize: '12px',
                    },
                    h1: {
                        fontWeight: 500,
                    },
                    h2: {
                        fontWeight: 500,
                    },
                    h4: {
                        fontWeight: 500,
                    },
                },
            }),
        [themeMode]
    );
    theme = createTheme(theme, {
        palette: {
            ...(themeMode === 'light'
                ? {
                      primary: {
                          main: '#7f56d9',
                      },
                      secondary: {
                          main: '#101828',
                      },
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
                      primary: {
                          main: '#7f56d9',
                      },
                      secondary: {
                          main: 'rgba(255, 255, 255, 0.7)',
                      },
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
                <CssBaseline />
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Registration />} />
                    <Route path='/profile' element={<Profile />} />
                </Routes>
            </ThemeProvider>
        </>
    );
}

export default App;
