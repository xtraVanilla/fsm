## ParallelStateMachine Usage Example

Let's create a simple example using the `ParallelStateMachine` class to handle two buttons. In this scenario, we'll have two buttons, "Button1" and "Button2," and we want to track their states using the state machine. Each button can have two states: "Active" and "Inactive."

### Set up the ParallelStateMachine

First, let's create a `ParallelStateMachine` to manage the states of our two buttons. We'll initialize it with the possible states and transitions:

```javascript
const parallelStates = {
  Button1: { CLICK: ['Active', 'Inactive'] },
  Button2: { CLICK: ['Active', 'Inactive'] },
};

const initialState = {
  Button1: 'Inactive',
  Button2: 'Inactive',
};

const parallelStateMachine = new ParallelStateMachine(parallelStates, initialState);

function handleButtonClick1() {
  parallelStateMachine.transition('Button1', 'CLICK');
}

function handleButtonClick2() {
  parallelStateMachine.transition('Button2', 'CLICK');
}

handleButtonClick1(); // Button1 is now 'Active'
handleButtonClick2(); // Button2 is now 'Active'
handleButtonClick1(); // Button1 is now 'Inactive'