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
    <section className="relative min-h-screen flex items-center justify-center bg-white pt-20 pb-16">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 text-center">
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
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Ethereum Address</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Tokens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="py-10 px-4 text-center text-gray-500">
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                    className={`hover:bg-gray-50 transition-colors ${expandedProfile === profile.address ? 'bg-blue-50' : ''}`}
                    onClick={() => setExpandedProfile(expandedProfile === profile.address ? null : profile.address)}
                  >
                    <td className="py-3 px-4 text-sm text-gray-800">@{profile.username}</td>
                    <td className="py-3 px-4 text-sm text-blue-600">
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
                            className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 py-1 px-2 rounded-full transition-colors"
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
                  </tr>
                  {expandedProfile === profile.address && profile.tokensData?.tokens.length > 0 && (
                    <tr className="bg-gray-50">
                      <td colSpan="4" className="py-3 px-4">
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
    </section>
  );
};

export default Hero;