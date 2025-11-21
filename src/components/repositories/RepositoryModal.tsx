import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Repository } from '@/types';
import { DUMMY_USERS } from '@/data/dummyData';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface RepositoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (repo: Omit<Repository, 'id' | 'createdAt'>) => void;
  repository?: Repository;
}

export const RepositoryModal = ({ open, onClose, onSave, repository }: RepositoryModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    gitUrl: '',
    linkedDevelopers: [] as string[],
    linkedBAs: [] as string[],
  });

  const developers = DUMMY_USERS.filter((u) => u.role === 'developer');
  const bas = DUMMY_USERS.filter((u) => u.role === 'ba');

  useEffect(() => {
    if (repository) {
      setFormData({
        name: repository.name,
        description: repository.description,
        gitUrl: repository.gitUrl,
        linkedDevelopers: repository.linkedDevelopers,
        linkedBAs: repository.linkedBAs,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        gitUrl: '',
        linkedDevelopers: [],
        linkedBAs: [],
      });
    }
  }, [repository, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const toggleUser = (userId: string, type: 'dev' | 'ba') => {
    if (type === 'dev') {
      setFormData((prev) => ({
        ...prev,
        linkedDevelopers: prev.linkedDevelopers.includes(userId)
          ? prev.linkedDevelopers.filter((id) => id !== userId)
          : [...prev.linkedDevelopers, userId],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        linkedBAs: prev.linkedBAs.includes(userId)
          ? prev.linkedBAs.filter((id) => id !== userId)
          : [...prev.linkedBAs, userId],
      }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{repository ? 'Edit Repository' : 'Add New Repository'}</DialogTitle>
          <DialogDescription>
            {repository
              ? 'Update repository information and team assignments'
              : 'Create a new repository for code impact analysis'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Repository Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., E-Commerce Platform"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the repository"
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gitUrl">Git URL *</Label>
            <Input
              id="gitUrl"
              value={formData.gitUrl}
              onChange={(e) => setFormData({ ...formData, gitUrl: e.target.value })}
              placeholder="https://github.com/org/repo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Linked Developers</Label>
            <div className="border rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto">
              {developers.map((dev) => (
                <div
                  key={dev.id}
                  onClick={() => toggleUser(dev.id, 'dev')}
                  className={`p-2 rounded cursor-pointer transition-smooth ${
                    formData.linkedDevelopers.includes(dev.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {dev.name} ({dev.email})
                </div>
              ))}
            </div>
            {formData.linkedDevelopers.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.linkedDevelopers.map((id) => {
                  const dev = developers.find((d) => d.id === id);
                  return (
                    <Badge key={id} variant="secondary">
                      {dev?.name}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer"
                        onClick={() => toggleUser(id, 'dev')}
                      />
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Linked Business Analysts</Label>
            <div className="border rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto">
              {bas.map((ba) => (
                <div
                  key={ba.id}
                  onClick={() => toggleUser(ba.id, 'ba')}
                  className={`p-2 rounded cursor-pointer transition-smooth ${
                    formData.linkedBAs.includes(ba.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {ba.name} ({ba.email})
                </div>
              ))}
            </div>
            {formData.linkedBAs.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.linkedBAs.map((id) => {
                  const ba = bas.find((b) => b.id === id);
                  return (
                    <Badge key={id} variant="secondary">
                      {ba?.name}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer"
                        onClick={() => toggleUser(id, 'ba')}
                      />
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {repository ? 'Update Repository' : 'Create Repository'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
