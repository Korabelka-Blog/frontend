import React, { FC, useState } from 'react';

import s from './Header.module.scss';

import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { selectTheme } from '../../redux/Slices/theme';

import { Container } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import Button from '../Button/Button';
import { useAppSelector } from '../../redux/hooks';

export const Header: FC = () => {
    const [isAuth, setIsAuth] = useState<Boolean>(true);

    const theme = useAppSelector(selectTheme);

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
                                    <Button
                                        func={() => setIsAuth(false)}
                                        color={'default'}
                                    >
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
                                    <Button
                                        func={() => setIsAuth(true)}
                                        color={'default'}
                                    >
                                        Зарегистрироваться
                                    </Button>
                                </Link>
                                <Link to='/login'>
                                    <Button
                                        func={() => setIsAuth(true)}
                                        color={'primary'}
                                    >
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
};
