import useRoute from './useRoute';

const useTitleChange = () => {
  const route = useRoute();
  const newTitle = route.title ? `${route.title} | IT[M]Optics` : 'IT[M]Optics';
  if (document.title !== newTitle) document.title = newTitle;
};

export default useTitleChange;
