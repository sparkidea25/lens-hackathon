
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import IncomeCalculator from '@/components/IncomeCalculator';

const Calculate = () => {
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main className="pt-32 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gradient">Calculate Your Income</h1>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Define your desired monthly income and time period to see how much you need to invest
            </p>
          </div>
          
          <IncomeCalculator />
        </div>
      </main>
      
      {/* Footer section */}
      <footer className="py-8 border-t border-white/10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} CapitalFrens. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Calculate;
