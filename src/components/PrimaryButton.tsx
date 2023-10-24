import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({ className = '', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-3 py-2 bg-darkGreen  border border-transparent rounded-md text-[12px] text-white  uppercase tracking-widest hover:bg-gray-500 hover:text-gray-200 font-bold  focus:bg-gray-400  active:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
