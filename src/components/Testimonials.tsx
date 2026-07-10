import { useState, FormEvent } from 'react';
import { Star, MessageSquare, Plus, Check, X } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
  onAddTestimonial: (test: Omit<Testimonial, 'id' | 'date' | 'avatarSeed'>) => void;
}

export default function Testimonials({ testimonials, onAddTestimonial }: TestimonialsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Local Neighbor');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    onAddTestimonial({
      name: name.trim(),
      role: role.trim(),
      rating,
      comment: comment.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setName('');
      setRole('Local Neighbor');
      setRating(5);
      setComment('');
      setSubmitted(false);
    }, 2000);
  };

  return (
    <section id="testimonials" className="py-20 lg:py-28 border-b border-espresso/5 bg-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-semibold text-gold uppercase tracking-widest block">
              Stories from the Hearth
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-espresso italic">
              Our Guest Journal
            </h2>
            <p className="text-sm text-espresso-muted">
              Step into the warm, honey-scented air described by local regular customers, weekend early-birds, and kitchen dreamers who visit us for their daily nourishment.
            </p>
          </div>

          {/* Write Review Trigger */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="self-start md:self-end flex items-center gap-2 bg-gold hover:bg-[#C29E2E] text-white px-6 py-3 rounded-full text-xs font-semibold shadow-sm transition-all hover:shadow"
          >
            <Plus size={14} />
            <span>Sign the Guestbook</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-white p-8 rounded-3xl border border-espresso/10 shadow-sm hover:shadow-md hover:border-gold/40 transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                {/* Stars Indicator */}
                <div className="flex text-gold gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < test.rating ? 'currentColor' : 'none'}
                      className={i < test.rating ? 'text-gold' : 'text-espresso/10'}
                    />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-espresso-muted italic leading-relaxed group-hover:text-espresso transition-colors">
                  "{test.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3 border-t border-dashed border-espresso/10 pt-4 mt-2">
                <div className="w-10 h-10 rounded-full border border-espresso/10 bg-[#FAF6F0] flex items-center justify-center font-display font-bold text-[#5C4033] text-xs uppercase">
                  {test.name.substring(0, 2)}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-espresso">{test.name}</h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-espresso-muted">
                    <span>{test.role}</span>
                    <span>•</span>
                    <span>{test.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Write a Review Overlay Form */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            
            <div className="relative bg-[#FAF6F0] max-w-md w-full rounded-3xl p-6 sm:p-8 border border-espresso/10 shadow-2xl z-10 animate-scale-up">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white hover:bg-[#FAF6F0] flex items-center justify-center border border-espresso/10 text-espresso"
              >
                <X size={14} />
              </button>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-display font-medium text-espresso flex items-center gap-2">
                      <MessageSquare size={16} className="text-gold" />
                      <span>Write in our Guestbook</span>
                    </h3>
                    <p className="text-xs text-espresso-muted">Your sweet words fuel our baking hands when we arrive at 3:00 AM!</p>
                  </div>

                  <div className="space-y-3">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-medium text-espresso/70">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Amelie Poulain"
                        className="w-full bg-white border border-espresso/15 rounded-full px-4 py-2.5 text-xs text-espresso outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>

                    {/* Role */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-medium text-espresso/70">Your Neighborhood / Role</label>
                      <input
                        type="text"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Bread basket regular"
                        className="w-full bg-white border border-espresso/15 rounded-full px-4 py-2.5 text-xs text-espresso outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>

                    {/* Rating star picker */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-medium text-espresso/70">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((starVal) => (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => setRating(starVal)}
                            className="text-gold focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star size={20} fill={starVal <= rating ? 'currentColor' : 'none'} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Review text */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-medium text-espresso/70">Your Thoughts</label>
                      <textarea
                        required
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Describe the aroma of our sourdough, the layers of our cardamom croissants, or the cozy woodland feeling of the bakery..."
                        className="w-full bg-white border border-espresso/15 rounded-2xl p-4 text-xs text-espresso outline-none resize-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-[#C29E2E] text-white font-medium text-xs py-3 rounded-full transition-all shadow-sm hover:shadow"
                  >
                    <span>Post in Guest Journal</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4 animate-scale-up">
                  <div className="w-10 h-10 bg-gold/10 text-gold rounded-full flex items-center justify-center border border-gold/20 mx-auto">
                    <Check size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-display font-bold text-espresso">Review Recorded!</h4>
                    <p className="text-xs text-espresso-muted">Thank you. Your beautiful words have been hung on our guestbook wall.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
