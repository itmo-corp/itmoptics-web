import React from 'react';

const defaultTarget = typeof window !== 'undefined' ? window : null;

function defaultTrigger(options) {
  const { target } = options;
  const currentScroll = target ? target.pageYOffset : 0;

  return currentScroll > 0;
}

const useAppBarScrollTrigger = (options = {}) => {
  const { getTrigger = defaultTrigger, target = defaultTarget } = options;
  const [trigger, setTrigger] = React.useState(() => getTrigger({ target }));

  React.useEffect(() => {
    const handleScroll = () => {
      setTrigger(getTrigger({ target }));
    };

    handleScroll(); // Re-evaluate trigger when dependencies change
    target.addEventListener('scroll', handleScroll);
    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  }, [target, getTrigger]);

  return trigger;
};

export default useAppBarScrollTrigger;
