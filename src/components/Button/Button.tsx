import React, { ComponentPropsWithoutRef } from "react";

type ButtonProps =  ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary';
}

function Button(props: ButtonProps) {
  const { children, disabled, variant = 'primary', ...rest } = props;
  const buttonColor = disabled ? 'bg-grey-200' : variant === 'secondary' ? 'bg-red-500' : 'bg-primary-500';

  return (
    <button
      className={ `w-fit py-2 px-4 rounded-minimal text-white ${ buttonColor }` }
      disabled={disabled}
      {...rest}
    >
      { children }
    </button>
  )
}

export default Button;