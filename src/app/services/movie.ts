import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '.././environments/environment';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = environment.tmdbApiKey;
  private baseUrl = environment.tmdbBaseUrl;

  constructor(private http: HttpClient) { }

  searchMovies(query: string): Observable<{ results: Movie[] }> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&language=es-ES`;
    return this.http.get<{ results: Movie[] }>(url);
  }

  getPopularMovies(): Observable<{ results: Movie[] }> {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=es-ES`;
    return this.http.get<{ results: Movie[] }>(url);
  }
}

