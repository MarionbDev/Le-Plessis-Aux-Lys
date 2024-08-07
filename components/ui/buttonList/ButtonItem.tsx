"use client";

import { ChevronRight, Loader2 } from "lucide-react";
import React, { forwardRef, MouseEvent } from "react";

interface ButtonItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customClickHandler?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  value?: string;
  valueAsDescription?: boolean;
}

const ButtonItem = forwardRef<HTMLButtonElement, ButtonItemProps>(
  (
    {
      customClickHandler,
      className,
      disabled,
      isLoading,
      value,
      valueAsDescription,
      ...props
    },
    ref,
  ) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      console.log("Bouton cliqué !");
      if (customClickHandler && !event?.defaultPrevented) {
        customClickHandler(event);
      }
    };

    return (
      <button
        className={`
          flex justify-between items-center 
          border border-[#000] text-sm py-2 px-4 first:rounded-t-md last:rounded-md 
          [&:not(:first-child)]:-mt-[1px] 
          hover:bg-[#f6f5f5] 
          ${customClickHandler ? "hover:cursor-pointer" : ""} 
          ${className || ""}`}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
        type="button"
        onClick={handleClick}
      >
        <span>
          {props.children}
          {valueAsDescription && value ? (
            <span className="text-[#000]/60 font-normal">{value}</span>
          ) : null}
        </span>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-[#000]/60" />
        ) : (
          <span className="flex gap-2 text-[#000]/60 items-center">
            {!valueAsDescription && value ? <span>{value}</span> : null}
            {customClickHandler ? <ChevronRight size="16" /> : null}
          </span>
        )}
      </button>
    );
  },
);

export default ButtonItem;

