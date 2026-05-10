import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, Mail, MapPin, Phone, Globe, ArrowRight, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    country: '',
    additionalInfo: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || formData.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    setError('');
    setLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Use at least 6 characters.');
      } else {
        setError(`Failed to create account. ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0C10] p-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <span className="text-3xl font-bold text-white">T</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-[#8B8DA3]">Join Traveloop and start your adventure</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#15171C] rounded-2xl p-8 border border-[#1E2028] shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-[#8B8DA3]" />
                </div>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#1C1E26] border border-[#2a2a38] text-white placeholder-[#6b7280] focus:outline-none focus:border-primary transition-all"
                  placeholder="First Name"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-[#8B8DA3]" />
                </div>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#1C1E26] border border-[#2a2a38] text-white placeholder-[#6b7280] focus:outline-none focus:border-primary transition-all"
                  placeholder="Last Name"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-[#8B8DA3]" />
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#1C1E26] border border-[#2a2a38] text-white placeholder-[#6b7280] focus:outline-none focus:border-primary transition-all"
                  placeholder="Email Address"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone size={18} className="text-[#8B8DA3]" />
                </div>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#1C1E26] border border-[#2a2a38] text-white placeholder-[#6b7280] focus:outline-none focus:border-primary transition-all"
                  placeholder="Phone Number"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-[#8B8DA3]" />
                </div>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#1C1E26] border border-[#2a2a38] text-white placeholder-[#6b7280] focus:outline-none focus:border-primary transition-all"
                  placeholder="City"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Globe size={18} className="text-[#8B8DA3]" />
                </div>
                <input 
                  type="text" 
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#1C1E26] border border-[#2a2a38] text-white placeholder-[#6b7280] focus:outline-none focus:border-primary transition-all"
                  placeholder="Country"
                />
              </div>

              <div className="relative md:col-span-2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-[#8B8DA3]" />
                </div>
                <input 
                  type="password" 
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#1C1E26] border border-[#2a2a38] text-white placeholder-[#6b7280] focus:outline-none focus:border-primary transition-all"
                  placeholder="Password (min 6 characters)"
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                <FileText size={18} className="text-[#8B8DA3]" />
              </div>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows="4"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#1C1E26] border border-[#2a2a38] text-white placeholder-[#6b7280] focus:outline-none focus:border-primary transition-all resize-none"
                placeholder="Additional Information (e.g., allergies, travel preferences)..."
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-primary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> 
                  Creating Account...
                </>
              ) : (
                <>Create Account <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-[#8B8DA3]">Already have an account? </span>
            <Link to="/login" className="text-primary font-semibold hover:text-primary-dark transition-colors">Sign in</Link>
          </div>

          <div className="mt-6 pt-6 border-t border-[#1E2028]">
            <p className="text-center text-sm text-[#6b7280]">
              By creating an account, you agree to our <span className="text-primary cursor-pointer">Terms of Service</span> and <span className="text-primary cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;