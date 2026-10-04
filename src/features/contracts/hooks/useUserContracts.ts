'use client';

import { useState, useEffect, useCallback } from 'react';

export interface UserContractItem {
    id: string;
    file_name: string;
    file_path: string;
    country: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    risk_score: number | null;
    overall_risk: 'LOW' | 'MEDIUM' | 'HIGH' | null;
    created_at: string;
    updated_at: string;
}

export function useUserContracts() {
    const [contracts, setContracts] = useState<UserContractItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchContracts = useCallback(async () => {
        try {
            const res = await fetch('/api/contracts', {
                method: 'GET',
                cache: 'no-store',
            });

            if (!res.ok) {
                if (res.status === 401) {
                    setContracts([]);
                    return;
                }
                throw new Error(`Failed to fetch contracts (${res.status})`);
            }

            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
                setContracts(json.data);
            }
        } catch (err) {
            console.warn('useUserContracts fetch error:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch contracts');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteContract = useCallback(async (contractId: string) => {
        try {
            // Optimistic update
            setContracts((prev) => prev.filter((c) => c.id !== contractId));

            const res = await fetch(`/api/contracts/${contractId}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                console.error('Delete contract failed:', data.error);
                // Revert on failure
                fetchContracts();
                return false;
            }

            return true;
        } catch (err) {
            console.error('Delete contract error:', err);
            fetchContracts();
            return false;
        }
    }, [fetchContracts]);

    useEffect(() => {
        fetchContracts();

        const handleContractsUpdated = () => {
            fetchContracts();
        };

        window.addEventListener('contracts:updated', handleContractsUpdated);
        return () => {
            window.removeEventListener('contracts:updated', handleContractsUpdated);
        };
    }, [fetchContracts]);

    return {
        contracts,
        isLoading,
        error,
        refreshContracts: fetchContracts,
        deleteContract,
    };
}
