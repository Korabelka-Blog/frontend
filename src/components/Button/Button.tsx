import React, { FC } from 'react';

import s from './Button.module.scss';
import classNames from 'classnames';
import { selectTheme } from '../../redux/Slices/theme';
import { useAppSelector } from '../../redux/hooks';
import { IProps } from './Button.props';

export const Button: FC<IProps> = ({
    color = 'default',
    func,
    children,
    disabled,
    ...props
}) => {
    const theme = useAppSelector(selectTheme);
    const btnType = classNames({
        [s.button]: true,
        [s.dark]: theme === 'dark',
        [s.default]: color === 'default',
        [s.primary]: color === 'primary',
    });
    return (
        <button disabled className={btnType} onClick={func} {...props}>
            {children}
        </button>
    );
};
