import { useQuery } from 'saifu';

export interface nftInfo {
  mintAddress: string;
  owner: string;
  supply: number;
  collection: string;
  name: string;
  updateAuthority: string;
  primarySaleHappened: number;
  sellerFeeBasisPoints: number;
  image: string;
  animationUrl: string;
  externalUrl: string;
  attributes: { trait_type: string; value: string }[];
  properties: {
    files: { uri: string; type: string }[];
    category: string;
    creators: { address: string; share: number }[];
  };
}
const useNFTAccounts = (walletAddr: string, offset = 0, limit = 100, listStatus = 'both') => {
  return useQuery('plugin_nftAcc', async () => {
    const res = await fetch(
      `https://api-mainnet.magiceden.dev/v2/wallets/${walletAddr}/tokens?offset=${offset}&limit=${limit}&listStatus=${listStatus}`
    );
    const parsedRes = (await res.json()) as nftInfo[];
    return parsedRes;
  });
};

export default useNFTAccounts;
