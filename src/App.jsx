import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateTrip from './pages/CreateTrip';
import Trips from './pages/Trips';
import BuildItinerary from './pages/BuildItinerary';
import UserTrips from './pages/UserTrips';
import UserProfile from './pages/UserProfile';
import ActivitySearch from './pages/ActivitySearch';
import ItineraryView from './pages/ItineraryView';
import Community from './pages/Community';
import PackingChecklist from './pages/PackingChecklist';
import AdminPanel from './pages/AdminPanel';
import TripNotes from './pages/TripNotes';
import BudgetTable from './pages/BudgetTable';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/my-trips" element={<UserTrips />} />
          <Route path="/build-itinerary" element={<BuildItinerary />} />
          <Route path="/itinerary" element={<ItineraryView />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/activities" element={<ActivitySearch />} />
          <Route path="/community" element={<Community />} />
          <Route path="/checklist" element={<PackingChecklist />} />
          <Route path="/journal" element={<TripNotes />} />
          <Route path="/budget" element={<BudgetTable />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
