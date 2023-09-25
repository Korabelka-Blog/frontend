import React, { FC } from 'react';

import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { selectTheme } from '../../redux/Slices/theme';
import { Typography } from '@mui/material';

import { useAppSelector } from '../../redux/hooks';
import { RegistrationFormValues } from './types';

import s from './Registration.module.scss';

import TextField from '@mui/material/TextField';
import Button from '../../components/Button/Button';

export const Registration: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RegistrationFormValues>({ mode: 'onChange' });
    const theme = useAppSelector(selectTheme);
    const onSubmit = (values: RegistrationFormValues) => {
        console.log(values);
    };
    return (
        <div className={s.register}>
            <form
                className={classNames(s.form, {
                    [s.dark]: theme === 'dark',
                })}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography mb='5px' color='secondary' variant='h4'>
                    Зарегистрироваться
                </Typography>
                <TextField
                    {...register('userName', {
                        required: 'Это обязательное поле',
                        minLength: {
                            value: 8,
                            message: 'Минимальная длина должна быть 8',
                        },
                    })}
                    helperText={errors.userName?.message}
                    error={Boolean(errors.userName?.message)}
                    label='ФИО'
                    fullWidth
                    margin={'dense'}
                    autoComplete='name'
                />
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
                    label='E-mail'
                    type='email'
                    fullWidth
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
                    autoComplete='new-password'
                    margin={'dense'}
                    fullWidth
                />
                <Button color='primary' disabled={!isValid} type='submit'>
                    Подтвердить
                </Button>
            </form>
        </div>
    );
};
