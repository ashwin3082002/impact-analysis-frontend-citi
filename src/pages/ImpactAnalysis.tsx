import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useFRStore } from '@/store/frStore';
import { useRepositoryStore } from '@/store/repositoryStore';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, FileText, AlertCircle, Plus, BarChart3 } from 'lucide-react';
import { ImpactedAPI, AffectedChannel, AffectedApplication, AffectedModule } from '@/types';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';

const ImpactAnalysis = () => {
  const { user } = useAuthStore();
  const { functionalRequirements, impactAnalyses, fetchFRs } = useFRStore();
  const { repositories, fetchRepositories } = useRepositoryStore();
  const [expandedChannels, setExpandedChannels] = useState<Set<string>>(new Set());
  const [expandedApps, setExpandedApps] = useState<Set<string>>(new Set());
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [expandedAPIs, setExpandedAPIs] = useState<Set<string>>(new Set());
  const [selectedReportFR, setSelectedReportFR] = useState<string | null>(null);

  useEffect(() => {
    fetchRepositories();
    fetchFRs();
  }, [fetchRepositories, fetchFRs]);

  const toggleItem = (id: string, setFunc: React.Dispatch<React.SetStateAction<Set<string>>>) => {
    setFunc((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getCriticalityColor = (level: string) => {
    const colors: Record<string, string> = {
      minor: 'text-blue-600 dark:text-blue-400',
      support: 'text-green-600 dark:text-green-400',
      major: 'text-destructive',
    };
    return colors[level] || 'text-muted-foreground';
  };

  const getCriticalityBadge = (level: string) => {
    const variants: Record<string, any> = {
      minor: 'secondary',
      support: 'outline',
      major: 'destructive',
    };
    return variants[level] || 'secondary';
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return '📱';
      case 'web':
        return '🌐';
      case 'desktop':
        return '💻';
      default:
        return '📦';
    }
  };

  // Static markdown content - will be replaced with API call later
  const getReportContent = (frId: string) => {
    const analysis = impactAnalyses[frId];
    if (!analysis) return '';
    
    return `# Impact Analysis Report

## Functional Requirement
**Title:** ${functionalRequirements.find(fr => fr.id === frId)?.title}  
**Analyzed At:** ${new Date(analysis.analyzedAt).toLocaleString()}

## Summary

- **Total APIs:** ${analysis.totalAPIs}
- **Impacted APIs:** ${analysis.totalImpactedAPIs}
- **Affected Modules:** ${analysis.affectedModules}
- **Criticality Level:** **${analysis.criticalityLevel.toUpperCase()}**

## Detailed Impact Analysis

### Affected Channels: ${analysis.affectedChannels.length}

${analysis.affectedChannels.map(channel => `
#### ${channel.name} (${channel.type})

**Applications:** ${channel.applications.length}

${channel.applications.map(app => `
##### ${app.name}

**Modules:** ${app.modules.length}

${app.modules.map(module => `
###### ${module.name}

**Total APIs:** ${module.apis.length}  
**Affected APIs:** ${module.apis.filter(api => api.isAffected).length}

${module.apis.filter(api => api.isAffected).map(api => `
- **${api.name}** - *Criticality: ${api.criticality}*
  - Call Stack:
${api.callStack.map(call => `    - \`${call.method}()\`${call.line ? ` (Line ${call.line})` : ''} - ${call.description}`).join('\n')}
`).join('\n')}
`).join('\n')}
`).join('\n')}
`).join('\n')}

## Recommendations

Based on the impact analysis, the following actions are recommended:

1. Review all affected APIs marked as **Major** criticality first
2. Update API contracts and documentation
3. Coordinate with frontend teams for ${analysis.affectedChannels.map(c => c.name).join(', ')}
4. Plan backward compatibility strategy for affected endpoints
5. Schedule integration testing across all affected modules

## Next Steps

- [ ] Create JIRA stories for each affected module
- [ ] Schedule impact review meeting with stakeholders
- [ ] Update technical documentation
- [ ] Plan deployment strategy

---
*This report was generated automatically by the Code Impact Analyzer*
`;
  };

  const handleCreateJiraStory = (frId: string) => {
    toast.success('JIRA Story created successfully');
  };

  const handleCreateJiraEpic = (frId: string) => {
    toast.success('JIRA Epic created successfully');
  };

  const analyzedFRs = functionalRequirements.filter((fr) => impactAnalyses[fr.id]);
  const isBA = user?.role === 'ba';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Impact Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Review the impact analysis results for functional requirements
          </p>
        </div>

        {analyzedFRs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No impact analyses available. Trigger analysis from the Functional Requirements page.
              </p>
            </CardContent>
          </Card>
        ) : (
          analyzedFRs.map((fr) => {
            const analysis = impactAnalyses[fr.id];
            const repo = repositories.find((r) => r.id === fr.repositoryId);

            if (!analysis) return null;

            return (
              <Card key={fr.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{fr.title}</CardTitle>
                      <CardDescription className="mt-2">
                        Repository: {repo?.name} • Analyzed:{' '}
                        {new Date(analysis.analyzedAt).toLocaleString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Dialog open={selectedReportFR === fr.id} onOpenChange={(open) => setSelectedReportFR(open ? fr.id : null)}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            View Report
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh]">
                          <DialogHeader>
                            <DialogTitle>Impact Analysis Report</DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="h-[60vh] pr-4">
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                              <ReactMarkdown>{getReportContent(fr.id)}</ReactMarkdown>
                            </div>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Impacted APIs</CardDescription>
                        <CardTitle className="text-3xl">
                          {analysis.totalImpactedAPIs}/{analysis.totalAPIs}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Affected Modules</CardDescription>
                        <CardTitle className="text-3xl">{analysis.affectedModules}</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Criticality Level</CardDescription>
                        <CardTitle className="text-3xl">
                          <Badge variant={getCriticalityBadge(analysis.criticalityLevel)} className="text-lg">
                            {analysis.criticalityLevel.toUpperCase()}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>

                  {/* JIRA Integration Buttons */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" onClick={() => handleCreateJiraStory(fr.id)}>
                      <FileText className="h-4 w-4 mr-2" />
                      Create JIRA Story
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleCreateJiraEpic(fr.id)}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Create JIRA Epic
                    </Button>
                  </div>

                  {/* Affected Channels Tree */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Affected Channels & APIs</h3>
                    
                    {analysis.affectedChannels.map((channel) => (
                      <Collapsible
                        key={channel.id}
                        open={expandedChannels.has(channel.id)}
                        onOpenChange={() => toggleItem(channel.id, setExpandedChannels)}
                      >
                        <Card className="border-l-4 border-l-primary">
                          <CollapsibleTrigger className="w-full">
                            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-smooth">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {expandedChannels.has(channel.id) ? (
                                    <ChevronDown className="h-5 w-5" />
                                  ) : (
                                    <ChevronRight className="h-5 w-5" />
                                  )}
                                  <span className="text-2xl">{getChannelIcon(channel.type)}</span>
                                  <div className="text-left">
                                    <CardTitle className="text-base">{channel.name}</CardTitle>
                                    <CardDescription className="text-xs">
                                      {channel.applications.length} Application(s)
                                    </CardDescription>
                                  </div>
                                </div>
                                {isBA && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toast.info('Add Channel feature coming soon');
                                    }}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </CardHeader>
                          </CollapsibleTrigger>
                          
                          <CollapsibleContent>
                            <CardContent className="space-y-3 pl-12">
                              {/* Applications */}
                              {channel.applications.map((app) => (
                                <Collapsible
                                  key={app.id}
                                  open={expandedApps.has(app.id)}
                                  onOpenChange={() => toggleItem(app.id, setExpandedApps)}
                                >
                                  <Card className="border-l-4 border-l-blue-500">
                                    <CollapsibleTrigger className="w-full">
                                      <CardHeader className="py-3 cursor-pointer hover:bg-muted/30 transition-smooth">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                            {expandedApps.has(app.id) ? (
                                              <ChevronDown className="h-4 w-4" />
                                            ) : (
                                              <ChevronRight className="h-4 w-4" />
                                            )}
                                            <CardTitle className="text-sm">{app.name}</CardTitle>
                                            <Badge variant="secondary" className="text-xs">
                                              {app.modules.length} Module(s)
                                            </Badge>
                                          </div>
                                          {isBA && (
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toast.info('Add Application feature coming soon');
                                              }}
                                            >
                                              <Plus className="h-3 w-3" />
                                            </Button>
                                          )}
                                        </div>
                                      </CardHeader>
                                    </CollapsibleTrigger>
                                    
                                    <CollapsibleContent>
                                      <CardContent className="space-y-2 pl-6">
                                        {/* Modules */}
                                        {app.modules.map((module) => (
                                          <Collapsible
                                            key={module.id}
                                            open={expandedModules.has(module.id)}
                                            onOpenChange={() => toggleItem(module.id, setExpandedModules)}
                                          >
                                            <Card className="border-l-4 border-l-purple-500">
                                              <CollapsibleTrigger className="w-full">
                                                <CardHeader className="py-2 cursor-pointer hover:bg-muted/20 transition-smooth">
                                                  <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                      {expandedModules.has(module.id) ? (
                                                        <ChevronDown className="h-4 w-4" />
                                                      ) : (
                                                        <ChevronRight className="h-4 w-4" />
                                                      )}
                                                      <CardTitle className="text-sm">{module.name}</CardTitle>
                                                      <Badge variant="outline" className="text-xs">
                                                        {module.apis.filter(api => api.isAffected).length}/
                                                        {module.apis.length} APIs Affected
                                                      </Badge>
                                                    </div>
                                                    {isBA && (
                                                      <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => {
                                                          e.stopPropagation();
                                                          toast.info('Add Module feature coming soon');
                                                        }}
                                                      >
                                                        <Plus className="h-3 w-3" />
                                                      </Button>
                                                    )}
                                                  </div>
                                                </CardHeader>
                                              </CollapsibleTrigger>
                                              
                                              <CollapsibleContent>
                                                <CardContent className="space-y-2 pl-6">
                                                  {/* APIs */}
                                                  {module.apis.map((api) => (
                                                    <Collapsible
                                                      key={api.id}
                                                      open={expandedAPIs.has(api.id)}
                                                      onOpenChange={() => toggleItem(api.id, setExpandedAPIs)}
                                                    >
                                                      <Card className={`${
                                                        api.isAffected 
                                                          ? 'border-l-4 border-l-orange-500 bg-orange-50 dark:bg-orange-950/20' 
                                                          : 'border-l-4 border-l-gray-300 bg-gray-50 dark:bg-gray-900/20'
                                                      }`}>
                                                        <CollapsibleTrigger className="w-full">
                                                          <CardHeader className="py-2 cursor-pointer hover:opacity-80 transition-smooth">
                                                            <div className="flex items-center justify-between">
                                                              <div className="flex items-center gap-2">
                                                                {expandedAPIs.has(api.id) ? (
                                                                  <ChevronDown className="h-3 w-3" />
                                                                ) : (
                                                                  <ChevronRight className="h-3 w-3" />
                                                                )}
                                                                <code className="text-xs font-mono">{api.name}</code>
                                                                {api.isAffected && (
                                                                  <Badge 
                                                                    variant={getCriticalityBadge(api.criticality)}
                                                                    className="text-xs"
                                                                  >
                                                                    {api.criticality}
                                                                  </Badge>
                                                                )}
                                                                {!api.isAffected && (
                                                                  <Badge variant="outline" className="text-xs">
                                                                    Not Affected
                                                                  </Badge>
                                                                )}
                                                              </div>
                                                              {isBA && (
                                                                <Button
                                                                  variant="ghost"
                                                                  size="sm"
                                                                  onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toast.info('Add API feature coming soon');
                                                                  }}
                                                                >
                                                                  <Plus className="h-3 w-3" />
                                                                </Button>
                                                              )}
                                                            </div>
                                                          </CardHeader>
                                                        </CollapsibleTrigger>
                                                        
                                                        <CollapsibleContent>
                                                          <CardContent className="py-2 pl-8">
                                                            {/* Call Stack */}
                                                            <div className="space-y-1">
                                                              <p className="text-xs font-semibold text-muted-foreground mb-2">
                                                                Call Stack:
                                                              </p>
                                                              {api.callStack.map((call, idx) => (
                                                                <div
                                                                  key={idx}
                                                                  className="text-xs pl-4 border-l-2 border-muted py-1"
                                                                >
                                                                  <code className="font-mono font-semibold">
                                                                    {call.method}()
                                                                  </code>
                                                                  {call.line && (
                                                                    <span className="text-muted-foreground">
                                                                      {' '}
                                                                      (Line {call.line})
                                                                    </span>
                                                                  )}
                                                                  <p className="text-muted-foreground mt-0.5">
                                                                    {call.description}
                                                                  </p>
                                                                </div>
                                                              ))}
                                                            </div>
                                                          </CardContent>
                                                        </CollapsibleContent>
                                                      </Card>
                                                    </Collapsible>
                                                  ))}
                                                </CardContent>
                                              </CollapsibleContent>
                                            </Card>
                                          </Collapsible>
                                        ))}
                                      </CardContent>
                                    </CollapsibleContent>
                                  </Card>
                                </Collapsible>
                              ))}
                            </CardContent>
                          </CollapsibleContent>
                        </Card>
                      </Collapsible>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
};

export default ImpactAnalysis;
