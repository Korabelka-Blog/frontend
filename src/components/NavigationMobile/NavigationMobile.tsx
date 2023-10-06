import React, { FC } from 'react';
import s from './NavigationMobile.module.scss';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { selectPath, setPath } from '../../redux/Slices/navigation';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUserId } from '../../redux/Slices/user';

export const NavigationMobile: FC = () => {
    const dispatch = useAppDispatch();
    const path = useAppSelector(selectPath);

    const userId = useAppSelector(selectUserId);

    return (
        <BottomNavigation
            className={s.navigation}
            showLabels
            value={path}
            onChange={(event, newValue) => {
                dispatch(setPath(newValue));
            }}
        >
            <BottomNavigationAction
                to='/'
                component={Link}
                label='Посты'
                icon={<ArticleIcon />}
            />
            <BottomNavigationAction
                to='/search'
                component={Link}
                label='Поиск'
                icon={<SearchIcon />}
            />
            <BottomNavigationAction
                to={`/profile/${userId}`}
                component={Link}
                label='Профиль'
                icon={<PersonIcon />}
            />
        </BottomNavigation>
    );
};
