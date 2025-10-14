import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signInImage, setSignInImage] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchSignInImage = async () => {
      const { data, error } = await supabase
        .from('sign_in_image')
        .select('image_url')
        .eq('is_active', true)
        .maybeSingle();

      if (data && !error) {
        setSignInImage(data.image_url);
      }
    };

    fetchSignInImage();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign in');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0A1929]' : 'bg-gray-50'}`}>
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A8754]/20 to-[#F5B729]/20"></div>
          {signInImage ? (
            <img
              src={signInImage}
              alt="Cricket"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-[#0A2540]' : 'bg-gray-200'}`}>
              <div className="text-center">
                <LogIn className={`w-32 h-32 mx-auto mb-4 ${isDark ? 'text-[#F5B729]' : 'text-[#1A8754]'}`} />
                <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Welcome Back</h2>
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full">
            <div className={`${isDark ? 'bg-gradient-to-br from-[#0A2540] to-[#0D3158] border-[#1A3A5C]' : 'bg-white border-gray-200'} p-8 rounded-xl shadow-2xl border`}>
              <div className="flex items-center justify-center mb-8">
                <div className={`${isDark ? 'bg-[#1A8754]/10' : 'bg-[#1A8754]/20'} p-4 rounded-xl ${isDark ? 'text-[#F5B729]' : 'text-[#1A8754]'}`}>
                  <LogIn className="w-12 h-12" />
                </div>
              </div>

              <h2 className={`text-3xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>Welcome Back</h2>

              {error && (
                <div className={`${isDark ? 'bg-red-900/20 border-red-500 text-red-500' : 'bg-red-50 border-red-300 text-red-700'} border px-4 py-3 rounded-lg mb-6`}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 ${isDark ? 'bg-[#0A1929] border-[#1A3A5C] text-white placeholder-gray-400 focus:border-[#F5B729]' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#1A8754]'} border rounded-lg focus:outline-none transition-colors`}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 ${isDark ? 'bg-[#0A1929] border-[#1A3A5C] text-white placeholder-gray-400 focus:border-[#F5B729]' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#1A8754]'} border rounded-lg focus:outline-none transition-colors`}
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 ${isDark ? 'bg-[#F5B729] text-[#0A2540] hover:bg-[#E3A82A]' : 'bg-[#1A8754] text-white hover:bg-[#156642]'} font-bold rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2`}
                >
                  {loading ? (
                    <div className={`w-6 h-6 border-2 ${isDark ? 'border-[#0A2540]' : 'border-white'} border-t-transparent rounded-full animate-spin`}></div>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Don't have an account?{' '}
                  <Link to="/register" className={`${isDark ? 'text-[#F5B729] hover:text-[#E3A82A]' : 'text-[#1A8754] hover:text-[#156642]'} transition-colors`}>
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
