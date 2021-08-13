import axios from "axios";

const useFetch = <T>(url: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: "get",
    })
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data as T);
        } else {
          reject(new Error(res.statusText));
        }
      })
      .catch((err) => {
        reject(new Error(err.message));
      });
  });
};

export { useFetch };
