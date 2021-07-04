import {Recipe} from '../recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingService} from '../../shopping-list/shoppingService/shopping.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
recipesChanged = new Subject<Recipe[]>()

  // private recipes: Recipe[] = [
  //   new Recipe('A test recipe', 'Simple test','https://www.glutenfreeandmore.com/wp-content/uploads/2018/07/15latkes.jpg',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries',30)]),
  //   new Recipe('A test recipe', 'Simple test','https://www.glutenfreeandmore.com/wp-content/uploads/2018/07/15latkes.jpg',
  //     [new Ingredient('Buns',2),new Ingredient('Meat', 1)]),
  //   new Recipe('My new Recipe', 'It is so delicious','https://www.glutenfreeandmore.com/wp-content/uploads/2018/07/15latkes.jpg',
  //     [new Ingredient('Buns',2),new Ingredient('Meat', 1)]),
  //
  // ]
  private recipes: Recipe[] = []

  constructor(private shoppingService: ShoppingService) {
  }

  setRecipes(recipes: Recipe[]) {
  this.recipes = recipes;
  this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice()
  }

  addIngredientsToShopList(ingredient: Ingredient[]) {
    this.shoppingService.addIngredients(ingredient)

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
