import { Container, Typography } from '@mui/material';
import BasicTabs from '../../components/TabPanel/BasicTabs';
import s from './Home.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPath, setPath } from '../../redux/Slices/navigation';

function Home() {
    const dispatch = useDispatch();
    const path = useSelector(selectPath);
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
            <BasicTabs value={0} index={0} />
        </div>
    );
}

export default Home;
