import React, { FC } from 'react';

import { Container, Typography } from '@mui/material';
import { BasicTabs } from '../../components/TabPanel/BasicTabs';
import { useEffect } from 'react';
import { selectPath, setPath } from '../../redux/Slices/navigation';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export const Home: FC = () => {
    const dispatch = useAppDispatch();
    const path = useAppSelector(selectPath);
    useEffect(() => {
        dispatch(setPath(0));
        console.log('path', path);
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
