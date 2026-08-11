import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

const files = import.meta.glob('/content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const sections = {}
const allDocs = []

for (const path in files) {
  const parts = path.split('/').filter(Boolean) 
  parts.shift() 
  const section = parts.shift() 
  const fileName = parts.pop().replace(/\.md$/, '') 
  const folderPath = parts

  const doc = { name: fileName, path, section, content: files[path] }
  allDocs.push(doc)

  if (!sections[section]) sections[section] = { folders: {}, files: [] }
  let node = sections[section]
  for (const folder of folderPath) {
    if (!node.folders[folder]) node.folders[folder] = { folders: {}, files: [] }
    node = node.folders[folder]
  }
  node.files.push(doc)
}

const sectionNames = Object.keys(sections).sort()

function Tree({ node, selectedPath, onSelect }) {
  const folderNames = Object.keys(node.folders).sort()
  const fileList = [...node.files].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <>
      {folderNames.map((folder) => (
        <details key={folder} open className="folder">
          <summary>{folder}</summary>
          <div className="folder-content">
            <Tree
              node={node.folders[folder]}
              selectedPath={selectedPath}
              onSelect={onSelect}
            />
          </div>
        </details>
      ))}
      {fileList.map((doc) => (
        <button
          key={doc.path}
          className={doc.path === selectedPath ? 'active' : ''}
          onClick={() => onSelect(doc)}
        >
          {doc.name}
        </button>
      ))}
    </>
  )
}

function firstDocOf(section) {
  return allDocs
    .filter((d) => d.section === section)
    .sort((a, b) => a.path.localeCompare(b.path))[0]
}

export default function App() {
  const [selectedSection, setSelectedSection] = useState(sectionNames[0])
  const [selectedPath, setSelectedPath] = useState(
    firstDocOf(sectionNames[0])?.path
  )

  const currentDoc = allDocs.find((d) => d.path === selectedPath)

  function selectSection(section) {
    setSelectedSection(section)
    setSelectedPath(firstDocOf(section)?.path)
  }

  return (
    <div className="app">
      <nav className="nav">
        <span>Fernando Brandán               </span>
        {sectionNames.map((section) => (
          <button
            key={section}
            className={section === selectedSection ? 'active' : ''}
            onClick={() => selectSection(section)}
          >
            {section.toUpperCase()}
          </button>
        ))}
      </nav>

      <div className="layout">
        <aside className="menu">
          <Tree
            node={sections[selectedSection]}
            selectedPath={selectedPath}
            onSelect={(doc) => setSelectedPath(doc.path)}
          />
        </aside>

        <main className="content">
          {currentDoc ? (
            <ReactMarkdown>{currentDoc.content}</ReactMarkdown>
          ) : (
            <p className="empty">No hay documentos en esta sección.</p>
          )}
        </main>
      </div>
    </div>
  )
}