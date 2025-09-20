import React from 'react';
import SatelliteDashboard from '@/homepage/components/SatelliteDashboard';

const Homepage: React.FC = () => {
  return (
    <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
      <SatelliteDashboard />
    </div>
  );
};

export default Homepage;
