import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const TeamSection: React.FC = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const team = [
    {
      name: "Rahul Sharma",
      role: "CEO & Founder",
      bio: "Former cricket analyst with 15+ years of experience in the sports gaming industry.",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    {
      name: "Priya Patel",
      role: "Head of Analytics",
      bio: "Cricket statistician who has worked with major leagues around the world.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Tech innovator with expertise in secure payment systems and AI-driven analytics.",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    {
      name: "Sarah Johnson",
      role: "Customer Experience",
      bio: "Dedicated to creating the most user-friendly gaming platform in the industry.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className={`py-20 relative overflow-hidden ${theme === 'dark' ? 'bg-[#0A1929]' : 'bg-gray-50'}`}
    >
      {/* Cricket themed pattern background */}
      <div className={`absolute inset-0 opacity-5`}>
        <div className={`absolute left-0 right-0 top-0 h-20 bg-gradient-to-b to-transparent ${theme === 'dark' ? 'from-white' : 'from-gray-400'}`}></div>
        <div className={`absolute left-0 right-0 bottom-0 h-20 bg-gradient-to-t to-transparent ${theme === 'dark' ? 'from-white' : 'from-gray-400'}`}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Meet Our Team</h2>
          <div className="w-20 h-1 bg-[#1A8754] mx-auto mb-6" />
          <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            The experts behind CrickWin's success, bringing together cricket knowledge and technological innovation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <TeamMember 
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
              delay={300 + (index * 150)}
              isVisible={isVisible}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  delay: number;
  isVisible: boolean;
  theme: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio, image, delay, isVisible, theme }) => {
  return (
    <div 
      className={`group rounded-xl overflow-hidden shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-[#0D3158] to-[#0A2540]' 
          : 'bg-white border border-gray-200'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden h-72">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t to-transparent opacity-70 ${theme === 'dark' ? 'from-[#0A2540]' : 'from-gray-900'}`}></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className={`text-xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-white'}`}>{name}</h3>
          <p className="text-[#F5B729] font-medium">{role}</p>
        </div>
      </div>
      
      <div className="p-6">
        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{bio}</p>
        
        <div className="flex space-x-3">
          <a href="#" className={`hover:text-[#F5B729] transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className={`hover:text-[#F5B729] transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className={`hover:text-[#F5B729] transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};