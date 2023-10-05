import React, { FC, useEffect, useState } from 'react';
import { IProps } from './ProfileEditModal.props';

import { Modal, Box, TextField } from '@mui/material';

import { set, useForm } from 'react-hook-form';
import classNames from 'classnames';
import s from './ProfileEditModal.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { selectTheme } from '../../redux/Slices/theme';
import { Button } from '../Button/Button';
import { EditFormValues } from './ProfileEditModal.type';
import { userProps } from '@/pages/Profile/types';
import Loading from '../Loading/Loading';

const ProfileEditModal: FC<IProps> = ({
    isOpenEditModal,
    setIsOpenEditModal,
    userData,
    setUserData,
}) => {
    const {
        register,
        handleSubmit,
        formState: { touchedFields, errors, isValid },
    } = useForm<EditFormValues>({ mode: 'onChange' });

    const theme = useAppSelector(selectTheme);
    const [resetValid, setResetValid] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const handleCloseEditModal = () => {
        setIsOpenEditModal(false);
    };

    const onSubmit = (values: EditFormValues) => {
        const isEdited: boolean = Boolean(
            values.email !== userData.email ||
                values.password ||
                values.userName !== userData.userName
        );
        if (isEdited) {
            setUserData({
                ...userData,
                email: values.email,
                userName: values.userName,
            });
            setResetValid(false);
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setIsOpenEditModal(false);
            }, 1000);
        }
    };

    if (loading) {
        return (
            <Modal
                className={s.modal}
                open={isOpenEditModal}
                aria-labelledby='child-modal-title'
                aria-describedby='child-modal-description'
            >
                <Box
                    className={classNames({
                        [s.modal__content]: true,
                        [s.dark]: theme === 'dark',
                    })}
                >
                    <Loading />
                </Box>
            </Modal>
        );
    }

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
                        defaultValue={userData.userName}
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
                        defaultValue={userData.email}
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
                        label='Изменить пароль на'
                        type='password'
                        autoComplete='new-password'
                        margin={'dense'}
                        fullWidth
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: '20px',
                        }}
                    >
                        <Button color='primary' disabled={!isValid} type='submit'>
                            Подтвердить
                        </Button>
                        <Button disabled={!resetValid} type='reset'>
                            Сбросить
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default ProfileEditModal;
