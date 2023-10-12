import React, { FC, useRef } from 'react';

import { Container, Pagination, Typography } from '@mui/material';
import { BasicTabs } from '../../components/TabPanel/BasicTabs';
import { useEffect,  } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAllPosts } from '../../redux/Slices/posts';
import { useNavigate, useParams } from 'react-router-dom';

export const Home: FC = () => {
    const dispatch = useAppDispatch();
    const wasRender = React.useRef(false);
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(6);
    const [length, setLength] = React.useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        wasRender.current = true;
    }, []);
    useEffect(() => {
        const getData = async () => {
            const { payload }: any = await dispatch(fetchAllPosts({ page, limit }));
            console.log(payload);
            if (payload) {
                setLength(payload.length);
                navigate(`/?limit=${limit}&page=${page}`);
            }
        };
        if (wasRender) {
            getData();
        }
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
            {length && (
                <Pagination
                    count={Math.ceil(length / limit)}
                    variant='outlined'
                    color='primary'
                    sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                    onChange={handleChangePage}
                />
            )}
        </>
    );
};
