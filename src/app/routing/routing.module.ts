import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ContactListComponent } from '../contacts/contact-list/contact-list.component';
import { ContactDetailsComponent }   from '../contacts/contact-details/contact-details.component';
import { OrderListComponent } from '../orders/order-list/order-list.component';
import { OrderDetailsComponent } from '../orders/order-details/order-details.component';
import { IngredientListComponent } from '../ingredients/ingredient-list/ingredient-list.component';
import { IngredientDetailsComponent } from '../ingredients/ingredient-details/ingredient-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts',  component: ContactListComponent },
  { path: 'contacts/:id',  component: ContactDetailsComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/:id', component: OrderDetailsComponent },
  { path: 'ingredients',  component: IngredientListComponent },
  { path: 'ingredients/:id',  component: IngredientDetailsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
