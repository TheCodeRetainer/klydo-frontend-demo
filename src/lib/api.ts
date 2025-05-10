/**
 * API client for interacting with the backend
 */

export interface Transaction {
  id: string;
  address: string;
  source: 'privy' | 'bridge' | 'json';
  chain: 'ethereum' | 'base';
  direction: 'sent' | 'received';
  fromAddress: string;
  toAddress: string;
  value: string;
  valueInEth: number;
  valueInUsd: number;
  timestamp: number;
  blockNumber: number;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  address: string;
  source: 'privy' | 'bridge' | 'json';
  chain: 'ethereum' | 'base';
  network: 'mainnet';
  createdAt: string;
  updatedAt: string;
  lastIndexedAt?: string;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  lastEvaluatedKey?: string;
}

export interface AddressesResponse {
  addresses: Address[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Fetch all transactions with optional filtering
 */
export async function getTransactions(
  direction?: 'sent' | 'received',
  limit: number = 50,
  lastEvaluatedKey?: string
): Promise<TransactionsResponse> {
  const params = new URLSearchParams();
  
  if (direction) {
    params.append('direction', direction);
  }
  
  if (limit) {
    params.append('limit', limit.toString());
  }
  
  if (lastEvaluatedKey) {
    params.append('lastEvaluatedKey', lastEvaluatedKey);
  }
  
  const response = await fetch(`${API_URL}/transactions?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  
  return response.json();
}

/**
 * Fetch transactions for a specific address
 */
export async function getTransactionsByAddress(
  address: string,
  direction?: 'sent' | 'received'
): Promise<TransactionsResponse> {
  const params = new URLSearchParams();
  
  if (direction) {
    params.append('direction', direction);
  }
  
  const response = await fetch(`${API_URL}/transactions/address/${address}?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch transactions for address: ${address}`);
  }
  
  return response.json();
}

/**
 * Fetch all addresses
 */
export async function getAddresses(): Promise<AddressesResponse> {
  const response = await fetch(`${API_URL}/addresses`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch addresses');
  }
  
  return response.json();
}

/**
 * Trigger address collection
 */
export async function collectAddresses(): Promise<{ total: number; new: number }> {
  const response = await fetch(`${API_URL}/addresses/collect`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to collect addresses');
  }
  
  return response.json();
}

/**
 * Trigger transaction indexing
 */
export async function indexTransactions(): Promise<{ addresses: number; transactions: number }> {
  const response = await fetch(`${API_URL}/transactions/index`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to index transactions');
  }
  
  return response.json();
}
