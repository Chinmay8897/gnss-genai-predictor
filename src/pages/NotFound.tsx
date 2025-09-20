import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Satellite } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue flex items-center justify-center">
            <Satellite className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page you're looking for seems to have drifted off into space. 
            Let's get you back to the mission control.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Go Home</span>
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="flex items-center space-x-2">
              <Satellite className="w-4 h-4" />
              <span>View Dashboard</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
