import { useEffect, useState } from 'react';

const FIXED_PROFILES = [
  { username: "nilesh.lens", url: "https://hey.xyz/u/nilesh", address: "0xda86780f3902ebe7a92204d939cf1e03009ecf18" },
  { username: "Chaoticmonk.lens", url: "https://hey.xyz/u/chaoticmonk", address: "0x45da50b5e5552ffd010e309d296c88e393d227ab" },
  { username: "infinati.lens", url: "https://hey.xyz/u/infinati", address: "0xa9aee5ed1b5ff1cc503298328defe11f6c0d2a8e" },
  { username: "jessyjeanne", url: "https://hey.xyz/u/jessyjeanne", address: "0x3d5e9077ef8f9c6b0e10d6c62c1a022a49675cc3" },
  { username: "Carlosbeltran", url: "https://hey.xyz/u/carlosbeltran", address: "0x28ff8e457fef9870b9d1529fe68fbb95c3181f64" },
  { username: "Stani.lens", url: "https://hey.xyz/u/stani", address: "0x7241dddec3a6af367882eaf9651b87e1c7549dff" },
  { username: "Paris.lens", url: "https://hey.xyz/u/iamtherealyakuza", address: "0xa83444576f86c8b59a542ec2f286a19ab12c2666" },
  { username: "mp", url: "https://hey.xyz/u/mp", address: "0xa7d53695af1fd11e0b75d37695290c102d59d743" },
  { username: "Christina.lens", url: "https://hey.xyz/u/christina", address: "0xa7d53695af1fd11e0b75d37695290c102d59d743" },
  { username: "Dydymoon.lens", url: "https://hey.xyz/u/dydymoon", address: "0x806346b423ddb4727c1f5dc718886430aa7ce9cf" },
  { username: "panwinyl", url: "https://hey.xyz/u/panwinyl", address: "0xfe6cdca35f6dc74cefbe33dbf2e5946c64ed1527" },
  { username: "Seliqui.lens", url: "https://hey.xyz/u/seliqui", address: "0xfe6cdca35f6dc74cefbe33dbf2e5946c64ed1527" },
];

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [profilesWithBalance, setProfilesWithBalance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedProfile, setExpandedProfile] = useState(null);

  // Fetch token balances for all addresses
  useEffect(() => {
    const fetchBalances = async () => {
      setIsLoading(true);
      
      try {
        // Create a map to avoid duplicate API calls for the same address
        const addressMap = new Map();
        FIXED_PROFILES.forEach(profile => addressMap.set(profile.address, null));

        const addresses = [...addressMap.keys()];
        const results = await Promise.all(
          addresses.map(async (address) => {
            try {
              const response = await fetch(`https://explorer-api.lens.xyz/api?module=account&action=addresstokenbalance&address=${address}`);
              if (!response.ok) {
                return { address, tokens: [], error: true };
              }
              const data = await response.json();
              
              // Parse the token data from the response
              const tokens = Array.isArray(data.result) 
                ? data.result.map(token => ({
                    address: token.TokenAddress,
                    name: token.TokenName || 'Unknown',
                    symbol: token.TokenSymbol || 'Unknown',
                    quantity: token.TokenQuantity || '0',
                    divisor: token.TokenDivisor || '18'
                  }))
                : [];
              
              return { 
                address, 
                tokens,
                error: false 
              };
            } catch (error) {
              console.error(`Error fetching balance for ${address}:`, error);
              return { address, tokens: [], error: true };
            }
          })
        );
        
        // Create a map of addresses to tokens
        const tokensMap = new Map();
        results.forEach(result => {
          tokensMap.set(result.address, {
            tokens: result.tokens,
            error: result.error
          });
        });
        
        // Apply tokens to profiles
        const updatedProfiles = FIXED_PROFILES.map(profile => ({
          ...profile,
          tokensData: tokensMap.get(profile.address) || { tokens: [], error: false }
        }));
        
        setProfilesWithBalance(updatedProfiles);
      } catch (error) {
        console.error("Error fetching balances:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalances();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  // Format token amount based on divisor
  const formatTokenAmount = (quantity, divisor) => {
    if (!quantity) return '0';
    if (!divisor) return quantity;
    
    try {
      // Convert to decimal based on divisor
      const value = parseFloat(quantity) / Math.pow(10, parseInt(divisor));
      if (isNaN(value)) return quantity;
      
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 4
      });
    } catch (error) {
      console.error("Error formatting token amount:", error);
      return quantity;
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="w-full bg-white py-4 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full mr-3"></div>
            {/* <h1 className="text-xl font-medium">
              <span className="text-green-700">Capital</span>
              <span className="text-green-500">Frens</span>
            </h1> */}
          </div>
          <nav>
            <ul className="flex">
              <li>
                <a href="#" className="text-green-800 font-medium px-3">Home</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero content */}
      <div className="w-full max-w-6xl mx-auto px-6 pt-12 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-green-800 mb-4">Discover & Invest in Lens Creators</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Connect with the most promising creators on the Lens Protocol and invest in their future success.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-medium text-green-800">Creator Marketplace</h3>
          </div>
          
          <div
            className="overflow-hidden"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }}
          >
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-sm font-medium text-green-800">Username</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-green-800">Profile URL</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-green-800">Ethereum Address</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-green-800">Tokens</th>
                  <th className="py-3 px-4 text-right text-sm font-medium text-green-800">Invest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="py-10 px-4 text-center text-gray-500">
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading token data...
                      </div>
                    </td>
                  </tr>
                ) : profilesWithBalance.map((profile, index) => (
                  <>
                    <tr 
                      key={index} 
                      className={`hover:bg-gray-50 transition-colors ${expandedProfile === profile.address ? 'bg-green-50' : ''}`}
                      onClick={() => setExpandedProfile(expandedProfile === profile.address ? null : profile.address)}
                    >
                      <td className="py-3 px-4 text-sm text-gray-800">@{profile.username}</td>
                      <td className="py-3 px-4 text-sm text-green-600">
                        <a 
                          href={profile.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {profile.url}
                        </a>
                      </td>
                      <td className="py-3 px-4 text-sm font-mono text-gray-600">
                        {profile.address ? (
                          <span className="truncate block max-w-xs">{profile.address}</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {profile.tokensData?.error ? (
                          <span className="text-red-500">Error loading tokens</span>
                        ) : profile.tokensData?.tokens.length === 0 ? (
                          <span className="text-gray-400">No tokens</span>
                        ) : (
                          <div className="flex items-center">
                            <span className="mr-2 text-green-600 font-medium">
                              {profile.tokensData.tokens.length} token{profile.tokensData.tokens.length === 1 ? '' : 's'}
                            </span>
                            <button 
                              className="text-xs bg-green-100 hover:bg-green-200 text-green-800 py-1 px-2 rounded-full transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedProfile(expandedProfile === profile.address ? null : profile.address);
                              }}
                            >
                              {expandedProfile === profile.address ? 'Hide' : 'View'}
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button 
                          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-1 px-4 rounded-md transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Invest
                        </button>
                      </td>
                    </tr>
                    {expandedProfile === profile.address && profile.tokensData?.tokens.length > 0 && (
                      <tr className="bg-gray-50">
                        <td colSpan="5" className="py-3 px-4">
                          <div className="rounded-md bg-white shadow-sm border border-gray-200">
                            <table className="w-full table-auto">
                              <thead>
                                <tr className="border-b border-gray-200">
                                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-700">Token</th>
                                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-700">Symbol</th>
                                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-700">Amount</th>
                                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-700">Address</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {profile.tokensData.tokens.map((token, idx) => (
                                  <tr key={idx} className="hover:bg-gray-50">
                                    <td className="py-2 px-3 text-xs text-gray-800 font-medium">
                                      {token.name || 'Unknown'}
                                    </td>
                                    <td className="py-2 px-3 text-xs text-gray-800">
                                      {token.symbol || '—'}
                                    </td>
                                    <td className="py-2 px-3 text-xs text-gray-800 font-medium">
                                      {formatTokenAmount(token.quantity, token.divisor)}
                                    </td>
                                    <td className="py-2 px-3 text-xs font-mono text-gray-500 truncate max-w-xs">
                                      {token.address}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Comments section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-1.008A11.955 11.955 0 014 18c.033-.067.066-.133.1-.2 1.6.8 3.4 1.2 5.9 1.2 2.5 0 4.3-.4 5.9-1.2l.1.2c-.4-.4-.8-.8-1.2-1.2a8.991 8.991 0 004.2-6.8 8.991 8.991 0 00-4.2-6.8c.4-.4.8-.8 1.2-1.2-.033.067-.066.133-.1.2C13.6 2.8 11.8 2.4 9.3 2.4s-4.3.4-5.9 1.2c-.033-.067-.066-.133-.1-.2.4.4.8.8 1.2 1.2A8.991 8.991 0 000 10a8.991 8.991 0 004.2 6.8c-.4.4-.8.8-1.2 1.2.033-.067.066-.133.1-.2a11.955 11.955 0 01-1.917-1.008C.634 15.982 0 13.084 0 10S.634 4.018 1.183 3.008A11.955 11.955 0 013.1 2c-.033-.067-.066-.133-.1-.2 1.6-.8 3.4-1.2 5.9-1.2s4.3.4 5.9 1.2l.1-.2c-.4.4-.8.8-1.2 1.2A8.991 8.991 0 0118 10z" clipRule="evenodd" />
            </svg>
            <h3 className="text-xl font-medium text-green-800">Comments</h3>
          </div>
          
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-800 mb-2">Connect Your Lens Profile</h4>
            <p className="text-gray-600 mb-4">You need to connect your Lens profile to participate in the discussion</p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
              Connect Lens Profile
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-green-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-medium mb-2">
                <span className="text-white">Capital</span>
                <span className="text-green-300">Frens</span>
              </h2>
              <p className="text-green-200 text-sm">Invest in the future of content creators</p>
            </div>
            <nav className="mb-6 md:mb-0">
              <ul className="flex space-x-6">
                <li><a href="#" className="text-green-200 hover:text-white">About</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Contact</a></li>
              </ul>
            </nav>
          </div>
          <div className="mt-8 pt-6 border-t border-green-700 text-center text-green-200 text-sm">
            © 2025 CapitalFrens. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Issue Button */}
      <div className="fixed bottom-4 left-4">
        <button className="flex items-center bg-red-500 text-white px-3 py-1 rounded-full">
          <span className="mr-2 bg-white text-red-500 w-6 h-6 flex items-center justify-center rounded-full font-medium">N</span>
          1 Issue
          <span className="ml-2 p-1">✕</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;