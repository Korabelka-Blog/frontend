import { useState } from 'react';
import Button from '../Button/Button';
import s from './Header.module.scss';
import { Link } from 'react-router-dom';
function Header() {
    const [isAuth, setIsAuth] = useState(false);
    const clicked = () => {
        console.log('was click');
    };
    return (
        <header className={s.header}>
            <div className={s.content}>
                <Link to='/' className={s.logo}>
                    <img src='/logo.png' alt='Logo' />
                    Daily Blog
                </Link>
                <div className={s.panel}>
                    {isAuth ? (
                        <>
                            <Link to='/'>
                                <Button text={'Выйти'} color={'default'} />
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
        </header>
    );
}

export default Header;
