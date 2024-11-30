import { cn } from '@nextui-org/theme';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import Link from 'next/link';
import ListComponent from '../list';
import { usePathname } from 'next/navigation';
import Icon from '../icon';

type Routes = {
  title: string;
  icon: keyof typeof dynamicIconImports;
  href: string;
};

const routes: Routes[] = [
  {
    title: 'Home',
    icon: 'house',
    href: '/home',
  },
  {
    title: 'My drive',
    icon: 'folder',
    href: '/drive',
  },
  {
    title: 'Recent',
    icon: 'history',
    href: '/history',
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <ul className="text-lg">
      <ListComponent
        data={routes}
        renderItems={(item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 rounded-md px-2 py-2 font-normal',
                pathname === item.href && 'bg-gray-600',
              )}
            >
              <Icon name={item.icon} />
              {item.title}
            </Link>
          </li>
        )}
      />
    </ul>
  );
}
