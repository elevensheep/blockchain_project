
// 📦 frontend/hooks/useTransactionAPI.js
import { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8001/api/transaction';

const useTransaction = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [result, setResult] = useState(null);

    const createTransaction = async (payload) => {
        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE}/create`, payload);
            setResult(res.data.transaction);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const approveTransaction = async ({ transactionId, approver }) => {
        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE}/approve`, { transactionId, approver });
            setResult(res.data.transaction);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserTransactions = async (userId) => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE}/user/${userId}`);
            setTransactions(res.data.transactions);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        transactions,
        result,
        createTransaction,
        approveTransaction,
        fetchUserTransactions,
    };
};

export default useTransaction;
