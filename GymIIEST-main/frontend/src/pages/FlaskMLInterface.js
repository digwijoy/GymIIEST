import React from 'react';

const FlaskMLInterface = () => {
    return (
        <div style={{ height: '100vh' }}>
            <iframe
                src="http://localhost:5000/"
                title="AI Analyser"
                width="100%"
                height="100%"
                style={{
                    border: 'none',
                    overflow: 'hidden'
                }}
            />
        </div>
    );
};

export default FlaskMLInterface;
