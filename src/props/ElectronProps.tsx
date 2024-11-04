export interface ElectronWindow extends Window {
    electron: ElectronAPI
}

interface ElectronAPI {
    openFile: (path: string) => void
    onFSReady: (callback: (data: string) => void) => void
    pythonIndex: () => void
    onPythonGraphReady: (callback: (graph: any) => void) => void
}