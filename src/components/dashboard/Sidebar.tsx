import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  ChevronDown,
  Package,
  Truck,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    title: 'Business Units',
    icon: Package,
    path: '/business-units',
  },
  {
    title: 'Shipments',
    icon: Truck,
    path: '/shipments',
  },
  {
    title: 'Customers',
    icon: Users,
    path: '/customers',
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/settings',
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const location = useLocation();

  const toggleSubmenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <div
      className={cn(
        'h-screen bg-white border-r transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && (
          <div className="font-bold text-xl text-blue-600">SwiftShip</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn('ml-auto', collapsed && 'mx-auto')}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <nav className="p-2">
        {menuItems.map((item) => (
          <div key={item.title} className="mb-1">
            {item.submenu ? (
              <Collapsible
                open={openMenus.includes(item.title)}
                onOpenChange={() => toggleSubmenu(item.title)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start',
                      collapsed && 'justify-center'
                    )}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">
                          {item.title}
                        </span>
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {!collapsed &&
                    item.submenu.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={cn(
                          'block px-8 py-2 text-sm hover:bg-gray-100 rounded-md',
                          location.pathname === subItem.path &&
                            'bg-gray-100 font-medium'
                        )}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link to={item.path!}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start',
                    collapsed && 'justify-center',
                    location.pathname === item.path &&
                      'bg-blue-50 text-blue-600 hover:bg-blue-50'
                  )}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {!collapsed && (
                    <span className="flex-1 text-left">
                      {item.title}
                    </span>
                  )}
                </Button>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}