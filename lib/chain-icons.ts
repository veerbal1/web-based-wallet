export const getChainIcon = (chainTitle: string): string => {
  const iconMap: Record<string, string> = {
    'Solana': '/icons/solana.svg',
    'Ethereum': '/icons/eth.svg',
    'Bitcoin': '/icons/bitcoin.svg',
  };
  
  return iconMap[chainTitle] || '/icons/default.svg';
}; 