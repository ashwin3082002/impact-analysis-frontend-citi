import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useFRStore } from '@/store/frStore';
import { useAuthStore } from '@/store/authStore';
import { useRepositoryStore } from '@/store/repositoryStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, BarChart3, Edit, Trash2, Users } from 'lucide-react';
import { DUMMY_USERS } from '@/data/dummyData';
import { FRModal } from '@/components/functional-requirements/FRModal';
import { FRDiscussion } from '@/components/functional-requirements/FRDiscussion';
import { FunctionalRequirement } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { toast } from 'sonner';

const FunctionalRequirements = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { repositories, fetchRepositories } = useRepositoryStore();
  const {
    functionalRequirements,
    fetchFRs,
    addFR,
    updateFR,
    deleteFR,
    analyzeImpact,
  } = useFRStore();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFR, setEditingFR] = useState<FunctionalRequirement | undefined>();
  const [selectedFR, setSelectedFR] = useState<FunctionalRequirement | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingFRId, setDeletingFRId] = useState<string | null>(null);
  const [analyzingFRId, setAnalyzingFRId] = useState<string | null>(null);

  useEffect(() => {
    fetchRepositories();
    fetchFRs();
  }, [fetchRepositories, fetchFRs]);

  const handleAddEdit = () => {
    setEditingFR(undefined);
    setModalOpen(true);
  };

  const handleEdit = (fr: FunctionalRequirement) => {
    setEditingFR(fr);
    setModalOpen(true);
  };

  const handleSave = async (fr: Omit<FunctionalRequirement, 'id' | 'createdAt' | 'comments'>) => {
    if (editingFR) {
      await updateFR(editingFR.id, fr);
      toast.success('Functional requirement updated');
    } else {
      await addFR(fr);
      toast.success('Functional requirement created');
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingFRId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingFRId) {
      await deleteFR(deletingFRId);
      setDeleteDialogOpen(false);
      setDeletingFRId(null);
      toast.success('Functional requirement deleted');
    }
  };

  const handleAnalyzeImpact = async (fr: FunctionalRequirement) => {
    setAnalyzingFRId(fr.id);
    toast.info('Starting impact analysis...');
    try {
      await analyzeImpact(fr.id);
      toast.success('Impact analysis completed!');
      // Navigate to Impact Analysis page with FR ID
      navigate(`/impact-analysis?frId=${fr.id}`);
    } catch (error) {
      toast.error('Failed to analyze impact');
    } finally {
      setAnalyzingFRId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      draft: 'secondary',
      'under-review': 'outline',
      analyzed: 'default',
      completed: 'secondary',
    };
    return variants[status] || 'secondary';
  };

  const canEdit = user?.role === 'ba' || user?.role === 'admin';
  const canAnalyze = user?.role === 'ba';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Functional Requirements</h1>
            <p className="text-muted-foreground mt-1">
              Manage and collaborate on functional requirements
            </p>
          </div>
          {canEdit && (
            <Button onClick={handleAddEdit}>
              <Plus className="h-4 w-4 mr-2" />
              Create FR
            </Button>
          )}
        </div>

        <div className="grid gap-4">
          {functionalRequirements.map((fr) => {
            const repo = repositories.find((r) => r.id === fr.repositoryId);
            
            return (
              <Card key={fr.id} className="hover:shadow-md transition-smooth">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{fr.title}</CardTitle>
                        <Badge variant={getStatusBadge(fr.status)}>
                          {fr.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <CardDescription>
                        Repository: {repo?.name || 'Unknown'} • Created:{' '}
                        {new Date(fr.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {canEdit && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(fr)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(fr.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground">{fr.description}</p>

                  {fr.fileUrl && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>Document: {fr.fileUrl}</span>
                    </div>
                  )}

                  {user?.role === 'ba' && repo && (
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t">
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
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedFR(fr)}
                    >
                      View Discussion ({fr.comments.length})
                    </Button>
                    
                    {canAnalyze && (
                      <Button
                        size="sm"
                        onClick={() => handleAnalyzeImpact(fr)}
                        disabled={analyzingFRId === fr.id}
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        {analyzingFRId === fr.id ? 'Analyzing...' : 'Analyze Impact'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {functionalRequirements.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No functional requirements found</p>
              {canEdit && (
                <Button onClick={handleAddEdit}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First FR
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <FRModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        functionalRequirement={editingFR}
      />

      <Dialog open={!!selectedFR} onOpenChange={() => setSelectedFR(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedFR?.title}</DialogTitle>
            <DialogDescription>{selectedFR?.description}</DialogDescription>
          </DialogHeader>
          {selectedFR && <FRDiscussion fr={selectedFR} />}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this functional requirement and all associated data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default FunctionalRequirements;
