import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Satellite, BarChart3, Home } from 'lucide-react';

export const NavigationBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue flex items-center justify-center">
              <Satellite className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">
              Space Monitor
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button
                variant={location.pathname === '/' ? 'default' : 'ghost'}
                className={`flex items-center space-x-2 ${
                  location.pathname === '/' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-accent/20'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Homepage</span>
              </Button>
            </Link>
            
            <Link to="/dashboard">
              <Button
                variant={location.pathname === '/dashboard' ? 'default' : 'ghost'}
                className={`flex items-center space-x-2 ${
                  location.pathname === '/dashboard' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-accent/20'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
