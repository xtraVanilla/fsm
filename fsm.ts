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
          return transitionGuard();
        }
      }
      return true;
    }

    return false;
  }

  transition(event) {
    if (this.canTransition(event)) {
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
    } else {
      console.error(`Guard prevents transition on event '${event}'.`);
    }
  }
}

export default FiniteStateMachine;
