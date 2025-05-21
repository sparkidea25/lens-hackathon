import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { http, WagmiProvider } from "wagmi";
import Calculate from "./pages/Calculate";
import { baseSepolia } from "wagmi/chains";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import Investments from "./pages/Investments";
import NotFound from "./pages/NotFound";
import WalletConnect from "./components/WalletConnect";
import "@rainbow-me/rainbowkit/styles.css";
import { createAppKit } from "@reown/appkit/react";
import { projectId, metadata, networks, ethers5Adapter } from "./config";
import SavePage from "./components/SavePage";
import InvestPage from "./components/InvestPage";
// Create query client
createAppKit({
  adapters: [ethers5Adapter],
  networks,
  metadata,
  projectId,
  themeMode: "light",
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    "--w3m-accent": "#000000",
  },
});
const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/calculate" element={<Calculate />} />
        <Route path="/connect" element={<WalletConnect />} />
        <Route path="/investments" element={<Investments />} />
         <Route path="/save" element={<SavePage />} />
        <Route path="/invest" element={<InvestPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
