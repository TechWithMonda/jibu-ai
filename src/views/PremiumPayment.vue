<template>
  <NavBar/>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <!-- Main Payment Card -->
    <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <!-- Plan Header with improved gradient -->
      <div class="bg-gradient-to-r from-blue-700 to-blue-600 p-8 text-white text-center relative overflow-hidden">
        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 12px 12px;"></div>
        <div class="relative z-10">
          <div class="flex justify-center mb-2">
            <span class="bg-white/20 px-4 py-1 rounded-full text-xs font-medium">POPULAR CHOICE</span>
          </div>
          <h1 class="text-3xl font-bold">{{ plan.name }}</h1>
          <p class="text-2xl mt-2 opacity-90">
            <span class="font-light">$ </span> 
            <span class="font-bold">{{ plan.price }}</span>
            <span class="text-lg font-light">/month</span>
          </p>
          <div class="mt-6 flex justify-center flex-wrap gap-2">
            <span v-for="feature in plan.features" :key="feature" 
                  class="bg-white/20 px-4 py-1.5 rounded-full text-xs font-medium">
              {{ feature }}
            </span>
          </div>
        </div>
      </div>

      <!-- Payment Flow -->
      <div class="p-8">
        <!-- Step 1: Payment Method -->
        <div v-if="step === 1" class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-800">Select payment method</h2>
            <span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">STEP 1 OF 2</span>
          </div>
          
          <div class="space-y-3">
            <button v-for="method in paymentMethods" :key="method.id"
                    @click="selectMethod(method)"
                    class="w-full p-4 border-2 rounded-xl flex items-center transition-all group"
                    :class="{
                      'border-blue-500 bg-blue-50/30': selectedMethod?.id === method.id,
                      'border-gray-200 hover:border-blue-300': selectedMethod?.id !== method.id
                    }">
              <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-4 transition-transform group-hover:scale-105"
                   :class="method.bgColor">
                <i :class="method.icon" class="text-white text-xl"></i>
              </div>
              <div class="text-left flex-1">
                <h3 class="font-semibold text-gray-800">{{ method.name }}</h3>
                <p class="text-sm text-gray-500">{{ method.description }}</p>
              </div>
              <i v-if="selectedMethod?.id === method.id" class="fas fa-check-circle text-blue-500 text-xl ml-2"></i>
              <i v-else class="fas fa-chevron-right text-gray-300 text-sm ml-2"></i>
            </button>
          </div>

          <!-- Security Badges -->
          <div class="flex items-center justify-center space-x-4 pt-2">
            <div class="flex items-center text-gray-500 text-xs">
              <i class="fas fa-lock-shield text-blue-500 mr-1"></i>
              <span>256-bit SSL Secure</span>
            </div>
            <div class="flex items-center text-gray-500 text-xs">
              <i class="fas fa-shield-check text-blue-500 mr-1"></i>
              <span>PCI Compliant</span>
            </div>
          </div>

          <button @click="step = 2"
                  class="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg"
                  :disabled="!selectedMethod"
                  :class="{'opacity-50 cursor-not-allowed': !selectedMethod}">
            Continue to payment details
            <i class="fas fa-arrow-right ml-2"></i>
          </button>
        </div>

        <!-- Step 2: Payment Details -->
        <div v-if="step === 2" class="space-y-6">
          <button @click="step = 1" class="flex items-center text-blue-600 text-sm font-semibold">
            <i class="fas fa-chevron-left mr-1"></i> Back to payment methods
          </button>

          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-800">Enter payment details</h2>
            <span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">STEP 2 OF 2</span>
          </div>
          
          <!-- Method Preview -->
          <div class="bg-gray-50 p-4 rounded-lg flex items-center border border-gray-100">
            <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                 :class="selectedMethod.bgColor">
              <i :class="selectedMethod.icon" class="text-white text-xl"></i>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-800">{{ selectedMethod.name }}</h3>
              <p class="text-xs text-gray-500">Selected payment method</p>
            </div>
            <i class="fas fa-check-circle text-blue-500 text-xl"></i>
          </div>

 

          <!-- Paystack Form -->
          <div v-if="selectedMethod.id === 'paystack'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" v-model="receiptEmail" 
                     class="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                     placeholder="your@email.com" required>
            </div>
            
            <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg flex">
              <div class="mr-3 text-blue-500">
                <i class="fas fa-info-circle text-lg"></i>
              </div>
              <div>
                <p class="text-blue-800 text-sm font-medium">Paystack Payment Instructions</p>
                <ul class="text-blue-700 text-xs mt-1 list-disc list-inside">
                  <li>Click "Complete Payment" to proceed</li>
                  <li>You'll be redirected to Paystack's secure payment page</li>
                  <li>Choose your preferred payment method (card, bank transfer, USSD)</li>
                  <li>Complete the payment process</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Card Form -->
          <div v-if="selectedMethod.id === 'card'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <div class="relative">
                <input type="text" v-model="cardNumber" placeholder="1234 5678 9012 3456"
                       class="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                       @input="formatCardNumber">
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <i class="far fa-credit-card text-gray-400"></i>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input type="text" v-model="expiryDate" placeholder="MM/YY"
                       class="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                       @input="formatExpiryDate">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <div class="relative">
                  <input type="text" v-model="cvv" placeholder="•••"
                         class="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                         maxlength="4">
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <i class="fas fa-question-circle text-gray-400 cursor-help" 
                       title="3 or 4 digit security code on back of card"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-start mt-2">
              <div class="flex items-center h-5">
                <input id="save-card" v-model="saveCard" type="checkbox" 
                       class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
              </div>
              <div class="ml-3 text-sm">
                <label for="save-card" class="font-medium text-gray-700">Save this card for future payments</label>
                <p class="text-gray-500">Your card details will be stored securely</p>
              </div>
            </div>
          </div>

          <!-- Terms Agreement -->
          <div class="border-t border-gray-200 pt-4 mt-2">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="terms" v-model="termsAgreed" type="checkbox" 
                       class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-medium text-gray-700">I agree to the <a href="#" class="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a></label>
                <p class="text-gray-500 mt-1">By continuing, you authorize us to charge your selected payment method for the subscription amount.</p>
              </div>
            </div>
          </div>

          <button @click="processPayment"
                  class="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg flex items-center justify-center"
                  :disabled="isProcessing || !termsAgreed || !isFormValid"
                  :class="{
                    'opacity-50 cursor-not-allowed': isProcessing || !termsAgreed || !isFormValid,
                    'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700': paymentSuccess
                  }">
            <span v-if="!isProcessing">Complete Payment - $ {{ plan.price }}</span>
            <span v-else>Processing Payment...</span>
            <i v-if="isProcessing" class="fas fa-spinner fa-spin ml-2"></i>
            <i v-else class="fas fa-lock ml-2"></i>
          </button>

          <!-- Secure Payment Footer -->
          <div class="flex items-center justify-center space-x-4 pt-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" class="h-6 opacity-70" alt="Visa">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" class="h-6 opacity-70" alt="Mastercard">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png" class="h-6 opacity-70" alt="M-Pesa">
            <img src="https://res.cloudinary.com/paystack/image/upload/v1589989352/asset/paystack-white-logo.png" class="h-6 opacity-70" alt="Paystack">
          </div>
        </div>

        <!-- Step 3: Success -->
        <div v-if="step === 3" class="text-center py-6">
          <div class="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-50 mb-6 animate-pulse">
            <div class="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <i class="fas fa-check-circle text-green-500 text-4xl"></i>
            </div>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p class="text-gray-600 mb-6">Your {{ plan.name }} subscription is now active</p>
          
          <div class="bg-gray-50 p-5 rounded-xl mb-6 text-left border border-gray-200">
            <div class="flex justify-between mb-3 pb-2 border-b border-gray-100">
              <span class="text-gray-600">Plan:</span>
              <span class="font-semibold">{{ plan.name }}</span>
            </div>
            <div class="flex justify-between mb-3 pb-2 border-b border-gray-100">
              <span class="text-gray-600">Amount Paid:</span>
              <span class="font-semibold">${{ plan.price }}</span>
            </div>
            <div class="flex justify-between mb-3 pb-2 border-b border-gray-100">
              <span class="text-gray-600">Payment Method:</span>
              <span class="font-semibold">{{ selectedMethod.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Transaction ID:</span>
              <span class="font-mono text-sm font-semibold">{{ transactionId }}</span>
            </div>
          </div>

          <div class="bg-blue-50 rounded-xl p-4 mb-6 text-left">
            <h3 class="font-semibold text-blue-800 mb-2 flex items-center">
              <i class="fas fa-info-circle mr-2"></i> What happens next?
            </h3>
            <ul class="text-blue-700 text-sm space-y-2">
              <li class="flex items-start">
                <i class="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
                <span>Your subscription is active immediately</span>
              </li>
              <li class="flex items-start">
                <i class="fas fa-envelope text-blue-500 mr-2 mt-0.5"></i>
                <span>Receipt sent to {{ receiptEmail || 'your email' }}</span>
              </li>
              <li class="flex items-start">
                <i class="fas fa-calendar-alt text-blue-500 mr-2 mt-0.5"></i>
                <span>Next billing date: {{ nextBillingDate }}</span>
              </li>
            </ul>
          </div>
          
          <div class="relative pt-1 mb-6">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-blue-600">Redirecting to dashboard in...</span>
              <span class="text-sm font-medium text-blue-600">{{ countdown }}s</span>
            </div>
            <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div :style="{ width: countdown * 20 + '%' }" 
                   class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-1000"></div>
            </div>
          </div>
          
          <button @click="$router.push('/dashboard')"
                  class="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-bold transition shadow-md hover:shadow-lg">
            Go to Dashboard Now <i class="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePaystack } from '@/composables/usePaystack' 

export default {
  setup() {
    const router = useRouter()
    const { payWithPaystack } = usePaystack()
    
    const step = ref(1)
    const selectedMethod = ref(null)
    const isProcessing = ref(false)
    const paymentSuccess = ref(false)
    const transactionId = ref('')
    const countdown = ref(5)
    const mpesaNumber = ref('')
    const cardNumber = ref('')
    const expiryDate = ref('')
    const cvv = ref('')
    const saveCard = ref(false)
    const termsAgreed = ref(false)
    const receiptEmail = ref('user@example.com')

    const plan = {
      name: "Premium Plan",
      price: 4.00,
      features: ["Unlimited papers", "Priority support", "Advanced analytics", "PDF exports"]
    }

    const paymentMethods = [
   
      {
        id: 'paystack',
        name: 'Paystack',
        icon: 'fas fa-credit-card',
        description: 'Card, Bank Transfer, M-pesa',
        bgColor: 'bg-purple-600'
      },
    
    ]

    const nextBillingDate = computed(() => {
      const today = new Date()
      const nextMonth = new Date(today.setMonth(today.getMonth() + 1))
      return nextMonth.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    })

    const isFormValid = computed(() => {
      if (!selectedMethod.value) return false
      
      if (selectedMethod.value.id === 'mpesa') {
        return mpesaNumber.value.replace(/\D/g, '').length === 9
      }
      
      if (selectedMethod.value.id === 'card') {
        const cleanCardNumber = cardNumber.value.replace(/\D/g, '')
        return cleanCardNumber.length >= 15 && 
               expiryDate.value.length === 5 && 
               cvv.value.length >= 3
      }
      
      if (selectedMethod.value.id === 'paystack') {
        // Basic email validation for Paystack
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(receiptEmail.value)
      }
      
      return true
    })

    const selectMethod = (method) => {
      selectedMethod.value = method
    }

    const formatMpesaNumber = () => {
      let numbers = mpesaNumber.value.replace(/\D/g, '')
      numbers = numbers.substring(0, 9)
      
      let formatted = ''
      for (let i = 0; i < numbers.length; i++) {
        if (i === 3 || i === 6) {
          formatted += ' '
        }
        formatted += numbers[i]
      }
      
      mpesaNumber.value = formatted
    }

    const formatCardNumber = () => {
      let numbers = cardNumber.value.replace(/\D/g, '')
      numbers = numbers.substring(0, 16)
      
      let formatted = ''
      for (let i = 0; i < numbers.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formatted += ' '
        }
        formatted += numbers[i]
      }
      
      cardNumber.value = formatted
    }

    const formatExpiryDate = () => {
      let numbers = expiryDate.value.replace(/\D/g, '')
      numbers = numbers.substring(0, 4)
      
      let formatted = ''
      for (let i = 0; i < numbers.length; i++) {
        if (i === 2) {
          formatted += '/'
        }
        formatted += numbers[i]
      }
      
      expiryDate.value = formatted
    }

 const processPaystackPayment = async () => {
  try {
    isProcessing.value = true;
    
    const paystackOptions = {
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key',
      email: receiptEmail.value,
      amount: plan.price * 100, // Paystack uses amount in kobo (multiply by 100)
      currency: 'KES', // or 'USD', 'GHS' depending on your country
      ref: 'TX-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      metadata: {
        custom_fields: [
          {
            display_name: "Plan Name",
            variable_name: "plan_name",
            value: plan.name
          }
        ]
      },
      callback: function(response) {
        handlePaystackCallback(response.reference);
      },
      onClose: function() {
        isProcessing.value = false;
      }
    };

    await payWithPaystack(paystackOptions);
  } catch (error) {
    console.error('Paystack error:', error);
    isProcessing.value = false;
  }
};

const handlePaystackCallback = async (reference) => {
  try {
    // Send to backend
    const res = await fetch('https://web-production-d639.up.railway.app/api/verify-payment/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reference,
        email: receiptEmail.value
      })
    });

    const result = await res.json();
    if (result.message === 'Payment verified!') {
      paymentSuccess.value = true;
      transactionId.value = reference;
      step.value = 3;
      startCountdown();
    } else {
      alert('Verification failed');
    }
  } catch (error) {
    console.error('Verification error:', error);
    alert('Error verifying payment');
  } finally {
    isProcessing.value = false;
  }
};

    const startCountdown = () => {
      const timer = setInterval(() => {
        countdown.value -= 1
        if (countdown.value <= 0) {
          clearInterval(timer)
          router.push('/dashboard')
        }
      }, 1000)
    }

    const processPayment = () => {
      if (selectedMethod.value.id === 'paystack') {
        processPaystackPayment()
      } else if (selectedMethod.value.id === 'mpesa') {
        // Handle M-Pesa payment
        isProcessing.value = true
        setTimeout(() => {
          isProcessing.value = false
          paymentSuccess.value = true
          transactionId.value = 'TX-' + Math.random().toString(36).substr(2, 8).toUpperCase()
          step.value = 3
          startCountdown()
        }, 2500)
      } else if (selectedMethod.value.id === 'card') {
        // Handle card payment
        isProcessing.value = true
        setTimeout(() => {
          isProcessing.value = false
          paymentSuccess.value = true
          transactionId.value = 'TX-' + Math.random().toString(36).substr(2, 8).toUpperCase()
          step.value = 3
          startCountdown()
        }, 2500)
      }
    }

    return {
      step,
      plan,
      paymentMethods,
      selectedMethod,
      selectMethod,
      isProcessing,
      processPayment,
      paymentSuccess,
      transactionId,
      countdown,
      mpesaNumber,
      cardNumber,
      expiryDate,
      cvv,
      saveCard,
      termsAgreed,
      isFormValid,
      nextBillingDate,
      receiptEmail,
      formatMpesaNumber,
      formatCardNumber,
      formatExpiryDate
    }
  }
}
</script>

<style scoped>
/* Custom animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>