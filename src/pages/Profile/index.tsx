import React, { FC, useEffect, useState } from 'react';

import { Avatar, Box, Container, Typography } from '@mui/material';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

import { selectPath, setPath } from '../../redux/Slices/navigation';
import { selectTheme, setTheme } from '../../redux/Slices/theme';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import AddIcon from '@mui/icons-material/Add';

import { Button } from '../../components/Button/Button';
import ErrorLoading from '../../components/ErrorLoading';
import { PostBlock } from '../../components/PostBlock';
import { PostBlockSkeleton } from '../../components/PostBlock/PostBlockSkeleton';
import ProfileEditModal from '../../components/ProfileEditModal/ProfileEditModal';

import { IPost } from '../../redux/Slices/types';

import { userProps } from './types';
import { selectUserId } from '../../redux/Slices/user';
import { selectProfilePosts, setProfile, setUserProfile } from '../../redux/Slices/profile';

import s from './Profile.module.scss';

export const Profile: FC = () => {
    const [status, setStatus] = useState<'loaded' | 'error' | 'loading'>('loaded');
    const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);

    const id = useParams().id;

    const userId = useAppSelector(selectUserId);

    const isAuthed = userId !== null;

    const profilePosts = useAppSelector(selectProfilePosts);

    const isYour: boolean = Number(id) === 123;

    const theme = useAppSelector(selectTheme);
    const path = useAppSelector(selectPath);
    const dispatch = useAppDispatch();
    const handleOpenEditModal = () => {
        setIsOpenEditModal(true);
    };
    const changeTheme = () => {
        dispatch(setTheme());
    };
    useEffect(() => {
        dispatch(setPath(2));
        dispatch(setProfile(Number(id)));
        dispatch(setUserProfile(Number(id)));
        console.log('path', path);
    }, [path, dispatch]);
    const [userData, setUserData] = useState<userProps>({
        email: 'Yd9p0@example.com',
        userName: 'Иванов Иван Иванович',
        userImg: 'https://cdn-edge.kwork.ru/files/avatar/large/52/15318475-1.jpg',
        userNickName: 'Worker',
    });
    const reloadProfilePosts: () => void = () => {
        console.log('reloaded');
    };
    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography color='secondary' variant='h2'>
                    Профиль
                </Typography>
                {theme === 'dark' ? (
                    <LightModeIcon
                        color='secondary'
                        style={{ cursor: 'pointer' }}
                        onClick={() => changeTheme()}
                    />
                ) : (
                    <Brightness4Icon
                        style={{ cursor: 'pointer' }}
                        onClick={() => changeTheme()}
                        color='secondary'
                    />
                )}
            </Container>
            {isAuthed ? (
                <Container>
                    <Box
                        className={classNames({
                            [s.profile]: true,
                            [s.dark]: theme === 'dark',
                        })}
                    >
                        <Box className={s.profile__text}>
                            <Avatar
                                className={s.avatar}
                                alt={userData.userName}
                                src={userData.userImg && userData.userImg}
                            />
                            <Box className={s.profile__nickname}>
                                <Typography color='secondary' variant='h5'>
                                    {userData.userName}
                                </Typography>
                                <Typography color='gray' variant='subtitle2'>
                                    {userData.userNickName}
                                </Typography>
                            </Box>
                        </Box>
                        {isYour && (
                            <Button
                                profile={true}
                                color='default'
                                func={handleOpenEditModal}
                            >
                                Редактировать профиль
                            </Button>
                        )}
                    </Box>
                    <ProfileEditModal
                        setUserData={setUserData}
                        userData={userData}
                        isOpenEditModal={isOpenEditModal}
                        setIsOpenEditModal={setIsOpenEditModal}
                    />
                    {isYour && (
                        <Box
                            className={classNames({
                                [s.create__button]: true,
                                [s.dark]: theme === 'dark',
                            })}
                        >
                            <Button
                                style={{ width: '100%', justifyContent: 'center' }}
                                color='primary'
                            >
                                Создать пост
                                <AddIcon />
                            </Button>
                        </Box>
                    )}

                    <Container sx={{ padding: '50px 0 10px 0' }}>
                        {status === 'loaded' ? (
                            profilePosts ? (
                                profilePosts.map((item) => (
                                    <>
                                        <Box sx={{ width: '100%', marginBottom: '20px' }}>
                                            <PostBlock
                                                fromProfile={true}
                                                item={item}
                                                size={'large'}
                                            />
                                        </Box>
                                    </>
                                ))
                            ) : (
                                <Box>У пользователя нет постов...</Box>
                            )
                        ) : status === 'loading' ? (
                            <PostBlockSkeleton />
                        ) : (
                            <ErrorLoading
                                text={'постов'}
                                func={() => reloadProfilePosts()}
                            />
                        )}
                    </Container>
                </Container>
            ) : (
                <Container sx={{ marginTop: '20px' }}>
                    <Typography color='secondary' variant='subtitle1'>
                        Вы неавторизированы
                    </Typography>
                    <div className={s.notAuthorized}>
                        <Link to='/login'>
                            <Button func={() => console.log(true)} color={'primary'}>
                                Войти
                            </Button>
                        </Link>
                        <Link to='/register'>
                            <Button func={() => console.log(true)} color={'default'}>
                                Зарегистрироваться
                            </Button>
                        </Link>
                    </div>
                </Container>
            )}
        </>
    );
};
