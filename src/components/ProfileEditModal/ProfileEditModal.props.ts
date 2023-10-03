import { userProps } from '@/pages/Profile/types';

export interface IProps {
    userData: userProps;
    setUserData: (userData: userProps) => void;
    isOpenEditModal: boolean;
    setIsOpenEditModal: (isOpenEditModal: boolean) => void;
}
