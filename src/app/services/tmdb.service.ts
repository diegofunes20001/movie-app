// src/app/services/tmdb.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private base = environment.tmdbBaseUrl;
  private imageBase = environment.tmdbImageUrl;
  private apiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) {}

  getPopularMovies(page = 1): Observable<Movie[]> {
    if (this.apiKey === 'YOUR_TMDB_API_KEY_HERE') {
      return throwError(() => new Error('API key not set. Please update tmdbApiKey in src/app/environments/environment.ts with your real TMDB API key from https://www.themoviedb.org/settings/api'));
    }
    const url = `${this.base}/movie/popular?api_key=${this.apiKey}&language=es-ES&page=${page}`;
    return this.http.get<{ results: any[] }>(url).pipe(
      map(res => res.results.map(item => ({
        id: item.id,
        title: item.title,
        overview: item.overview,
        poster_path: item.poster_path,
        release_date: item.release_date,
        vote_average: item.vote_average
      })))
    );
  }

  // ... otros métodos
}
