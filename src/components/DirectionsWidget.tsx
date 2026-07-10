import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Compass, Navigation } from 'lucide-react';

interface RouteData {
  distance: string;
  duration: string;
  steps: string[];
}

const ROUTES: Record<string, RouteData> = {
  ferry: {
    distance: '1.2 miles',
    duration: '18 minutes',
    steps: [
      'Head southwest along Market St toward Spear St (0.3 miles)',
      'Turn left onto New Montgomery St (0.2 miles)',
      'Slight right onto Hawthorne St, taking in the skyscrapers (0.1 miles)',
      'Turn right onto Folsom St (0.4 miles)',
      'Turn left onto Crumb Lane; follow the aroma of caramelized yeast (0.2 miles)',
      'Arrived! Look for our warm gold-lit wood signage on the right.'
    ],
  },
  mission: {
    distance: '0.9 miles',
    duration: '14 minutes',
    steps: [
      'Exit Mission Dolores Park heading northeast on 18th St (0.2 miles)',
      'Turn left onto Valencia St (0.3 miles)',
      'Turn right onto 16th St past local coffee houses (0.2 miles)',
      'Turn left onto Crumb Lane (0.2 miles)',
      'Arrived! Welcome to The Velvet Crumb.'
    ],
  },
  union: {
    distance: '1.1 miles',
    duration: '16 minutes',
    steps: [
      'Head southeast on Powell St toward Geary St (0.1 miles)',
      'Turn right onto Market St (0.3 miles)',
      'Slight left onto 6th St (0.4 miles)',
      'Turn right onto Folsom St, then turn left onto Crumb Lane (0.3 miles)',
      'The bakery is nestled in the ivy-covered brick alleyway.'
    ],
  },
  valencia: {
    distance: '0.7 miles',
    duration: '11 minutes',
    steps: [
      'Walk east along 16th St toward Mission St (0.2 miles)',
      'Slight left onto Folsom St (0.3 miles)',
      'Turn right onto Crumb Lane; look for our active neon sourdough lantern (0.2 miles)',
      'Welcome inside! Grab a warm slice.'
    ],
  },
};

export default function DirectionsWidget() {
  const [startPoint, setStartPoint] = useState<string>('ferry');
  const [route, setRoute] = useState<RouteData | null>(null);

  const handleCalculate = () => {
    setRoute(ROUTES[startPoint] || null);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-cream border-b border-espresso/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Block: Contact Details & Hours */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-gold uppercase tracking-widest block">
                Visit our Hearth
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-espresso italic">
                Where to Find the Warm Bread
              </h2>
              <p className="text-sm text-espresso-muted leading-relaxed">
                We are tucked away in the historic ivy-covered brick alleyways of the Pastry District. If you get turned around, simply follow the sweet scent of baking vanilla beans and toasted flour.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Address */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-gold uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin size={12} />
                  <span>Bakery Address</span>
                </h4>
                <p className="text-sm font-semibold text-espresso">123 Crumb Lane</p>
                <p className="text-xs text-espresso-muted">Pastry District, SF 94103</p>
              </div>

              {/* Direct line */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-gold uppercase tracking-wider flex items-center gap-1.5">
                  <Phone size={12} />
                  <span>Get In Touch</span>
                </h4>
                <p className="text-sm font-semibold text-espresso">hello@velvetcrumb.com</p>
                <p className="text-xs text-espresso-muted">(415) 555-0142</p>
              </div>

              {/* Opening schedule */}
              <div className="space-y-2 sm:col-span-2 border-t border-dashed border-espresso/15 pt-4">
                <h4 className="text-xs font-semibold text-gold uppercase tracking-wider flex items-center gap-1.5">
                  <Clock size={12} />
                  <span>Oven Operating Hours</span>
                </h4>
                <div className="text-xs space-y-1.5 font-medium text-espresso max-w-sm">
                  <div className="flex justify-between">
                    <span className="text-espresso/70">Wednesday – Friday:</span>
                    <span className="font-semibold">6:30 AM – 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-espresso/70">Saturday – Sunday:</span>
                    <span className="font-semibold">7:00 AM – 3:00 PM</span>
                  </div>
                  <div className="flex justify-between text-[#8E7047] font-semibold">
                    <span>Monday – Tuesday:</span>
                    <span className="italic text-xs">Closed (Feeding Wild Starters)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Walking routing machine */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-espresso/10 shadow-sm space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-display font-medium text-espresso flex items-center gap-2">
                <Compass size={16} className="text-gold" />
                <span>Walking Directions</span>
              </h3>
              <p className="text-xs text-espresso-muted">
                Choose your starting park or corridor in the city, and calculate the fastest path to warm sourdough.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="start-point-select" className="block text-xs font-medium text-espresso/70">
                  Select Your Starting Point
                </label>
                <select
                  id="start-point-select"
                  value={startPoint}
                  onChange={(e) => setStartPoint(e.target.value)}
                  className="w-full bg-white border border-espresso/15 focus:ring-1 focus:ring-gold rounded-full px-4 py-3 text-xs text-espresso outline-none cursor-pointer"
                >
                  <option value="ferry">Ferry Building (Market St)</option>
                  <option value="mission">Mission Dolores Park</option>
                  <option value="union">Union Square Park</option>
                  <option value="valencia">Valencia Corridor (16th St)</option>
                </select>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full bg-gold hover:bg-[#C29E2E] text-white font-semibold text-xs py-3.5 rounded-full transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
              >
                <Navigation size={12} className="text-white" />
                <span>Calculate Pedestrian Path</span>
              </button>
            </div>

            {/* Route calculations output */}
            {route && (
              <div className="border-t border-dashed border-espresso/15 pt-4 space-y-4 animate-scale-up">
                <div className="flex justify-between items-center text-xs text-espresso-muted bg-[#FAF6F0] p-4 rounded-2xl border border-dashed border-espresso/15">
                  <span>🚶 Distance: <strong className="text-espresso font-bold">{route.distance}</strong></span>
                  <span>⏱️ Walk Time: <strong className="text-espresso font-bold">{route.duration}</strong></span>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-xs font-semibold text-gold uppercase tracking-wider">Your Walking Steps</h5>
                  <ol className="list-decimal list-inside text-xs text-espresso-muted space-y-2 pl-1 leading-relaxed">
                    {route.steps.map((step, idx) => (
                      <li key={idx} className="py-1 border-b border-espresso/5 last:border-b-0">
                        <span className="text-espresso pl-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
