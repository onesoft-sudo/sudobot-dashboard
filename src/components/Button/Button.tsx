import { ComponentProps, FC, JSX, ReactNode } from 'react';
import { twMerge } from "tailwind-merge";

type Props<E extends (keyof JSX.IntrinsicElements | FC)> = {
    as?: E;
    children?: ReactNode;
    className?: string;
} & ComponentProps<E>;

const Button = <E extends keyof JSX.IntrinsicElements | FC = 'button'>({ as = 'button' as E, children, className = '', ...props }: Props<E>) => {
    const Component = as as FC<typeof props>;

    return (
        <Component {...props} className={twMerge('px-4 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-blue-700 focus:outline-2 focus:outline-double focus:outline-offset-2', className)}>
            {children}
        </Component>
    );
};

export default Button;