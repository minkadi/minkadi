import {
  Avatar,
  Badge,
  Box,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AlertTriangle, Layout, LogOut, Settings, Shield } from "lucide-react";
import NextLink from "next/link";
import { signOut, useSession } from "next-auth/react";
import React, { ElementType, useCallback } from "react";
import { useTranslation } from "react-i18next";
// import { UserScore } from "src/components/Header/UserScore";
// import { useHasAnyRole } from "src/hooks/auth/useHasAnyRole";

interface MenuOption {
  name: string;
  href: string;
  icon: ElementType;
  isExternal: boolean;
}

export function UserMenu() {
  const { t } = useTranslation();
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const handleSignOut = useCallback(() => {
    signOut({ callbackUrl: "/" });
  }, []);
  //const { data: session, status } = useSession();
  const { session, status } = { session: { user: { name: "amadou", image: "", role: "admin" } }, status: "" };
  //const isAdminOrMod = useHasAnyRole(["admin", "moderator"]);
  const isAdminOrMod = true;
  if (!session || status !== "authenticated") {
    return null;
  }
  const options: MenuOption[] = [
    {
      name: t("dashboard"),
      href: "/dashboard",
      icon: Layout,
      isExternal: false,
    },
    {
      name: t("account_settings"),
      href: "/account",
      icon: Settings,
      isExternal: false,
    },
    {
      //name: t("report_a_bug"),
      name: "report_a_bug",
      href: "https://github.com/LAION-AI/Open-Assistant/issues/new/choose",
      icon: AlertTriangle,
      isExternal: true,
    },
  ];

  if (isAdminOrMod) {
    options.unshift({
      name: t("admin_dashboard"),
      href: "/admin",
      icon: Shield,
      isExternal: false,
    });
  }

  return (
    <Menu>
      <MenuButton border="solid" borderRadius="full" borderWidth="thin" borderColor={borderColor}>
        <Box display="flex" alignItems="center" gap="3" p="1">
          {/* <Avatar size="sm" src={session.user.image!} /> */}
          <Text data-cy="username" className="hidden lg:flex ltr:pr-2 rtl:pl-2">
            {session.user.name || "New User"}
          </Text>
        </Box>
      </MenuButton>
      <MenuList p="2" borderRadius="xl" shadow="none">
        <Box display="flex" flexDirection="column" alignItems="center" borderRadius="md" p="1" gap="2">
          <Text>
            {session.user.name}
            {isAdminOrMod ? (
              <Badge size="xs" ml="2" fontSize="xs" textTransform="capitalize">
                {session.user.role}
              </Badge>
            ) : null}
          </Text>
        </Box>
        <MenuDivider />
        <MenuGroup>
          {options.map((item) => (
            <Link
              key={item.name}
              as={item.isExternal ? "a" : NextLink}
              isExternal={item.isExternal}
              href={item.href}
              _hover={{ textDecoration: "none" }}
            >
              <MenuItem gap="3" borderRadius="md" p="4">
                <item.icon size="1em" className="text-blue-500" aria-hidden="true" />
                <Text>{item.name}</Text>
              </MenuItem>
            </Link>
          ))}
        </MenuGroup>
        <MenuDivider />
        <MenuItem gap="3" borderRadius="md" p="4" onClick={handleSignOut}>
          <LogOut size="1em" aria-hidden="true" />
          {/* <Text>{t("sign_out")}</Text> */}
          <Text>{"sign_out"}</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UserMenu;
