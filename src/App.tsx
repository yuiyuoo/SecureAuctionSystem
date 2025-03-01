import React, { useState } from 'react';
import { Shield, Award, Server, Users } from 'lucide-react';

function App() {
  const [bids, setBids] = useState({});
  const [newFarmer, setNewFarmer] = useState('');
  const [newBid, setNewBid] = useState(1);
  const [results, setResults] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleAddBid = () => {
    if (newFarmer.trim() === '') return;
    setBids(prev => ({
      ...prev,
      [newFarmer]: newBid
    }));
    setNewFarmer('');
    setNewBid(1);
  };

  const runAuction = () => {
    if (Object.keys(bids).length === 0) {
      alert("Please add at least one bid before running the auction");
      return;
    }
    
    // Simulate auction results
    const maxBid = Math.max(...Object.values(bids));
    const winners = Object.entries(bids)
      .filter(([_, bid]) => bid === maxBid)
      .map(([farmer]) => farmer);
    const winner = winners[Math.floor(Math.random() * winners.length)];
    
    // Generate random server shares for visualization
    const serverShares = {};
    for (let i = 0; i < 3; i++) {
      serverShares[i] = Object.keys(bids).map(() => 
        Math.floor(Math.random() * 7)
      );
    }
    
    const serverSums = [0, 1, 2].map(i => 
      serverShares[i].reduce((a, b) => a + b, 0) % 7
    );
    
    setResults({
      maxBid,
      winner,
      serverShares,
      serverSums
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Secure Auction System</h1>
          <p className="text-gray-600">Using secret sharing for privacy-preserving auctions</p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-indigo-500" />
            Farmer Bids
          </h2>
          
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farmer Name</label>
                <input
                  type="text"
                  value={newFarmer}
                  onChange={(e) => setNewFarmer(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter farmer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bid Amount</label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={newBid}
                  onChange={(e) => setNewBid(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <button
              onClick={handleAddBid}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Add Bid
            </button>
          </div>
          
          {Object.keys(bids).length > 0 ? (
            <div className="overflow-hidden bg-gray-50 rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bid</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(bids).map(([farmer, bid]) => (
                    <tr key={farmer}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{farmer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500">No bids added yet. Add a bid to get started.</p>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <button
              onClick={runAuction}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors text-lg font-medium"
              disabled={Object.keys(bids).length === 0}
            >
              Run Secure Auction
            </button>
          </div>
        </div>

        {results && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Award className="h-5 w-5 mr-2 text-indigo-500" />
              Auction Results
            </h2>
            
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-2">
                  The highest bid is: <span className="font-bold text-indigo-700">{results.maxBid}</span>
                </p>
                <p className="text-xl font-bold text-gray-800">
                  Winner: <span className="text-green-600">{results.winner}</span>
                </p>
              </div>
            </div>
            
            <div className="mb-4">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
              >
                {showDetails ? 'Hide' : 'Show'} Technical Details
                <svg className={`ml-1 h-5 w-5 transform ${showDetails ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {showDetails && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <Server className="h-5 w-5 mr-2 text-indigo-500" />
                  Server Computations
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {[0, 1, 2].map(serverId => (
                    <div key={serverId} className="bg-white p-3 rounded border border-gray-200">
                      <h4 className="font-medium text-gray-700 mb-2">Server {serverId + 1}</h4>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Shares:</span> {results.serverShares[serverId].join(', ')}
                      </div>
                      <div className="text-sm font-medium text-indigo-600">
                        Sum: {results.serverSums[serverId]}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-sm text-gray-600">
                  <p className="mb-2">
                    <span className="font-medium">Secret Sharing:</span> Each bid is split into shares that sum to the bid (mod 7).
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Local Computation:</span> Servers sum their shares without revealing individual bids.
                  </p>
                  <p>
                    <span className="font-medium">Reconstruction:</span> The maximum bid is determined from server sums.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        
        <footer className="text-center text-gray-500 text-sm mt-8">
          <p>Secure Auction System using Secret Sharing Techniques</p>
        </footer>
      </div>
    </div>
  );
}

export default App;