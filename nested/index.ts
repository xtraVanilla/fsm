import FiniteStateMachine from "../fsm";

/**
 * Represents a finite state machine with support for hierarchical states.
 */
class NestedStateMachine extends FiniteStateMachine {
  /**
   * An object that defines the hierarchical states and their possible transitions.
   */
  hierarchicalStates: Record<string, Record<string, string>>;

  /**
   * Creates an instance of NestedParallelStateMachine.
   * @param hierarchicalStates - An object that defines hierarchical states and their transitions.
   */
  constructor(hierarchicalStates: Record<string, Record<string, string>>) {
    super({});
    this.hierarchicalStates = hierarchicalStates;
  }

  /**
   * Transitions to a new state, considering hierarchical states.
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
        const hierarchicalState = this.hierarchicalStates[this.currentState];

        if (hierarchicalState) {
          const nextState = hierarchicalState[event];

          if (nextState) {
            // Execute the "before" callback before the state update
            beforeCallback();

            // Update the state to a new hierarchical state
            this.currentState = nextState;

            // Execute the "after" callback after the state update
            afterCallback();
          } else {
            console.error(
              `Transition '${event}' is not defined in the current hierarchical state.`
            );
          }
        } else {
          console.error(`Current state is not a hierarchical state.`);
        }
      } else {
        console.error(`No state is set. Use start to set an initial state.`);
      }
    } else {
      console.error(`Guard prevents transition on event '${event}'.`);
    }
  }
}

export default NestedStateMachine;
