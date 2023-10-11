import React, { FC, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Box, Container, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchPost, selectPost, selectStatusPost } from '../../redux/Slices/post';
import SendIcon from '@mui/icons-material/Send';

import Loading from '../../components/Loading/Loading';
import ErrorLoading from '../../components/ErrorLoading';
import { selectTheme } from '../../redux/Slices/theme';

import ReactMarkDown from 'react-markdown';

import classNames from 'classnames';
import s from './PostFullScreen.module.scss';
import { Button } from '../../components/Button/Button';
import { selectIsAuthed } from '../../redux/Slices/user';

const PostFullScreen: FC = () => {
    const [yourComment, setYourComment] = React.useState<string>('');
    const [yourCommentError, setYourCommentError] = React.useState<string>('');
    const dispatch = useAppDispatch();

    const theme = useAppSelector(selectTheme);
    const post = useAppSelector(selectPost);
    const loadingStatus = useAppSelector(selectStatusPost);
    const id = useParams().id;
    const wasRender = React.useRef(false);
    useEffect(() => {
        if (id !== undefined && !wasRender.current) {
            dispatch(fetchPost(id));
        }
        wasRender.current = true;
    }, []);

    const reloadPost = () => {
        console.log('Trying to reload');
    };

    const isAuthed: boolean = useAppSelector(selectIsAuthed);

    const handleComment = (text: string) => {
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

    const handleSubmit = () => {
        if (isAuthed) {
            console.log(yourComment);
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
                    <div className={s.markdown}>
                        <Typography color='secondary' variant='subtitle1'>
                            <ReactMarkDown children={post.text} />
                        </Typography>
                    </div>
                    <Box className={s.comments}>
                        <Typography color='secondary' variant='h6'>
                            Комментарии
                        </Typography>
                        <div className={s.your_comment}>
                            {isAuthed ? (
                                <>
                                    <TextField
                                        className={s.comments__your}
                                        id='outlined-multiline-flexible'
                                        label='Multiline'
                                        multiline
                                        fullWidth
                                        onChange={(e) => handleComment(e.target.value)}
                                        value={yourComment}
                                        error={Boolean(yourCommentError)}
                                        helperText={yourCommentError}
                                    />
                                    <Button color='primary' func={handleSubmit}>
                                        <SendIcon />
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <TextField
                                        className={classNames(s.comments__your, {
                                            [s.comments__your_disabled]: true,
                                        })}
                                        id='input-with-icon-textfield'
                                        label='Войдите, чтоб комментрировать'
                                        multiline
                                        fullWidth
                                        disabled
                                    />
                                    <Button color='primary' disabled>
                                        <SendIcon />
                                    </Button>
                                </>
                            )}
                        </div>
                    </Box>
                </Container>
            </div>
        );
    }
};

export default PostFullScreen;
