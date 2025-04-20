
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-background z-0"></div>
      
      {/* Background dots grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>
      
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div 
          className="space-y-6"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          <div className="inline-block glass px-4 py-1.5 rounded-full mb-4">
            <p className="text-sm font-medium text-white/80">
              Web3 Passive Income
            </p>
          </div>
          
          <h1 className="text-gradient text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Define Your Freedom.<br />
            <span className="block mt-2">Secure Your Future.</span>
          </h1>
          
          <p 
            className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
            }}
          >
            Set your desired passive income and duration. We'll handle the rest, helping you achieve financial freedom through blockchain technology.
          </p>
          
          <div 
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
            }}
          >
            <Button asChild className="bg-white text-background hover:bg-white/90 text-base py-6 px-8">
              <Link to="/calculate">
                Calculate Your Income
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
