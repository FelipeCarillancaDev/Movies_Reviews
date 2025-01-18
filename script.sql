CREATE DATABASE movie_reviews;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE users DROP COLUMN email;

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL,
    genre VARCHAR(50),
    director VARCHAR(100),
    synopsis TEXT,
    average_rating NUMERIC(3, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (name, email, password)
VALUES
('Juan Pérez', 'juan.perez@example.com', '1234'),
('María López', 'maria.lopez@example.com', '1234'),
('Carlos García', 'carlos.garcia@example.com', '1234');


INSERT INTO movies (title, year, genre, director, synopsis, averange_rating)
VALUES ('Inception', 2010, 'Sci-Fi', 'Christopher Nolan', 
        'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.', 
        8.8); 

INSERT INTO reviews (movie_id, user_id, rating, review_text)
VALUES
(1, 1, 5, 'Espectacular. Una de las mejores películas que he visto.'),
(1, 2, 4, 'Muy buena, pero un poco complicada de entender al principio.'),

(2, 1, 5, 'Un clásico del cine de ciencia ficción.'),
(2, 3, 4, 'Muy innovadora para su época. La trama es impresionante.'),

(3, 2, 5, 'Una obra maestra, llena de giros inesperados.'),
(3, 3, 5, 'Excelente crítica social. Muy recomendable.');



select * from movies
select * from users
select * from reviews

