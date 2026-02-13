"use client";
import { useReadContract, useWriteContract } from "wagmi";
import { GOVERNOR_ABI, GOVERNOR_ADDRESS } from "@/constants";

const PROPOSAL_STATES = ["Pending", "Active", "Canceled", "Defeated", "Succeeded", "Queued", "Expired", "Executed"];

export default function ProposalCard({ proposalId }) {
  const { writeContract } = useWriteContract();

  const { data: proposal } = useReadContract({
    abi: GOVERNOR_ABI,
    address: GOVERNOR_ADDRESS,
    functionName: "proposals",
    args: [proposalId],
  });

  const { data: state } = useReadContract({
    abi: GOVERNOR_ABI,
    address: GOVERNOR_ADDRESS,
    functionName: "state",
    args: [proposalId],
  });

  const castVote = (support) => {
    writeContract({
      abi: GOVERNOR_ABI,
      address: GOVERNOR_ADDRESS,
      functionName: "castVote",
      args: [proposalId, support], // 0 = Against, 1 = For, 2 = Abstain
    });
  };

  if (!proposal) return null;

  return (
    <div className="p-6 border border-gray-100 rounded-xl bg-white mb-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-mono text-gray-400">ID: {proposalId.toString().slice(0, 8)}...</span>
        <span className={`px-2 py-1 rounded text-xs font-bold ${state === 1 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          {PROPOSAL_STATES[state]}
        </span>
      </div>
      
      <div className="flex gap-4 mt-6">
        <button 
          onClick={() => castVote(1)} 
          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Vote For
        </button>
        <button 
          onClick={() => castVote(0)} 
          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Vote Against
        </button>
      </div>
    </div>
  );
}