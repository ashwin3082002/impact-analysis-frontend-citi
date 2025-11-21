import { useState } from 'react';
import { FunctionalRequirement } from '@/types';
import { useAuthStore } from '@/store/authStore';
import { useFRStore } from '@/store/frStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send } from 'lucide-react';

interface FRDiscussionProps {
  fr: FunctionalRequirement;
}

export const FRDiscussion = ({ fr }: FRDiscussionProps) => {
  const { user } = useAuthStore();
  const { addComment } = useFRStore();
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    await addComment(fr.id, {
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      content: newComment,
    });
    setNewComment('');
    setIsSubmitting(false);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'developer':
        return 'secondary';
      case 'ba':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Discussion</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {fr.comments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No comments yet. Start the discussion!
            </p>
          ) : (
            fr.comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {comment.userName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{comment.userName}</span>
                    <Badge variant={getRoleBadgeVariant(comment.userRole)} className="text-xs">
                      {comment.userRole}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-foreground bg-secondary p-3 rounded-lg">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex gap-2">
            <Textarea
              placeholder="Add your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              disabled={isSubmitting}
            />
          </div>
          <div className="flex justify-end mt-2">
            <Button
              onClick={handleSubmit}
              disabled={!newComment.trim() || isSubmitting}
              size="sm"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
