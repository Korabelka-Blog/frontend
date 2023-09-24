import React from 'react';

import { Container, Typography } from '@mui/material';
import BasicTabs from '../../components/TabPanel/BasicTabs';
import { useEffect } from 'react';
import { selectPath, setPath } from '../../redux/Slices/navigation';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

function Home(): JSX.Element {
    const dispatch = useAppDispatch();
    const path = useAppSelector(selectPath);
    useEffect(() => {
        dispatch(setPath(2));
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
}

export default Home;
