// Single Responsability Principle
// A class should have only one responsibility and should not be changed for different reasons

// ❌ Incorrect: This class has more than one responsibility
class UserController {
    constructor(
        private userRepository: UserRepository,
        private emailService: EmailService
    ) {}

    public createUser(request: Request) {
        const user = User.create(request.name, request.email, request.password);
        this.userRepository.save(user);

        this.emailService.sendEmail(user.email, 'Welcome to our app');

        return {
            message: 'User created successfully',
            user: user
        };
    }
}

/*
This implementation violates SRP because the UserController is doing too many things:
- Creating a user
- Saving the user to the repository
- Sending welcome emails
- Formatting the response
*/

// ✅ Correct: This class has only one responsibility
class UserService {
    constructor(private userRepository: UserRepository) {}

    public createUser(request: Request): User {
        const user = User.create(request.name, request.email, request.password);
        this.userRepository.save(user);

        return user;
    }
}

class UserNotificationService {
  constructor(private emailService: EmailService) {}

  public sendWelcomeEmail(user: User): void {
    this.emailService.sendEmail(user.email, 'Welcome to our app');
  }
}

class UserController {
  constructor(
    private userService: UserService,
    private userNotificationService: UserNotificationService
  ) {}

  public createUser(request: Request) {
    const user = this.userService.createUser(request);
    this.userNotificationService.sendWelcomeEmail(user);

    return {
      message: 'User created successfully',
      user: user
    };
  }
}

/*
The code is split into three focused classes:
- UserService: Handles only user-related business logic
  - Creates users
  - Manages user persistence
- UserNotificationService: Handles only notification-related tasks
  - Manages email communications
  - Specifically handles welcome emails
- UserController: Coordinates the services
  - Orchestrates the flow between services
  - Formats the response

This is a much better implementation because:
- Each class has a single, well-defined responsibility
- Changes to email sending logic won't affect user creation logic
- The code is more maintainable and testable
- It's easier to modify or extend functionality without affecting other parts
- Dependencies are clearly defined and separated

The correct implementation follows the Single Responsibility Principle by ensuring that each class has only one reason to change. For example:
- If you need to change how emails are sent, you only modify UserNotificationService
- If you need to change how users are created, you only modify UserService
- If you need to change the API response format, you only modify UserController
*/