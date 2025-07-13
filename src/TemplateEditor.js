import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TemplateEditor = ({
  template,
  setTemplate,
  hoveredSection,
  setHoveredSection,
}) => {
  const quillRef = useRef(null);

  const blockTags = ['p', 'h1', 'h2', 'h3', 'h4', 'blockquote', 'ol', 'ul'];

  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    const container = editor?.root;
    if (!container) return;

    // Assign data-id to all <p> elements
    const paragraphs = container.querySelectorAll('p');
    paragraphs.forEach((p, i) => {
      p.setAttribute('data-id', `section-${i}`);
    });

    // Remove old highlights
    container.querySelectorAll('[data-id]').forEach(el => {
      el.classList.remove('highlighted');
    });

    // Apply highlight
    if (hoveredSection) {
      const el = container.querySelector(`[data-id="${hoveredSection}"]`);
      if (el) el.classList.add('highlighted');
    }
  }, [template, hoveredSection]);

  // Hover → send back ID to App
  const handleMouseOver = e => {
    const el = e.target.closest('[data-id]');
    if (el) setHoveredSection(el.getAttribute('data-id'));
  };

  const handleMouseOut = () => setHoveredSection(null);

  return (
    <div style={{ height: '100%' }}>
      <h3>Template Editor</h3>
      <div
        style={{ height: 'calc(100% - 30px)' }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <ReactQuill
          ref={quillRef}
          value={template}
          onChange={setTemplate}
          style={{ height: '100%' }}
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline'],
              ['link'],
            ],
          }}
        />
      </div>
    </div>
  );
};

export default TemplateEditor;
