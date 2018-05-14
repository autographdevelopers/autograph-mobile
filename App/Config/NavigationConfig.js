export const STACK_TRANSITION_DURATION = 300;

export const stackNavigatorConfig = {
  transitionConfig: () => ({
    transitionSpec: {
      duration: STACK_TRANSITION_DURATION,
    }
  })
};
