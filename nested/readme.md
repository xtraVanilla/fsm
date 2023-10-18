import NestedStateMachine from './NestedStateMachine';

// Define the hierarchical states and their transitions
const hierarchicalStates = {
  idle: { CLICK: 'clicked' },
  clicked: { SUBMIT: 'submitting', CANCEL: 'canceled' },
  submitting: { SUCCESS: 'submitted', FAILURE: 'failed' },
  submitted: {},
  canceled: {},
  failed: {},
};

// Create an instance of NestedStateMachine
const stateMachine = new NestedStateMachine(hierarchicalStates);

// Set the initial state
stateMachine.start('idle');

// Define callback functions
const beforeCallback = () => {
  console.log('Before Transition:', stateMachine.currentState);
};

const afterCallback = () => {
  console.log('After Transition:', stateMachine.currentState);
};

// Perform transitions
stateMachine.transition('CLICK', beforeCallback, afterCallback); // Transition from 'idle' to 'clicked'
stateMachine.transition('SUBMIT', beforeCallback, afterCallback); // Transition from 'clicked' to 'submitting'
stateMachine.transition('SUCCESS', beforeCallback, afterCallback); // Transition from 'submitting' to 'submitted'

// Check the final state
console.log('Current State:', stateMachine.currentState);
