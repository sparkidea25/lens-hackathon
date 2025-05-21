import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  useDisconnect,
  useAppKit,
  useAppKitAccount,
} from "@reown/appkit/react";

export const FIXED_PROFILES = [
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
  { username: "gelgit", url: "https://hey.xyz/u/gelgit", address: "0x860781B22C186C338ED49264f22c4E2540D5B593"}
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [connectionError, setConnectionError] = useState("");
  const location = useLocation();
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  
  console.log("address", address);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Check if connected address is in the FIXED_PROFILES list
  useEffect(() => {
    if (isConnected && address) {
      const isAllowedAddress = FIXED_PROFILES.some(
        profile => profile.address.toLowerCase() === address.toLowerCase()
      );
      
      if (!isAllowedAddress) {
        setConnectionError("This address is not listed");
        // Disconnect wallet if address is not allowed
        disconnect();
      } else {
        setConnectionError("");
      }
    }
  }, [isConnected, address, disconnect]);

  const handleConnectWallet = () => {
    setConnectionError("");
    open();
  };

  const navItems = [
    { name: "Home", path: "/" },
    // { name: "Calculate", path: "/calculate" },
    // { name: "Investments", path: "/investments" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "py-2 bg-background/80 backdrop-blur-lg"
          : "py-4 bg-transparent"
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/capital-frens.jpeg"
              alt="CapitalFrens Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "relative text-sm font-medium transition-all duration-200",
                  "hover:text-black after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px]",
                  "after:origin-left after:scale-x-0 after:bg-white after:transition-transform hover:after:scale-x-100",
                  location.pathname === item.path
                    ? "text-black after:scale-x-100"
                    : "text-gray-700"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          {/* Connect wallet button */}
          <div className="hidden md:flex flex-col items-end">
            {isConnected ? (
              <Button
                onClick={handleConnectWallet}
                className="font-medium border-t border-black hover:text-secondary-foreground"
              >
                {`${address?.slice(0, 5)}...${address?.slice(38)}`}
              </Button>
            ) : (
              <Button
                onClick={handleConnectWallet}
                className="font-medium border-t border-black hover:text-secondary-foreground"
              >
                Connect Wallet
              </Button>
            )}
            {connectionError && (
              <p className="text-red-500 text-xs mt-1">{connectionError}</p>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-lg transition-transform duration-300 ease-in-out pt-20",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center space-y-8 p-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "text-lg font-medium transition-colors",
                location.pathname === item.path ? "text-black" : "text-gray-700"
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col items-center w-full">
            {isConnected ? (
              <Button 
                onClick={handleConnectWallet}
                className="font-medium w-full"
              >
                {`${address?.slice(0, 5)}...${address?.slice(38)}`}
              </Button>
            ) : (
              <Button 
                onClick={handleConnectWallet}
                className="font-medium w-full"
              >
                Connect Wallet
              </Button>
            )}
            {connectionError && (
              <p className="text-red-500 text-xs mt-1">{connectionError}</p>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;