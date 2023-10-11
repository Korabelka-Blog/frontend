import React, { FC } from 'react';

import { Container, Pagination, Typography } from '@mui/material';
import { BasicTabs } from '../../components/TabPanel/BasicTabs';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAllPosts } from '../../redux/Slices/posts';

export const Home: FC = () => {
    const dispatch = useAppDispatch();
    const wasRender = React.useRef(false);
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(6);
    const [length, setLength] = React.useState(0);
    useEffect(() => {
        const getData = async () => {
            const { payload }: any = await dispatch(fetchAllPosts({ page, limit }));
            console.log(payload);
            if (payload) {
                setLength(payload.length);
            }
        };
        getData();
        wasRender.current = true;
    }, [page]);
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    return (
        <>
            <Container>
                <Typography color='secondary' variant='h2'>
                    Главная
                </Typography>
            </Container>
            <BasicTabs />
            <Pagination
                count={Math.ceil(length / limit)}
                variant='outlined'
                color='primary'
                sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                onChange={handleChangePage}
            />
        </>
    );
};
