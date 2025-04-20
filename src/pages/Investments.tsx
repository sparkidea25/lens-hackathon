import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { usePageTransition } from "@/lib/animations";
import capitalAbi from "@/components/contracts/captial.json";
import addresses from "@/components/contracts/address.json";
import { ethers } from "ethers";
import { useAppKitAccount } from "@reown/appkit/react";
interface Investment {
  id: string;
  name: string;
  amount: number;
  returnRate: number;
  monthlyIncome: number;
  duration: number;
  status: "active" | "pending" | "completed";
  lastUpdated: Date;
}

const Investments = () => {
  const { isConnected } = useAppKitAccount();
  const isVisible = usePageTransition();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [totalInvestment, setTotalInvestment] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [interest, setInterest] = useState(0);
  useEffect(() => {
    getTotalInvestment();
    getInterestRate();
    calculateMonthlyIncome();
  }, [isConnected]);

  const getTotalInvestment = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();

      const capitalContract = new ethers.Contract(
        addresses.capital,
        capitalAbi,
        signer
      );
      const address = await signer.getAddress();
      const value = await capitalContract.getUserDeposit(address);
      const finalvalue = ethers.utils.formatEther(value);
      console.log("final value", finalvalue);
      setTotalInvestment(finalvalue);
    } catch (error) {
      console.log(error);
    }
  };
  const getInterestRate = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();

    const capitalContract = new ethers.Contract(
      addresses.capital,
      capitalAbi,
      signer
    );
    const address = await signer.getAddress();
    const interestRate = await capitalContract.interestRate();
    console.log("interest rate", interestRate);
    setInterest(interestRate);
  };

  const calculateMonthlyIncome = () => {
    const annualRate = parseFloat(interest.toString()); // Interest rate in percentage
    const totalInvestmentValue = parseFloat(totalInvestment);

    // Monthly Income = (Total Investment * (APR / 100)) / 12
    const monthlyIncome = (totalInvestmentValue * (annualRate / 100)) / 12;
    setMonthlyIncome(monthlyIncome);
    console.log("monthly income", monthlyIncome);
    // Here you can set the monthly income as a state or use it wherever you need
    // Example: setMonthlyIncome(monthlyIncome);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getStatusColor = (status: Investment["status"]) => {
    switch (status) {
      case "active":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "completed":
        return "text-blue-500";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="pt-32 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            }}
          >
            <h1 className="text-4xl font-bold text-gradient">
              Your Investments
            </h1>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Track your investments and passive income in real-time
            </p>
          </div>

          {/* Overview Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s",
            }}
          >
            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-gray-300">
                  Total Invested
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-white">
                    {Number(totalInvestment).toFixed(3)}
                  </span>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Across Multiple investments
                </p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-gray-300">
                  Monthly Income
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-white">
                    {monthlyIncome.toFixed(4)}
                  </span>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {investments.filter((inv) => inv.status === "active").length}{" "}
                  active plans
                </p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-gray-300">
                  Average Return
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-white">
                    {interest?.toString()}%
                  </span>
                  {investments.reduce((sum, inv) => sum + inv.returnRate, 0) /
                    investments.length >
                  10 ? (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Annual percentage yield
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Investments Table */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s",
            }}
          >
            <Card className="glass overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>Investment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>List of your current investments</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Monthly Income</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Return Rate
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Basic Plan</TableCell>
                      <TableCell>
                        {Number(totalInvestment).toFixed(3)}
                      </TableCell>
                      <TableCell>{monthlyIncome.toFixed(3)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {interest?.toString()}%
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
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

export default Investments;
