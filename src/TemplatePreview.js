import React, { useEffect, useRef } from 'react';

const wrapBlocks = html => {
  const blockTags = ['p', 'h1', 'h2', 'h3', 'h4', 'blockquote', 'ol', 'ul'];
  let count = 0;

  blockTags.forEach(tag => {
    const regex = new RegExp(`<${tag}(.*?)>([\\s\\S]*?)</${tag}>`, 'gi');
    html = html.replace(regex, (_, attrs, content) => {
      return `<${tag} data-id="section-${count++}" class="preview-section"${attrs}>${content}</${tag}>`;
    });
  });

  return html;
};

const renderTemplate = (template, data) => {
  const filled = template.replace(
    /{{\s*([^}]+)\s*}}/g,
    (_, key) => data[key] || `[${key}]`
  );
  return wrapBlocks(filled);
};

const TemplatePreview = ({
  template,
  data,
  hoveredSection,
  setHoveredSection,
}) => {
  const containerRef = useRef(null);
  const rendered = renderTemplate(template, data);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container
      .querySelectorAll('.preview-section')
      .forEach(el => el.classList.remove('highlighted'));

    if (hoveredSection) {
      const el = container.querySelector(`[data-id="${hoveredSection}"]`);
      if (el) el.classList.add('highlighted');
    }
  }, [hoveredSection]);

  const handleMouseOver = e => {
    const el = e.target.closest('[data-id]');
    if (el) setHoveredSection(el.getAttribute('data-id'));
  };

  const handleMouseOut = () => setHoveredSection(null);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h3>Preview</h3>
      <div
        ref={containerRef}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{
          flex: 1,
          background: '#f9f9f9',
          padding: '15px',
          borderRadius: '8px',
          overflowY: 'auto',
          border: '1px solid #ccc',
        }}
        dangerouslySetInnerHTML={{ __html: rendered }}
      />
    </div>
  );
};

export default TemplatePreview;
