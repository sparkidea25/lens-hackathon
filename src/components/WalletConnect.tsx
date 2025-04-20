
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const wallets = [
  { id: 'metamask', name: 'MetaMask', icon: '🦊' },
  { id: 'walletconnect', name: 'WalletConnect', icon: '🔗' },
  { id: 'coinbase', name: 'Coinbase Wallet', icon: '💰' },
  { id: 'trustwallet', name: 'Trust Wallet', icon: '🛡️' },
];

const WalletConnect = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);

  const handleConnectWallet = async () => {
    if (!selectedWallet) {
      toast({
        title: "Error",
        description: "Please select a wallet to connect",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
        variant: "default",
      });
      
      // Navigate to investments page after a short delay
      setTimeout(() => {
        navigate('/investments');
      }, 1500);
    }, 2000);
  };

  const handleViewInvestments = () => {
    navigate('/investments');
  };

  const getStepStyle = (step: number) => {
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.5s ease-out ${0.1 * step}s, transform 0.5s ease-out ${0.1 * step}s`,
    };
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card 
        className="glass overflow-hidden"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        }}
      >
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-gradient">Connect Your Wallet</CardTitle>
          <CardDescription>
            Connect your cryptocurrency wallet to deposit and start earning
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div 
            className="space-y-4"
            style={getStepStyle(1)}
          >
            <p className="text-sm font-medium text-gray-300">Select your wallet:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {wallets.map((wallet) => (
                <Button
                  key={wallet.id}
                  variant="outline"
                  className={cn(
                    "h-auto py-4 px-4 justify-start glass border-white/10 text-white hover:bg-white/10",
                    selectedWallet === wallet.id && "border-white/40 bg-white/10"
                  )}
                  onClick={() => setSelectedWallet(wallet.id)}
                >
                  <div className="flex items-center w-full">
                    <span className="text-2xl mr-3">{wallet.icon}</span>
                    <span>{wallet.name}</span>
                    {selectedWallet === wallet.id ? (
                      <Check className="ml-auto h-5 w-5" />
                    ) : (
                      <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Connected Info (shown after successful connection) */}
          {isConnected && (
            <div 
              className="mt-8 p-6 rounded-lg bg-white/5 border border-white/10"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.95)',
                transition: 'opacity 0.5s ease-out 0.3s, transform 0.5s ease-out 0.3s',
              }}
            >
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                </div>
                <p className="text-xl font-semibold text-white mt-4">Wallet Connected</p>
                <p className="text-sm text-gray-400 mt-2">0x7F5E...3A1C</p>
                <p className="mt-4 text-sm text-gray-300">
                  Your wallet is now connected. You can proceed to deposit funds and start earning passive income.
                </p>
                <Button 
                  className="mt-4 bg-white text-background hover:bg-white/90"
                  onClick={handleViewInvestments}
                >
                  View Investments
                </Button>
              </div>
            </div>
          )}

          {/* Deposit Information (example) */}
          {isConnected && (
            <div
              className="space-y-4"
              style={getStepStyle(4)}
            >
              <p className="text-sm font-medium text-gray-300">Deposit to start earning:</p>
              
              <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Required Investment</p>
                    <p className="text-2xl font-bold text-white">$48,000</p>
                  </div>
                  
                  <Button className="bg-white text-background hover:bg-white/90">
                    <Wallet className="mr-2 h-4 w-4" />
                    Deposit Now
                  </Button>
                </div>
                
                <p className="mt-4 text-xs text-gray-400">
                  Your funds will be securely managed through smart contracts to generate your 
                  desired monthly income of $5,000 for 5 years.
                </p>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s ease-out 0.4s',
          }}
        >
          {!isConnected && (
            <Button 
              className="w-full bg-white text-background hover:bg-white/90 text-base py-6"
              onClick={handleConnectWallet}
              disabled={!selectedWallet || isConnecting}
            >
              {isConnecting ? (
                <>
                  <span className="animate-pulse">Connecting...</span>
                </>
              ) : (
                <>
                  Connect Wallet
                  <Wallet className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default WalletConnect;
