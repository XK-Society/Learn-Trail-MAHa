import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from "@monaco-editor/react";
import { ethers } from 'ethers';
import { useWallet } from '../../WalletProvider';

const ModuleIDE = () => {
  const navigate = useNavigate();
  const { account, web3 } = useWallet();
  const [code, setCode] = useState(
    `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message;

    constructor() {
        message = "Hello World!";
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}`
  );
  const [compiled, setCompiled] = useState(null);
  const [deployed, setDeployed] = useState(null);
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const w = new Worker(new URL('./solc-worker.js', import.meta.url));
    setWorker(w);

    w.onerror = (error) => {
      console.error('Worker error:', error);
      setOutput(`Worker error: ${error.message}`);
      setIsCompiling(false);
    };

    return () => {
      w.terminate();
    };
  }, []);

  const compile = useCallback(() => {
    if (!worker) {
      setOutput('Web worker is not ready. Please wait and try again.');
      return;
    }

    setIsCompiling(true);
    setOutput('Compiling...');

    const input = {
      language: 'Solidity',
      sources: {
        'HelloWorld.sol': {
          content: code
        }
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['*']
          }
        }
      }
    };

    const timeout = setTimeout(() => {
      setOutput('Compilation is taking longer than expected. Please wait...');
    }, 5000);

    worker.onmessage = (event) => {
      clearTimeout(timeout);
      setIsCompiling(false);
      if (event.data.type === 'success') {
        const output = event.data.output;
        if (output.errors) {
          const errorMessages = output.errors.map(error => error.formattedMessage).join('\n');
          setOutput(`Compilation errors:\n${errorMessages}`);
        } else {
          setCompiled(output.contracts['HelloWorld.sol'].HelloWorld);
          setOutput('Compilation successful!');
        }
      } else {
        setOutput(`Compilation error: ${event.data.error}`);
      }
    };

    worker.postMessage(input);
  }, [code, worker]);

  const deploy = async () => {
    if (!compiled) {
      setOutput('Please compile the contract first.');
      return;
    }
    if (!account) {
      setOutput('Please connect your wallet first.');
      return;
    }
    try {
      setOutput('Deploying contract...');
      const signer = web3.getSigner();
      const factory = new ethers.ContractFactory(compiled.abi, compiled.evm.bytecode.object, signer);
      const contract = await factory.deploy();
      await contract.waitForDeployment();
      setDeployed(contract);
      setOutput(`Contract deployed at: ${await contract.getAddress()}`);
    } catch (error) {
      setOutput(`Deployment error: ${error.message}`);
      console.error('Deployment error:', error);
    }
  };

  const run = async () => {
    if (!deployed) {
      setOutput('Please deploy the contract first.');
      return;
    }

    try {
      const message = await deployed.getMessage();
      setOutput(`Current message: ${message}`);

      const tx = await deployed.setMessage('Hello from Web3!');
      setOutput('Updating message...');
      await tx.wait();

      const newMessage = await deployed.getMessage();
      setOutput(`Message updated. New message: ${newMessage}`);
    } catch (error) {
      setOutput(`Interaction error: ${error.message}`);
    }
  };

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <div className="bg-bgBar rounded-md shadow-box w-4/5 max-w-4xl h-auto pb-8">
        <div className="text-center p-4">
          <h1 className="text-2xl font-semibold">Module IDE</h1>
        </div>
        <div className="px-8">
          <Editor
            height="400px"
            defaultLanguage="sol"
            defaultValue={code}
            onChange={setCode}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
          <div className="button-group mt-4">
            <button onClick={compile} className="bg-bgButton text-sm ml-2 px-4 py-2 rounded hover:bg-white hover:text-bgButton" disabled={isCompiling || !worker}>
              {isCompiling ? 'Compiling...' : 'Compile'}
            </button>
            <button onClick={deploy} className="bg-bgButton text-sm ml-2 px-4 py-2 rounded hover:bg-white hover:text-bgButton" disabled={!compiled}>Deploy</button>
            <button onClick={run} className="bg-bgButton text-sm ml-2 px-4 py-2 rounded hover:bg-white hover:text-bgButton" disabled={!deployed}>Run</button>
          </div>
          <pre className="output mt-4 p-4 bg-bg text-white rounded h-32 overflow-auto">{output}</pre>
        </div>
      </div>
      <div className="p-10 space-x-32">
        <button onClick={() => handleClick('/quiztwo')} className="bg-bgButton text-sm ml-2 px-4 py-2 rounded hover:bg-white hover:text-bgButton">Back</button>
        <button onClick={() => handleClick('/thanks')} className="bg-bgButton text-sm ml-2 px-4 py-2 rounded hover:bg-white hover:text-bgButton">Next</button>
      </div>
    </div>
  );
};

export default ModuleIDE;