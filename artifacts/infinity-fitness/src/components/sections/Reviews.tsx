import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Reveal } from '../ui/reveal';

const reviews = [
  {
    name: "Vikram S.",
    role: "Member for 2 years",
    content: "Best gym in Rishi Nagar area. The equipment is always clean, the trainers actually pay attention, and the vibe is perfect for serious lifting. Worth every rupee.",
    rating: 5
  },
  {
    name: "Rahul Verma",
    role: "Member for 6 months",
    content: "Joined for weight loss and already down 8kg. The community here pushes you to do better. Not overcrowded during morning hours which I love.",
    rating: 5
  },
  {
    name: "Amit Kumar",
    role: "Member for 1 year",
    content: "Affordable fee structure and great machines. The evening energy is insane, exactly what you need after a long day at work to get fired up.",
    rating: 4
  }
];

export const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative large quotes */}
      <div className="absolute -top-10 -left-10 text-[20rem] text-secondary/30 font-serif leading-none select-none pointer-events-none z-0">
        "
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4">
            <Reveal direction="right">
              <h3 className="text-primary font-display tracking-widest uppercase text-sm mb-2">Real Results</h3>
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-white mb-6">Word On The <span className="text-primary">Street</span></h2>
              
              <div className="flex items-center gap-4 mb-8 bg-card border border-border p-6 rounded-sm w-fit">
                <div className="text-5xl font-display font-bold text-white">4.2</div>
                <div>
                  <div className="flex gap-1 mb-1 text-primary">
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star size={20} />
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">40+ Google Reviews</div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-8">
                Don't just take our word for it. Hear from the people who put in the work every single day on our floor.
              </p>
              
              <a 
                href="https://search.google.com/local/writereview?placeid=ChIJT49w3aY1DzkRb5j5Z4H2QzM" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-sm font-display font-bold uppercase tracking-wider transition-colors"
              >
                Leave a Review
              </a>
            </Reveal>
          </div>
          
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review, index) => (
                <Reveal 
                  key={index} 
                  delay={index * 0.15} 
                  direction="up" 
                  className={index === 2 ? "md:col-span-2 md:w-1/2 md:mx-auto" : ""}
                >
                  <div className="bg-card border border-border p-8 rounded-sm relative group hover:border-primary/50 transition-colors">
                    <Quote className="absolute top-6 right-6 text-secondary w-10 h-10 group-hover:text-primary/20 transition-colors" />
                    
                    <div className="flex gap-1 mb-6 text-primary">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} fill="currentColor" size={16} />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground mb-8 relative z-10 italic">
                      "{review.content}"
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-display font-bold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-white font-display uppercase tracking-wide font-bold">{review.name}</h4>
                        <span className="text-xs text-muted-foreground">{review.role}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
