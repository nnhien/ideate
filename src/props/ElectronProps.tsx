export interface ElectronWindow extends Window {
    electron: ElectronAPI
}

interface ElectronAPI {
    openDoc: (path: string) => void
    onDocReady: (callback: (data: string) => void) => void
    pythonLoadGraph: () => void
    onPythonGraphReady: (callback: (graph: any) => void) => void
}