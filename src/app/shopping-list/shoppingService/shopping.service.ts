import {Injectable} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable()
export class ShoppingService {

  onChangeIngredient = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()


  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),

  ]

  getIngredient(index: number) {
    return this.ingredients[index]
  }

  getIngredients() {
    return this.ingredients.slice()
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.onChangeIngredient.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.onChangeIngredient.next(this.ingredients.slice())
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient
    this.onChangeIngredient.next(this.ingredients.slice())
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index,1)
    this.onChangeIngredient.next((this.ingredients.slice()))
  }


}
