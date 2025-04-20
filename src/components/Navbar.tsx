import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CustomConnectButton } from "./ui/CustomConnectButton";
import { Web3Provider } from "@/provider/Walletprovider";

import {
  useDisconnect,
  useAppKit,
  useAppKitNetwork,
  useAppKitAccount,
} from "@reown/appkit/react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();
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

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Calculate", path: "/calculate" },
    { name: "Investments", path: "/investments" },
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
                  "hover:text-white after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px]",
                  "after:origin-left after:scale-x-0 after:bg-white after:transition-transform hover:after:scale-x-100",
                  location.pathname === item.path
                    ? "text-white after:scale-x-100"
                    : "text-gray-400"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          {/* Connect wallet button */}
          {isConnected ? (
            <div className="hidden md:block">
              <Button
                onClick={() => open()}
                className="font-medium border-t border-black hover:text-secondary-foreground"
              >
                {`${address?.slice(0, 5)}...${address?.slice(6, 10)}`}
              </Button>
            </div>
          ) : (
            <div className="hidden md:block">
              <Button
                onClick={() => open()}
                className="font-medium border-t border-black hover:text-secondary-foreground"
              >
                Connect Wallet
              </Button>
            </div>
          )}
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
                location.pathname === item.path ? "text-white" : "text-gray-400"
              )}
            >
              {item.name}
            </Link>
          ))}
          {/* <Button asChild variant="outline" className="glass text-white border-white/20 hover:bg-white/10 w-full">
            <Link to="/connect">Connect Wallet</Link>
          </Button> */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
