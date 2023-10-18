import FiniteStateMachine from './fsm'; // Adjust the import path based on your project structure

describe('FiniteStateMachine', () => {
  let fsm;
  const states = {
    start: {
      EVENT1: 'next',
      guards: {
        EVENT1: () => true, // Allow the transition
        EVENT2: () => false, // Block the transition
      },
    },
    next: {
      EVENT2: 'end',
      guards: {
        EVENT2: () => true, // Allow the transition
      },
    },
    end: {},
  };

  beforeEach(() => {
    fsm = new FiniteStateMachine(states);
  });

  it('should start in the initial state', () => {
    fsm.start('start');
    expect(fsm.currentState).toBe('start');
  });

  it('should transition to the next state with a true guard', () => {
    fsm.start('start');
    fsm.transition('EVENT1');
    expect(fsm.currentState).toBe('next');
  });

  it('should handle transitions with a false guard', () => {
    fsm.start('start');
    fsm.transition('EVENT2');
    expect(fsm.currentState).toBe('start'); // Guard should block the transition
    // Ensure the error message is logged or handled appropriately in your code.
  });

  it('should handle transitions between states', () => {
    fsm.start('start');
    fsm.transition('EVENT1');
    fsm.transition('EVENT2');
    expect(fsm.currentState).toBe('end');
  });

  it('should handle invalid state transitions', () => {
    fsm.start('start');
    fsm.transition('INVALID_EVENT');
    expect(fsm.currentState).toBe('start');
    // Ensure the error message is logged or handled appropriately in your code.
  });

  it('should handle starting in an undefined state', () => {
    fsm.start('undefinedState');
    expect(fsm.currentState).toBe(null);
    // Ensure the error message is logged or handled appropriately in your code.
  });

  it('should handle transitions from an undefined state', () => {
    fsm.transition('EVENT1');
    expect(fsm.currentState).toBe(null);
    // Ensure the error message is logged or handled appropriately in your code.
  });
});
