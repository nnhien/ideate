import { Editor } from '@components/Editor';
import { createRoot } from 'react-dom/client';

function App() {
    return (
        <Editor />
    );
}

const root = createRoot(document.body);
root.render(App());