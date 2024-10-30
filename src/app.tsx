import { Editor } from '@components/Editor';
import { ElectronWindow } from '@props/ElectronProps';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    return (
        <Editor />
    );
}

const root = createRoot(document.getElementById("app"));
root.render(App());