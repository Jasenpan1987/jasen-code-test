import jsonpWithCallback from "jsonp";

const fetchData = <T>(keyword: string) => {
  return new Promise<T>((resolve, reject) => {
    return jsonpWithCallback(
      `https://www.flickr.com/services/feeds/photos_public.gne?format=json&tags=${keyword}`,
      { name: "jsonFlickrFeed" },
      (error: any, data: T) => {
        if (error) {
          console.log("error:: ", error);
          reject(error);
        } else {
          console.log("data:: ", data);
          resolve(data);
        }
      }
    );
  });
};

export default fetchData;
