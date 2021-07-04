import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from './shoppingService/shopping.service';
import {Subscription} from 'rxjs';
import {RecipeService} from '../recipes/recipeService/recipe.service';
import {Recipe} from '../recipes/recipe.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {
  @Input() index: number
  ingredients: Ingredient[]
  private igChangedSub: Subscription
  constructor(private shoppingService: ShoppingService,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients()

    this.igChangedSub = this.shoppingService.onChangeIngredient.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients
    })
  }

  onEditItem(index: number) {
    this.shoppingService.startedEditing.next(index)
  }


  ngOnDestroy() {
    this.igChangedSub.unsubscribe()
  }

}
