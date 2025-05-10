"use client";

import { Transaction } from "../lib/api";

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  // Format timestamp to show date and time
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    
    // Format date as MMM DD, YYYY (e.g., May 10, 2025)
    const dateStr = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    
    // Format time as HH:MM AM/PM
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });
    
    // Combine date and time
    return `${dateStr} at ${timeStr}`;
  };

  // Format USD value
  const formatUsd = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  // Get icon, color, and label based on transaction type
  const getTypeInfo = () => {
    // Determine transaction type based on data
    if (transaction.direction === "sent") {
      if (transaction.toAddress.toLowerCase() === "0x...") {
        // Replace with actual bank address if available
        return {
          icon: "↑",
          label: "Withdrawal to Bank",
          colorClass: "text-red-500",
          amountPrefix: "-",
          secondaryLabel: "USDC → USD",
        };
      } else {
        return {
          icon: "↑",
          label: "Sent",
          colorClass: "text-red-500",
          amountPrefix: "-",
          secondaryLabel: `USD → USDC`,
        };
      }
    } else if (transaction.source === "bridge") {
      return {
        icon: "↔",
        label: "USDC Conversion",
        colorClass: "text-purple-500",
        amountPrefix: "+",
        secondaryLabel: "USD → USDC",
      };
    } else if (transaction.fromAddress.includes("stripe")) {
      // Assuming we can detect Stripe transactions
      return {
        icon: "↓",
        label: "Direct Deposit - Stripe",
        colorClass: "text-green-500",
        amountPrefix: "+",
        secondaryLabel: "USD → USDC",
      };
    } else {
      return {
        icon: "↓",
        label: `Payment from ${transaction.fromAddress.substring(0, 6)}...`,
        colorClass: "text-green-500",
        amountPrefix: "+",
        secondaryLabel: "USD → USDC",
      };
    }
  };

  const typeInfo = getTypeInfo();

  return (
    <div className="border-b py-4 px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              transaction.direction === "sent"
                ? "bg-red-100"
                : transaction.source === "bridge"
                ? "bg-purple-100"
                : "bg-green-100"
            }`}
          >
            <span className={`text-xl ${typeInfo.colorClass}`}>
              {typeInfo.icon}
            </span>
          </div>
          <div className="ml-3">
            <div className="font-medium text-black">{typeInfo.label}</div>
            <div className="text-sm text-gray-500">
              {typeInfo.secondaryLabel} • {formatDate(transaction.timestamp)}
            </div>
          </div>
        </div>
        <div className={`text-lg font-semibold ${typeInfo.colorClass}`}>
          {typeInfo.amountPrefix}
          {formatUsd(transaction.valueInUsd)}
        </div>
      </div>
    </div>
  );
}
