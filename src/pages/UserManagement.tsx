import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DUMMY_USERS } from '@/data/dummyData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Shield } from 'lucide-react';

const UserManagement = () => {
  const getRoleBadge = (role: string) => {
    const variants: Record<string, any> = {
      admin: 'default',
      developer: 'secondary',
      ba: 'outline',
    };
    return variants[role] || 'secondary';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-1">
            View user accounts and their roles in the system
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DUMMY_USERS.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-smooth">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <Badge variant={getRoleBadge(user.role)} className="mt-1">
                      {user.role}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground capitalize">
                    {user.role} permissions
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Role Descriptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Admin</h3>
              <p className="text-sm text-muted-foreground">
                Full access to all features including user management, repository management, and impact
                analysis.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Developer</h3>
              <p className="text-sm text-muted-foreground">
                Can manage repositories, view and comment on functional requirements, and access impact
                analysis results.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Business Analyst (BA)</h3>
              <p className="text-sm text-muted-foreground">
                Can create and manage functional requirements, trigger impact analysis, and collaborate
                with developers.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
