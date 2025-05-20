// Liskov Substitution Principle
// A class should be able to be replaced by its subclass without affecting the correctness of the program

// ❌ Incorrect: This class violates LSP because the subclass cannot replace the parent class
class Property {
  constructor(public address: string, public area: number) {}

  public valuate(): number {
    return AVM.estimate(this.address, this.area);
  }
}

class SoldProperty extends Property {
  public valuate(): number {
    throw new Error('Sold properties cannot be valuated');
  }
}

/*
This implementation violates LSP because:
- The SoldProperty subclass cannot be used in place of its parent Property class
- The valuate() method in SoldProperty throws an error, breaking the contract
- This means any code expecting a Property object would break if given a SoldProperty
- The subclass is not a true behavioral subtype of its parent class
*/

// ✅ Correct: Using interfaces to define clear contracts and proper type hierarchies
interface Property {
  address: string;
  getStatus(): string;
}

interface ValuableProperty extends Property {
  valuate(): number;
}

class AvailableProperty implements ValuableProperty {
  constructor(public address: string, public area: number) {}

  public getStatus(): string {
    return 'Available';
  }

  public valuate(): number {
    return AVM.estimate(this.address, this.area);
  }
}

class SoldProperty implements Property {
  constructor(public address: string, public soldPrice: number) {}

  public getStatus(): string {
    return 'Sold';
  }
}

/*
This implementation follows LSP because:
- We use interface inheritance to express proper type hierarchies
- The base Property interface defines common behavior all properties must have
- ValuableProperty extends Property to add valuation capability
- AvailableProperty implements ValuableProperty and can be valuated
- SoldProperty implements only Property, as it doesn't need valuation
- Any code expecting a Property can work with both AvailableProperty and SoldProperty
- The design maintains type safety while avoiding inheritance issues
- Each class represents a distinct concept with clear responsibilities
*/