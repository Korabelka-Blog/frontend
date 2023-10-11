import React from 'react';
import s from './AddArticle.module.scss';
import { Button } from '../../components/Button/Button';
import SimpleMde from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Container, Typography, TextField } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectIsAuthed } from '../../redux/Slices/user';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { INewPost, IPost } from '../../redux/Slices/types';
import { createArticleFetch } from '../../redux/Slices/profile';
// import {Container} from '';
const AddArticle = () => {
    const [value, setValue] = React.useState<string>('');
    const [linkPreview, setLinkPreview] = React.useState<string>('');
    const [titleValue, setTitleValue] = React.useState<string>('');
    const navigate = useNavigate();
    const disptach = useAppDispatch();
    const isAuthed = useAppSelector(selectIsAuthed);
    const onChange = React.useCallback((value: string) => {
        setValue(value);
    }, []);
    const createArticle = async () => {
        console.log(value);
        const post: INewPost = {
            title: titleValue,
            text: value,
        };
        if (linkPreview) {
            post.imageUrl = linkPreview;
        }
        const response = await disptach(createArticleFetch(post));
        if (!response.payload) {
            alert('Не удалось создать статью');
        } else {
            navigate(`/post/${response.payload._id}`);
        }
    };

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
        }),
        []
    );

    if (!isAuthed) {
        return <Navigate to='/' />;
    }
    return (
        <Container>
            <div className={s.header}>
                <Typography color='secondary' variant='h4'>
                    Ссылка на превью
                </Typography>
            </div>
            <div className={s.header}>
                <TextField
                    onChange={(e) => setLinkPreview(e.target.value)}
                    className={s.imageLink}
                    placeholder='👉👈 У нас нет денег на диск, поэтому просто вставьте ссылку на фото'
                />
            </div>
            <Typography color='secondary' variant='h3'>
                Название статьи
            </Typography>
            <TextField
                onChange={(e) => setTitleValue(e.target.value)}
                className={s.imageLink}
                placeholder='Введите название статьи'
                style={{ marginBottom: '0' }}
            />
            <div className={s.body}>
                <SimpleMde
                    className={s.articleText}
                    value={value}
                    onChange={onChange}
                    options={options}
                />
                <div className={s.button_add}>
                    <Button
                        color='primary'
                        style={{ marginTop: '20px' }}
                        func={createArticle}
                    >
                        Создать статью
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default AddArticle;
