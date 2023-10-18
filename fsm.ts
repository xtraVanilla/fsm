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

  canTransition(event): boolean {
    if (this.currentState) {
      const currentStateConfig = this.states[this.currentState];

      if (currentStateConfig && currentStateConfig.guards) {
        const transitionGuard = currentStateConfig.guards[event];

        if (transitionGuard) {
          return transitionGuard(this.currentState);
        }
      }
      return true;
    }

    return false;
  }

  transition(event, beforeCallback = () => {}, afterCallback = () => {}) {
    if (this.canTransition(event)) {
      if (this.currentState) {
        const nextState = this.states[this.currentState][event];

        if (nextState) {
          // Execute the "before" callback before the state update
          beforeCallback();

          // Add side effects before the state update if needed
          console.log(
            `Transition '${event}' completed. Current state: ${this.currentState}`
          );

          // Update the state
          this.currentState = nextState;

          // Add side effects after the state update
          console.log(`State updated. Current state: ${this.currentState}`);

          // Execute the "after" callback after the state update
          afterCallback();
        } else {
          console.error(
            `Transition '${event}' is not defined in the current state.`
          );
        }
      } else {
        console.error(`No state is set. Use start to set an initial state.`);
      }
    } else {
      console.error(`Guard prevents transition on event '${event}'.`);
    }
  }
}

export default FiniteStateMachine;
