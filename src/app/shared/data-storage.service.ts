
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipeService/recipe.service';
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {}

  storeRecipes() {
    const recipe = this.recipeService.getRecipes()
    return this.http.put('https://ng-recipe-book-3b3f3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipe)
      .subscribe(response => console.log(response));
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://ng-recipe-book-3b3f3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(
        map((recipes) => {
          return recipes.map(recipe => {
            return {...recipe,ingredients: recipe.ingredients ? recipe.ingredients: []}
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes)
        })
      )

  }
}
