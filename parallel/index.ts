import FiniteStateMachine from "../fsm";

/**
 * Represents a finite state machine with support for parallel states.
 */
class ParallelStateMachine extends FiniteStateMachine {
  /**
   * An object that defines parallel states and their possible transitions.
   */
  parallelStates: Record<string, Record<string, string | string[]>>;

  /**
   * An object that keeps track of the current parallel states.
   */
  currentParallelStates: Record<string, string>;

  /**
   * Creates an instance of ParallelStateMachine.
   * @param parallelStates - An object that defines parallel states and their transitions.
   */
  constructor(
    parallelStates: Record<string, Record<string, string | string[]>>
  ) {
    super({}); // Initialize the base class with an empty state object
    this.parallelStates = parallelStates;
    this.currentParallelStates = {};

    // Initialize parallel states
    for (const state of Object.keys(parallelStates)) {
      const initialState = Array.isArray(parallelStates[state])
        ? parallelStates[state][0]
        : parallelStates[state]["initial"];
      this.currentParallelStates[state] = Array.isArray(initialState)
        ? initialState[0]
        : initialState;
    }
  }

  /**
   * Transitions to a new state, considering parallel states.
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
      const newParallelStates: Record<string, string> = {};

      for (const state of Object.keys(this.currentParallelStates)) {
        const nextState = this.parallelStates[state][event];
        if (nextState) {
          newParallelStates[state] = Array.isArray(nextState)
            ? nextState[0]
            : nextState;
        } else {
          newParallelStates[state] = this.currentParallelStates[state];
        }
      }

      this.currentParallelStates = newParallelStates;

      // Execute the "before" callback before the state update
      beforeCallback();

      // Perform side effects before the state update if needed
      console.log(
        `Transition '${event}' completed. Current parallel states: ${JSON.stringify(
          this.currentParallelStates
        )}`
      );

      // Perform side effects after the state update
      console.log(
        `Parallel states updated. Current parallel states: ${JSON.stringify(
          this.currentParallelStates
        )}`
      );

      // Execute the "after" callback after the state update
      afterCallback();
    } else {
      console.error(`Guard prevents transition on event '${event}'.`);
    }
  }
}

export default ParallelStateMachine;
