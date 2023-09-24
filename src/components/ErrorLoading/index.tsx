import React from 'react';

import { Box, Typography } from '@mui/material';
import s from './ErrorLoading.module.scss';
import Button from '../Button/Button';

function ErrorLoading({ text, func }: { text?: string; func: () => void }): JSX.Element {
    return (
        <>
            <Box className={s.container}>
                <img src='/magical-bird.png' alt='Magic Bird' className={s.image} />
                <Typography sx={{ marginTop: '10px' }} color='secondary' variant='h5'>
                    Кажется произошла ошибка загрузки{text && ` ${text}`}...
                </Typography>
                <Button
                    style={{ alignSelf: 'flex-start', margin: '10px auto 0 auto' }}
                    color='primary'
                    func={() => func()}
                >
                    Повторить
                </Button>
            </Box>
        </>
    );
}

export default ErrorLoading;
