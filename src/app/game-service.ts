import { Service ,inject,signal} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Game } from './application/models/game';
import { HttpClient } from '@angular/common/http';
const URL = 'http://localhost:3000/games';

@Service()
export class GameService {
private readonly _http = inject(HttpClient);
private readonly _games = signal<Game[]>([]);
  games = this._games.asReadonly();

  getGames(): Observable<Game[]> {
    return this._http.get<Game[]>(URL).pipe(
      tap(allGames => this._games.set(allGames))
    );
  }

  addGame(game: Omit<Game, 'id'>): Observable<Game> {
    return this._http.post<Game>(URL, game).pipe(
      tap(newGame => this._games.update(all => [...all, newGame]))
    );
  }
}
