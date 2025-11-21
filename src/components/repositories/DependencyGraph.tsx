import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { DependencyNode } from '@/types';

interface DependencyGraphProps {
  nodes: DependencyNode[];
}

export const DependencyGraph = ({ nodes }: DependencyGraphProps) => {
  // Convert dependency nodes to ReactFlow nodes and edges
  const { flowNodes, flowEdges } = useMemo(() => {
    const nodeMap = new Map(nodes.map((n) => [n.id, n]));
    
    const flowNodes: Node[] = nodes.map((node, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      
      return {
        id: node.id,
        type: 'default',
        data: {
          label: (
            <div className="px-3 py-2">
              <div className="font-semibold text-sm">{node.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{node.type}</div>
            </div>
          ),
        },
        position: { x: col * 250, y: row * 150 },
        style: {
          background: node.vulnerable ? 'hsl(0 84% 60%)' : 'hsl(239 84% 67%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '12px',
          padding: 0,
          minWidth: '180px',
        },
      };
    });

    const flowEdges: Edge[] = [];
    nodes.forEach((node) => {
      if (node.dependencies) {
        node.dependencies.forEach((targetId) => {
          if (nodeMap.has(targetId)) {
            flowEdges.push({
              id: `${node.id}-${targetId}`,
              source: node.id,
              target: targetId,
              type: 'smoothstep',
              animated: false,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: 'hsl(215 25% 15%)',
              },
              style: {
                stroke: 'hsl(215 25% 15%)',
                strokeWidth: 2,
              },
            });
          }
        });
      }
    });

    return { flowNodes, flowEdges };
  }, [nodes]);

  const [nodesState, , onNodesChange] = useNodesState(flowNodes);
  const [edgesState, , onEdgesChange] = useEdgesState(flowEdges);

  return (
    <div className="w-full h-[600px] border rounded-lg bg-background">
      <ReactFlow
        nodes={nodesState}
        edges={edgesState}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};
