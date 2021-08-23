import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Observable} from 'rxjs';
import {RecipeService} from '../recipes/recipeService/recipe.service';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer'


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {
  @Input() index: number
  ingredients: Observable<{ ingredients: Ingredient[] }>
  constructor(private recipeService: RecipeService,
              private store: Store<fromApp.AppState>
              ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
    // this.ingredients = this.shoppingService.getIngredients()
    // this.igChangedSub = this.shoppingService.onChangeIngredient.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients
    // })

  }

  onEditItem(index: number) {
    // this.shoppingService.startedEditing.next(index)
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }


  ngOnDestroy() {
  }

}
