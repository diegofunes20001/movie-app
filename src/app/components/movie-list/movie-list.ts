import { Component, OnInit } from '@angular/core';
import { MovieService, Movie } from '../../services/movie';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  searchControl = new FormControl('');
  loading = false;
  error: string | null = null;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadPopularMovies();
    this.searchControl.valueChanges.subscribe(query => {
      if (query && query.length > 2) {
        this.searchMovies(query);
      } else if (!query) {
        this.loadPopularMovies();
      }
    });
  }

  loadPopularMovies(): void {
    this.loading = true;
    this.movieService.getPopularMovies().subscribe({
      next: (data: { results: Movie[]; }) => {
        this.movies = data.results;
        this.loading = false;
      },
      error: (err: any) => {
        if (err.status === 401) {
          this.error = 'Clave API de TMDB inválida. Actualiza tmdbApiKey en src/app/environments/environment.ts con tu clave real de https://www.themoviedb.org/settings/api';
        } else {
          this.error = 'Error al cargar películas populares';
        }
        this.loading = false;
        console.error(err);
      }
    });
  }

  searchMovies(query: string): void {
    this.loading = true;
    this.movieService.searchMovies(query).subscribe({
      next: (data: { results: Movie[]; }) => {
        this.movies = data.results;
        this.loading = false;
      },
      error: (err: any) => {
        if (err.status === 401) {
          this.error = 'Clave API de TMDB inválida. Actualiza tmdbApiKey en src/app/environments/environment.ts con tu clave real de https://www.themoviedb.org/settings/api';
        } else {
          this.error = 'Error en la búsqueda';
        }
        this.loading = false;
        console.error(err);
      }
    });
  }
}

