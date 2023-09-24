import React, { useEffect, useState } from 'react';

import { Avatar, Box, Container, Typography } from '@mui/material';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { selectPath, setPath } from '../../redux/Slices/navigation';
import { selectTheme, setTheme } from '../../redux/Slices/theme';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import s from './Profile.module.scss';

import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';

import Button from '../../components/Button/Button';
import ErrorLoading from '../../components/ErrorLoading';
import PostBlock from '../../components/PostBlock';
import PostBlockSkeleton from '../../components/PostBlock/PostBlockSkeleton';
import { userProps } from './types';
import { postData } from '@/components/TabPanel/types';

function Profile(): JSX.Element {
    const [isAuth, setIsAuth] = useState<boolean>(true);
    const [status, setStatus] = useState<'loaded' | 'error' | 'loading'>('loaded');
    const theme = useAppSelector(selectTheme);
    const path = useAppSelector(selectPath);
    const dispatch = useAppDispatch();
    const changeTheme = () => {
        dispatch(setTheme());
    };
    useEffect(() => {
        dispatch(setPath(2));
        console.log('path', path);
    }, [path, dispatch]);
    const { userName, userImg, userNickName }: userProps = {
        userName: 'Иванов Иван Иванович',
        userImg: 'https://cdn-edge.kwork.ru/files/avatar/large/52/15318475-1.jpg',
        userNickName: 'Worker',
    };
    const reloadProfilePosts: () => void = () => {
        console.log('reloaded');
    };
    const customData: postData[] = [
        {
            _id: 0,
            title: 'Искусство в цифровой эпохе: Эволюция и влияние на общество',
            text: `В современном мире цифровых технологий и интернета искусство не перестает удивлять и вдохновлять нас. Эпоха цифровой революции дала художникам новые инструменты и платформы для творчества, изменив их подход к созданию и восприятию произведений искусства. В этой статье мы рассмотрим эволюцию искусства в цифровой эпохе и его влияние на современное общество.
            С появлением компьютеров и графического программного обеспечения художники стали иметь доступ к неограниченным возможностям для воплощения своих идей. Они могут создавать цифровые картины, анимации, трехмерные модели и даже интерактивные инсталляции. Это позволило искусству стать более доступным и разнообразным, привлекая новую аудиторию и открывая двери для экспериментов.
            Социальные медиа и онлайн-галереи позволили художникам демонстрировать свои работы миллионам людей по всему миру. Это усилило глобальное сообщество художников и способствовало обмену идеями и влияниям. Искусство стало средством для обсуждения актуальных общественных вопросов, политики и культуры, что помогло формировать новую культурную динамику.
            `,
            tags: ['Искусство', 'Цифровые технологии'],
            imageUrl:
                'https://leader-id.storage.yandexcloud.net/event_photo/246929/619235fb4d190289632566.jpg',
            userImg: 'https://cdn-edge.kwork.ru/files/avatar/large/52/15318475-1.jpg',
            userId: 'asvdhsa56',
            userName: 'Иванов Иван Иванович',
        },
        {
            _id: 1,
            title: 'Искусство в цифровой эпохе: Эволюция и влияние на общество',
            text: `В современном мире цифровых технологий и интернета искусство не перестает удивлять и вдохновлять нас. Эпоха цифровой революции дала художникам новые инструменты и платформы для творчества, изменив их подход к созданию и восприятию произведений искусства. В этой статье мы рассмотрим эволюцию искусства в цифровой эпохе и его влияние на современное общество.
            С появлением компьютеров и графического программного обеспечения художники стали иметь доступ к неограниченным возможностям для воплощения своих идей. Они могут создавать цифровые картины, анимации, трехмерные модели и даже интерактивные инсталляции. Это позволило искусству стать более доступным и разнообразным, привлекая новую аудиторию и открывая двери для экспериментов.
            Социальные медиа и онлайн-галереи позволили художникам демонстрировать свои работы миллионам людей по всему миру. Это усилило глобальное сообщество художников и способствовало обмену идеями и влияниям. Искусство стало средством для обсуждения актуальных общественных вопросов, политики и культуры, что помогло формировать новую культурную динамику.
            `,
            tags: ['Искусство', 'Цифровые технологии'],
            imageUrl: 'https://ulpravda.ru/pictures/news/big/114458_big.jpg',
            userId: '6213t723',
            userName: 'Иванов Иван Иванович',
        },
    ];
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
            {isAuth ? (
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
                                alt={userName}
                                src={userImg && userImg}
                            />
                            <Box className={s.profile__nickname}>
                                <Typography color='secondary' variant='h5'>
                                    {userName}
                                </Typography>
                                <Typography color='gray' variant='subtitle2'>
                                    {userNickName}
                                </Typography>
                            </Box>
                        </Box>
                        <Button color='default'>Редактировать профиль</Button>
                    </Box>
                    <Container sx={{ padding: '50px 0 10px 0' }}>
                        {status === 'loaded' ? (
                            customData.map((item) => (
                                <>
                                    <Box sx={{ width: '100%', marginBottom: '20px' }}>
                                        <PostBlock
                                            key={item._id}
                                            item={item}
                                            size={'large'}
                                        />
                                    </Box>
                                </>
                            ))
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
                            <Button func={() => setIsAuth(true)} color={'primary'}>
                                Войти
                            </Button>
                        </Link>
                        <Link to='/register'>
                            <Button func={() => setIsAuth(true)} color={'default'}>
                                Зарегистрироваться
                            </Button>
                        </Link>
                    </div>
                </Container>
            )}
        </>
    );
}

export default Profile;
