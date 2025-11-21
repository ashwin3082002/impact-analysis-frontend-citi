import { NavLink } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { 
  LayoutDashboard, 
  FolderGit2, 
  FileText, 
  BarChart3, 
  Users, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ['admin', 'developer', 'ba'],
  },
  {
    label: 'Repositories',
    path: '/repositories',
    icon: <FolderGit2 className="h-5 w-5" />,
    roles: ['admin', 'developer'],
  },
  {
    label: 'Functional Requirements',
    path: '/functional-requirements',
    icon: <FileText className="h-5 w-5" />,
    roles: ['admin', 'developer', 'ba'],
  },
  {
    label: 'Impact Analysis',
    path: '/impact-analysis',
    icon: <BarChart3 className="h-5 w-5" />,
    roles: ['admin', 'developer', 'ba'],
  },
  {
    label: 'User Management',
    path: '/users',
    icon: <Users className="h-5 w-5" />,
    roles: ['admin'],
  },
];

export const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(true);

  const filteredNavItems = navItems.filter((item) =>
    user ? item.roles.includes(user.role) : false
  );

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'w-64 lg:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-border p-6">
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Code Impact Analyzer
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {user?.name} ({user?.role})
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {filteredNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth text-sm font-medium',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-foreground hover:bg-secondary'
                  )
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={logout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
