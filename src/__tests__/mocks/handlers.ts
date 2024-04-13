const { http, HttpResponse } = require("msw")

exports.handlers = [
  http.get("https://api.themoviedb.org/3/search/movie", () => {
    return HttpResponse.json({
      results: [
        {
      "adult": false,
      "backdrop_path": "/xIvvsQc164xbBDWPnSHWriGy7f9.jpg",
      "genre_ids": [
        18
      ],
      "id": 12410,
      "original_language": "en",
      "original_title": "Good",
      "overview": "When John Halder's latest novel is enlisted by powerful political figures in the Nazi party to push their agenda, his career and social standing instantly advance. But after learning of the Reich's horrific plans for the future and the devastating effects they will have on people close to him, John must decide whether or not to take a stand and risk losing everything.",
      "popularity": 7.989,
      "poster_path": "/AgNssumEnPaT6kzzJyj4oLypOOG.jpg",
      "release_date": "2008-12-31",
      "title": "Good",
      "video": false,
      "vote_average": 6.2,
      "vote_count": 123
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [
        18
      ],
      "id": 750597,
      "original_language": "en",
      "original_title": "Good",
      "overview": "Payton becomes the caretaker of Gregory Devereaux, a wealthy man facing his final months. As they become close, Gregory's past sins force Payton to decide between his dreams and a pregnancy that could squander them all.",
      "popularity": 2.607,
      "poster_path": "/aQKlnLBUDoW8HuuuKBwrXWpOLZt.jpg",
      "release_date": "2020-10-22",
      "title": "Good",
      "video": false,
      "vote_average": 7.9,
      "vote_count": 11
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [
        99
      ],
      "id": 560120,
      "original_language": "fr",
      "original_title": "Good",
      "overview": "Rodolphe Burger is a free musician, complex but accessible, without taboos, he mixes with others without ever losing himself on the road. He is a man who shares everything, including the stage. Including his friends and they are numerous, poets, writers, rockers, painters and philosophers.",
      "popularity": 0.6,
      "poster_path": "/q73MBHWA4835DTW7GTb9HWkYry3.jpg",
      "release_date": "2018-12-26",
      "title": "Good",
      "video": false,
      "vote_average": 5,
      "vote_count": 2
    },
    {
      "adult": false,
      "backdrop_path": "/Adrip2Jqzw56KeuV2nAxucKMNXA.jpg",
      "genre_ids": [
        37
      ],
      "id": 429,
      "original_language": "it",
      "original_title": "Il buono, il brutto, il cattivo",
      "overview": "While the Civil War rages on between the Union and the Confederacy, three men – a quiet loner, a ruthless hitman, and a Mexican bandit – comb the American Southwest in search of a strongbox containing $200,000 in stolen gold.",
      "popularity": 76.438,
      "poster_path": "/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg",
      "release_date": "1966-12-22",
      "title": "The Good, the Bad and the Ugly",
      "video": false,
      "vote_average": 8.468,
      "vote_count": 8197
    }
      ]
    })
  })
]
