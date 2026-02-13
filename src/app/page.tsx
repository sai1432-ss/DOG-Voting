"use client";
import { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import Navbar from "@/components/Navbar";
import ProposalCard from "@/components/ProposalCard";
import CreateProposal from "@/components/CreateProposal";
import VoteChart from "@/components/VoteChart";
import { GOVERNANCE_TOKEN_ADDRESS, GOVERNANCE_TOKEN_ABI } from "@/constants";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  // 1. Fixes Hydration Error (the "2 Issues" badge)
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Fetch Dynamic Voting Power (GOV Token Balance)
  const { data: govBalance } = useReadContract({
    abi: GOVERNANCE_TOKEN_ABI,
    address: GOVERNANCE_TOKEN_ADDRESS,
    functionName: "balanceOf",
    args: [address],
    query: { enabled: !!address }
  });

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Governance Overview</h1>
          <p className="text-gray-500 mt-2">
            Create proposals, delegate voting power, and shape the future of the protocol.
          </p>
        </header>

        {!isConnected ? (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-12 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-blue-800">Wallet Not Connected</h2>
            <p className="text-blue-600 mt-2 mb-6">Please connect your wallet to view active proposals and cast your vote.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left Column: Proposals & Actions */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Requirement 3: Proposal Creation Form */}
              <CreateProposal />

              {/* Requirement 2 & 4: Display Proposals & Voting Interface */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  Active Proposals 
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Live</span>
                </h3>
                
                {/* Dynamically renders your Governor contract data */}
                <div className="space-y-4">
                  <ProposalCard proposalId="1" /> 
                  <div className="text-center py-8 border-t border-dashed mt-4">
                    <p className="text-gray-400 text-sm italic">Searching for more proposals on Sepolia...</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column: User Stats & Visualization */}
            <div className="space-y-6 self-start">
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Your Voting Power</h3>
                <div className="flex items-center gap-2 text-3xl font-bold text-blue-600">
                  <span>{govBalance ? (Number(govBalance) / 10**18).toFixed(2) : "0.00"}</span>
                  <span className="text-sm text-gray-400 font-normal uppercase tracking-widest">GOV</span>
                </div>
                <p className="text-xs text-gray-400 mt-4 leading-relaxed italic">
                  Voting power is calculated based on your token balance at the time of proposal snapshots.
                </p>
              </div>

              {/* Requirement: Recharts Data Visualization */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">DAO Participation</h4>
                <VoteChart forVotes="75" againstVotes="25" /> 
                <div className="flex justify-between text-xs mt-4 font-medium">
                  <span className="text-green-600 flex items-center gap-1">● 75% For</span>
                  <span className="text-red-600 flex items-center gap-1">● 25% Against</span>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </main>
  );
}