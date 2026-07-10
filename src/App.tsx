import { useState, useEffect } from 'react';
import { Lead, Reservation, Testimonial } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import MenuSection from './components/MenuSection';
import Testimonials from './components/Testimonials';
import DirectionsWidget from './components/DirectionsWidget';
import Footer from './components/Footer';
import ExporterModal from './components/ExporterModal';
import LeadDashboard from './components/LeadDashboard';

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Eleanor Davies',
    role: 'Neighborhood Resident',
    rating: 5,
    comment: 'The Rosemary Sourdough is an absolute masterpiece. The crust is crispy and dark, while the inside remains pillowy and incredibly fragrant. I walk three blocks out of my way every Saturday morning just for a hot loaf.',
    avatarSeed: 'eleanor',
    date: '3 days ago'
  },
  {
    id: 't-2',
    name: 'Marcus Chen',
    role: 'Local Pastry Critic',
    rating: 5,
    comment: 'The Pistachio Cardamom Croissant is purely celestial. You can see the hundreds of paper-thin layers of butter lamination. Combined with the cardomom aroma and the rich pistachio filling, it\'s easily the best pastry in the state.',
    avatarSeed: 'marcus',
    date: 'Last week'
  },
  {
    id: 't-3',
    name: 'Sophia Kincaid',
    role: 'Baking Blogger',
    rating: 5,
    comment: 'They serve the smoked vanilla canele in a little glass cloche that holds the applewood vanilla smoke. It\'s theatrical, aromatic, and absolutely delicious. This shop combines deep tradition with incredible artistry.',
    avatarSeed: 'sophia',
    date: '2 weeks ago'
  }
];

export default function App() {
  // Modals visibility state
  const [isExporterOpen, setIsExporterOpen] = useState(false);
  const [isLeadsOpen, setIsLeadsOpen] = useState(false);

  // Business core state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    const cachedLeads = localStorage.getItem('vc_leads');
    const cachedReservations = localStorage.getItem('vc_reservations');
    const cachedTestimonials = localStorage.getItem('vc_testimonials');

    if (cachedLeads) {
      setLeads(JSON.parse(cachedLeads));
    }
    if (cachedReservations) {
      setReservations(JSON.parse(cachedReservations));
    }
    if (cachedTestimonials) {
      setTestimonials(JSON.parse(cachedTestimonials));
    } else {
      setTestimonials(DEFAULT_TESTIMONIALS);
    }
  }, []);

  // Sync state to localStorage
  const saveLeads = (newLeads: Lead[]) => {
    setLeads(newLeads);
    localStorage.setItem('vc_leads', JSON.stringify(newLeads));
  };

  const saveReservations = (newReservations: Reservation[]) => {
    setReservations(newReservations);
    localStorage.setItem('vc_reservations', JSON.stringify(newReservations));
  };

  const saveTestimonials = (newTestimonials: Testimonial[]) => {
    setTestimonials(newTestimonials);
    localStorage.setItem('vc_testimonials', JSON.stringify(newTestimonials));
  };

  // Add a new lead captured in Hero
  const handleAddLead = (rawLead: Omit<Lead, 'id' | 'timestamp' | 'couponCode'>) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newLeadRecord: Lead = {
      id: `lead-${Date.now()}`,
      firstName: rawLead.firstName,
      email: rawLead.email,
      timestamp: formattedDate,
      couponCode: 'VELVET10VIP',
    };

    saveLeads([newLeadRecord, ...leads]);
  };

  // Add a new pre-order reservation from Menu
  const handleAddReservation = (rawRes: Omit<Reservation, 'id'>) => {
    const newReservationRecord: Reservation = {
      id: `res-${Date.now()}`,
      ...rawRes,
    };

    saveReservations([newReservationRecord, ...reservations]);
  };

  // Add a review published in Testimonials
  const handleAddTestimonial = (rawTest: Omit<Testimonial, 'id' | 'date' | 'avatarSeed'>) => {
    const newTestimonialRecord: Testimonial = {
      id: `t-${Date.now()}`,
      name: rawTest.name,
      role: rawTest.role,
      rating: rawTest.rating,
      comment: rawTest.comment,
      avatarSeed: `user-${Date.now()}`,
      date: 'Just now',
    };

    saveTestimonials([newTestimonialRecord, ...testimonials]);
  };

  // Administrative Reset of Sandbox storage
  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all collected leads and pre-orders?')) {
      saveLeads([]);
      saveReservations([]);
      saveTestimonials(DEFAULT_TESTIMONIALS);
      setIsLeadsOpen(false);
    }
  };

  return (
    <div className="bg-cream text-espresso font-sans antialiased min-h-screen selection:bg-gold/30 selection:text-espresso">
      {/* Exporter Notification Bar */}
      <div className="bg-espresso text-cream text-[11px] font-medium py-1.5 px-4 text-center border-b border-espresso/15 flex items-center justify-center gap-2">
        <span>📦 Looking for GitHub Pages code?</span>
        <button 
          onClick={() => setIsExporterOpen(true)}
          className="text-gold font-bold underline hover:text-gold-hover focus:outline-none transition-colors"
        >
          View/Copy Static Single-File HTML
        </button>
      </div>

      {/* Primary Header */}
      <Header
        onOpenExporter={() => setIsExporterOpen(true)}
        onOpenLeads={() => setIsLeadsOpen(true)}
        leadCount={leads.length + reservations.length}
      />

      {/* Main Sections content */}
      <main>
        <Hero onAddLead={handleAddLead} />
        <Features />
        <MenuSection onAddReservation={handleAddReservation} />
        <Testimonials testimonials={testimonials} onAddTestimonial={handleAddTestimonial} />
        <DirectionsWidget />
      </main>

      {/* Standard Footer */}
      <Footer />

      {/* Standalone Single-File Exporter Modal */}
      <ExporterModal
        isOpen={isExporterOpen}
        onClose={() => setIsExporterOpen(false)}
      />

      {/* Business Owner Leads center Panel Overlay */}
      <LeadDashboard
        isOpen={isLeadsOpen}
        onClose={() => setIsLeadsOpen(false)}
        leads={leads}
        reservations={reservations}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
