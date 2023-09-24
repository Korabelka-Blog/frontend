import React from 'react';

import s from './Button.module.scss';
import classNames from 'classnames';
import { selectTheme } from '../../redux/Slices/theme';
import { ButtonProps } from './ButtonProps';
import { useAppSelector } from '../../redux/hooks';

function Button({
    color = 'default',
    func,
    children,
    ...props
}: ButtonProps): JSX.Element {
    const theme = useAppSelector(selectTheme);
    const btnType = classNames({
        [s.button]: true,
        [s.dark]: theme === 'dark',
        [s.default]: color === 'default',
        [s.primary]: color === 'primary',
    });
    return (
        <button className={btnType} onClick={func} {...props}>
            {children}
        </button>
    );
}

export default Button;
