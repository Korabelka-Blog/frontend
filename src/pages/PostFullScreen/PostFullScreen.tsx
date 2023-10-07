import React, { FC, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Box, Container, FilledInput, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectPost, selectStatusPost, setPost } from '../../redux/Slices/post';
import SendIcon from '@mui/icons-material/Send';

import Loading from '../../components/Loading/Loading';
import ErrorLoading from '../../components/ErrorLoading';
import { selectTheme } from '../../redux/Slices/theme';

import classNames from 'classnames';
import s from './PostFullScreen.module.scss';
import { Button } from '../../components/Button/Button';

const PostFullScreen: FC = () => {
    const [yourComment, setYourComment] = React.useState<string>('');
    const [yourCommentError, setYourCommentError] = React.useState<string>(false);
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

    const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        const maxLength = 120;
        if (text.length < maxLength) {
            setYourComment(text);
            setYourCommentError('');
        } else {
            setYourCommentError(
                `Максимальное количество символоств составляет 50 ${maxLength}`
            );
        }
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
                    <Typography color='secondary' variant='h3'>
                        {post.title}
                    </Typography>
                    <Typography color='secondary' variant='subtitle1'>
                        {post.text}
                    </Typography>
                    <div className={s.comments}>
                        <Box
                            component='form'
                            noValidate
                            autoComplete='off'
                            className={s.comments}
                        >
                            <TextField
                                className={s.comments__your}
                                id='outlined-multiline-flexible'
                                label='Multiline'
                                multiline
                                fullWidth
                                onChange={(e) => handleComment(e)}
                                value={yourComment}
                                error={Boolean(yourCommentError)}
                                helperText={yourCommentError}
                            />
                            <Button color='primary'>
                                <SendIcon />
                            </Button>
                        </Box>
                    </div>
                </Container>
            </div>
        );
    }
};

export default PostFullScreen;
