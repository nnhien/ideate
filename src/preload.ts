// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer } from "electron";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
contextBridge.exposeInMainWorld('electron', {
    openDoc: (docID: string) => ipcRenderer.send('doc:open', docID),
    onDocReady: (callback: (data: Buffer) => void) => 
        ipcRenderer.on('doc:ready', (_event, data: Buffer) => callback(data)),

    pythonLoadGraph: () => ipcRenderer.send('python:loadGraph'),
    onPythonGraphReady: (callback: (graph: any) => void) =>
        ipcRenderer.on('python:graphReady', (_event, graph: any) => callback(graph))
});
