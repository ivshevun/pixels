import { useAppDispatch } from "@/lib/redux/hooks";
import { AppDispatch } from "@/lib/redux/store";
import { Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface ButtonGroupProps {
  icons: JSX.Element[];

  activeElements?: string[];
  activeElement?: string;

  setActiveElements?: (elements: string[], dispatch: AppDispatch) => void;
  setActiveElement?: (element: string, dispatch: AppDispatch) => void;

  currentFont?: string;
}

export default function ButtonGroup({
  icons,

  activeElements,
  setActiveElements,

  activeElement,
  setActiveElement,

  currentFont,
}: ButtonGroupProps) {
  const dispatch = useAppDispatch();

  const handleClick = (iconKey: string) => {
    if (setActiveElements) {
      if (
        iconKey === "bold" &&
        (currentFont === "heading 1" || currentFont === "heading 2")
      )
        return;

      if (activeElements?.includes(iconKey))
        return setActiveElements(
          activeElements.filter((element) => element !== iconKey),
          dispatch
        );
      setActiveElements([...activeElements!, iconKey], dispatch);
    }

    if (setActiveElement) {
      setActiveElement(iconKey, dispatch);
    }
  };

  const activeStyles = "border-2 border-purple-900 bg-[rgba(79,60,201,.1)]";
  const disabledStyles =
    "bg-[#f3f3f4] border-zinc-300 cursor-not-allowed text-zinc-400";

  return (
    <Flex className="w-full">
      {icons.map((icon, index) => {
        return (
          <IconButton
            className={classNames(
              "transition-colors border border-gray-200",
              activeElements?.includes(icon.key!) && activeStyles,
              activeElement === icon.key && activeStyles,
              index === 0 && "rounded-l-lg",
              index === icons.length - 1 && "rounded-r-lg",
              icon.key === "bold" &&
                (currentFont === "heading 1" || currentFont === "heading 2") &&
                disabledStyles
            )}
            onClick={() => handleClick(icon.key!)}
            key={index}
            icon={icon}
          />
        );
      })}
    </Flex>
  );
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element;
}

const IconButton = ({ icon, className, ...props }: IconButtonProps) => {
  return (
    <button
      className={classNames("w-1/3 py-4 border flex justify-center", className)}
      {...props}
    >
      {icon}
    </button>
  );
};
