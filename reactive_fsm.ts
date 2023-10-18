import FiniteStateMachine from "./fsm";

/**
 * Represents a finite state machine with reactivity support.
 */
class ReactiveFiniteStateMachine extends FiniteStateMachine {
  /**
   * An array to store registered listeners.
   */
  listeners: Function[] = [];

  /**
   * Creates an instance of ReactiveFiniteStateMachine.
   * @param states - The state configuration for the finite state machine.
   */
  constructor(states) {
    super(states);
  }

  /**
   * Adds a listener function to react to state changes.
   * @param listener - The listener function to add.
   */
  addListener(listener: Function) {
    this.listeners.push(listener);
  }

  /**
   * Removes a listener function.
   * @param listener - The listener function to remove.
   */
  removeListener(listener: Function) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  /**
   * Triggers all registered listeners when the state changes.
   */
  triggerListeners() {
    for (const listener of this.listeners) {
      listener(this.currentState);
    }
  }

  /**
   * Starts the finite state machine with the specified initial state and triggers listeners.
   * @param initialState - The initial state to set.
   */
  start(initialState) {
    super.start(initialState);
    this.triggerListeners(); // Trigger listeners on state change
  }

  /**
   * Transitions to a new state and triggers listeners.
   * @param event - The event to trigger the transition.
   */
  transition(event) {
    super.transition(event);
    this.triggerListeners(); // Trigger listeners on state change
  }
}

export default ReactiveFiniteStateMachine;
