import { useEffect, useState } from 'react';

const FIXED_PROFILES = [
  "https://hey.xyz/u/0xzelda", 
  "https://hey.xyz/u/dankshard", 
  "https://hey.xyz/u/saskasandholm", 
  "https://hey.xyz/u/papajams", 
  "https://hey.xyz/u/stani", 
  "https://hey.xyz/u/paris", 
  "https://hey.xyz/u/jessyjeanne", 
  "https://hey.xyz/u/iamtherealyakuza", 
  "https://hey.xyz/u/mp", 
  "https://hey.xyz/u/yoginth",
  "https://hey.xyz/u/moodyink", 
  "https://hey.xyz/u/panwinyl", 
  "https://hey.xyz/u/notgonnamakeit", 
  "https://hey.xyz/u/nicocapital"
];

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white pt-20 pb-16">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div
          className="overflow-hidden rounded-xl border border-gray-200"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Username</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Profile URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {FIXED_PROFILES.map((url, index) => {
                const username = url.replace('https://hey.xyz/u/', '@');
                return (
                  <tr 
                    key={index} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-gray-800">{username}</td>
                    <td className="py-3 px-4 text-sm text-blue-600">
                      <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {url}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Hero;