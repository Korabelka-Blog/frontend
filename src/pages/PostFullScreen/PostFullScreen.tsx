import React, { FC, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectPost, selectStatusPost, setPost } from '../../redux/Slices/post';

import Loading from '../../components/Loading/Loading';
import ErrorLoading from '../../components/ErrorLoading';
import { selectTheme } from '../../redux/Slices/theme';

import classNames from 'classnames';
import s from './PostFullScreen.module.scss';

const PostFullScreen: FC = () => {
    const dispatch = useAppDispatch();
    const id = useParams().id;

    const theme = useAppSelector(selectTheme);
    const post = useAppSelector(selectPost);
    const loadingStatus = useAppSelector(selectStatusPost);
    useEffect(() => {
        dispatch(setPost(Number(id)));
    }, [id]);

    const reloadPost = () => {
        console.log('Trying to reload');
        dispatch(setPost(Number(id)));
    };

    if (loadingStatus === 'error') {
        return (
            <Container>
                <ErrorLoading
                    additionalText={
                        'Может такого поста не существует или повторите попытку позже'
                    }
                    text={'постов'}
                    func={() => reloadPost()}
                />
            </Container>
        );
    }

    if (loadingStatus === 'loading') {
        return (
            <Container
                sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
            >
                <Loading />
            </Container>
        );
    }
    if (post) {
        return (
            <div className={s.wrapper}>
                <Container
                    className={classNames(s.post, {
                        [s.dark]: theme === 'dark',
                    })}
                >
                    <img className={s.image} src={post.imageUrl} alt='' />
                    <Typography color='secondary' variant='h2'>
                        {post.title}
                    </Typography>
                    <Typography color='secondary' variant='subtitle1'>
                        {post.text}
                    </Typography>
                </Container>
            </div>
        );
    }
};

export default PostFullScreen;
