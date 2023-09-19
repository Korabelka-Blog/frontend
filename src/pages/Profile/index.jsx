import { Avatar, Box, Container, Grid, Typography } from '@mui/material';
import Button from '../../components/Button/Button';
import s from './Profile.module.scss';
import { selectTheme } from '../../redux/Slices/theme';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import PostBlock from '../../components/PostBlock';
function Profile() {
    const theme = useSelector(selectTheme);
    const { userName, userImg, userNickName } = {
        userName: 'Иванов Иван Иванович',
        userImg: 'https://cdn-edge.kwork.ru/files/avatar/large/52/15318475-1.jpg',
        userNickName: 'Worker',
    };
    const customData = [
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
        <Container>
            <Typography color='secondary' variant='h4'>
                Профиль
            </Typography>
            <Box
                className={classNames({
                    [s.profile]: true,
                    [s.dark]: theme === 'dark',
                })}
                sx={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Avatar className={s.avatar} alt={userName} src={userImg && userImg} />
                <Box
                    sx={{
                        width: '100%',
                        marginLeft: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography color='secondary' variant='h5'>
                            {userName}
                        </Typography>
                        <Typography color='gray' variant='subtitle2'>
                            {userNickName}
                        </Typography>
                    </Box>
                    <Button color='default'>Редактировать профиль</Button>
                </Box>
            </Box>
            <Container sx={{ paddingTop: '50px' }}>
                {customData.map((item) => (
                    <>
                        <Box sx={{ width: '100%', marginBottom: '20px' }}>
                            <PostBlock key={item._id} item={item} />
                        </Box>
                    </>
                ))}
            </Container>
        </Container>
    );
}

export default Profile;
