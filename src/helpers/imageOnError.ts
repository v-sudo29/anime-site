const brokenImage = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'

const imageOnError = (event) => {
  event.currentTarget.src = brokenImage;
  // Note: this is a global class!
  event.currentTarget.className = "errorImage";
};

export default imageOnError