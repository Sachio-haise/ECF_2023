import { InputHTMLAttributes } from 'react'

export default function Checkbox({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-[#85d3ca] shadow-sm focus:ring-0 focus:outline-none  focus:border-0' +
                className
            }
        />
    )
}
