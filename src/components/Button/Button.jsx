import React from 'react';

import s from './Button.module.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/Slices/theme';

function Button({ color = 'default', text, func, ...props }) {
    const theme = useSelector(selectTheme);
    const btnType = classNames({
        [s.button]: true,
        [s.dark]: theme === 'dark',
        [s.default]: color === 'default',
        [s.primary]: color === 'primary',
    });
    return (
        <button className={btnType} onClick={func} {...props}>
            {text}
        </button>
    );
}

export default Button;
