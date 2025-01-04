import React, { ComponentPropsWithoutRef } from "react";

type ButtonProps =  ComponentPropsWithoutRef<'button'>;

function Button(props: ButtonProps) {
  const { children, disabled, ...rest } = props;
  return (
    <button
      className={ `w-fit py-2 px-4 rounded-minimal text-white ${ disabled ? 'bg-grey-200' : 'bg-green-700'}` }
      disabled={disabled}
      {...rest}
    >
      { children }
    </button>
  )
}

export default Button;