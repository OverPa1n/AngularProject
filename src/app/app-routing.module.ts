import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipesListComponent} from './recipes/recipes-list/recipes-list.component';
import {RecipesItemComponent} from './recipes/recipes-list/recipes-item/recipes-item.component';
import {RecipesDetailComponent} from './recipes/recipes-detail/recipes-detail.component';
import {NgModule} from '@angular/core';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {RecipeNewComponent} from './recipes/recipe-new/recipe-new.component';
import {RecipesResolverService} from './recipes/recipes-resolver.service';

let RecipeDetailComponent;
const appRouting: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'shopping-list', component: ShoppingListComponent, children: [
      {path: ':id/edit', component: ShoppingEditComponent}
    ]},
  {path: 'recipes', component: RecipesComponent, children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipesDetailComponent,resolve: [RecipesResolverService]},
    {path: ':id/edit', component: RecipeEditComponent,resolve: [RecipesResolverService]},
    ]}
]

@NgModule({
  imports: [RouterModule.forRoot(appRouting)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
