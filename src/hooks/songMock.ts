export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  release_year: number;
  genre: string;
  cover_image: string;
  url: string;
  duration: { minute: number; second: number }; // 🔥 Cambio aquí
}

export const songList: Song[] = [
  {
    id: 1,
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    release_year: 1982,
    duration: { minute: 3, second: 20 }, // ✅ Ahora es un objeto
    genre: "Pop",
    cover_image:
      "https://www.eloriente.net/home/wp-content/uploads/2014/06/michael-jackson-billie-jean.jpg",
    url: "../../public/song/Michael Jackson - Billie Jean (Official Video).mp3",
  },
  {
    id: 2,
    title: "El cantante del ghetto",
    artist: "Ryan Castro",
    album: "El Cantante del Ghetto",
    release_year: 2024,
    duration: { minute: 5, second: 26 }, // ✅ Cambio aquí
    genre: "Reguetón",
    cover_image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/00/El_Cantante_del_Ghetto.jpg/220px-El_Cantante_del_Ghetto.jpg",
    url: "../../public/song/RYAN CASTRO, ARCANGEL - PUEBLO DE MEDALLO (Video Oficial).mp3",
  },
  {
    id: 3,
    title: "Amarillo",
    artist: "J Balvin",
    album: "Colores",
    release_year: 2020,
    duration: { minute: 3, second: 48 }, // ✅ Ajustado
    genre: "Reguetón",
    cover_image:
      "https://upload.wikimedia.org/wikipedia/en/a/a4/J_Balvin_-_Amarillo.png",
    url: "/public/song/J Balvin - Amarillo (Official Video).mp3",
  },
  {
    id: 4,
    title: "Me Porto Bonito",
    artist: "Bad Bunny & Chencho Corleone",
    album: "Un Verano Sin Ti",
    release_year: 2022,
    duration: { minute: 3, second: 20 },
    genre: "Reguetón",
    cover_image:
      "https://i1.sndcdn.com/artworks-bTM27xETKUgVy9gE-dk8gCA-t500x500.jpg",
    url: "/public/song/Bad-Bunny-ft.Chencho-Corleone - Me Porto-Bonito.mp3",
  },
  {
    id: 5,
    title: "Maquiavélico",
    artist: "Canserbero",
    album: "Muerte",
    release_year: 2012,
    duration: { minute: 3, second: 20 },
    genre: "Rap",
    cover_image:
      "https://i.scdn.co/image/ab67616d0000b273fd7bf6e660e2da01813c70f7",
    url: "/public/song/Canserbero-Maquiavélico.mp3",
  },
  {
    id: 6,
    title: "X Última Vez",
    artist: "Daddy Yankee & Bad Bunny",
    album: "Legendaddy",
    release_year: 2023,
    genre: "Reguetón",
    duration: { minute: 5, second: 0 },
    cover_image: "https://i.ytimg.com/vi/WTlRFmVKT0A/maxresdefault.jpg",
    url: "/public/song/Daddy-Yankee-x-Bad-Bunny-X-Última-Vez-Official-Video.mp3",
  },
  {
    id: 7,
    title: "chorrito pa las animas",
    artist: "Feid",
    album: "Sixdo",
    release_year: 2022,
    duration: { minute: 4, second: 15 },
    genre: "Hard Rock",
    cover_image:
      "https://i1.sndcdn.com/artworks-UIEy1kqjG76uH17D-ZFZ93w-t500x500.png",
    url: "/public/song/Feid - CHORRITO PA LAS ANIMAS (Official Video).mp3",
  },
];

export default songList;
