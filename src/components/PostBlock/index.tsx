import React, { FC } from 'react';

import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { selectTheme } from '../../redux/Slices/theme';
import { useAppSelector } from '../../redux/hooks';

import { nFormatter } from '../../utils/formatNumbers';

import { Avatar, Box, Grid, Modal, Typography } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import s from './PostBlock.module.scss';
import { Button } from '../Button/Button';
import { IProps } from './PostBlock.props';
import { Loading } from '../Loading/Loading';

export const PostBlock: FC<IProps> = ({ item, size, fromProfile = false }) => {
    const theme = useAppSelector(selectTheme);
    const [isLoadingDeleting, setIsLoadingDeleting] = React.useState<boolean>(false);
    const renderTags = (): JSX.Element[] => {
        return item.tags.map((tag, i) => {
            return (
                <Link to={`/${tag}`} key={'tag_' + i}>
                    <Typography color='primary' style={{ display: 'inline' }}>
                        {tag}
                    </Typography>
                </Link>
            );
        });
    };
    const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState<boolean>(false);
    const handleOpen = () => {
        setIsOpenDeleteModal(true);
    };
    const handleClose = () => {
        setIsOpenDeleteModal(false);
    };
    const deletePost = (): void => {
        const delay = () => {
            setIsLoadingDeleting(true);
            const prom = new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1500);
            }).then(() => {
                setIsLoadingDeleting(false);
                handleClose();
            });
        };
        delay();
        console.log('post was deleted');
    };
    const authorId: string = '6213t723';
    const isYour: boolean = item.userId === authorId;
    const vews: string = nFormatter(2);
    const likes: string = nFormatter(600);
    const pathToFullScreenPost: string = `/post/${item._id}`;
    const pathToAuthorProfile: string = `/profile/${item.userId}`;
    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                {isOpenDeleteModal && (
                    <Modal
                        className={s.modalDelete}
                        open={isOpenDeleteModal}
                        onClose={
                            !isLoadingDeleting
                                ? handleClose
                                : () => {
                                      console.log('cant close');
                                  }
                        }
                        aria-labelledby='child-modal-title'
                        aria-describedby='child-modal-description'
                    >
                        <Box
                            className={classNames({
                                [s.modalDelete__content]: true,
                                [s.dark]: theme === 'dark',
                            })}
                        >
                            {isLoadingDeleting ? (
                                <Loading />
                            ) : (
                                <>
                                    <Typography
                                        variant='h5'
                                        align='center'
                                        color='secondary'
                                    >
                                        Вы уверены, что хотите удалить пост?
                                    </Typography>
                                    <div className={s.modalDelete__buttons}>
                                        <Button func={handleClose} color='primary'>
                                            Отмена
                                        </Button>
                                        <Button func={deletePost}>Удалить</Button>
                                    </div>
                                </>
                            )}
                        </Box>
                    </Modal>
                )}
                <div
                    className={classNames({
                        [s.post]: true,
                        [s.dark]: theme === 'dark',
                    })}
                >
                    {fromProfile && (
                        <div className={s.post__control}>
                            <Button color='primary'>
                                <DriveFileRenameOutlineIcon />
                                Редактировать
                            </Button>
                            <Button func={handleOpen}>
                                <DeleteIcon />
                                Удалить
                            </Button>
                        </div>
                    )}
                    <Link
                        to={pathToFullScreenPost}
                        className={classNames({
                            [s.your]: isYour && !fromProfile,
                        })}
                    >
                        {isYour && !fromProfile && (
                            <Typography variant='subtitle2' className={s.your__text}>
                                Ваш пост
                            </Typography>
                        )}
                        <img
                            src={item.imageUrl}
                            alt='Post Image'
                            className={classNames({
                                [s.image]: true,
                                [s.large]: size === 'large',
                            })}
                        />
                    </Link>
                    <div className={s.tags}>{renderTags()}</div>
                    <Link to={pathToFullScreenPost}>
                        <Typography
                            color='secondary'
                            variant='subtitle2'
                            mt='8px'
                            className={s.text}
                        >
                            {item.title}
                        </Typography>
                        <Typography
                            color='gray'
                            className={s.text}
                            variant='body1'
                            mt='8px'
                        >
                            {item.text}
                        </Typography>
                    </Link>
                    <div className={s.bottom}>
                        <Link to={pathToAuthorProfile} className={s.buttomInfo}>
                            <div className={s.author}>
                                <Avatar
                                    alt={item.userName}
                                    src={item.userImg && item.userImg}
                                />
                                <div className={s.author__info}>
                                    <Typography
                                        color='secondary'
                                        variant='subtitle2'
                                        noWrap
                                    >
                                        {item.userName}
                                    </Typography>
                                    <Typography color='gray' variant='body1' noWrap>
                                        {'19 Jan 2024'}
                                    </Typography>
                                </div>
                            </div>
                        </Link>
                        <Link to={pathToFullScreenPost} className={s.stats}>
                            <div className={s.views}>
                                <RemoveRedEyeIcon color='secondary' />
                                <Typography variant='body1' color='secondary' noWrap>
                                    {vews}
                                </Typography>
                            </div>
                            <div className={s.likes}>
                                <ThumbUpIcon color='secondary' />
                                <Typography variant='body1' color='secondary' noWrap>
                                    {likes}
                                </Typography>
                            </div>
                        </Link>
                    </div>
                </div>
            </Grid>
        </>
    );
};
