export type ButtonProps = {
    color?: 'default' | 'primary';
    func?: () => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
    disabled?: boolean;
    type?: 'submit';
    // className?: string;
};
