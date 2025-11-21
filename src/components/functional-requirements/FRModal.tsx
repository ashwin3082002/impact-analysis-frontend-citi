import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FunctionalRequirement } from '@/types';
import { useRepositoryStore } from '@/store/repositoryStore';
import { useAuthStore } from '@/store/authStore';

interface FRModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (fr: Omit<FunctionalRequirement, 'id' | 'createdAt' | 'comments'>) => void;
  functionalRequirement?: FunctionalRequirement;
}

export const FRModal = ({ open, onClose, onSave, functionalRequirement }: FRModalProps) => {
  const { user } = useAuthStore();
  const { repositories } = useRepositoryStore();
  
  const [formData, setFormData] = useState<{
    repositoryId: string;
    title: string;
    description: string;
    fileUrl: string;
    status: 'draft' | 'under-review' | 'analyzed' | 'completed';
  }>({
    repositoryId: '',
    title: '',
    description: '',
    fileUrl: '',
    status: 'draft',
  });

  useEffect(() => {
    if (functionalRequirement) {
      setFormData({
        repositoryId: functionalRequirement.repositoryId,
        title: functionalRequirement.title,
        description: functionalRequirement.description,
        fileUrl: functionalRequirement.fileUrl || '',
        status: functionalRequirement.status,
      });
    } else {
      setFormData({
        repositoryId: repositories[0]?.id || '',
        title: '',
        description: '',
        fileUrl: '',
        status: 'draft',
      });
    }
  }, [functionalRequirement, open, repositories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      createdBy: user?.id || '',
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {functionalRequirement ? 'Edit Functional Requirement' : 'Create Functional Requirement'}
          </DialogTitle>
          <DialogDescription>
            {functionalRequirement
              ? 'Update the functional requirement details'
              : 'Define a new functional requirement for impact analysis'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="repository">Repository *</Label>
            <Select
              value={formData.repositoryId}
              onValueChange={(value) => setFormData({ ...formData, repositoryId: value })}
              required
            >
              <SelectTrigger id="repository">
                <SelectValue placeholder="Select a repository" />
              </SelectTrigger>
              <SelectContent>
                {repositories.map((repo) => (
                  <SelectItem key={repo.id} value={repo.id}>
                    {repo.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Implement Dynamic Discount System"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of the functional requirement"
              required
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileUrl">Document URL (Optional)</Label>
            <Input
              id="fileUrl"
              value={formData.fileUrl}
              onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
              placeholder="/documents/fr-document.pdf"
            />
            <p className="text-xs text-muted-foreground">
              Link to the detailed requirement document
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: any) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="analyzed">Analyzed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {functionalRequirement ? 'Update FR' : 'Create FR'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
