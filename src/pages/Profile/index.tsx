import React, { FC, useEffect, useState } from 'react';

import { Avatar, Box, Container, Typography } from '@mui/material';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

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

import { userProps } from './types';
import { selectUser } from '../../redux/Slices/user';
import {
    getPosts,
    selectProfilePosts,
    selectStatusProfile,
    selectUserProfile,
} from '../../redux/Slices/profile';

import s from './Profile.module.scss';
import Loading from '../../components/Loading/Loading';

export const Profile: FC = () => {
    const [status, setStatus] = useState<'loaded' | 'error' | 'loading'>('loaded');
    const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);

    const id = useParams().id;

    const authedUserId = useAppSelector(selectUser);

    const user = useAppSelector(selectUserProfile);

    const profilePosts = useAppSelector(selectProfilePosts);

    const isYour: boolean = id === authedUserId?._id;

    const theme = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();
    const handleOpenEditModal = () => {
        setIsOpenEditModal(true);
    };
    const changeTheme = () => {
        dispatch(setTheme());
    };
    
    useEffect(() => {
        if (id) {
            dispatch(getPosts(id));
        }
    }, [id]);
    const [userData, setUserData] = useState<userProps>({
        email: 'Yd9p0@example.com',
        userName: 'Иванов Иван Иванович',
        userImg: 'https://cdn-edge.kwork.ru/files/avatar/large/52/15318475-1.jpg',
        userNickName: 'Worker',
    });
    const reloadProfilePosts: () => void = () => {
        console.log('reloaded');
    };
    const isLoading = useAppSelector(selectStatusProfile) === 'loading';
    if (isLoading) {
        return (
            <Container
                sx={{
                    width: '120px',
                    margin: '0 auto',
                }}
            >
                <Loading />
            </Container>
        );
    }
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
            {user ? (
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
                                alt={user?.fullName}
                                src={user?.avatarUrl && user.avatarUrl}
                            />
                            <Box className={s.profile__nickname}>
                                <Typography color='secondary' variant='h5'>
                                    {user?.fullName}
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
                            <Link to='/addArticle'>
                                <Button
                                    style={{ width: '100%', justifyContent: 'center' }}
                                    color='primary'
                                >
                                    Создать пост
                                    <AddIcon />
                                </Button>
                            </Link>
                        </Box>
                    )}

                    <Container sx={{ padding: '50px 0 10px 0' }}>
                        {status === 'loaded' ? (
                            profilePosts ? (
                                profilePosts.map((item) => (
                                    <Box
                                        key={item._id}
                                        sx={{
                                            width: '100%',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        <PostBlock
                                            fromProfile={true}
                                            item={item}
                                            size={'large'}
                                        />
                                    </Box>
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
                <Container>
                    <Typography color='secondary' variant='h3'>
                        Пользователь не найден
                    </Typography>
                </Container>
            )}
        </>
    );
};
