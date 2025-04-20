import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "./button";

export const CustomConnectButton = ({ dark }: { dark?: boolean }) => {
  const { isConnected, address, chain } = useAccount();
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
