import { useState } from 'react';
import Button from '../Button/Button';
import s from './Header.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, setTheme } from '../../redux/Slices/theme';

import { Container } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/LightMode';

function Header() {
    const [isAuth, setIsAuth] = useState(true);
    const dispatch = useDispatch();

    const theme = useSelector(selectTheme);

    const changeTheme = () => {
        dispatch(setTheme());
    };

    return (
        <header className={s.header}>
            <Container>
                <div className={s.content}>
                    <Link
                        to='/'
                        className={classNames(s.logo, {
                            [s.dark]: theme === 'dark',
                        })}
                    >
                        <img src='/logo.png' alt='Logo' />
                        Daily Blog
                    </Link>
                    <div className={s.panel}>
                        {isAuth ? (
                            <>
                                <Link to='/'>
                                    <Button func={() => setIsAuth(false)} text={'Выйти'} color={'default'} />
                                </Link>
                                <Link to='/profile'>
                                    <Button text={'Профиль'} color={'primary'} />
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to='/register'>
                                    <Button
                                        func={() => setIsAuth(true)}
                                        text={'Зарегистрироваться'}
                                        color={'default'}
                                    />
                                </Link>
                                <Link to='/login'>
                                    <Button func={() => setIsAuth(true)} text={'Войти'} color={'primary'} />
                                </Link>
                            </>
                        )}
                        {theme === 'dark' ? (
                            <LightModeIcon
                                color='secondary'
                                style={{ cursor: 'pointer' }}
                                onClick={() => changeTheme()}
                            />
                        ) : (
                            <Brightness4Icon
                                style={{ cursor: 'pointer' }}
                                onClick={() => changeTheme()}
                                color='secondary'
                            />
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
}

export default Header;
