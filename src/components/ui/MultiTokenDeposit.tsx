import { useState } from "react";
import { ethers } from "ethers";
import { Coins } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import capitalContractAbi from "@/components/contracts/capitalContract.json";
import multitokenAbi from "@/components/contracts/multitokenDeposit.json";
import erc20 from "@/components/contracts/erc20.json";

import addresses from "@/components/contracts/address.json";
import { useToast } from "@/hooks/use-toast";

const tokens = [
  {
    symbol: "USDC",
    name: "USD Coin",
    address: addresses.usdc,
    decimals: 6,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    address: addresses.eth,
    decimals: 18,
  },
  {
    symbol: "CAPITAL",
    name: "Capital Token",
    address: addresses.capital, // when test on sopila then use capitalcontract and when test on basesopila thne use capital
    decimals: 18,
  },
];

export function MultiTokenDeposit() {
  const { toast } = useToast();
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState(1);
  const [isApproving, setIsApproving] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);

  const handleApprove = async () => {
    if (!amount || !selectedToken) return;

    if (!window.ethereum) {
      toast({
        title: "No wallet detected",
        description: "Please install MetaMask or another Ethereum wallet.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsApproving(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("provider", provider)

      const signer = await provider.getSigner();
console.log("signer", signer)
      if (selectedToken.symbol !== "ETH") {
        const tokenContract = new ethers.Contract(
          addresses.capitalcontract,
          erc20,
          signer
        );
        console.log("tokenContract", tokenContract)


        const parsedAmount = ethers.utils.parseUnits(
          amount,
          selectedToken.decimals
        );
        const tx = await tokenContract.approve(addresses.capitalcontract, parsedAmount);
        await tx.wait();
console.log("tx", tx)
        toast({
          title: "Approval Successful",
          description: `Approved ${amount} ${selectedToken.symbol} for deposit`,
        });
      }
    } catch (error) {
      console.error("Approval failed:", error);
      toast({
        title: "Approval Failed",
        description: "Failed to approve token for deposit",
        variant: "destructive",
      });
    } finally {
      setIsApproving(false);
    }
  };

  const handleDeposit = async () => {
    if (!amount || !selectedToken) return;
  
    if (!window.ethereum) {
      toast({
        title: "No wallet detected",
        description: "Please install MetaMask or another Ethereum wallet.",
        variant: "destructive",
      });
      return;
    }
  
    try {
      setIsDepositing(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
  
      const capitalContract = new ethers.Contract(
        addresses.capitalcontract,
        capitalContractAbi,
        signer
      );
  console.log("capitalContract", capitalContract)
      const parsedAmount = ethers.utils.parseUnits(amount, selectedToken.decimals);
  
      let tx;
  
      if (selectedToken.symbol === "ETH") {
        // ETH deposit: token address not needed
        tx = await capitalContract.deposit(
          ethers.constants.AddressZero, // Or a special ETH marker if contract handles it
          parsedAmount,
          months,
          { value: parsedAmount }
        );
        console.log("txETH", tx)
      } else {
        tx = await capitalContract.deposit(
          selectedToken.address, // this is required!
          parsedAmount,
          months
        );
      }
      console.log("txhash", tx)
  
      await tx.wait();
  
      toast({
        title: "Deposit Successful",
        description: `Successfully deposited ${amount} ${selectedToken.symbol}`,
      });
  
      setAmount("");
      setMonths(1);
    } catch (error) {
      console.error("Deposit failed:", error);
      toast({
        title: "Deposit Failed",
        description: "Failed to complete deposit",
        variant: "destructive",
      });
    } finally {
      setIsDepositing(false);
    }
  };
  
  

  return (
    <Card className="w-full max-w-md mx-auto glass">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gradient">
          Deposit
        </CardTitle>
        <CardDescription>Deposit tokens to start earning</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Select Token</label>
          <Select
            value={selectedToken.symbol}
            onValueChange={(value) =>
              setSelectedToken(
                tokens.find((t) => t.symbol === value) || tokens[0]
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tokens.map((token) => (
                <SelectItem key={token.symbol} value={token.symbol}>
                  <span>
                    {token.name} ({token.symbol})
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Amount</label>
          <Input
            type="number"
            placeholder={`Enter ${selectedToken.symbol} amount`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-400">Duration (months)</label>
            <span className="text-sm font-medium">{months} months</span>
          </div>
          <Slider
            value={[months]}
            min={1}
            max={12}
            step={1}
            onValueChange={(value) => setMonths(value[0])}
          />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        {selectedToken.symbol !== "ETH" && (
          <Button
            className="w-full"
            onClick={handleApprove}
            disabled={isApproving || !amount}
          >
            {isApproving ? "Approving..." : "Approve"}
          </Button>
        )}
        <Button
          variant="default"
          className="w-full bg-white text-background hover:bg-white/90"
          onClick={handleDeposit}
          disabled={isDepositing || !amount}
        >
          {isDepositing ? (
            "Depositing..."
          ) : (
            <>
              <Coins className="mr-2 h-4 w-4" />
              Deposit {selectedToken.symbol}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
