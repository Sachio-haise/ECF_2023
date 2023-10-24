import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean
    isFocused?: boolean
}


export default forwardRef(function Input(
    { disabled = false, className = '', isFocused = false, ...props }: Props,
    ref
) {
    const localRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }))

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus()
        }
    }, [])

    return (
        <input
            {...props}
            disabled={disabled}
            className={
                'border-darkGreen  border-2 outline-none -500 ring-0 text-gray-700 font-bold focus:ring-0 focus:border-gray-500 rounded-md ' +
                className
            }
            ref={localRef}
        />
    )
})
