import { ButtonProps } from "@/app/interfaces/ButtonProps";
import classNames from "classnames";

export default function BeigeButton({
  children,
  className,
  ...props
}: ButtonProps) {
  const styles = classNames(
    "bg-yellow-100 hover:bg-yellow-200 rounded-full  px-4 text-sm font-semibold py-2",
    className
  );
  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
