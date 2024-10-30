import { EditorProps } from "@props/EditorProps";
import { headingsPlugin, MDXEditor, MDXEditorMethods } from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css"
import { ElectronWindow } from "@props/ElectronProps";
import React from "react";

export function Editor(props: EditorProps) {
    const eWindow: ElectronWindow = window as unknown as ElectronWindow;
    const [markdown, setMarkdown] = React.useState('# Hello from App!')
    const mdxRef = React.useRef<MDXEditorMethods>(null);
    
    eWindow.electron.onFSReady((contents: string) => {
        console.log("received file! it says: ", contents);
        setMarkdown(contents);
        mdxRef.current.setMarkdown(contents);
    });


    return <MDXEditor 
            ref={mdxRef}
            markdown={markdown}
            plugins={[headingsPlugin()]}
        />
}