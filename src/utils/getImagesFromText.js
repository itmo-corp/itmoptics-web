export default textHtml => {
  const imageURLRegEx = /<img[^>]+src="?([^"\s]+)"?\s*/g;
  return imageURLRegEx.exec(textHtml);
};
