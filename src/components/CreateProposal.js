"use client";
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { GOVERNOR_ADDRESS, GOVERNOR_ABI } from "@/constants";

export default function CreateProposal() {
  const [description, setDescription] = useState("");
  const { writeContract, isPending } = useWriteContract();

  const handlePropose = () => {
    writeContract({
      address: GOVERNOR_ADDRESS,
      abi: GOVERNOR_ABI,
      functionName: "propose",
      args: [
        ["0x0000000000000000000000000000000000000000"], // Target: Dummy address
        [0], // Value: 0 ETH
        ["0x"], // Calldata: None
        description,
      ],
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-lg mb-4">Create New Proposal</h3>
      <textarea
        className="w-full p-3 border rounded-lg mb-4 text-gray-700"
        placeholder="Describe your proposal..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={handlePropose}
        disabled={isPending || !description}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
      >
        {isPending ? "Submitting..." : "Submit Proposal"}
      </button>
    </div>
  );
}