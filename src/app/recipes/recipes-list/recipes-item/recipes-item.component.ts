import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../recipe.model';
import {RecipeService} from '../../recipeService/recipe.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
 @Input() recipe: Recipe;
 @Input() id: number;
  // @Output() sendRecipeId = new EventEmitter<number>()

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
  }



}
