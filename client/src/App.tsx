import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WalletContextProvider } from "@/components/WalletProvider";
import SolFarcasterPage from "@/pages/SolFarcasterPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={SolFarcasterPage} />
      <Route component={SolFarcasterPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletContextProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </WalletContextProvider>
    </QueryClientProvider>
  );
}

export default App;
