import React, { useState } from 'react';
import TemplateEditor from './TemplateEditor';
import TemplatePreview from './TemplatePreview';
import { formatKeyLabel } from './utils/formatKeyLabel';
import './index.css';

const App = () => {
  const [template, setTemplate] = useState(`
    <h2><strong>Non-Disclosure Agreement</strong></h2>

    <p>This <strong><u>Agreement</u></strong> is made on <em>{{date}}</em> between 
    <strong>{{name}}</strong> of <u>{{address}}</u> ("Disclosing Party") and the Receiving Party.</p>

    <p><strong>1. Purpose</strong></p>
    <p>The purpose of this Agreement is to protect the confidentiality of certain information disclosed by the Disclosing Party.</p>

    <p><strong>2. Confidential Information Includes:</strong></p>
    <p>Business plans, marketing strategies, and technical documentation.</p>

    <p><strong>3. The Receiving Party Agrees:</strong></p>
    <p>Not to disclose confidential information to third parties, to use reasonable care in handling confidential information, and to return or destroy confidential materials upon request.</p>

    <p><strong>4. Exceptions</strong></p>
    <p>This Agreement does not apply to information that is publicly known or legally obtained from another source.</p>

    <p><strong>5. Governing Law:</strong></p>
    <p>This Agreement shall be governed by the laws of <u>India</u>.</p>

    <p>Contract ID: <strong>{{contract_id}}</strong></p>
    <p>Signed on: <em>{{date}}</em></p>

    <p>_________________________<br />
    <strong>{{name}}</strong><br />
    Disclosing Party</p>
  `);

  const [placeholders, setPlaceholders] = useState({
    name: 'Rahul Singh',
    date: '2025-07-15',
    address: '123 Main Street, New Delhi, India',
    contract_id: 'NDA-20250711-RAHUL',
  });

  const [showForm, setShowForm] = useState(true);
  const [hoveredSection, setHoveredSection] = useState(null);

  const handleInputChange = e => {
    setPlaceholders(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Arial',
      }}
    >
      <div
        style={{
          background: '#f0f0f0',
          padding: '10px 20px',
          borderBottom: '1px solid #ccc',
        }}
      >
        <h2>📝 Document Template Editor</h2>
      </div>

      <div
        style={{
          background: '#fafafa',
          padding: '10px 20px',
          borderBottom: '1px solid #ccc',
        }}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '8px 12px',
            background: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '10px',
          }}
        >
          {showForm ? 'Hide' : 'Show'} Placeholder Inputs
        </button>

        {showForm && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {Object.keys(placeholders).map(key => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: '250px',
                }}
              >
                <label style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {formatKeyLabel(key)}
                </label>
                <input
                  type="text"
                  name={key}
                  value={placeholders[key]}
                  onChange={handleInputChange}
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div
          style={{ flex: 1, padding: '10px', borderRight: '1px solid #ddd' }}
        >
          <TemplateEditor
            template={template}
            setTemplate={setTemplate}
            hoveredSection={hoveredSection}
            setHoveredSection={setHoveredSection}
          />
        </div>
        <div style={{ flex: 1, padding: '10px' }}>
          <TemplatePreview
            template={template}
            data={placeholders}
            hoveredSection={hoveredSection}
            setHoveredSection={setHoveredSection}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
