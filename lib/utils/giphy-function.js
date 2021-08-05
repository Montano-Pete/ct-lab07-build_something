import axios from 'axios';

const getGif = async () => {
  const URL = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY}&q=pie&limit=10&offset=0&rating=pg&lang=en`;
  const { urlData } = await axios.get(URL);
  const randomizedGif =
    urlData.data[Math.floor(Math.random() * 20)].images.downsized.url;

  return randomizedGif;
};

export default getGif;
