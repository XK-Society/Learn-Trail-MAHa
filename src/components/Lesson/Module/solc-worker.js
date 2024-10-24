let solc;

   self.importScripts('https://binaries.soliditylang.org/bin/soljson-v0.8.19+commit.7dd6d404.js');

   // We need to implement a minimal require function for the wrapper
   self.require = (path) => {
     if (path === 'fs') {
       return { readFileSync: () => '' };
     }
     if (path === 'path') {
       return { resolve: () => '' };
     }
     throw new Error(`Unsupported require: ${path}`);
   };

   // Implement a minimal wrapper function
   function createSolcWrapper(Module) {
     const wrapper = (solJson) => {
       const compile = (input) => {
         return solJson.cwrap('solidity_compile', 'string', ['string'])(input);
       };
       return { compile };
     };
     return wrapper(Module);
   }

   self.addEventListener('message', async (event) => {
     try {
       if (!solc) {
         solc = createSolcWrapper(self.Module);
       }

       const input = event.data;

       const output = JSON.parse(solc.compile(JSON.stringify(input)));
       self.postMessage({ type: 'success', output });
     } catch (error) {
       self.postMessage({ type: 'error', error: error.message });
     }
   });

   self.addEventListener('error', (error) => {
     self.postMessage({ type: 'error', error: `Worker error: ${error.message}` });
   });