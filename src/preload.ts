// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer } from "electron";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
contextBridge.exposeInMainWorld('electron', {
    openFile: (path: string) => ipcRenderer.send('fs:open', path),
    onFSReady: (callback: (data: Buffer) => void) => 
        ipcRenderer.on('fs:ready', (_event, data: Buffer) => callback(data)),

    pythonIndex: () => ipcRenderer.send('python:index'),
    onPythonGraphReady: (callback: (graph: any) => void) =>
        ipcRenderer.on('python:graphReady', (_event, graph: any) => callback(graph))
});
