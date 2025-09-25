import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from "./components/movie-list/movie-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MovieListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('movie-app');
}
