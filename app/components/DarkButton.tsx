import classNames from "classnames";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const DarkButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, className, ...rest }, ref) => {
    const styles = classNames(
      "bg-gray-900 text-white rounded-full hover:bg-gray-400 transition duration-500 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed",
      className
    );

    return (
      <button type="submit" className={styles} ref={ref} {...rest}>
        {children}
      </button>
    );
  }
);

DarkButton.displayName = "DarkButton";

export default DarkButton;
