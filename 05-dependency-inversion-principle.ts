// Dependency Inversion Principle
// High-level modules should not depend on low-level modules. Both should depend on abstractions.
// Abstractions should not depend on details. Details should depend on abstractions.

// ❌ Incorrect: This class violates DIP because the high-level module depends on the low-level module
class InvestorNotifier {
  constructor(private emailClient: SendGridClient) {}

  public notify(investor: Investor, message: string) {
    this.emailClient.sendEmail(investor.email, message);
  }
}

/*
This implementation violates DIP because:
- The InvestorNotifier class depends on the concrete SendGridClient implementation
- This makes it difficult to switch to a different email service (e.g., Mailgun)
- The high-level module (InvestorNotifier) is tightly coupled to the low-level module (SendGridClient)
*/

// ✅ Correct: Using abstractions to decouple high-level and low-level modules
interface EmailService {
  send(to: string, message: string): void;
}

class SendGridEmailService implements EmailService {
  send(to: string, message: string): void {
    // Send email using SendGrid
  }
}

class InvestorNotifier {
  constructor(private emailService: EmailService) {}

  public notify(investor: Investor, message: string) {
    this.emailService.send(investor.email, message);
  }
}

/*
This implementation follows DIP because:
- The high-level module (InvestorNotifier) depends on the abstraction (EmailService)
- The low-level module (SendGridEmailService) implements the abstraction
- This allows for easy swapping of email services (e.g., Mailgun) without changing the high-level module
- The code is more flexible and easier to maintain
*/