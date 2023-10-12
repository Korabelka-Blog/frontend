import React, { FC, useEffect, useRef } from 'react';
import { Box, Container, Grid, Tab, Tabs } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { CustomTabPanel } from './CustomTabPanel/CustomTabPanel';
import { PostBlock } from '../PostBlock';
import { PostBlockSkeleton } from '../PostBlock/PostBlockSkeleton';
import ErrorLoading from '../ErrorLoading';
import { IPost } from '../../redux/Slices/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    fetchAllPosts,
    selectPosts,
    selectStatusPosts,
    setStatus,
} from '../../redux/Slices/posts';

export const BasicTabs: FC = () => {
    const [value, setValue] = React.useState<number>(0);
    const posts = useAppSelector(selectPosts);
    const postsStatus = useAppSelector(selectStatusPosts);
    const dispatch = useAppDispatch();
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(Number(newValue));
    };

    const reloadData = () => {
        dispatch(fetchAllPosts({ page: 1 }));
    };

    const renderPopularPosts = (): JSX.Element | JSX.Element[] => {
        // console.log(posts);
        if (postsStatus === 'loaded') {
            return posts.map((item: IPost) => {
                return <PostBlock key={item._id} item={item} />;
            });
        }
        if (postsStatus === 'loading') {
            return [...Array(4)].map((_, i) => {
                return <PostBlockSkeleton key={i} />;
            });
        } else {
            return <ErrorLoading text={'постов'} func={() => reloadData()} />;
        }
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
                        {/* <Tab label='Новые' /> */}
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
                        {/* {renderPopularPosts()} */}
                    </Grid>
                </CustomTabPanel>
            </SwipeableViews>
        </Box>
    );
};
