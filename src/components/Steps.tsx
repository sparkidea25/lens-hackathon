
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const steps = [
  {
    number: '01',
    title: 'Define the income you want',
    description: 'Set the monthly passive income that would allow you to achieve your desired lifestyle.'
  },
  {
    number: '02',
    title: 'Determine the time period',
    description: 'Choose how long you want to receive this passive income stream, from 1 to 12 months.'
  },
  {
    number: '03',
    title: 'We calculate your investment',
    description: 'Our system analyzes market conditions to calculate the optimal investment amount needed.'
  },
  {
    number: '04',
    title: 'Connect wallet & deposit',
    description: 'Connect your Web3 wallet, make your deposit, and start receiving monthly payments.'
  },
  {
    number: '05',
    title: 'We manage everything',
    description: 'We secure your income using advanced DeFi strategies, reinvesting excess returns.'
  }
];

const Steps = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('steps-section');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 200) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="steps-section" className="py-16 sm:py-24 bg-black">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient">How It Works</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Simplified process to achieve your financial freedom
          </p>
        </div>

        <div className="relative">
          {/* Vertical line connector */}
          <div className="absolute left-12 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/5 via-white/20 to-white/5"></div>

          <div className="space-y-12 sm:space-y-16">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className={cn(
                  "relative flex flex-col sm:flex-row sm:items-center",
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse sm:text-right"
                )}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s ease-out ${0.1 + index * 0.1}s, transform 0.6s ease-out ${0.1 + index * 0.1}s`,
                }}
              >
                <div className={cn(
                  "flex-shrink-0 ml-12 sm:ml-0 z-10",
                  index % 2 === 0 ? "sm:pr-8" : "sm:pl-8"
                )}>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center rounded-full glass animate-float">
                    <span className="text-white text-lg sm:text-xl font-bold">{step.number}</span>
                  </div>
                </div>
                
                <div className={cn(
                  "mt-4 ml-12 sm:ml-0 sm:mt-0 glass p-6 rounded-lg",
                  index % 2 === 0 ? "sm:mr-auto" : "sm:ml-auto"
                )}>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
