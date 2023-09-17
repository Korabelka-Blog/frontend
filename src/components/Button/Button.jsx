import React from 'react';

import s from './Button.module.scss';
import classNames from 'classnames';

function Button({ color = 'default', text, func, ...props }) {
    const btnType = classNames({
        [s.button]: true,
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
