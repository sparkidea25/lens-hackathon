import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "./button";

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

export const CustomConnectButton = ({ dark }: { dark?: boolean }) => {
  const { isConnected, address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect({ connector: connectors[0] }); // Connect with first available connector
    }
  };

  if (!isConnected) {
    return (
      <Button
        onClick={handleConnect}
        className={
          !dark
            ? `font-medium border-primary text-primary hover:text-secondary-foreground`
            : `font-medium border-t border-black hover:text-secondary-foreground`
        }
      >
        Connect Wallet
      </Button>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      className={
        !dark
          ? `font-medium text-white border-primary`
          : `font-medium text-black border-t border-black`
      }
    >
      {address?.slice(0, 6)}...${address?.slice(-4)}
    </Button>
  );
};
