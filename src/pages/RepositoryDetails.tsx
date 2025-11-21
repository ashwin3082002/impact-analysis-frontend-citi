import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useRepositoryStore } from '@/store/repositoryStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Calendar, AlertTriangle, Code } from 'lucide-react';
import { DependencyGraph } from '@/components/repositories/DependencyGraph';
import { DUMMY_DEPENDENCY_NODES, DUMMY_USERS } from '@/data/dummyData';

const RepositoryDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { repositories, fetchRepositories, selectRepository, selectedRepository } =
    useRepositoryStore();

  useEffect(() => {
    if (repositories.length === 0) {
      fetchRepositories();
    }
  }, [repositories.length, fetchRepositories]);

  useEffect(() => {
    if (id) {
      selectRepository(id);
    }
  }, [id, selectRepository]);

  if (!selectedRepository) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Repository not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const dependencyNodes = DUMMY_DEPENDENCY_NODES[selectedRepository.id] || [];
  const developers = DUMMY_USERS.filter((u) =>
    selectedRepository.linkedDevelopers.includes(u.id)
  );
  const bas = DUMMY_USERS.filter((u) => selectedRepository.linkedBAs.includes(u.id));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/repositories">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{selectedRepository.name}</h1>
            <p className="text-muted-foreground mt-1">{selectedRepository.description}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total APIs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{selectedRepository.totalAPIs || 0}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Vulnerable Modules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span className="text-2xl font-bold">
                  {selectedRepository.vulnerableModules || 0}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Last Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-info" />
                <span className="text-sm font-medium">
                  {selectedRepository.lastAnalysis?.toLocaleDateString() || 'Never'}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Team Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  {selectedRepository.linkedDevelopers.length +
                    selectedRepository.linkedBAs.length}
                </span>
                <span className="text-sm text-muted-foreground">members</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Repository Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Git URL</h3>
              <a
                href={selectedRepository.gitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                {selectedRepository.gitUrl}
              </a>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Linked Developers</h3>
              <div className="flex flex-wrap gap-2">
                {developers.map((dev) => (
                  <Badge key={dev.id} variant="secondary">
                    {dev.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Linked Business Analysts</h3>
              <div className="flex flex-wrap gap-2">
                {bas.map((ba) => (
                  <Badge key={ba.id} variant="secondary">
                    {ba.name}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dependency Graph</CardTitle>
            <CardDescription>
              Visual representation of module dependencies. Red nodes indicate vulnerable modules.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {dependencyNodes.length > 0 ? (
              <DependencyGraph nodes={dependencyNodes} />
            ) : (
              <div className="flex items-center justify-center h-96 text-muted-foreground">
                No dependency data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RepositoryDetails;
