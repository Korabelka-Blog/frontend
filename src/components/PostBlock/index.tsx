import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import s from './PostBlock.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { selectTheme } from '../../redux/Slices/theme';
import { useAppSelector } from '../../redux/hooks';
import { PostBlockProps } from './types';

function PostBlock({ item, size }: PostBlockProps): JSX.Element {
    const theme = useAppSelector(selectTheme);
    const renderTags = () => {
        return item.tags.map((tag) => {
            return (
                <>
                    <Link to={`/${tag}`}>
                        <Typography color='primary' style={{ display: 'inline' }}>
                            {tag}
                        </Typography>
                    </Link>
                </>
            );
        });
    };
    const pathToFullScreenPost = `/post/${item._id}`;
    const pathToAuthorProfile = `/profile/${item.userId}`;
    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <div
                    className={classNames({ [s.post]: true, [s.dark]: theme === 'dark' })}
                >
                    <Link to={pathToFullScreenPost}>
                        <img
                            src={item.imageUrl}
                            alt=''
                            className={classNames({
                                [s.image]: true,
                                [s.large]: size === 'large',
                            })}
                        />
                    </Link>
                    <div className={s.tags}>{renderTags()}</div>
                    <Link to={pathToFullScreenPost}>
                        <Typography color='secondary' variant='subtitle2' mt='8px' noWrap>
                            {item.title}
                        </Typography>
                        <Typography color='gray' variant='body1' mt='8px' noWrap>
                            {item.text}
                        </Typography>
                    </Link>
                    <Link to={pathToAuthorProfile}>
                        <div className={s.author}>
                            <Avatar
                                alt={item.userName}
                                src={item.userImg && item.userImg}
                            />
                            <div className={s.author__info}>
                                <Typography color='secondary' variant='subtitle2' noWrap>
                                    {item.userName}
                                </Typography>
                                <Typography color='gray' variant='body1' noWrap>
                                    {'19 Jan 2024'}
                                </Typography>
                            </div>
                        </div>
                    </Link>
                </div>
            </Grid>
        </>
    );
}
export default PostBlock;
