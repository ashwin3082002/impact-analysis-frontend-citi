import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useRepositoryStore } from '@/store/repositoryStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, ExternalLink, AlertTriangle, Users } from 'lucide-react';
import { RepositoryModal } from '@/components/repositories/RepositoryModal';
import { Repository } from '@/types';
import { DUMMY_USERS } from '@/data/dummyData';
import { Link } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Repositories = () => {
  const { user } = useAuthStore();
  const { repositories, fetchRepositories, addRepository, updateRepository, deleteRepository } =
    useRepositoryStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRepo, setEditingRepo] = useState<Repository | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingRepoId, setDeletingRepoId] = useState<string | null>(null);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  const handleAddEdit = () => {
    setEditingRepo(undefined);
    setModalOpen(true);
  };

  const handleEdit = (repo: Repository) => {
    setEditingRepo(repo);
    setModalOpen(true);
  };

  const handleSave = async (repo: Omit<Repository, 'id' | 'createdAt'>) => {
    if (editingRepo) {
      await updateRepository(editingRepo.id, repo);
    } else {
      await addRepository(repo);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingRepoId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingRepoId) {
      await deleteRepository(deletingRepoId);
      setDeleteDialogOpen(false);
      setDeletingRepoId(null);
    }
  };

  const getUserNames = (userIds: string[]) => {
    return userIds
      .map((id) => DUMMY_USERS.find((u) => u.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Repositories</h1>
            <p className="text-muted-foreground mt-1">
              Manage your code repositories for impact analysis
            </p>
          </div>
          {(user?.role === 'admin' || user?.role === 'developer') && (
            <Button onClick={handleAddEdit}>
              <Plus className="h-4 w-4 mr-2" />
              Add Repository
            </Button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {repositories.map((repo) => (
            <Card key={repo.id} className="hover:shadow-lg transition-smooth">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{repo.name}</CardTitle>
                    <CardDescription className="mt-1 line-clamp-2">
                      {repo.description}
                    </CardDescription>
                  </div>
                  {(user?.role === 'admin' || user?.role === 'developer') && (
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(repo)}
                        className="h-8 w-8"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(repo.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ExternalLink className="h-4 w-4" />
                  <a
                    href={repo.gitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary truncate"
                  >
                    {repo.gitUrl}
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Total APIs</p>
                    <p className="text-xl font-bold">{repo.totalAPIs || 0}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Vulnerabilities</p>
                    <div className="flex items-center gap-1">
                      <p className="text-xl font-bold">{repo.vulnerableModules || 0}</p>
                      {(repo.vulnerableModules || 0) > 0 && (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Developers:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {repo.linkedDevelopers.length > 0 ? (
                      repo.linkedDevelopers.map((id) => (
                        <Badge key={id} variant="secondary" className="text-xs">
                          {DUMMY_USERS.find((u) => u.id === id)?.name}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">None assigned</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">BAs:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {repo.linkedBAs.length > 0 ? (
                      repo.linkedBAs.map((id) => (
                        <Badge key={id} variant="secondary" className="text-xs">
                          {DUMMY_USERS.find((u) => u.id === id)?.name}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">None assigned</span>
                    )}
                  </div>
                </div>

                <Link to={`/repositories/${repo.id}`}>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {repositories.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No repositories found</p>
              {(user?.role === 'admin' || user?.role === 'developer') && (
                <Button onClick={handleAddEdit}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Repository
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <RepositoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        repository={editingRepo}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this repository and all associated data. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Repositories;
