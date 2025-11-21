import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuthStore } from '@/store/authStore';
import { useRepositoryStore } from '@/store/repositoryStore';
import { useFRStore } from '@/store/frStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FolderGit2, FileText, AlertTriangle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { repositories, fetchRepositories } = useRepositoryStore();
  const { functionalRequirements, fetchFRs } = useFRStore();

  useEffect(() => {
    fetchRepositories();
    fetchFRs();
  }, [fetchRepositories, fetchFRs]);

  const totalVulnerabilities = repositories.reduce(
    (sum, repo) => sum + (repo.vulnerableModules || 0),
    0
  );

  const pendingFRs = functionalRequirements.filter(
    (fr) => fr.status === 'draft' || fr.status === 'under-review'
  ).length;

  const stats = [
    {
      title: 'Total Repositories',
      value: repositories.length,
      icon: <FolderGit2 className="h-5 w-5 text-primary" />,
      link: '/repositories',
      show: ['admin', 'developer'],
    },
    {
      title: 'Functional Requirements',
      value: functionalRequirements.length,
      icon: <FileText className="h-5 w-5 text-primary" />,
      link: '/functional-requirements',
      show: ['admin', 'developer', 'ba'],
    },
    {
      title: 'Pending Reviews',
      value: pendingFRs,
      icon: <TrendingUp className="h-5 w-5 text-warning" />,
      link: '/functional-requirements',
      show: ['admin', 'developer', 'ba'],
    },
    {
      title: 'Vulnerabilities',
      value: totalVulnerabilities,
      icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
      link: '/repositories',
      show: ['admin', 'developer'],
    },
  ];

  const visibleStats = stats.filter((stat) => stat.show.includes(user?.role || ''));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your code impact analysis workspace
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {visibleStats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-md transition-smooth">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <Link to={stat.link}>
                  <Button variant="link" className="px-0 h-auto mt-2 text-primary">
                    View details →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates across your repositories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {repositories.slice(0, 3).map((repo) => (
                  <div key={repo.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                    <div className="space-y-1">
                      <p className="font-medium">{repo.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Last analyzed: {repo.lastAnalysis?.toLocaleDateString() || 'Never'}
                      </p>
                    </div>
                    <Link to={`/repositories/${repo.id}`}>
                      <Button variant="ghost" size="sm">View</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks for your role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {user?.role === 'developer' && (
                <>
                  <Link to="/repositories">
                    <Button className="w-full justify-start" variant="outline">
                      <FolderGit2 className="h-4 w-4 mr-2" />
                      Manage Repositories
                    </Button>
                  </Link>
                  <Link to="/functional-requirements">
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Review FRs
                    </Button>
                  </Link>
                </>
              )}
              {user?.role === 'ba' && (
                <>
                  <Link to="/functional-requirements">
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Create New FR
                    </Button>
                  </Link>
                  <Link to="/impact-analysis">
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Impact Analysis
                    </Button>
                  </Link>
                </>
              )}
              {user?.role === 'admin' && (
                <>
                  <Link to="/users">
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                  </Link>
                  <Link to="/repositories">
                    <Button className="w-full justify-start" variant="outline">
                      <FolderGit2 className="h-4 w-4 mr-2" />
                      View All Repositories
                    </Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
