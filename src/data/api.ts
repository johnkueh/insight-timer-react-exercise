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
    id: "2569",
    album_id: "3",
    title:
      "Quos ab pariatur molestias eum labore. Commodi excepturi harum nihil nihil id repellendus.",
    url: "https://lorempixel.com/1024/768/abstract/?10565",
    thumbnail: "https://lorempixel.com/150/150/abstract/?42724"
  }
];
