"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const services = [
  {
    id: 1,
    title: "How Coworking Can Help Freelancers Overcome Loneliness",
    description: "Freelancing offers incredible freedom and flexibility, but it can also be isolating. Working from home or coffee shops often means missing out on the social connections and collaborative energy that traditional offices provide. Coworking spaces bridge this gap by creating vibrant communities where freelancers can work independently while still feeling part of a team.",
    image: "/assets/medium-shot-people-working-together-office_23-2149345228.jpg",
    accentColor: "orange",
  },
  {
    id: 2,
    title: "Balancing Work and Joy During the Holidays",
    description: "The holiday season brings joy, celebration, and often, increased work demands. Finding the right balance between professional responsibilities and festive activities can be challenging. Our flexible coworking spaces provide the perfect solution, allowing you to maintain productivity while enjoying the holiday spirit in a welcoming, festive environment.",
    image: "/assets/cowork.jpg",
    accentColor: "teal",
  },
  {
    id: 3,
    title: "Boosting Productivity Through Collaborative Workspaces",
    description: "Modern professionals thrive in environments that foster creativity and collaboration. Our coworking spaces are designed with productivity in mind, featuring ergonomic furniture, high-speed internet, and quiet zones for focused work. Experience the perfect blend of individual focus areas and collaborative spaces that inspire innovation.",
    image: "/assets/monthly.webp",
    accentColor: "yellow",
  },
  {
    id: 4,
    title: "Networking Opportunities in Shared Workspaces",
    description: "One of the greatest advantages of coworking is the opportunity to connect with like-minded professionals. Our spaces host regular networking events, workshops, and community gatherings that help you expand your professional network. Build meaningful relationships that can lead to new opportunities and collaborations.",
    image: "/assets/privateoffice.jpg",
    accentColor: "orange",
  },
  {
    id: 5,
    title: "Flexible Workspace Solutions for Growing Teams",
    description: "As your business grows, your workspace needs evolve. Our flexible coworking solutions adapt to your changing requirements, from hot desks for individuals to private offices for teams. Scale up or down without the hassle of long-term leases, giving you the freedom to focus on what matters most—your business.",
    image: "/assets/eventspace.webp",
    accentColor: "teal",
  },
  {
    id: 6,
    title: "Creating Work-Life Balance in Modern Offices",
    description: "Achieving work-life balance is essential for long-term success and well-being. Our coworking spaces offer amenities like wellness rooms, recreational areas, and flexible hours that support a healthy lifestyle. Work efficiently during your peak hours and enjoy the flexibility to maintain personal commitments.",
    image: "/assets/cowork.jpg",
    accentColor: "yellow",
  },
];

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTitle, setActiveTitle] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isScrollingRef = useRef(false);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentScrollIndexRef = useRef(0);
  const isInitializedRef = useRef(false);

  // Initialize scroll position on mount
  useEffect(() => {
    const container = containerRef.current;
    const firstCard = cardRefs.current[0];
    
    if (container && firstCard && !isInitializedRef.current) {
      // Center the first card on initial load
      const cardWidth = firstCard.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollLeft = firstCard.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
      
      container.scrollLeft = Math.max(0, scrollLeft);
      isInitializedRef.current = true;
      currentScrollIndexRef.current = 0;
    }
  }, []);

  // Auto-scroll functionality - smooth continuous loop
  useEffect(() => {
    if (isPaused) return;

    const container = containerRef.current;
    if (!container) return;

    const scrollToIndex = (index: number) => {
      if (isScrollingRef.current) return;
      
      const targetCard = cardRefs.current[index];
      if (!targetCard) return;
      
      isScrollingRef.current = true;
      currentScrollIndexRef.current = index;
      
      // Calculate scroll position - center the card in viewport
      const cardWidth = targetCard.offsetWidth;
      const containerWidth = container.offsetWidth;
      const cardLeft = targetCard.offsetLeft;
      const scrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);
      
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth'
      });
      
      setActiveTitle(index);
      
      // Reset scrolling flag after animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1200);
    };

    const scrollToNext = () => {
      if (isPaused || isScrollingRef.current) return;
      
      // Move to next card in sequence
      const nextIndex = (currentScrollIndexRef.current + 1) % services.length;
      scrollToIndex(nextIndex);
    };

    // Start auto-scroll after initial delay
    const startAutoScroll = () => {
      // Clear any existing interval
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      
      // Set up continuous loop - scroll every 3 seconds
      autoScrollIntervalRef.current = setInterval(() => {
        if (!isPaused && !isScrollingRef.current) {
          scrollToNext();
        }
      }, 3000);
    };

    // Initial delay before starting
    const initialTimeout = setTimeout(() => {
      scrollToNext();
      startAutoScroll();
    }, 1500);

    return () => {
      clearTimeout(initialTimeout);
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isPaused]);

  // Sync active title with scroll position - only when user manually scrolls
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;
    let isUserScrolling = false;
    
    const handleScrollStart = () => {
      isUserScrolling = true;
      setIsPaused(true);
    };
    
    const handleScroll = () => {
      // Only update if user is manually scrolling, not auto-scroll
      if (isScrollingRef.current) return;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        // Find which card is closest to center
        let closestIndex = 0;
        let closestDistance = Infinity;

        cardRefs.current.forEach((card, index) => {
          if (card) {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(cardCenter - containerCenter);
            
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          }
        });

        if (closestIndex !== activeTitle) {
          setActiveTitle(closestIndex);
          currentScrollIndexRef.current = closestIndex;
        }
        
        // Resume auto-scroll after user stops scrolling
        if (isUserScrolling) {
          setTimeout(() => {
            isUserScrolling = false;
            setIsPaused(false);
          }, 2000);
        }
      }, 150);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('touchstart', handleScrollStart, { passive: true });
    container.addEventListener('mousedown', handleScrollStart);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('touchstart', handleScrollStart);
      container.removeEventListener('mousedown', handleScrollStart);
      clearTimeout(scrollTimeout);
    };
  }, [activeTitle]);

  // Handle title click - scroll to related card
  const handleTitleClick = (index: number) => {
    setActiveTitle(index);
    setIsPaused(true);
    currentScrollIndexRef.current = index;
    
    // Smooth scroll to the card
    const container = containerRef.current;
    const cardElement = cardRefs.current[index];
    
    if (container && cardElement) {
      const cardWidth = cardElement.offsetWidth;
      const containerWidth = container.offsetWidth;
      const cardLeft = cardElement.offsetLeft;
      const scrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);
      
      isScrollingRef.current = true;
      
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth'
      });
      
      // Reset flags after scroll completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1200);
    }
    
    // Resume auto-scroll after delay
    setTimeout(() => {
      setIsPaused(false);
    }, 4000);
  };

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Handle touch end / swipe
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setTouchStart(0);
      setTouchEnd(0);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      const container = containerRef.current;
      if (container) {
        const currentIndex = currentScrollIndexRef.current;
        let nextIndex: number;
        
        if (distance > minSwipeDistance) {
          // Swipe left - next card
          nextIndex = (currentIndex + 1) % services.length;
        } else {
          // Swipe right - previous card
          nextIndex = (currentIndex - 1 + services.length) % services.length;
        }
        
        const targetCard = cardRefs.current[nextIndex];
        if (targetCard) {
          const cardWidth = targetCard.offsetWidth;
          const containerWidth = container.offsetWidth;
          const scrollLeft = targetCard.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
          
          isScrollingRef.current = true;
          container.scrollTo({
            left: Math.max(0, scrollLeft),
            behavior: 'smooth'
          });
          
          setActiveTitle(nextIndex);
          currentScrollIndexRef.current = nextIndex;
          
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 1200);
        }
      }
    }

    // Reset touch values and resume auto-slide after a delay
    setTouchStart(0);
    setTouchEnd(0);
    setTimeout(() => setIsPaused(false), 2000);
  };

  // Handle mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientX);
    setIsDragging(true);
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && touchStart) {
      setTouchEnd(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    if (touchStart && touchEnd) {
      const distance = touchStart - touchEnd;
      const minSwipeDistance = 50;

      if (Math.abs(distance) > minSwipeDistance) {
        const container = containerRef.current;
        if (container) {
          const currentIndex = currentScrollIndexRef.current;
          let nextIndex: number;
          
          if (distance > minSwipeDistance) {
            // Drag left - next card
            nextIndex = (currentIndex + 1) % services.length;
          } else {
            // Drag right - previous card
            nextIndex = (currentIndex - 1 + services.length) % services.length;
          }
          
          const targetCard = cardRefs.current[nextIndex];
          if (targetCard) {
            const cardWidth = targetCard.offsetWidth;
            const containerWidth = container.offsetWidth;
            const scrollLeft = targetCard.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
            
            isScrollingRef.current = true;
            container.scrollTo({
              left: Math.max(0, scrollLeft),
              behavior: 'smooth'
            });
            
            setActiveTitle(nextIndex);
            currentScrollIndexRef.current = nextIndex;
            
            setTimeout(() => {
              isScrollingRef.current = false;
            }, 1200);
          }
        }
      }
    }

    // Reset values and resume auto-slide after a delay
    setTouchStart(0);
    setTouchEnd(0);
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <section className="relative w-full bg-white py-10 lg:py-10 overflow-hidden">
      {/* Dotted Grid Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container-custom relative z-10 px-4 md:px-6 lg:px-8">
        {/* Section Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Side - Horizontal Title with Clickable Service Titles */}
          <div className="lg:w-80 shrink-0 flex items-start justify-center lg:justify-start">
            <div className="text-center lg:text-left max-w-md lg:max-w-none w-full">
              
              {/* Clickable Service Titles */}
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4 font-display">Explore Services</h3>
                <div className="space-y-2">
                  {services.map((service, index) => (
                    <button
                      key={service.id}
                      onClick={() => handleTitleClick(index)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ease-in-out ${
                        activeTitle === index
                          ? 'bg-orange-500 text-white shadow-md transform scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                      }`}
                    >
                      <p className={`text-sm md:text-base font-medium leading-tight ${
                        activeTitle === index ? 'text-white' : 'text-gray-800'
                      }`}>
                        {service.title}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Service Cards with Slider */}
          <div 
            className="flex-1 relative select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              setTouchStart(0);
              setTouchEnd(0);
              setIsDragging(false);
              setIsPaused(false);
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            {/* Cards Container */}
            <div className="relative overflow-hidden min-h-[600px]">
              <div 
                ref={containerRef}
                className="cards-container flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide" 
                style={{ scrollBehavior: 'smooth' }}
              >
                {services.map((service, index) => {
                  return (
                    <div
                      key={service.id}
                      ref={(el) => {
                        cardRefs.current[index] = el;
                      }}
                      className="bg-white transition-all duration-700 ease-in-out overflow-hidden group cursor-pointer snap-center shrink-0 w-[calc(50%-8px)] md:w-[calc(50%-12px)] min-w-[calc(50%-8px)] md:min-w-[calc(50%-12px)]"
                    >
                      {/* Image - Rounded corners on all 4 sides */}
                      <div className="relative w-full h-56 md:h-64 lg:h-72 overflow-hidden rounded-xl">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className={`object-cover transition-transform duration-1000 ease-out ${
                            activeTitle === index 
                              ? 'scale-110' 
                              : 'scale-100 group-hover:scale-105'
                          }`}
                          sizes="(max-width: 768px) 50vw, 50vw"
                        />
                      </div>

                      {/* Content */}
                      <div className="py-5 md:py-6">
                        <h3 className="text-lg md:text-xl lg:text-xl font-bold text-gray-900 mb-3 leading-tight font-display">
                          {service.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed font-body">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
