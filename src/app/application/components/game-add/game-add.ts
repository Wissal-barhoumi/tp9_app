import { Component,signal ,inject, OnInit} from '@angular/core';
import { Category } from '../../models/category';
import { form, FormField, FormRoot,min,pattern,required } from '@angular/forms/signals';
import { Game } from '../../models/game';
import { GameService } from '../../../game-service';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [FormField,FormRoot,JsonPipe],
  selector: 'app-game-add',
  styleUrl: './game-add.css',
  templateUrl: './game-add.html',
})
export class GameAdd  implements OnInit{
  categories = Object.values(Category);
  readonly gameModel = signal<Game>({
  id: "",
  name: "",
  price: 0,
  madeIn: "Tunisie",
  category: Category.Puzzle,
  isNew: true,
  shops: []
});
private gameService = inject(GameService);
games = this.gameService.games;

readonly gameForm = form(this.gameModel);
ngOnInit() {
    this.gameService.getGames().subscribe();
  }
onSubmit() {
    const { id, ...game } = this.gameModel();

    this.gameService.addGame(game).subscribe();
  }

}
