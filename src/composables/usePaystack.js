// src/composables/usePaystack.js
export function usePaystack() {
  const payWithPaystack = ({ key, email, amount, ref, currency = "KES", callback, onClose }) => {
    if (!window.PaystackPop) {
      console.error("Paystack script not loaded");
      return;
    }

    const handler = window.PaystackPop.setup({
      key,
      email,
      amount: amount * 100, // Convert to kobo
      currency,
      ref: ref || `ref-${Date.now()}`,
      callback: callback || function(response) {
        console.log("Payment successful", response);
      },
      onClose: onClose || function() {
        console.log("Payment window closed");
      }
    });

    handler.openIframe();
  };

  return { payWithPaystack };
}
