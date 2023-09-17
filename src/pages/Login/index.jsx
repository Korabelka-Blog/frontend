
import TextField from '@mui/material/TextField';
import s from './Login.module.scss';
import Button from '../../components/Button/Button';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/Slices/theme';
import classNames from 'classnames';
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
            <form className={classNames(s.form, {
                [s.dark]: theme === 'dark',
            })} onSubmit={handleSubmit(onSubmit)}>
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
                <Button color='primary' disabled={!isValid} text={'Подтвердить'} type='submit' />
            </form>
        </div>
    );
}

export default Login;
