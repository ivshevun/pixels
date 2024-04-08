import { ButtonProps } from "@/app/interfaces/ButtonProps";
import classNames from "classnames";

export default function BeigeButton({
  children,
  className,
  ...props
}: ButtonProps) {
  const styles = classNames(
    "bg-yellow-100 hover:bg-yellow-200 rounded-full disabled:cursor-not-allowed text-sm",
    className
  );
  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
