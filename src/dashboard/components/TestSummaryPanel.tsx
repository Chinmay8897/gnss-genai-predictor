import React from 'react';

export const TestSummaryPanel: React.FC = () => {
  return (
    <div className="p-4 bg-red-500 text-white rounded-lg">
      <h3 className="text-lg font-bold">TEST SUMMARY PANEL</h3>
      <p>If you can see this red box, the Summary Panel is working!</p>
      <p>This should appear in the Results section at the bottom.</p>
    </div>
  );
};
