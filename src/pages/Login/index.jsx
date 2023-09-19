import TextField from '@mui/material/TextField';
import s from './Login.module.scss';
import Button from '../../components/Button/Button';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/Slices/theme';
import classNames from 'classnames';
import { Typography } from '@mui/material';
function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'onChange' });
    const onSubmit = (values) => {
        console.log(values);
    };
    const theme = useSelector(selectTheme);
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
                    autocomplete
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
                    autocomplete
                    margin={'dense'}
                    fullWidth
                />
                <Button color='primary' disabled={!isValid} type='submit'>
                    Подтвердить
                </Button>
            </form>
        </div>
    );
}

export default Login;
