import React, { FC } from 'react';
import s from './Loading.module.scss';
export const Loading: FC = () => {
    return (
        <div className={s.load3}>
            <div className={s.line}></div>
            <div className={s.line}></div>
            <div className={s.line}></div>
        </div>
    );
};
