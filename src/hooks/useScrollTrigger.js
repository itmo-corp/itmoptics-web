import React from 'react';

const Direction = {
  UP: 'UP',
  DOWN: 'DOWN',
};

const State = {
  SHOW: false,
  HIDE: true,
};

const defaultThreshold = 200;
const defaultTarget = typeof window !== 'undefined' ? window : null;

function defaultTrigger(store, options) {
  const { threshold = defaultThreshold, target, trigger } = options;
  const previousDirection = store.current.direction;
  const previousScroll = store.current.previousScroll;
  const currentScroll = target ? target.pageYOffset : 0;

  // Set the trigger to show if the scroll position is lower than a threshold
  if (currentScroll < threshold) return State.SHOW;

  // Set the previousScroll to the current scroll to store
  // This doesn't affect previousScroll variable, so we can do that anywhere in the code
  store.current.previousScroll = currentScroll;

  // Set current scroll direction
  if (currentScroll > previousScroll) {
    store.current.direction = Direction.DOWN;
  } else {
    store.current.direction = Direction.UP;
  }

  // If user changed their scroll direction, then set the store scroll once.
  if (store.current.direction !== previousDirection) {
    store.current.position = currentScroll;
  }

  // Return false when user passed the threshold value by scrolling upwards
  if (store.current.direction === Direction.UP) {
    if (store.current.position - threshold >= currentScroll) return State.SHOW;
    return trigger;
  }
  // Return true when user passed the threshold value by scrolling downwards
  if (store.current.direction === Direction.DOWN) {
    if (store.current.position + threshold <= currentScroll) return State.HIDE;
    return trigger;
  }
  return trigger;
}

const useScrollTrigger = (options = {}) => {
  const {
    getTrigger = defaultTrigger,
    target = defaultTarget,
    threshold = defaultThreshold,
    triggerValue = target.pageYOffset > threshold,
  } = options;
  const store = React.useRef({
    position: target.pageYOffset,
    previousScroll: target.pageYOffset,
    direction: undefined,
  });
  const [trigger, setTrigger] = React.useState(() => getTrigger(store,
    { trigger: triggerValue, target, threshold })
  );

  React.useEffect(() => {
    const handleScroll = () => {
      setTrigger(getTrigger(store, { target, trigger, threshold }));
    };

    // Re-evaluate trigger when dependencies change
    handleScroll();
    // passive: true enhances scrolling experience
    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  }, [target, getTrigger, trigger, threshold]);

  return trigger;
};

export default useScrollTrigger;
