
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import Steps from '@/components/Steps';
import Navbar from '@/components/Navbar';

const Index = () => {
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      {/* <Steps /> */}
      
      {/* Footer section */}
      {/* <footer className="py-8 border-t border-white/10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} CapitalFrens. All rights reserved.
          </p>
        </div>
      </footer> */}
    </div>
  );
};

export default Index;
