// usePaystack.js
export const usePaystack = () => {
  const loadPaystackScript = () => {
    return new Promise((resolve, reject) => {
      if (window.PaystackPop) return resolve();
      
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Paystack script'));
      document.body.appendChild(script);
    });
  };

  const payWithPaystack = async (options) => {
    try {
      await loadPaystackScript();
      
      if (!window.PaystackPop) {
        throw new Error('Paystack library not loaded');
      }

      const handler = window.PaystackPop.setup({
        ...options,
        callback: options.callback || function(response) {
          console.log('Payment completed', response);
        },
        onClose: options.onClose || function() {
          console.log('Payment window closed');
        }
      });

      handler.openIframe();
    } catch (error) {
      console.error('Paystack error:', error);
      throw error;
    }
  };

  return { payWithPaystack };
};