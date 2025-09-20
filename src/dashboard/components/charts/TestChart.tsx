import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const testData = [
  { name: 'A', value: 10 },
  { name: 'B', value: 20 },
  { name: 'C', value: 15 },
  { name: 'D', value: 25 },
  { name: 'E', value: 30 }
];

export const TestChart: React.FC = () => {
  return (
    <div className="w-full h-64">
      <h3 className="text-lg font-semibold mb-4 text-center">Test Chart (Recharts Working)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={testData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
