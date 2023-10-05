import React, { FC, useEffect } from 'react';
import { Box, Container, Grid, Tab, Tabs } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { CustomTabPanel } from './CustomTabPanel/CustomTabPanel';
import { PostBlock } from '../PostBlock';
import { PostBlockSkeleton } from '../PostBlock/PostBlockSkeleton';
import ErrorLoading  from '../ErrorLoading';
import { IPost } from '../../redux/Slices/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectPosts, selectStatusPosts, setStatus } from '../../redux/Slices/posts';

export const BasicTabs: FC = () => {
    const [value, setValue] = React.useState<number>(0);
    const posts = useAppSelector(selectPosts);
    const postsStatus = useAppSelector(selectStatusPosts);
    const dispatch = useAppDispatch();
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(Number(newValue));
    };

    useEffect(() => {
        const interval = setTimeout(() => {
            dispatch(setStatus('error'));
        }, 1500);
        interval;
    }, []);

    const reloadData = () => {
        console.log('reloaded');
    };

    const renderPopularPosts = (): JSX.Element | JSX.Element[] => {
        if (postsStatus === 'error') {
            return <ErrorLoading text={'постов'} func={() => reloadData()} />;
        }
        return (postsStatus === 'loading' ? [...Array(4)] : posts).map((item: IPost) => {
            return postsStatus === 'loading' ? (
                <PostBlockSkeleton key={'skeleton_' + item._id} />
            ) : (
                <PostBlock key={'uniq_key_' + item._id} item={item} />
            );
        });
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Container>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label='basic tabs example'
                    >
                        <Tab label='Популярные' />
                        <Tab label='Новые' />
                    </Tabs>
                </Box>
            </Container>
            <SwipeableViews axis={'x'} index={value} onChangeIndex={() => handleChange}>
                <CustomTabPanel value={value} index={0} dir={'x'}>
                    <Grid container spacing={4}>
                        {renderPopularPosts()}
                    </Grid>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1} dir={'x'}>
                    <Grid container spacing={1}>
                        {posts.map((item: IPost) => (
                            <PostBlock key={item._id} item={item} />
                        ))}
                    </Grid>
                </CustomTabPanel>
            </SwipeableViews>
        </Box>
    );
};
