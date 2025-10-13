import React, { useEffect, useState } from 'react';
import { Users, Trophy, Calendar, MapPin } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const StatsCounter: React.FC = () => {
  const { theme } = useTheme();
  const [counts, setCounts] = useState({
    users: 0,
    tournaments: 0,
    experience: 0,
    countries: 0
  });
  
  const targets = {
    users: 15000,
    tournaments: 17,
    experience: 2,
    countries: 6
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        users: Math.min(prev.users + 5000, targets.users),
        tournaments: Math.min(prev.tournaments + 12, targets.tournaments),
        experience: Math.min(prev.experience + 0.1, targets.experience),
        countries: Math.min(prev.countries + 1, targets.countries)
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`py-12 ${theme === 'dark' ? 'bg-gradient-to-r from-[#0A2540] to-[#0D3158]' : 'bg-gradient-to-r from-blue-600 to-blue-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem 
            icon={<Users className="w-8 h-8 text-[#F5B729]" />} 
            value={`${(counts.users / 1000).toFixed(0)}K+`} 
            label="Active Users" 
            theme={theme}
          />
          <StatItem 
            icon={<Trophy className="w-8 h-8 text-[#F5B729]" />} 
            value={`${counts.tournaments}+`} 
            label="Tournaments Covered" 
            theme={theme}
          />
          <StatItem 
            icon={<Calendar className="w-8 h-8 text-[#F5B729]" />} 
            value={`${counts.experience.toFixed(1)}+`} 
            label="Years Experience" 
            theme={theme}
          />
          <StatItem 
            icon={<MapPin className="w-8 h-8 text-[#F5B729]" />} 
            value={`${counts.countries}+`} 
            label="Countries" 
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  theme: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, theme }) => {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="mb-4">{icon}</div>
      <div className={`text-3xl md:text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-white'}`}>{value}</div>
      <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-100'}`}>{label}</div>
    </div>
  );
};