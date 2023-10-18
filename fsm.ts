/**
 * Represents a finite state machine with enhanced state transition capabilities.
 */
class FiniteStateMachine {
  /**
   * An object that defines the states and their possible transitions.
   */
  states: Record<string, Record<string, string>>;

  /**
   * The current state of the finite state machine. It is initially set to null.
   */
  currentState: string | null;

  /**
   * Creates an instance of the FiniteStateMachine class.
   * @param states - An object that defines the states and their transitions.
   */
  constructor(states: Record<string, Record<string, string>) {
    this.states = states;
    this.currentState = null;
  }

  /**
   * Starts the finite state machine with the specified initial state.
   * @param initialState - The initial state to set.
   */
  start(initialState: string): void {
    if (this.states[initialState]) {
      this.currentState = initialState;
    } else {
      console.error(`State '${initialState}' does not exist.`);
    }
  }

  /**
   * Checks if a transition is allowed based on state guards.
   * @param event - The event triggering the transition.
   * @returns A boolean indicating whether the transition is allowed.
   */
  canTransition(event: string): boolean {
    if (this.currentState) {
      const currentStateConfig = this.states[this.currentState];

      if (currentStateConfig && currentStateConfig.guards) {
        const transitionGuard = currentStateConfig.guards[event];

        if (transitionGuard) {
          // Pass the current state as an argument to the guard function
          return transitionGuard(this.currentState);
        }
      }
      return true;
    }

    return false;
  }

  /**
   * Initiates a state transition based on the specified event.
   * @param event - The event triggering the transition.
   * @param beforeCallback - A callback function to execute before the transition.
   * @param afterCallback - A callback function to execute after the transition.
   */
  transition(
    event: string,
    beforeCallback: () => void = () => {},
    afterCallback: () => void = () => {}
  ): void {
    if (this.canTransition(event)) {
      if (this.currentState) {
        const nextState = this.states[this.currentState][event];

        if (nextState) {
          // Execute the "before" callback before the state update
          beforeCallback();

          // Perform side effects before the state update if needed
          console.log(
            `Transition '${event}' completed. Current state: ${this.currentState}`
          );

          // Update the state
          this.currentState = nextState;

          // Perform side effects after the state update
          console.log(`State updated. Current state: ${this.currentState}`);

          // Execute the "after" callback after the state update
          afterCallback();
        } else {
          console.error(`Transition '${event}' is not defined in the current state.`);
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
