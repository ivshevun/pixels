import { toggleUserMenu } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useDisclosure } from "@/lib/redux/features/disclosure/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Flex, Separator, Text } from "@radix-ui/themes";
import { signOut } from "next-auth/react";
import { Fragment, useRef } from "react";
import AnimatedMenu from "../AnimatedMenu";
import Overlay from "../Overlay";
import { ILink, IUser, PopupLink, UserInfo, UserTrigger } from "./AuthPopover";

export default function MobilePopover({
  user,
  links,
}: {
  user: IUser;
  links: ILink[];
}) {
  const { isUserMenuOpen: isOpen } = useDisclosure();
  const dispatch = useAppDispatch();

  const avatarRef = useRef(null);

  const handleToggleMenu = () => {
    dispatch(toggleUserMenu());
  };

  return (
    <Flex direction="column" className="lg:hidden">
      <UserTrigger
        setOpen={handleToggleMenu}
        user={user}
        innerRef={avatarRef}
      />
      <Overlay isOverlayed={isOpen} setOverlayed={handleToggleMenu} />
      <AnimatedMenu isOpen={isOpen}>
        <UserInfo user={user} />
        <Flex direction="column" gap="2" className="pl-8">
          {links.map((link) => (
            <PopupLink key={link.href} label={link.label} href={link.href} />
          ))}
        </Flex>
        <Fragment>
          <Separator size="4" />
          <Text className="pl-8" onClick={() => signOut()}>
            Log out
          </Text>
        </Fragment>
      </AnimatedMenu>
    </Flex>
  );
}
