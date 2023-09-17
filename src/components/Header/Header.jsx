import { useState } from 'react';
import Button from '../Button/Button';
import s from './Header.module.scss';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/Slices/theme';

function Header() {
    const [isAuth, setIsAuth] = useState(true);

    const theme = useSelector(selectTheme);

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
                    </div>
                </div>
            </Container>
        </header>
    );
}

export default Header;
