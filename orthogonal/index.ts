import FiniteStateMachine from "../fsm";

class OrthogonalStateMachine extends FiniteStateMachine {
  orthogonalStates = {};

  constructor(states, orthogonalStates) {
    super(states);
    this.orthogonalStates = orthogonalStates;
  }

  transition(event) {
    if (this.canTransition(event)) {
      if (this.currentState) {
        // Check if the current state is an orthogonal state
        if (this.orthogonalStates[this.currentState]) {
          // Iterate through orthogonal states and transition each
          for (const orthogonalState of this.orthogonalStates[
            this.currentState
          ]) {
            const nextState = this.states[orthogonalState][event];
            if (nextState) {
              // Transition each orthogonal state
              this.states[orthogonalState].currentState = nextState;
            }
          }

          // Update the current state (e.g., consider all orthogonal states)
          this.currentState = this.orthogonalStates[this.currentState];
        } else {
          // Handle non-orthogonal states as before
          const nextState = this.states[this.currentState][event];
          if (nextState) {
            this.currentState = nextState;
          } else {
            console.error(
              `Transition '${event}' is not defined in the current state.`
            );
          }
        }
      } else {
        console.error(`No state is set. Use start to set an initial state.`);
      }
    } else {
      console.error(`Guard prevents transition on event '${event}'.`);
    }
  }
}

export default OrthogonalStateMachine;
