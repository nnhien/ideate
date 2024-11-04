import { EditorProps } from "@props/EditorProps";
import { headingsPlugin, markdownShortcutPlugin, MDXEditor, MDXEditorMethods } from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css"
import { ElectronWindow } from "@props/ElectronProps";
import { useEffect, useRef } from "react";

export function Editor(props: EditorProps) {
    const eWindow: ElectronWindow = window as unknown as ElectronWindow;
    const mdxRef = useRef<MDXEditorMethods>(null);

    useEffect(() => {
        eWindow.electron.openDoc(props.docID);
    }, [])

    eWindow.electron.onDocReady((contents: string) => {
        mdxRef.current.setMarkdown(contents);
    });

    return <MDXEditor 
            ref={mdxRef}
            markdown={""}
            plugins={[headingsPlugin(), markdownShortcutPlugin()]}
        />
}