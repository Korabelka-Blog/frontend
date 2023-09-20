import React from 'react';
import s from './NavigationMobile.module.scss';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectPath, setPath } from '../../redux/Slices/navigation';
// function Router(props) {
//     const { children } = props;
//     if (typeof window === 'undefined') {
//         return <StaticRouter location='/drafts'>{children}</StaticRouter>;
//     }

//     return (
//         <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
//             {children}
//         </MemoryRouter>
//     );
// }
function NavigationMobile() {
    const dispatch = useDispatch();
    const path = useSelector(selectPath);
    return (
        <BottomNavigation
            className={s.navigation}
            showLabels
            value={path}
            onChange={(event, newValue) => {
                dispatch(setPath(newValue));
            }}
        >
            <BottomNavigationAction to='/' component={Link} label='Посты' icon={<ArticleIcon />} />
            <BottomNavigationAction to='/search' component={Link} label='Поиск' icon={<SearchIcon />} />
            <BottomNavigationAction to='/profile' component={Link} label='Профиль' icon={<PersonIcon />} />
        </BottomNavigation>
    );
}

export default NavigationMobile;
