// Open/Closed Principle
// A class should be open for extension but closed for modification

// ❌ Incorrect: This class is not open for extension
class PaymentService {
  public process(paymentMethod: string) {
    if (paymentMethod === 'credit-card') {
      // Process credit card payment
    } else if (paymentMethod === 'crypto') {
      // Process crypto payment
    } else {
      throw new Error('Invalid payment method');
    }
  }
}

/*
This implementation violates OCP because:
- Every time you want to add a new payment method, you need to modify the existing PaymentService class
- You need to add a new if condition and implement the logic inside the class
- This makes the code more fragile and violates the "closed for modification" part of OCP
*/

// ✅ Correct: I can extend the PaymentService class to add new payment methods without modifying the existing code
interface PaymentMethod {
  process(): void;
}

class CreditCardPayment implements PaymentMethod {
  process(): void {
    // Process credit card payment
  }
}

class CryptoPayment implements PaymentMethod {
  process(): void {
    // Process crypto payment
  }
}

class PaymentService {
  public process(paymentMethod: PaymentMethod) {
    paymentMethod.process();
  }
}

/*
This implementation follows OCP because:
- The PaymentService class is closed for modification - its core logic doesn't change
- New payment methods can be added by creating new classes that implement the PaymentMethod interface
- The code is more maintainable and extensible
- Each payment method is encapsulated in its own class, following Single Responsibility Principle as well

The benefits of following OCP in this example are:
- Maintainability: Existing code doesn't need to be modified, reducing the risk of introducing bugs
- Extensibility: New payment methods can be added without touching the core payment processing logic
- Testability: Each payment method can be tested in isolation
- Flexibility: Different payment methods can be swapped in and out without affecting the rest of the system
*/