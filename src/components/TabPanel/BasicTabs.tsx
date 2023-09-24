import React, { useEffect } from 'react';
import { Box, Container, Grid, Tab, Tabs } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import CustomTabPanel from './CustomTabPanel/CustomTabPanel';
import PostBlock from '../PostBlock';
import CustomPostSkeleton from '../PostBlock/CustomPostSkeleton';
import ErrorLoading from '../ErrorLoading';
import { postData } from './types';
import { selectTheme } from '../../redux/Slices/theme';
import { useAppSelector } from '../../redux/hooks';

function BasicTabs(): JSX.Element {
    const [value, setValue] = React.useState<number>(0);
    const [newPostsStatus, setNewPostsStatus] = React.useState<
        'error' | 'loading' | 'loaded'
    >('error');
    const theme = useAppSelector(selectTheme);
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(Number(newValue));
    };

    useEffect(() => {
        const interval = setTimeout(() => {
            setNewPostsStatus('error');
        }, 1500);
        interval;
    }, []);

    const reloadData = () => {
        console.log('reloaded');
    };

    const renderPopularPosts = (): JSX.Element | JSX.Element[] => {
        if (newPostsStatus === 'error') {
            return <ErrorLoading text={'постов'} func={() => reloadData()} />;
        }
        return (newPostsStatus === 'loading' ? [...Array(4)] : customData).map(
            (item: postData) => {
                return newPostsStatus === 'loading' ? (
                    <CustomPostSkeleton key={'skeleton_' + item._id} />
                ) : (
                    <PostBlock key={'uniq_key_' + item._id} item={item} />
                );
            }
        );
    };

    const customData: postData[] = [
        {
            _id: 0,
            title: 'Искусство в цифровой эпохе: Эволюция и влияние на общество',
            text: `В современном мире цифровых технологий и интернета искусство не перестает удивлять и вдохновлять нас. Эпоха цифровой революции дала художникам новые инструменты и платформы для творчества, изменив их подход к созданию и восприятию произведений искусства. В этой статье мы рассмотрим эволюцию искусства в цифровой эпохе и его влияние на современное общество.
            С появлением компьютеров и графического программного обеспечения художники стали иметь доступ к неограниченным возможностям для воплощения своих идей. Они могут создавать цифровые картины, анимации, трехмерные модели и даже интерактивные инсталляции. Это позволило искусству стать более доступным и разнообразным, привлекая новую аудиторию и открывая двери для экспериментов.
            Социальные медиа и онлайн-галереи позволили художникам демонстрировать свои работы миллионам людей по всему миру. Это усилило глобальное сообщество художников и способствовало обмену идеями и влияниям. Искусство стало средством для обсуждения актуальных общественных вопросов, политики и культуры, что помогло формировать новую культурную динамику.
            `,
            tags: ['Искусство', 'Цифровые технологии'],
            imageUrl:
                'https://leader-id.storage.yandexcloud.net/event_photo/246929/619235fb4d190289632566.jpg',
            userImg: 'https://cdn-edge.kwork.ru/files/avatar/large/52/15318475-1.jpg',
            userId: 'asvdhsa56',
            userName: 'Иванов Иван Иванович',
        },
        {
            _id: 1,
            title: 'Искусство в цифровой эпохе: Эволюция и влияние на общество',
            text: `В современном мире цифровых технологий и интернета искусство не перестает удивлять и вдохновлять нас. Эпоха цифровой революции дала художникам новые инструменты и платформы для творчества, изменив их подход к созданию и восприятию произведений искусства. В этой статье мы рассмотрим эволюцию искусства в цифровой эпохе и его влияние на современное общество.
            С появлением компьютеров и графического программного обеспечения художники стали иметь доступ к неограниченным возможностям для воплощения своих идей. Они могут создавать цифровые картины, анимации, трехмерные модели и даже интерактивные инсталляции. Это позволило искусству стать более доступным и разнообразным, привлекая новую аудиторию и открывая двери для экспериментов.
            Социальные медиа и онлайн-галереи позволили художникам демонстрировать свои работы миллионам людей по всему миру. Это усилило глобальное сообщество художников и способствовало обмену идеями и влияниям. Искусство стало средством для обсуждения актуальных общественных вопросов, политики и культуры, что помогло формировать новую культурную динамику.
            `,
            tags: ['Искусство', 'Цифровые технологии'],
            imageUrl: 'https://ulpravda.ru/pictures/news/big/114458_big.jpg',
            userId: '6213t723',
            userName: 'Иванов Иван Иванович',
        },
    ];

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
            <SwipeableViews
                axis={'x'}
                index={value}
                onChangeIndex={handleChange}
            >
                <CustomTabPanel value={value} index={0} dir={'x'}>
                    <Grid container spacing={4}>
                        {renderPopularPosts()}
                    </Grid>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1} dir={'x'}>
                    <Grid container spacing={1}>
                        {customData.map((item: postData) => (
                            <PostBlock key={item._id} item={item} />
                        ))}
                    </Grid>
                </CustomTabPanel>
            </SwipeableViews>
        </Box>
    );
}

export default BasicTabs;