import React from 'react';

const styles = {
  banner: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    zIndex: 9999,
    padding: '6px 14px',
    background: 'rgba(0,0,0,0.75)',
    color: '#fff',
    fontSize: '13px',
    borderTopLeftRadius: '4px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
};

const DocsWrapper = ({ children }) => (
  <div>
    {children}
    {process.env.VITE_DOCS == 'true' && (
      <div style={styles.banner}>
        <a href="/" style={styles.link}>← Back to Homepage</a>
      </div>
    )}
  </div>
);

export default DocsWrapper;
