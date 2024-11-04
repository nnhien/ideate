import { DocumentGraph } from '@components/DocumentGraph';
import { createRoot } from 'react-dom/client';

function App() {
    return (
        <DocumentGraph />
    );
}

const root = createRoot(document.getElementById("app"));
root.render(App());