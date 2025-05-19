// Interface Segregation Principle
// Clients should not be forced to depend on interfaces that they do not use

// ❌ Incorrect: This class violates ISP because the client is forced to depend on an interface that it does not use
interface Property {
  getAddress(): string;
  getArea(): number;
  markAsReformed(): void;
}

class CatalogProperty implements Property {
  getAddress(): string {
    return 'Carrer dels Tallers, 11';
  }

  getArea(): number {
    return 100;
  }

  markAsReformed(): void {
    throw new Error('Not implemented');
  }
}

/*
This implementation violates ISP because:
- The CatalogProperty class is forced to implement methods that it does not need
- The markAsReformed() method is not applicable to catalog properties (e.g., of business logic)
- This violates the principle that clients should only depend on the methods they need
*/

// ✅ Correct: Segregating interfaces to avoid unnecessary dependencies
interface BasicProperty {
  getAddress(): string;
  getArea(): number;
}

interface Reformable {
  markAsReformed(): void;
}

class CatalogProperty implements BasicProperty {
  getAddress(): string {
    return 'Carrer dels Tallers, 11';
  }

  getArea(): number {
    return 100;
  }
}

class InvestmentProperty implements BasicProperty, Reformable {
  getAddress(): string {
    return 'Carrer dels Tallers, 11';
  }

  getArea(): number {
    return 100;
  }

  markAsReformed(): void {
    // Reform logic
  }
}

/*
This implementation follows ISP because:
- Instead of a single interface, we use separate interfaces for different roles
- BasicProperty defines the common properties for all properties
- Reformable defines the methods for properties that can be reformed
- Each class implements only the necessary interfaces, avoiding unnecessary dependencies
- The code is more modular and easier to maintain
*/