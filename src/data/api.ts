import { useCallback, useEffect, useState } from "react";

export interface Album {
  id: string;
  user_id: string;
  title: string;
  photos?: Photo[];
}

export interface Photo {
  id: string;
  album_id: string;
  title: string;
  url: string;
  thumbnail: string;
}

interface Error {
  name: string;
  message: string;
  status: number;
}

const GOREST_API_URL = `https://gorest.co.in/public-api`;

const headers = new Headers({
  Authorization: `Bearer ${process.env["REACT_APP_GOREST_API_TOKEN"]}`
});

const get = async (path: string) => {
  const res = await fetch(`${GOREST_API_URL}${path}`, { headers });
  const data = await res.json();
  return data.result;
};

const getAlbumAsync = async (id: string) => {
  return get(`/albums/${id}`);
};

const getAlbumPhotosAsync = async (id: string) => {
  return get(`/photos?album_id=${id}`);
};

export const useAlbum = (id: string) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Error[]>([]);
  const [results, setResults] = useState<[Album, Photo[]]>();
  const handleResults = useCallback(setResults, []);
  const handleErrors = useCallback(setErrors, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await Promise.all([
        getAlbumAsync(id),
        getAlbumPhotosAsync(id)
      ]);
      const errors = res.map(result => result.status);
      if (errors.some(error => error)) {
        handleErrors(res);
      }
      handleResults(res);
      setLoading(false);
    };

    fetchData();
  }, [id, handleResults, handleErrors]);

  return {
    loading,
    errors,
    album: results?.[0],
    photos: results?.[1]
  };
};

// Mock data

// export const album: Album = {
//   id: "3",
//   user_id: "758",
//   title: "In facilis aut aperiam quo qui quia."
// };

// export const photos: Photo[] = [
//   {
//     id: "1963",
//     album_id: "3",
//     title:
//       "Suscipit ea quae explicabo. Consequuntur quasi aut similique consequatur ex culpa.",
//     url: "https://lorempixel.com/1024/768/abstract/?17727",
//     thumbnail: "https://lorempixel.com/150/150/abstract/?19973"
//   },
//   {
//     id: "2569",
//     album_id: "3",
//     title:
//       "Quos ab pariatur molestias eum labore. Commodi excepturi harum nihil nihil id repellendus.",
//     url: "https://lorempixel.com/1024/768/abstract/?10565",
//     thumbnail: "https://lorempixel.com/150/150/abstract/?42724"
//   },
//   {
//     id: "2",
//     album_id: "3",
//     title:
//       "Quos ab pariatur molestias eum labore. Commodi excepturi harum nihil nihil id repellendus.",
//     url: "https://lorempixel.com/1024/768/abstract/?10565",
//     thumbnail: "https://lorempixel.com/150/150/abstract/?42724"
//   },
//   {
//     id: "3",
//     album_id: "3",
//     title:
//       "Quos ab pariatur molestias eum labore. Commodi excepturi harum nihil nihil id repellendus.",
//     url: "https://lorempixel.com/1024/768/abstract/?10565",
//     thumbnail: "https://lorempixel.com/150/150/abstract/?42724"
//   },
//   {
//     id: "4",
//     album_id: "3",
//     title:
//       "Quos ab pariatur molestias eum labore. Commodi excepturi harum nihil nihil id repellendus.",
//     url: "https://lorempixel.com/1024/768/abstract/?10565",
//     thumbnail: "https://lorempixel.com/150/150/abstract/?42724"
//   },
//   {
//     id: "5",
//     album_id: "3",
//     title:
//       "Quos ab pariatur molestias eum labore. Commodi excepturi harum nihil nihil id repellendus.",
//     url: "https://lorempixel.com/1024/768/abstract/?10565",
//     thumbnail: "https://lorempixel.com/150/150/abstract/?42724"
//   }
// ];
