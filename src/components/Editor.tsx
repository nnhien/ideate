import { EditorProps } from "@props/EditorProps";
import { headingsPlugin, markdownShortcutPlugin, MDXEditor, MDXEditorMethods } from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css"
import { ElectronWindow } from "@props/ElectronProps";
import React from "react";

export function Editor(props: EditorProps) {
    const eWindow: ElectronWindow = window as unknown as ElectronWindow;
    const mdxRef = React.useRef<MDXEditorMethods>(null);
    
    eWindow.electron.onFSReady((contents: string) => {
        mdxRef.current.setMarkdown(contents);
    });

    return <MDXEditor 
            ref={mdxRef}
            markdown={""}
            plugins={[headingsPlugin(), markdownShortcutPlugin()]}
        />
}