import { Component,signal ,inject, OnInit} from '@angular/core';
import { Category } from '../../models/category';
import { form, FormField, FormRoot,min,pattern,required ,minLength,applyEach} from '@angular/forms/signals';
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

readonly gameForm = form(this.gameModel,(path) => {
  required(path.name, { message: "Nom obligatoire" });

  pattern(path.name, /^[A-Z].+$/, {
    message: "Le nom doit commencer par une majuscule"
  });

  required(path.price, { message: "Le prix est obligatoire" });

  min(path.price, 0.1, {
    message: "Le prix doit être supérieur à 0.1 DT"
  });
  applyEach(path.shops, shop => {
    required(shop, {
      message: "Le nom du point de vente est obligatoire"
    });

    minLength(shop, 2, {
      message: "Taille minimale: 2 caractères"
    });
  });
});
ngOnInit() {
    this.gameService.getGames().subscribe();
  }
onSubmit() {
    const { ...game } = this.gameModel();

    this.gameService.addGame(game).subscribe();
    this.resetForm()
  }
  
resetForm() {
  this.gameModel.set({
    id: "",
    name: "",
    price: 0,
    madeIn: "Tunisie",
    category: Category.Puzzle,
    isNew: true,
    shops: []
  });

 this.gameForm().reset();
}
}
