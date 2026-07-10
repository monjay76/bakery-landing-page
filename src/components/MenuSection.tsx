import { useState, FormEvent } from 'react';
import { ChevronRight, Sparkles, AlertTriangle, ShieldCheck, Clock, X, Heart, ShoppingBag } from 'lucide-react';
import { MenuItem, Reservation } from '../types';

interface MenuSectionProps {
  onAddReservation: (res: Omit<Reservation, 'id'>) => void;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'sourdough',
    name: 'Rosemary & Sea Salt Sourdough',
    price: '$9.50',
    category: 'bread',
    image: '/src/assets/images/sourdough_bread_1783650631174.jpg',
    description: 'Our signature hearth loaf, double-fermented for 24 hours to yield a robust, wild-blistered caramelized crust and a highly hydrated, pillowy interior crumb. Heavily infused with hand-crushed garden rosemary sprigs and showered with crystalline Maldon sea salt flakes.',
    details: {
      ingredients: ['Certified Organic Stone-Milled Wheat Flour', 'Filtered Spring Water', 'Century-old House Wild Yeast Starter', 'Fresh Organic Rosemary', 'Maldon Sea Salt'],
      allergens: ['Wheat Gluten'],
      tasteProfile: ['Savory Rosemary', 'Tangy Sourdough Ferment', 'Thick Salty Crust', 'Custardy Crumb'],
      prepTime: '24 Hours Double Fermentation',
    },
  },
  {
    id: 'croissant',
    name: 'Pistachio Cardamom Croissant',
    price: '$6.75',
    category: 'pastry',
    image: '/src/assets/images/pistachio_croissant_1783650642768.jpg',
    description: 'An elite double-bake croissant featuring 81 flaky, paper-thin butter-laminated layers made with premium AOP Charentes-Poitou cultured butter. Generously stuffed with a velvet, slow-roasted Sicilian pistachio cream paste flavored with cardamom seed oils, glazed and finished with crushed raw pistachios.',
    details: {
      ingredients: ['Organic Wheat Flour', 'AOP French Cultured Butter', 'House-roasted Sicilian Pistachio Paste', 'Ground Green Cardamom Pods', 'Organic Cane Sugar', 'Active Dry Yeast'],
      allergens: ['Wheat Gluten', 'Cow Milk Dairy', 'Tree Nuts (Pistachios)'],
      tasteProfile: ['Intensely Buttery', 'Toasted Nutty Paste', 'Citrusy Cardamom Aroma', 'Shatteringly Crispy'],
      prepTime: '18 Hours Slow Proofing',
    },
  },
  {
    id: 'canele',
    name: 'Smoked Vanilla Canele',
    price: '$4.50',
    category: 'confectionery',
    image: '/src/assets/images/smoked_canele_1783650652713.jpg',
    description: 'A masterpiece from Bordeaux with a modern sensory twist. Baked in solid copper molds coated with local beeswax and organic sweet butter to lock in a glassy, deeply caramelized bitter-sweet crust. Cold-infused with applewood vanilla bean smoke under a display cloche prior to service.',
    details: {
      ingredients: ['Organic Whole Milk', 'Organic Raw Cane Sugar', 'Pasture Egg Yolks', 'Wheat Flour', 'Aged Dark Rum', 'Madagascar Bourbon Vanilla Beans', 'Natural Local Beeswax'],
      allergens: ['Wheat Gluten', 'Cow Milk Dairy', 'Eggs', 'Alcohol Traces'],
      tasteProfile: ['Bitter-sweet Mahogany Crust', 'Rum & Custard Heart', 'Warm Woody Smoke', 'Floral Vanilla Pod'],
      prepTime: '48 Hours Batter Resting',
    },
  },
];

export default function MenuSection({ onAddReservation }: MenuSectionProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'bread' | 'pastry' | 'confectionery'>('all');
  
  // Reservation Form State
  const [resName, setResName] = useState('');
  const [resEmail, setResEmail] = useState('');
  const [resQty, setResQty] = useState(1);
  const [resTime, setResTime] = useState('07:30 AM');
  const [resCompleted, setResCompleted] = useState(false);

  const filteredItems = activeFilter === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeFilter);

  const handleOpenItem = (item: MenuItem) => {
    setSelectedItem(item);
    setResName('');
    setResEmail('');
    setResQty(1);
    setResTime('07:30 AM');
    setResCompleted(false);
  };

  const handleReserveSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !resName.trim() || !resEmail.trim()) return;

    onAddReservation({
      name: resName.trim(),
      email: resEmail.trim(),
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      quantity: resQty,
      pickupTime: resTime,
    });

    setResCompleted(true);
  };

  return (
    <section id="menu" className="py-20 lg:py-28 border-b border-espresso/5 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest flex items-center justify-center gap-1">
            <Heart size={12} className="text-gold fill-gold/20" />
            <span>Today's Hearth Offerings</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-espresso italic">
            Gather Around the Bakery Table
          </h2>
          <p className="text-sm text-espresso-muted leading-relaxed">
            Each delicious bake is hand-folded, slow-proved, and stone-baked with absolute care. Tap any item below to explore its secret recipe, wholesome ingredients, or to pre-order a warm morning portion.
          </p>
        </div>

        {/* Menu Filters */}
        <div className="flex flex-wrap justify-center gap-3 border-b border-espresso/5 pb-6 max-w-md mx-auto">
          {(['all', 'bread', 'pastry', 'confectionery'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all border ${
                activeFilter === filter
                  ? 'bg-gold text-white border-gold shadow-sm'
                  : 'text-espresso/75 bg-white border-espresso/10 hover:border-gold hover:text-espresso'
              }`}
            >
              {filter === 'all' ? 'Show All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenItem(item)}
              className="bg-white rounded-3xl overflow-hidden border border-espresso/10 hover:border-gold/50 hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between p-3"
            >
              <div className="space-y-4">
                <div className="aspect-[4/3] overflow-hidden relative bg-[#FAF6F0] rounded-2xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
                  <span className="absolute top-4 right-4 bg-[#5C4033] text-gold font-mono text-xs font-bold py-1 px-3.5 border border-espresso/10 rounded-full">
                    {item.price}
                  </span>
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 bg-[#FAF6F0]/95 backdrop-blur-md text-[9px] font-medium text-espresso px-2.5 py-1 border border-espresso/5 rounded-full">
                    <Clock size={10} className="text-gold" />
                    <span>{item.details.prepTime}</span>
                  </span>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-medium bg-gold/10 text-[#5C4033] px-2.5 py-0.5 rounded-full border border-gold/10">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-medium italic text-espresso-muted">Rustic Handcraft</span>
                  </div>
                  <h3 className="text-base font-display font-semibold text-espresso group-hover:text-gold transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-espresso-muted leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between border-t border-dashed border-espresso/10 mt-3">
                <span className="text-[10px] font-medium text-gold">
                  Baker's notes & secrets
                </span>
                <span className="text-gold group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                  <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Window for Item Details & Reservation */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-espresso/60 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            />

            {/* Modal Body */}
            <div className="relative bg-[#FAF6F0] max-w-4xl w-full max-h-[95vh] rounded-3xl overflow-y-auto border border-espresso/10 shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 p-3 sm:p-4">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-20 w-8 h-8 rounded-full bg-white flex items-center justify-center text-espresso hover:text-gold border border-espresso/10 shadow-sm"
              >
                <X size={14} />
              </button>

              {/* Left Side: Image & Fast Info */}
              <div className="md:col-span-5 relative bg-[#FAF6F0] min-h-[280px] md:min-h-full border-r border-espresso/5 rounded-2xl overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover absolute inset-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-cream space-y-2">
                  <span className="inline-flex items-center gap-1 bg-gold text-white text-[9px] font-bold px-2.5 py-1 rounded-full border border-gold/20">
                    <Sparkles size={8} className="animate-pulse" />
                    <span>Highly Requested</span>
                  </span>
                  <h3 className="text-xl font-display font-medium leading-tight">{selectedItem.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-mono font-bold text-gold">{selectedItem.price}</span>
                    <span className="text-xs font-mono text-cream/75">{selectedItem.details.prepTime}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Detailed Ingredients & Quick Reservation Form */}
              <div className="md:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-white rounded-2xl">
                
                {/* Description & Specs */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[11px] font-semibold text-espresso/50 uppercase tracking-wider mb-1">Baker's Notes</h4>
                    <p className="text-xs text-espresso-muted leading-relaxed">{selectedItem.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-dashed border-espresso/10 py-4">
                    {/* Ingredients List */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-semibold text-gold uppercase tracking-wider">Wholesome Ingredients</h4>
                      <ul className="text-[11px] text-espresso-muted space-y-0.5">
                        {selectedItem.details.ingredients.map((ing, i) => (
                          <li key={i}>• {ing}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Allergens & Flavor Profile */}
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold text-gold uppercase tracking-wider flex items-center gap-1">
                          <AlertTriangle size={12} className="text-amber-500" />
                          <span>Allergens</span>
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedItem.details.allergens.map((all, i) => (
                            <span key={i} className="text-[9px] font-medium bg-red-50 text-red-700 px-2.5 py-0.5 border border-red-150 rounded-full">
                              {all}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold text-gold uppercase tracking-wider flex items-center gap-1">
                          <ShieldCheck size={12} className="text-green-500" />
                          <span>Flavor Spectrum</span>
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedItem.details.tasteProfile.map((taste, i) => (
                            <span key={i} className="text-[9px] font-medium bg-[#FAF6F0] text-espresso border border-espresso/15 px-2.5 py-0.5 rounded-full">
                              {taste}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pre-Order reservation Form */}
                <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-dashed border-espresso/15 space-y-4">
                  {!resCompleted ? (
                    <form onSubmit={handleReserveSubmit} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-espresso flex items-center gap-1.5">
                          <ShoppingBag size={12} className="text-gold" />
                          <span>Reserve tomorrow's fresh batch</span>
                        </h4>
                        <span className="text-[9px] text-espresso-muted font-semibold">Limited batches</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          value={resName}
                          onChange={(e) => setResName(e.target.value)}
                          placeholder="Your Name"
                          className="bg-white border border-espresso/15 rounded-full px-4 py-2.5 text-xs text-espresso outline-none focus:ring-1 focus:ring-gold"
                        />
                        <input
                          type="email"
                          required
                          value={resEmail}
                          onChange={(e) => setResEmail(e.target.value)}
                          placeholder="Your Email"
                          className="bg-white border border-espresso/15 rounded-full px-4 py-2.5 text-xs text-espresso outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 items-center">
                        <div className="flex items-center justify-between bg-white border border-espresso/15 rounded-full px-4 py-2 h-full">
                          <span className="text-[11px] text-espresso-muted">Qty</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setResQty(Math.max(1, resQty - 1))}
                              className="w-5 h-5 rounded-full bg-espresso/5 text-espresso font-bold text-xs flex items-center justify-center hover:bg-espresso/10 transition-colors"
                            >
                              -
                            </button>
                            <span className="text-xs font-mono font-bold text-espresso">{resQty}</span>
                            <button
                              type="button"
                              onClick={() => setResQty(Math.min(5, resQty + 1))}
                              className="w-5 h-5 rounded-full bg-espresso/5 text-espresso font-bold text-xs flex items-center justify-center hover:bg-espresso/10 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <select
                          value={resTime}
                          onChange={(e) => setResTime(e.target.value)}
                          className="bg-white border border-espresso/15 rounded-full px-4 py-2.5 text-xs text-espresso outline-none focus:ring-1 focus:ring-gold h-full"
                        >
                          <option value="06:30 AM">06:30 AM (Hearth-Opening)</option>
                          <option value="07:30 AM">07:30 AM (Breakfast Rush)</option>
                          <option value="09:00 AM">09:00 AM</option>
                          <option value="11:30 AM">11:30 AM</option>
                          <option value="01:00 PM">01:00 PM (Oven Closing)</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gold hover:bg-[#C29E2E] text-white font-medium text-xs py-3 rounded-full transition-all shadow-sm flex items-center justify-center gap-1 hover:shadow"
                      >
                        <span>Reserve My Portions</span>
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-4 space-y-2 animate-scale-up">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-gold/10 text-gold rounded-full border border-gold/20">
                        <ShieldCheck size={20} />
                      </div>
                      <h5 className="text-sm font-display font-bold text-espresso">Secured & Proofing!</h5>
                      <p className="text-xs text-espresso-muted max-w-md mx-auto leading-relaxed">
                        Portion size: <strong>{resQty}x {selectedItem.name}</strong>. Pick up tomorrow at <strong>{resTime}</strong>. We will keep your portions fresh and warm in our proofing lockers!
                      </p>
                      <button
                        onClick={() => setSelectedItem(null)}
                        className="text-xs text-gold hover:underline font-bold"
                      >
                        Back to Menu
                      </button>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
