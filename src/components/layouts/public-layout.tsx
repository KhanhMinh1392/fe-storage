import SignIn from '@/components/sign-in';
import { Button } from '@nextui-org/button';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import Icon from '../icon';
import ListComponent from '../list';
import { ThemeSwitcher } from '../theme-switcher';

const routes = [
  {
    title: 'Overview',
    href: '/overview',
  },
  {
    title: 'Features',
    href: '/features',
  },
  {
    title: 'Customers',
    href: '/customers',
  },
  {
    title: 'Pricing',
    href: '/pricing',
  },
];

export default function PublicLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  return (
    <>
      <Navbar className="[&>header]:max-w-[1280px]" shouldHideOnScroll>
        <NavbarContent>
          <NavbarBrand className="mr-8 flex-grow-0" as={Link} href="/">
            <Icon name="box" />
            <p className="ml-2 text-xl font-bold text-inherit">STORAGE</p>
          </NavbarBrand>
          <NavbarContent className="hidden gap-8 md:flex">
            <ListComponent
              data={routes}
              renderItems={(item) => (
                <NavbarItem key={item.href} as={Link} href={item.href} isActive={pathname === item.href}>
                  {item.title}
                </NavbarItem>
              )}
            />
          </NavbarContent>
        </NavbarContent>
        <NavbarContent justify="end" className="hidden sm:flex">
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
          <NavbarItem>
            <SignIn />
          </NavbarItem>
          <NavbarItem>
            <Button color="primary">Create an account</Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      {children}
    </>
  );
}
