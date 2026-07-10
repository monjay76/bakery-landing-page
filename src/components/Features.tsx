import { Hourglass, Wheat, Sun, Sprout } from 'lucide-react';

export default function Features() {
  const cards = [
    {
      icon: <Hourglass className="text-gold" size={24} />,
      title: '24-Hour Slow Rising',
      description: 'Our natural wild starters slowly consume the complex starches over a full day. This unlocks deep wild flavor notes and breaks down tough gluten chains, making every slice incredibly gentle on the tummy.',
    },
    {
      icon: <Wheat className="text-gold" size={24} />,
      title: 'Stone-Milled Heirloom Grains',
      description: 'We partner directly with certified organic, family-owned heritage farms. Stone-milled at gentle speeds, our flour keeps the nutrient-dense wheat germ and bran intact for true rustic nourishment.',
    },
    {
      icon: <Sun className="text-gold" size={24} />,
      title: 'Baked Fresh at Dawn',
      description: 'Our bready souls rise at 3:00 AM daily to kindle the wood hearth embers, ensuring warm crusty loaves are ready when the neighborhood wakes. We bake in small batches and serve with pure love.',
    },
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 border-b border-espresso/5 bg-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title Group */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest flex items-center justify-center gap-1">
            <Sprout size={12} />
            <span>Our Cozy Philosophy</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-espresso italic">
            Why Velvet Crumb Feels Like Home
          </h2>
          <p className="text-sm text-espresso-muted leading-relaxed">
            We reject mass production. Every loaf and buttery swirl we bake honors time, honest ingredients, and the meticulous craft of traditional hearth baking.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl border border-espresso/10 hover:border-gold/60 hover:shadow-md transition-all duration-300 space-y-5 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Rounded-full icon wrapper */}
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center transition-all group-hover:scale-105">
                  {card.icon}
                </div>
                <h3 className="text-lg font-display font-medium text-espresso group-hover:text-gold transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-espresso-muted leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
