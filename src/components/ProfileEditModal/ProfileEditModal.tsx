import React, { FC, useEffect, useState } from 'react';
import { IProps } from './ProfileEditModal.props';

import { Modal, Box, TextField } from '@mui/material';

import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import s from './ProfileEditModal.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { selectTheme } from '../../redux/Slices/theme';
import { Button } from '../Button/Button';
import { EditFormValues } from './ProfileEditModal.type';

const ProfileEditModal: FC<IProps> = ({ isOpenEditModal, setIsOpenEditModal }) => {
    const [handleIsValid, setHandleIsValid] = useState(false);
    const [userData, setUserData] = useState({
        userName: 'Иванов Иван Иванович',
        email: 'test@test.com',
        password: '12345678',
    });
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<EditFormValues>({ mode: 'onChange' });
    const handleCloseEditModal = () => {};

    const handleOnChange = (value: string) => {
        console.log(isValid);
        if (isValid) {
            setIsOpenEditModal(false);
        }
    };

    const onSubmit = (values: EditFormValues) => {
        console.log(values);
    };

    const theme = useAppSelector(selectTheme);
    return (
        <Modal
            className={s.modal}
            open={isOpenEditModal}
            onClose={() => handleCloseEditModal()}
            aria-labelledby='child-modal-title'
            aria-describedby='child-modal-description'
        >
            <Box
                className={classNames({
                    [s.modal__content]: true,
                    [s.dark]: theme === 'dark',
                })}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register('userName', {
                            // required: 'Это обязательное поле',
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
                        defaultValue={userData.userName}
                        onChange={(e) => handleOnChange(e.target.value)}
                    />
                    <TextField
                        {...register('email', {
                            // required: 'Это обязательное поле',
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
                        defaultValue={userData.email}
                        onChange={(e) => handleOnChange(e.target.value)}
                    />
                    <TextField
                        {...register('password', {
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
                        onChange={(e) => handleOnChange(e.target.value)}
                        fullWidth
                    />
                    <Button color='primary' disabled={!handleIsValid} type='submit'>
                        Подтвердить
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default ProfileEditModal;
