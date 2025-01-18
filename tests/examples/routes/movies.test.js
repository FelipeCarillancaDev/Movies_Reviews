const app = require("../../../src/index.js");
const request = require("supertest");

const movies = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        genre: "Sci-Fi",
        director: "Christopher Nolan",
        synopsis: "A thief with the ability to enter people's dreams and steal secrets.",
        averageRating: 8.8,
        createdAt: "2023-12-01T00:00:00",
    },
    {
        id: 2,
        title: "The Godfather",
        year: 1972,
        genre: "Crime",
        director: "Francis Ford Coppola",
        synopsis: "The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.",
        averageRating: 9.2,
        createdAt: "2023-12-02T00:00:00",
    },
]

jest.mock("../../../src/models/movies.model.js", () => {
    return {
        getMovie: jest.fn(() => Promise.resolve(movies)),
        getMovieById: jest.fn((id) => {
            const movie = movies.find((movie) => movie.id === Number(id));
            if (!movie) {
                return Promise.reject(new Error("Pelicula no encontrada"));
            }
            return Promise.resolve(movie); // Devuelve la película encontrada
        }),
        deleteMovie: jest.fn((id) => {
            const index = movies.findIndex(movie => movie.id === Number(id));
            if (index !== -1) {
                return Promise.resolve({success: true});
            }
            return Promise.reject(new Error("Pelicula no encontrada"));
        }),
    }
})

describe("/api/v1/movies", () => {
    it("GET/ Should return movies array", async () => {
        const {statusCode} =
            await request(app).get("/api/v1/movies");
        expect(statusCode).toBe(200)
    });
    it("GET/ Should return a movie by id", async () => {
        const id = 1;
        const {statusCode,} = await request(app).get(`/api/v1/movies/${id}/`);
        expect(statusCode).toBe(200);

    });
    it("DELETE/ Should return 200", async () => {
        const id = 1;
        const {statusCode} =
            await request(app).delete(`/api/v1/movies/${id}`);
        expect(statusCode).toBe(200);
    });

})