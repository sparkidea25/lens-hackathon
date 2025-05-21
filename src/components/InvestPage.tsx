// import React from 'react';

export default function InvestPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Invest in Creators on Lens</h1>
      <p className="mb-4 text-lg">
        Support creators by investing early in their journey. Get rewarded with future earnings.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#202020] p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3">🎤 @lensqueen</h2>
          <p className="text-gray-400 mb-2">Funding goal: 20 ETH</p>
          <p className="text-green-500">Progress: 14.3 ETH raised</p>
          <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg">
            Invest Now
          </button>
        </div>

        <div className="bg-[#202020] p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3">🎮 @gamebuilder</h2>
          <p className="text-gray-400 mb-2">Funding goal: 10 ETH</p>
          <p className="text-yellow-500">Progress: 7.2 ETH raised</p>
          <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg">
            Invest Now
          </button>
        </div>
      </div>
    </div>
  );
}
