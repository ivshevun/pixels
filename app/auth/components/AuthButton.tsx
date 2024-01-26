import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function AuthButton({ children, className, ...rest }: Props) {
  const styles = classNames(
    "bg-gray-900 text-white w-full my-5 py-4 text-xl rounded-full mx-auto hover:bg-gray-400 transition duration-500 disabled:bg-gray-700 cursor-pointer",
    className
  );

  return (
    <button type="submit" className={styles} {...rest}>
      {children}
    </button>
  );
}
