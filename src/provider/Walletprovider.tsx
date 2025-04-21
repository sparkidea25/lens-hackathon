import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia,baseSepolia } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from 'react';

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [baseSepolia],
    transports: {
      // RPC URL for each chain
      [sepolia.id]: http('https://sepolia.infura.io/v3/cb60a7b9f4ad43aa98c34184a9684803'),

      [baseSepolia.id]: http(
        'https://base-sepolia.g.alchemy.com/v2/79vPnd3wqJrJ8e_kcZSQvPmANuC9zMMe',
      ),
    },

    // Required API Keys
    walletConnectProjectId: '18f8a466eb38db380fed41de56406c23',

    // Required App Info
    appName: "capitalfrens",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "http://localhost:8080", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();


export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* <IncomeCalculator /> */}
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};