import React, { useState } from 'react';

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #eee', marginBottom: '10px', paddingBottom: '10px' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', fontSize: '1.1em', cursor: 'pointer', padding: '5px 0' }}
      >
        <strong>{faq.question}</strong> {isOpen ? '-' : '+'}
      </button>
      {isOpen && <p style={{ marginTop: '5px', paddingLeft: '10px', color: '#333' }}>{faq.answer}</p>}
    </div>
  );
};

const FAQSection = ({ faqs }) => {
  return (
    <div>
      <h3>Frequently Asked Questions</h3>
      {faqs && faqs.length > 0 ? (
        faqs.map(faq => <FAQItem key={faq.id} faq={faq} />)
      ) : (
        <p>No FAQs available at the moment.</p>
      )}
    </div>
  );
};

export default FAQSection;
