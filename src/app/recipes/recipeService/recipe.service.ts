import {Recipe} from '../recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer'


@Injectable()
export class RecipeService {
recipesChanged = new Subject<Recipe[]>()

  private recipes: Recipe[] = []

  constructor(

    private store: Store<fromApp.AppState>
    ) {
  }

  setRecipes(recipes: Recipe[]) {
  this.recipes = recipes;
  this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice()
  }

  addIngredientsToShopList(ingredient: Ingredient[]) {
    // this.shoppingService.addIngredients(ingredient)
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredient))

  }

  getRecipeId(id) {
    return this.recipes[id]
  }

  onEdit(id) {
    return this.recipes[id]
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
  this.recipes.splice(index,1);
  this.recipesChanged.next(this.recipes.slice())
  }
}
