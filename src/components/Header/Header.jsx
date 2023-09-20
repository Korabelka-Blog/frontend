import { useState } from 'react';
import Button from '../Button/Button';
import s from './Header.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, setTheme } from '../../redux/Slices/theme';
import PersonIcon from '@mui/icons-material/Person';
import { Container } from '@mui/material';

function Header() {
    const [isAuth, setIsAuth] = useState(true);

    const theme = useSelector(selectTheme);

    return (
        <header className={classNames({ [s.header]: true, [s.dark]: theme === 'dark' })}>
            <Container>
                <div className={s.content}>
                    <Link
                        to='/'
                        className={classNames(s.logo, {
                            [s.dark__text]: theme === 'dark',
                        })}
                    >
                        <img src='/logo.png' alt='Logo' />
                        Daily Blog
                    </Link>
                    <div className={s.panel}>
                        {isAuth ? (
                            <>
                                <Link to='/'>
                                    <Button func={() => setIsAuth(false)} color={'default'}>
                                        Выйти
                                    </Button>
                                </Link>
                                <Link to='/profile'>
                                    <Button color={'primary'}>
                                        <PersonIcon />
                                        Профиль
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to='/register'>
                                    <Button func={() => setIsAuth(true)} color={'default'}>
                                        Зарегистрироваться
                                    </Button>
                                </Link>
                                <Link to='/login'>
                                    <Button func={() => setIsAuth(true)} color={'primary'}>
                                        Войти
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
}

export default Header;
