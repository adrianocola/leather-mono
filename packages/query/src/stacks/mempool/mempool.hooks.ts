import { useMemo } from 'react';

import { MempoolTransaction } from '@stacks/stacks-blockchain-api-types';

import { increaseValueByOneMicroStx, isDefined, microStxToStx } from '@leather-wallet/utils';

import { useTransactionsById } from '../transactions/transactions-by-id.query';
import { useStacksConfirmedTransactions } from '../transactions/transactions-with-transfers.hooks';
import { useAccountMempoolQuery } from './mempool.query';
import { calculatePendingTxsMoneyBalance } from './mempool.utils';

const droppedCache = new Map();

export function useStacksPendingTransactions(address: string) {
  const query = useAccountMempoolQuery(address);
  const mempoolTxs = query.data ? query.data.results : [];
  const results = mempoolTxs.filter(
    tx => tx.tx_status === 'pending' && !droppedCache.has(tx.tx_id)
  );
  const txs = useTransactionsById(results.map(tx => tx.tx_id));
  return useMemo(() => {
    return {
      query,
      transactions: txs
        .map(tx => tx.data)
        .filter(tx => {
          if (typeof tx === 'undefined') return false;
          if (droppedCache.has(tx.tx_id)) return false;
          if (tx.tx_status !== 'pending') {
            // Stale txs persist in the mempool endpoint so we
            // need to cache dropped txids to prevent unneeded fetches
            droppedCache.set(tx.tx_id, true);
            return false;
          }
          return true;
        })
        .filter(tx => !!tx)
        .filter(isDefined) as MempoolTransaction[],
    };
  }, [txs, query]);
}

export function useMempoolTxsInboundBalance(address: string) {
  const { transactions: pendingTransactions } = useStacksPendingTransactions(address);
  const confirmedTxs = useStacksConfirmedTransactions(address);

  return calculatePendingTxsMoneyBalance({
    address,
    confirmedTxs,
    pendingTxs: pendingTransactions,
    type: 'inbound',
  });
}

export function useMempoolTxsOutboundBalance(address: string) {
  const { transactions: pendingTransactions } = useStacksPendingTransactions(address);
  const confirmedTxs = useStacksConfirmedTransactions(address);

  return calculatePendingTxsMoneyBalance({
    address,
    confirmedTxs,
    pendingTxs: pendingTransactions,
    type: 'outbound',
  });
}

export function useStacksValidateFeeByNonce(address: string) {
  const { transactions } = useStacksPendingTransactions(address);

  function changeFeeByNonce({ nonce, fee }: { nonce: number; fee: number }) {
    return transactions.reduce((updatedFee, tx) => {
      if (Number(tx.nonce) === nonce && microStxToStx(tx.fee_rate).toNumber() >= fee) {
        return increaseValueByOneMicroStx(microStxToStx(tx.fee_rate));
      }
      return updatedFee;
    }, fee);
  }
  return { changeFeeByNonce };
}
