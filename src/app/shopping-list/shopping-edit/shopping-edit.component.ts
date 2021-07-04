import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingService} from '../shoppingService/shopping.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],

})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('formElement', {static: false}) slForm: NgForm
  subscription: Subscription
  editMode = false;
  editedItemIndex: number
  editedItem: Ingredient

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe((index) => {
      this.editedItemIndex = index
      this.editMode = true
      this.editedItem = this.shoppingService.getIngredient(index)
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if(this.editMode) {
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient)
    }else {
      this.shoppingService.addIngredient(newIngredient)
    }
    this.onClear()

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(form: NgForm) {
    this.shoppingService.deleteIngredient(this.editedItemIndex)
    this.onClear()

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
