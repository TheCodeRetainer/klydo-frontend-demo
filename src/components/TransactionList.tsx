'use client';

import { useState, useEffect } from 'react';
import { Transaction, getTransactions } from '../lib/api';
import TransactionItem from './TransactionItem';

interface TransactionListProps {
  filter?: 'sent' | 'received';
}

export default function TransactionList({ filter: initialFilter }: TransactionListProps) {
  const [activeFilter, setActiveFilter] = useState<string | undefined>(initialFilter);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    loadTransactions();
  }, [activeFilter]);

  const loadTransactions = async (reset = true) => {
    try {
      setLoading(true);
      setError(null);

      // If reset is true, clear existing transactions
      if (reset) {
        setTransactions([]);
        setLastEvaluatedKey(undefined);
      }

      const response = await getTransactions(
        activeFilter as 'sent' | 'received' | undefined,
        50,
        reset ? undefined : lastEvaluatedKey
      );

      setTransactions(prev => 
        reset ? response.transactions : [...prev, ...response.transactions]
      );
      setLastEvaluatedKey(response.lastEvaluatedKey);
      setHasMore(!!response.lastEvaluatedKey);
    } catch (err) {
      setError('Failed to load transactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      loadTransactions(false);
    }
  };

  const handleFilterChange = (newFilter: string | undefined) => {
    setActiveFilter(newFilter);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 pb-2">
        <h2 className="text-2xl font-bold mb-4 text-black">Transactions</h2>
        
        {/* Filter tabs */}
        <div className="flex space-x-2 border-b pb-2">
          <button 
            onClick={() => handleFilterChange(undefined)}
            className={`px-6 py-2 rounded-full ${activeFilter === undefined ? 'bg-blue-500 text-white font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            All
          </button>
          <button 
            onClick={() => handleFilterChange('received')}
            className={`px-6 py-2 rounded-full ${activeFilter === 'received' ? 'bg-blue-500 text-white font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Received
          </button>
          <button 
            onClick={() => handleFilterChange('sent')}
            className={`px-6 py-2 rounded-full ${activeFilter === 'sent' ? 'bg-blue-500 text-white font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Sent
          </button>
        </div>
      </div>

      <div className="transactions-container">
        {loading && transactions.length === 0 ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 text-center">{error}</div>
        ) : transactions.length === 0 ? (
          <div className="text-gray-500 p-4 text-center">No transactions found</div>
        ) : (
          <>
            <div className="transaction-list">
              {transactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center py-4">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-4 py-2 text-blue-500 hover:text-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'View All →'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
