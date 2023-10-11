import React, { FC } from 'react';

import { Container, Typography } from '@mui/material';
import { BasicTabs } from '../../components/TabPanel/BasicTabs';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAllPosts } from '../../redux/Slices/posts';

export const Home: FC = () => {
    const dispatch = useAppDispatch();
    const wasRender = React.useRef(false);
    useEffect(() => {
        const getData = async () => {
            const { payload } = await dispatch(fetchAllPosts());
            console.log(payload);
        };
        getData();
        wasRender.current = true;
    }, []);
    return (
        <>
            <Container>
                <Typography color='secondary' variant='h2'>
                    Главная
                </Typography>
            </Container>
            <BasicTabs />
        </>
    );
};
