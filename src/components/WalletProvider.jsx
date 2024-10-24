import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import Web3 from 'web3';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [sdk, setSdk] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const initSDK = () => {
      const newSdk = new CoinbaseWalletSDK({
        appName: 'Learn Trail',
        appLogoUrl: 'https://example.com/logo.png', // Replace with your app's logo URL
        darkMode: false,
        appChainIds: [84531] // Base Goerli chain ID
      });
      setSdk(newSdk);
    };

    initSDK();  
  }, []);

  const connectCoinbaseWallet = useCallback(async () => {
    if (sdk) {
      const coinbaseWalletProvider = sdk.makeWeb3Provider('https://goerli.base.org', 84532);

      try {
        const accounts = await coinbaseWalletProvider.request({
          method: 'eth_requestAccounts'
        });

        setAccount(accounts[0]);
        const newWeb3 = new Web3(coinbaseWalletProvider);
        setWeb3(newWeb3);
        setProvider(coinbaseWalletProvider);
      } catch (error) {
        console.error("Failed to connect Coinbase Wallet:", error);
      }
    }
  }, [sdk]);

  const connectMetaMask = useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const newWeb3 = new Web3(window.ethereum);
        const accounts = await newWeb3.eth.getAccounts();
        setAccount(accounts[0]);
        setWeb3(newWeb3);
        setProvider(window.ethereum);
      } catch (error) {
        console.error("Failed to connect MetaMask:", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    if (provider && provider.close) {
      provider.close();
    }
    setAccount(null);
    setProvider(null);
    setWeb3(null);
  }, [provider]);

  return (
    <WalletContext.Provider value={{ 
      account, 
      web3, 
      connectCoinbaseWallet, 
      connectMetaMask, 
      disconnectWallet 
    }}>
      {children}
    </WalletContext.Provider>
  );
};