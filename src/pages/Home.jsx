import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, MapPin, Calendar, Plus, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const regions = [
    { id: 1, name: 'Europe', image: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=600&auto=format&fit=crop' },
    { id: 2, name: 'Asia', image: 'https://images.unsplash.com/photo-1535139262971-c5184570f812?q=80&w=600&auto=format&fit=crop' },
    { id: 3, name: 'Americas', image: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=600&auto=format&fit=crop' },
    { id: 4, name: 'Africa', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=600&auto=format&fit=crop' },
    { id: 5, name: 'Oceania', image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=600&auto=format&fit=crop' },
  ];

  const previousTrips = [
    { id: 1, name: 'Kyoto Spring', date: 'Mar 2025', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop' },
    { id: 2, name: 'Swiss Alps', date: 'Dec 2024', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=600&auto=format&fit=crop' },
    { id: 3, name: 'Bali Retreat', date: 'Aug 2024', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0B0C10', color: 'white' }}>
      <div style={{ width: '100%', maxWidth: '72rem', margin: '0 auto', padding: '1.5rem' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', background: 'linear-gradient(to right, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Traveloop
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/login" style={{ padding: '0.625rem 1.25rem', background: 'linear-gradient(to right, #8b5cf6, #ec4899)', color: 'white', fontWeight: '600', borderRadius: '0.75rem', textDecoration: 'none' }}>
              Sign In
            </Link>
          </div>
        </nav>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%', height: '450px', borderRadius: '1.5rem', overflow: 'hidden', position: 'relative', marginBottom: '2.5rem' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Destination" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>Discover the extraordinary.</h1>
            <p style={{ fontSize: '1.125rem', color: '#d1d5db', maxWidth: '32rem' }}>Plan your perfect itinerary, explore top destinations, and keep all your travel details in one seamless loop.</p>
          </div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '1.25rem', transform: 'translateY(-50%)', color: '#8B8DA3' }}>
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Where do you want to go?" 
              style={{ width: '100%', paddingLeft: '3.5rem', paddingRight: '1rem', paddingTop: '1rem', paddingBottom: '1rem', borderRadius: '1rem', backgroundColor: '#1C1E26', border: '1px solid #2a2a38', color: 'white', fontSize: '1rem', fontWeight: '500' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1.5rem' }}>Top Regional Selections</h2>
          <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1.5rem' }}>
            {regions.map((region) => (
              <div key={region.id} style={{ width: '160px', height: '160px', borderRadius: '1rem', overflow: 'hidden', position: 'relative', cursor: 'pointer', flexShrink: 0, border: '1px solid #1E2028' }}>
                <img src={region.image} alt={region.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)', display: 'flex', alignItems: 'flex-end', padding: '1rem' }}>
                  <span style={{ color: 'white', fontWeight: '700', fontSize: '1.125rem' }}>{region.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1.5rem' }}>Popular Destinations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {[
              { name: 'Santorini, Greece', desc: 'Beautiful sunset views and white buildings', price: '$1,200', img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop' },
              { name: 'Bali, Indonesia', desc: 'Tropical paradise with rich culture', price: '$850', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop' },
              { name: 'Swiss Alps', desc: 'Breathtaking mountain scenery', price: '$2,100', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=600&auto=format&fit=crop' },
            ].map((dest, idx) => (
              <div key={idx} style={{ backgroundColor: '#15171C', borderRadius: '1rem', overflow: 'hidden', border: '1px solid #1E2028' }}>
                <div style={{ height: '192px', overflow: 'hidden' }}>
                  <img src={dest.img} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'white', marginBottom: '0.25rem' }}>{dest.name}</h3>
                  <p style={{ color: '#8B8DA3', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{dest.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#8b5cf6', fontWeight: '700' }}>{dest.price}</span>
                    <button style={{ padding: '0.5rem 1rem', background: 'linear-gradient(to right, #8b5cf6, #ec4899)', color: 'white', fontSize: '0.875rem', fontWeight: '500', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50 }}>
          <Link to="/create-trip" style={{ padding: '1rem 2rem', background: 'linear-gradient(to right, #8b5cf6, #ec4899)', color: 'white', fontWeight: '700', borderRadius: '9999px', boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '0.25rem' }}><Plus size={20} /></div> Plan a trip
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;