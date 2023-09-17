import { Container, Typography } from '@mui/material';
import BasicTabs from '../../components/TabPanel/BasicTabs';
import s from './Home.module.scss';

function Home() {
    return (
        <div>
            <Container>
                <Typography color='secondary' variant='h2'>
                    Главная
                </Typography>
                <BasicTabs value={0} index={0} />
            </Container>
        </div>
    );
}

export default Home;
