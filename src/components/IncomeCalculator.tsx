import { useState, useEffect } from "react";
import { DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ethers } from "ethers";
import capitalAbi from "@/components/contracts/captial.json";
import addresses from "@/components/contracts/address.json";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
const IncomeCalculator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { open } = useAppKit();
  const { isConnected } = useAppKitAccount();
  console.log("isconnected", isConnected);
  const [monthlyIncome, setMonthlyIncome] = useState(1);
  const [months, setMonth] = useState(1);
  const [capitalNeeded, setCapitalNeeded] = useState(0);
  const [isApproved, setIsApproved] = useState(false); // Track approval status
  const [isProcessing, setIsProcessing] = useState(false); // Track processing state
 
  // The calculation is simplified for demo purposes
  useEffect(() => {
    const factor = 0.8;
    const needed = factor * months * monthlyIncome;

    let start = 0;
    const step = needed / 30;
    const timer = setInterval(() => {
      start += step;
      if (start >= needed) {
        setCapitalNeeded(Math.round(needed));
        clearInterval(timer);
      } else {
        setCapitalNeeded(Math.round(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [monthlyIncome, months]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const approveToken = async () => {
    try {
      setIsProcessing(true); // Start processing

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();

      const erc20Abi = [
        "function approve(address spender, uint256 amount) public returns (bool)",
        "function balanceOf(address account) public view returns (uint256)",
      ];

      const erc20Contract = new ethers.Contract(
        addresses.erc20,
        erc20Abi,
        signer
      );

      // Approve the token
      const approveTx = await erc20Contract.approve(
        addresses.capital,
        ethers.utils.parseEther(capitalNeeded.toString())
      );
      await approveTx.wait();

      // Mark as approved
      setIsApproved(true);
      setIsProcessing(false); // End processing

      console.log("Token approved!");
    } catch (error) {
      console.error("Approval failed:", error);
      setIsProcessing(false);
    }
  };

  const depositInvestment = async () => {
    try {
      setIsProcessing(true); // Start processing

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();

      const capitalContract = new ethers.Contract(
        addresses.capital,
        capitalAbi,
        signer
      );

      const depositTx = await capitalContract.deposit(
        ethers.utils.parseEther(capitalNeeded.toString()),
        months
      );
      await depositTx.wait();

      console.log("Deposit successful!");
      setIsProcessing(false); // End processing
    } catch (error) {
      console.error("Transaction failed:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card
        className="glass overflow-hidden"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        }}
      >
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-gradient">
            Income Calculator
          </CardTitle>
          <CardDescription>
            Define your passive income goals and see what you need to invest
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Monthly income slider */}
          <div
            className="space-y-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)",
              transition:
                "opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s",
            }}
          >
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-medium text-gray-300">
                <DollarSign className="w-4 h-4 mr-2" />
                Monthly Income
              </label>
              <span className="text-xl font-semibold text-white">
                {formatCurrency(monthlyIncome)}
              </span>
            </div>

            <Slider
              value={[monthlyIncome]}
              min={100}
              max={20000}
              step={1}
              onValueChange={(value) => setMonthlyIncome(value[0])}
              className="py-2"
            />

            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatCurrency(100)}</span>
              <span>{formatCurrency(20000)}</span>
            </div>
          </div>

          {/* Duration slider */}
          <div
            className="space-y-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)",
              transition:
                "opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s",
            }}
          >
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-medium text-gray-300">
                <Calendar className="w-4 h-4 mr-2" />
                Duration in Year
              </label>
              <span className="text-xl font-semibold text-white">
                {months} months
              </span>
            </div>

            <Slider
              value={[months]}
              min={1}
              max={12}
              step={1}
              onValueChange={(value) => setMonth(value[0])}
              className="py-2"
            />

            <div className="flex justify-between text-xs text-gray-400">
              <span>1 month</span>
              <span>12 months</span>
            </div>
          </div>

          {/* Result */}
          <div
            className="mt-8 p-6 rounded-lg bg-white/5 border border-white/10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "scale(1)" : "scale(0.95)",
              transition:
                "opacity 0.5s ease-out 0.3s, transform 0.5s ease-out 0.3s",
            }}
          >
            <div className="text-center">
              <p className="text-sm text-gray-400">Required Investment</p>
              <p className="text-4xl font-bold text-gradient mt-2">
                {formatCurrency(capitalNeeded)}
              </p>
              <p className="mt-4 text-sm text-gray-300">
                This is the estimated amount you would need to invest to
                generate {formatCurrency(monthlyIncome)}
                monthly for {months} months based on our calculation model.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.5s ease-out 0.4s",
          }}
        >
          {isConnected ? (
            isApproved ? (
              <Button
                onClick={depositInvestment}
                className="w-full bg-white text-background hover:bg-white/90 text-base py-6"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Deposit Now"}
              </Button>
            ) : (
              <Button
                onClick={approveToken}
                className="w-full bg-white text-background hover:bg-white/90 text-base py-6"
                disabled={isProcessing}
              >
                {isProcessing ? "Approving..." : "Approve Token"}
              </Button>
            )
          ) : (
            <Button
              onClick={() => open()}
              className="w-full bg-white text-background hover:bg-white/90 text-base py-6"
              disabled={isProcessing}
            >
              Connect Wallet
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default IncomeCalculator;
