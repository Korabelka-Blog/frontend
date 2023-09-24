import React from 'react';

import TextField from '@mui/material/TextField';
import { Autocomplete, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { selectTheme } from '../../redux/Slices/theme';
import { useAppSelector } from '../../redux/hooks';

import Button from '../../components/Button/Button';
import s from './Login.module.scss';
import { LoginFormValues } from './types';
function Login(): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginFormValues>({ mode: 'onChange' });
    const onSubmit = (values: LoginFormValues) => {
        console.log(values);
    };
    const theme = useAppSelector(selectTheme);
    return (
        <div className={s.login}>
            <form
                className={classNames(s.form, {
                    [s.dark]: theme === 'dark',
                })}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography mb='5px' color='secondary' variant='h4'>
                    Войти
                </Typography>
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
                    autoComplete='email'
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
                    autoComplete='current-password'
                />
                <Button color='primary' disabled={!isValid} type='submit'>
                    Подтвердить
                </Button>
            </form>
        </div>
    );
}

export default Login;
