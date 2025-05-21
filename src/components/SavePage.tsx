// import React from 'react';

export default function SavePage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Save with Your Favorite Creators</h1>
      <p className="mb-4 text-lg">
        Build your savings by supporting creators you trust. Earn returns while helping them grow.
      </p>

      <div className="bg-[#202020] p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Top Creator Savings Pools</h2>
        <ul className="space-y-3">
          <li className="bg-[#2a2a2a] p-4 rounded-lg">
            <div className="flex justify-between">
              <span>👩‍🎤 @lensqueen</span>
              <span>6.5% APY</span>
            </div>
            <div className="text-sm text-gray-400">Pool Size: 12.3 ETH</div>
          </li>
          <li className="bg-[#2a2a2a] p-4 rounded-lg">
            <div className="flex justify-between">
              <span>🧑‍🎨 @ethartist</span>
              <span>5.2% APY</span>
            </div>
            <div className="text-sm text-gray-400">Pool Size: 8.1 ETH</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
