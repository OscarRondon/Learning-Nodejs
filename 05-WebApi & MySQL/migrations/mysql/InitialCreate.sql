CREATE TABLE moviesdb.movie (
	id BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())),
	title varchar(300) NULL,
	`year` INT(4) NOT NULL,
	director varchar(300) NULL,
	duration FLOAT NOT NULL,
	poster TEXT NULL,
	genre varchar(250) NULL,
	rate DECIMAL(5,2) NULL
);


CREATE TABLE moviesdb.genre (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name varchar(300) NOT NULL UNIQUE
);


CREATE TABLE moviesdb.movie_genre (
	movie_id BINARY(16) REFERENCES moviesdb.movie(id),
	genre_id INT REFERENCES moviesdb.genre(id),
	PRIMARY KEY (movie_id, genre_id)
);

INSERT INTO moviesdb.genre(name) VALUES
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Sci-Fi'),
('Romance');

INSERT INTO moviesdb.movie(id, title, year, director, duration, poster, rate) VALUES
(UUID_TO_BIN(UUID()), "The Shawshank Redemption", 1994, "Frank Darabont", 142, "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp", 9.3),
(UUID_TO_BIN(UUID()), "The Dark Knight", 2008, "Christopher Nolan", 152, "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg", 9),
(UUID_TO_BIN(UUID()), "Inception", 2010, "Christopher Nolan", 148, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.8),
(UUID_TO_BIN(UUID()), "Pulp Fiction", 1994, "Quentin Tarantino", 154, "https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg", 8.9);

INSERT INTO moviesdb.movie_genre(movie_id, genre_id) VALUES
((select id from moviesdb.movie where title = 'The Shawshank Redemption' ),(select id from moviesdb.genre where name = 'Crime')),
((select id from moviesdb.movie where title = 'The Shawshank Redemption' ),(select id from moviesdb.genre where name = 'Drama')),
((select id from moviesdb.movie where title = 'The Dark Knight' ),(select id from moviesdb.genre where name = 'Action')),
((select id from moviesdb.movie where title = 'The Dark Knight' ),(select id from moviesdb.genre where name = 'Sci-Fi')),
((select id from moviesdb.movie where title = 'The Dark Knight' ),(select id from moviesdb.genre where name = 'Crime')),
((select id from moviesdb.movie where title = 'Inception' ),(select id from moviesdb.genre where name = 'Sci-Fi')),
((select id from moviesdb.movie where title = 'Inception' ),(select id from moviesdb.genre where name = 'Action')),
((select id from moviesdb.movie where title = 'Inception' ),(select id from moviesdb.genre where name = 'Adventure')),
((select id from moviesdb.movie where title = 'Pulp Fiction' ),(select id from moviesdb.genre where name = 'Crime')),
((select id from moviesdb.movie where title = 'Pulp Fiction' ),(select id from moviesdb.genre where name = 'Drama'));
