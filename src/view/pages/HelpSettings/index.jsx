import React, { useState } from 'react';
import FAQSection from '../../components/HelpSettings/FAQSection';
import SettingsPanel from '../../components/HelpSettings/SettingsPanel';
import SupportForm from '../../components/HelpSettings/SupportForm';
import faqData from '../../../data/faq'; // Default import

// Basic styling for tabs
const tabButtonStyle = {
  padding: '10px 15px',
  cursor: 'pointer',
  border: '1px solid #ccc',
  borderBottom: 'none',
  marginRight: '5px',
  backgroundColor: '#f0f0f0',
  borderRadius: '5px 5px 0 0'
};

const activeTabButtonStyle = {
  ...tabButtonStyle,
  backgroundColor: '#fff',
  borderBottom: '1px solid #fff', // To make it look connected to content
};

const tabContentStyle = {
  border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '0 5px 5px 5px', // Rounded corners except top-left if first tab
};


const HelpSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('faq'); // 'faq', 'settings', 'support'

  const renderTabContent = () => {
    switch (activeTab) {
      case 'faq':
        return <FAQSection faqs={faqData} />;
      case 'settings':
        return <SettingsPanel />;
      case 'support':
        return <SupportForm />;
      default:
        return <FAQSection faqs={faqData} />;
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Help & Settings</h1>

      <div style={{ marginBottom: '0px' /* Negative margin to connect with content border */ }}>
        <button
          style={activeTab === 'faq' ? activeTabButtonStyle : tabButtonStyle}
          onClick={() => setActiveTab('faq')}
        >
          FAQ
        </button>
        <button
          style={activeTab === 'settings' ? activeTabButtonStyle : tabButtonStyle}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
        <button
          style={activeTab === 'support' ? activeTabButtonStyle : tabButtonStyle}
          onClick={() => setActiveTab('support')}
        >
          Contact Support
        </button>
      </div>

      <div style={tabContentStyle}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default HelpSettingsPage;
