import React, { createContext, useState, useContext, ReactNode } from 'react';

type Transaction = {
    id: string;
    type: 'transfer' | 'payment';
    amount: number;
    recipient: string;
    date: string;
};

interface User {
    firstName: string;
    surname: string;
    cpf: string;
}

interface FinancialContextType {
    balance: number;
    isBalanceVisible: boolean;
    toggleBalanceVisibility: () => void;
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
    user: User | null;
    login: (firstName: string, surname: string, cpf: string) => void;
    invoiceAmount: number;
    creditLimit: number;
    payInvoice: () => void;
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export const FinancialProvider = ({ children }: { children: ReactNode }) => {
    // Initial balance simulation
    const [balance, setBalance] = useState(0);
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [invoiceAmount, setInvoiceAmount] = useState(450.25);
    const [creditLimit, setCreditLimit] = useState(5000);

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible((prev) => !prev);
    };

    const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
        const newTransaction: Transaction = {
            ...transaction,
            id: Math.random().toString(),
            date: new Date().toISOString(),
        };

        setTransactions((prev) => [newTransaction, ...prev]);
        setBalance((prev) => prev - transaction.amount);
    };

    const payInvoice = () => {
        if (balance >= invoiceAmount) {
            addTransaction({
                type: 'payment',
                amount: invoiceAmount,
                recipient: 'Card Bill Payment',
            });
            setCreditLimit((prev) => prev + invoiceAmount);
            setInvoiceAmount(0);
        }
    };

    const login = (firstName: string, surname: string, cpf: string) => {
        setUser({ firstName, surname, cpf });
        setBalance(1000);
        setInvoiceAmount(450.25);
        setCreditLimit(5000);
        setTransactions([
            {
                id: Math.random().toString(),
                type: 'transfer',
                amount: 1000,
                recipient: 'Initial Deposit',
                date: new Date().toISOString(),
            },
            {
                id: Math.random().toString(),
                type: 'payment',
                amount: 450.25,
                recipient: 'Supermarket Purchase',
                date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
            }
        ]);
    };

    return (
        <FinancialContext.Provider
            value={{
                balance,
                isBalanceVisible,
                toggleBalanceVisibility,
                transactions,
                addTransaction,
                user,
                login,
                invoiceAmount,
                creditLimit,
                payInvoice,
            }}
        >
            {children}
        </FinancialContext.Provider>
    );
};

export const useFinancial = () => {
    const context = useContext(FinancialContext);
    if (!context) {
        throw new Error('useFinancial must be used within a FinancialProvider');
    }
    return context;
};
