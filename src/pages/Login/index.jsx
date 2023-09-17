import React from 'react';

import TextField from '@mui/material/TextField';
import s from './Login.module.scss';
import Button from '../../components/Button/Button';
import { useForm } from 'react-hook-form';
function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'onChange' });
    const onSubmit = (values) => {
        console.log(values);
    };
    return (
        <div className={s.login}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <h2>Войти</h2>
                <TextField
                    {...register('email', {
                        required: 'Это обязательное поле',
                        minLength: {
                            value: 8,
                            message: 'Минимальная длина должна быть 8',
                        },
                    })}
                    helperText={errors.email?.message}
                    error={Boolean(errors.email?.message)}
                    margin={'dense'}
                    fullWidth
                    label='E-mail'
                    type='email'
                />
                <TextField
                    {...register('password', {
                        required: 'Это обязательное поле',
                        minLength: {
                            value: 8,
                            message: 'Минимальная длина должна быть 8',
                        },
                    })}
                    helperText={errors.password?.message}
                    error={Boolean(errors.password?.message)}
                    label='Пароль'
                    type='password'
                    margin={'dense'}
                    fullWidth
                />
                <Button color='primary' disabled={!isValid} text={'Подтвердить'} type='submit' />
            </form>
        </div>
    );
}

export default Login;
