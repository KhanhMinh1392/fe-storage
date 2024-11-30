'use client';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
  User,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ThemeSwitcher } from '../theme-switcher';
import { getAccountInfo } from '@/services/account';

export default function Header() {
  const router = useRouter();

  const { data: userInfo } = useQuery({
    queryFn: getAccountInfo,
    queryKey: ['account-info'],
  });

  const handleLogout = () => {
    setCookie('accessToken', '');
    router.replace('/');
    router.refresh();
  };

  return (
    <Navbar maxWidth="full" shouldHideOnScroll className="border-b">
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User
                name={userInfo?.fullName}
                description="Account name"
                avatarProps={{
                  size: 'sm',
                  src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                }}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" className="w-36">
              <DropdownItem key="account" textValue="account">
                <Link href={'/account'}>My Account</Link>
              </DropdownItem>
              <DropdownItem key="logout" textValue="logout" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
