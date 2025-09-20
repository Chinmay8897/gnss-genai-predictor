import React from 'react';
import { Dashboard } from '@/dashboard/components/Dashboard';

const DashboardPage: React.FC = () => {
  return (
    <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
