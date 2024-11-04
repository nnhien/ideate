import { DocumentGraph } from '@components/DocumentGraph';
import { Editor } from '@components/Editor';
import { createRoot } from 'react-dom/client';

function App() {
    return (
        <DocumentGraph />
    );
}

const root = createRoot(document.getElementById("app"));
root.render(App());