import { ButtonHTMLAttributes } from 'react'

const SecondaryButton = ({ type = 'button', className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        type={type}
        className={`inline-flex items-center px-4 py-2 font-bold bg-[#5d9c95]  border border-gray-300 rounded-md text-xs text-gray-100  uppercase tracking-widest shadow-sm hover:bg-semiBlue  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${className}`}
        {...props}
    />
)

export default SecondaryButton
