class FiniteStateMachine {
  states: any;
  currentState: null;

  constructor(states) {
    this.states = states;
    this.currentState = null;
  }

  start(initialState) {
    if (this.states[initialState]) {
      this.currentState = initialState;
    } else {
      console.error(`State '${initialState}' does not exist.`);
    }
  }

  transition(event) {
    if (this.currentState) {
      const nextState = this.states[this.currentState][event];

      if (nextState) {
        this.currentState = nextState;
      } else {
        console.error(
          `Transition '${event}' is not defined in the current state.`
        );
      }
    } else {
      console.error(`No state is set. Use start to set an initial state.`);
    }
  }
}

export default FiniteStateMachine;
