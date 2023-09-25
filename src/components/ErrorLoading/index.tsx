import React, { FC } from 'react';

import { Typography } from '@mui/material';
import s from './ErrorLoading.module.scss';
import { Button } from '../Button/Button';
import { IProps } from './ErrorLoading.props';

export const ErrorLoading: FC<IProps> = ({ text, func }) => {
    return (
        <>
            <div className={s.container}>
                <img src='/magical-bird.png' alt='Magic Bird' className={s.image} />
                <Typography
                    sx={{ marginTop: '10px' }}
                    color='secondary'
                    align='center'
                    variant='h5'
                >
                    Кажется произошла ошибка загрузки{text && ` ${text}`}...
                </Typography>
                <Button
                    style={{ alignSelf: 'flex-start', margin: '10px auto 0 auto' }}
                    color='primary'
                    func={() => func()}
                >
                    Повторить
                </Button>
            </div>
        </>
    );
};
