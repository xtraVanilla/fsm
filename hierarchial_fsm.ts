import FiniteStateMachine from "./fsm";

/**
 * Represents a finite state machine with support for hierarchical states.
 */
class HierarchicalFiniteStateMachine extends FiniteStateMachine {
  /**
   * An object that defines the states and their possible transitions.
   */
  states: Record<string, Record<string, string>>;

  /**
   * An object that defines hierarchical states and their possible transitions.
   */
  hierarchicalStates: Record<string, Record<string, string>>;

  /**
   * Creates an instance of HierarchicalFiniteStateMachine.
   * @param states - An object that defines the non-hierarchical states and their transitions.
   * @param hierarchicalStates - An object that defines hierarchical states and their transitions.
   */
  constructor(
    states: Record<string, Record<string, string>>,
    hierarchicalStates: Record<string, Record<string, string>>
  ) {
    super(states);
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
        // Point 1: Check if the current state is a hierarchical state.
        const hierarchicalState = this.hierarchicalStates[this.currentState];

        if (hierarchicalState) {
          // Point 2: If the current state is hierarchical, handle hierarchical transitions.
          const nextState = hierarchicalState[event];

          if (nextState) {
            // Execute the "before" callback before the state update
            beforeCallback();

            // Perform side effects before the state update if needed
            console.log(
              `Transition '${event}' completed. Current state: ${this.currentState}`
            );

            // Update the state to a new hierarchical state
            this.currentState = nextState;

            // Perform side effects after the state update
            console.log(`State updated. Current state: ${this.currentState}`);

            // Execute the "after" callback after the state update
            afterCallback();
          } else {
            console.error(
              `Transition '${event}' is not defined in the current state.`
            );
          }
        } else {
          // Check non-hierarchical states if the current state is not hierarchical.
          const nextState = this.states[this.currentState][event];

          if (nextState) {
            // Execute the "before" callback before the state update
            beforeCallback();

            // Perform side effects before the state update if needed
            console.log(
              `Transition '${event}' completed. Current state: ${this.currentState}`
            );

            // Update the state to a new non-hierarchical state
            this.currentState = nextState;

            // Perform side effects after the state update
            console.log(`State updated. Current state: ${this.currentState}`);

            // Execute the "after" callback after the state update
            afterCallback();
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
