import Codesandbox from '@uiw/react-codesandbox';

const code = `import React from "react";
import ReactDOM from "react-dom";
import MDEditor from "@uiw/react-md-editor";
import mermaid from "mermaid";

const mdMermaid = \`The following are some examples of the diagrams, charts and graphs that can be made using Mermaid and the Markdown-inspired text specific to it. 

\\\`\\\`\\\`mermaid
graph TD
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
\\\`\\\`\\\`

\\\`\\\`\\\`mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
\\\`\\\`\\\`
\`;

export default function App() {
  return (
    <MDEditor
      textareaProps={{
        placeholder: 'Please enter Markdown text',
      }}
      height={500}
      value={mdMermaid || ""}
      previewOptions={{
        components: {
          code: ({ inline, children, className, ...props }) => {
            const txt = children[0] || '';
            if (
              typeof txt === 'string' &&
              typeof className === 'string' &&
              /^language-mermaid/.test(className.toLocaleLowerCase())
            ) {
              const Elm = document.createElement("div");
              Elm.id = "demo";
              const svg = mermaid.render("demo", txt);
              return <code dangerouslySetInnerHTML={{ __html: svg }} />
            }
            return <code className={String(className)}>{txt}</code>;
          },
        },
      }}
    />
  );
}

ReactDOM.render(<App />, document.getElementById("container"));
`;

export default function ExampleMermaid() {
  return (
    <div style={{ height: 500 }}>
      <Codesandbox
        embed
        query="view=split&hidenavigation=1"
        files={{
          'package.json': {
            content: {
              dependencies: {
                '@uiw/react-md-editor': '3.0.7',
                react: 'latest',
                mermaid: '8.9.3',
                'react-dom': 'latest',
              },
            },
          },
          'index.js': {
            content: code,
          },
          'index.html': {
            content: `<div id="container"></div>`,
          },
        }}
      />
    </div>
  );
}
