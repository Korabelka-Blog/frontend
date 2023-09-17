import Button from '../../components/Button/Button';
import TextField from '@mui/material/TextField';
import s from './Registration.module.scss';
import { useForm } from 'react-hook-form';
function Registration() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'onChange' });
    const onSubmit = (values) => {
        console.log(values);
    };
    return (
        <div className={s.register}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <h2>Зарегистрироваться</h2>
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
                    margin={'dense'}
                    fullWidth
                    label='ФИО'
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

export default Registration;
