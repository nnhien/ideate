import { headingsPlugin, MDXEditor } from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css"

export function Editor() {
    return (
    <MDXEditor 
        markdown="# Hello, Markdown!"
        plugins={[headingsPlugin()]}
    />
    )
}