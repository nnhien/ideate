import { ElectronWindow } from "@props/ElectronProps";
import Graph from "graphology";
import ForceSupervisor from "graphology-layout-force/worker";
import circlepack from "graphology-layout/circlepack";
import { useEffect, useRef, useState } from "react";
import Sigma from "sigma";

export function DocumentGraph() {
    const eWindow = window as unknown as ElectronWindow;

    const containerRef = useRef<HTMLDivElement>(null);
    const [ graph ] = useState(new Graph());
    const layout = useRef(new ForceSupervisor(graph, 
        {   isNodeFixed: (_, attr) => attr.highlighted,
            settings: {
                attraction: 0.015,
                repulsion: 0.0001,
                gravity: 0.05,
                inertia: 0.35
            }
        }
    ));
    const sigma = useRef<Sigma>(null);

    let draggedNode: string | null = null;

    useEffect(() => {
        sigma.current = new Sigma(graph, containerRef.current);

        eWindow.electron.pythonLoadGraph();

        sigma.current.on("downNode", (e) => {
            draggedNode = e.node;
            graph.setNodeAttribute(draggedNode, "highlighted", true);
            if (!sigma.current.getCustomBBox())
                sigma.current.setCustomBBox(sigma.current.getBBox());
        });

        sigma.current.on("moveBody", ({ event }) => {
            if (!draggedNode) return;

            const pos = sigma.current.viewportToGraph(event);

            graph.setNodeAttribute(draggedNode, "x", pos.x);
            graph.setNodeAttribute(draggedNode, "y", pos.y);

            event.preventSigmaDefault();
            event.original.preventDefault();
            event.original.stopPropagation();
        });

        const handleUp = () => {
            if (draggedNode)
                graph.removeNodeAttribute(draggedNode, "highlighted");
            draggedNode = null;
        };

        sigma.current.on("upNode", handleUp);
        sigma.current.on("upStage", handleUp);

        return () => {
            sigma.current.kill();
            layout.current.kill();
        };
    }, []);

    eWindow.electron.onPythonGraphReady(documentGraph => {
        Object.keys(documentGraph).forEach(docID => {
            graph.addNode(docID, {x:0, y:0, size: 8, label: docID});
        });
        Object.keys(documentGraph).forEach(docID => {
            (documentGraph[docID] as string[])
                .forEach(neighbor => graph.addEdge(docID, neighbor));
        });

        circlepack.assign(graph);
        layout.current.start();
    });

    return <div ref={containerRef} style={{height: "100%", width: "100%"}} />
}