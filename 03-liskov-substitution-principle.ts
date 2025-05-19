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

// ✅ Correct: Using interfaces to define clear contracts and avoid inheritance issues
interface ValuableProperty {
    valuate(): number;
}

class AvailableProperty implements ValuableProperty {
    constructor(public address: string, public area: number) {}

    public valuate(): number {
        return AVM.estimate(this.address, this.area);
    }
}

class SoldProperty {
    constructor(public address: string, public soldPrice: number) {
        // A sold property is not valuable
    }
}

/*
This implementation follows LSP because:
- Instead of inheritance, we use interfaces to define the contract
- AvailableProperty implements ValuableProperty and can be valuated
- SoldProperty is a separate class that doesn't need to be valuated
- Each class represents a distinct concept without forcing invalid behavior
- The code is more flexible and maintains type safety
*/