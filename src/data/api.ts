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

export const useAlbum = (id: string) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<[Album, Photo[]]>();
  const handleResults = useCallback(setResults, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await Promise.all([
        getAlbumAsync(id),
        getAlbumPhotosAsync(id)
      ]);
      handleResults(res);
      setLoading(false);
    };

    fetchData();
  }, [id, handleResults]);

  return {
    loading,
    album: results?.[0],
    photos: results?.[1]
  };
};

const GOREST_API_URL = `https://gorest.co.in/public-api`;

const headers = new Headers({
  Authorization: `Bearer ${process.env["REACT_APP_GOREST_API_TOKEN"]}`
});

const getAlbumAsync = async (id: string) => {
  const res = await fetch(`${GOREST_API_URL}/albums/${id}`, { headers });
  const data = await res.json();
  return data.result;
};

const getAlbumPhotosAsync = async (id: string) => {
  const res = await fetch(`${GOREST_API_URL}/photos?album_id=${id}`, {
    headers
  });
  const data = await res.json();
  return data.result;
};

export const album: Album = {
  id: "3",
  user_id: "758",
  title: "In facilis aut aperiam quo qui quia."
};

export const photos: Photo[] = [
  {
    id: "1963",
    album_id: "3",
    title:
      "Suscipit ea quae explicabo. Consequuntur quasi aut similique consequatur ex culpa.",
    url: "https://lorempixel.com/1024/768/abstract/?17727",
    thumbnail: "https://lorempixel.com/150/150/abstract/?19973"
  },
  {
    id: "2569",
    album_id: "3",
    title:
      "Quos ab pariatur molestias eum labore. Commodi excepturi harum nihil nihil id repellendus.",
    url: "https://lorempixel.com/1024/768/abstract/?10565",
    thumbnail: "https://lorempixel.com/150/150/abstract/?42724"
  },
  {
    id: "2",
    album_id: "3",
    title:
      "Quos ab pariatur molestias eum labore. Commodi excepturi harum nihil nihil id repellendus.",
    url: "https://lorempixel.com/1024/768/abstract/?10565",
    thumbnail: "https://lorempixel.com/150/150/abstract/?42724"
  },
  {
    id: "3",
    album_id: "3",
    title:
      "Quos ab pariatur molestias eum labore. Commodi excepturi harum nihil nihil id repellendus.",
    url: "https://lorempixel.com/1024/768/abstract/?10565",
    thumbnail: "https://lorempixel.com/150/150/abstract/?42724"
  },
  {
    id: "4",
    album_id: "3",
    title:
      "Quos ab pariatur molestias eum labore. Commodi excepturi harum nihil nihil id repellendus.",
    url: "https://lorempixel.com/1024/768/abstract/?10565",
    thumbnail: "https://lorempixel.com/150/150/abstract/?42724"
  },
  {
    id: "5",
    album_id: "3",
    title:
      "Quos ab pariatur molestias eum labore. Commodi excepturi harum nihil nihil id repellendus.",
    url: "https://lorempixel.com/1024/768/abstract/?10565",
    thumbnail: "https://lorempixel.com/150/150/abstract/?42724"
  }
];
