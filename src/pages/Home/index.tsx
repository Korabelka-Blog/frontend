import React, { FC } from 'react';

import { Container, Typography } from '@mui/material';
import { BasicTabs } from '../../components/TabPanel/BasicTabs';
import { useEffect } from 'react';
import { selectPath, setPath } from '../../redux/Slices/navigation';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAllPosts } from '../../redux/Slices/posts';

export const Home: FC = () => {
    const dispatch = useAppDispatch();
    const path = useAppSelector(selectPath);
    const wasRender = React.useRef(false);
    useEffect(() => {
        dispatch(setPath(0));
        console.log('path', path);
        if (!wasRender.current) {
            dispatch(fetchAllPosts());
        }
        wasRender.current = true;
    }, []);
    return (
        <div>
            <Container>
                <Typography color='secondary' variant='h2'>
                    Главная
                </Typography>
            </Container>
            <BasicTabs />
        </div>
    );
};
