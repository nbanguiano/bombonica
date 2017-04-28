import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateGuard } from '../common/can-activate-guard.service';
import { CanActivateChildGuard } from '../common/can-activate-child-guard.service';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { ContactListComponent } from '../contacts/contact-list/contact-list.component';
import { OrderListComponent } from '../orders/order-list/order-list.component';
import { IngredientListComponent } from '../ingredients/ingredient-list/ingredient-list.component';
import { RecipeListComponent } from '../recipes/recipe-list/recipe-list.component';
import { SigninComponent } from '../signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: 'admin', 
    canActivate: [CanActivateGuard],
    canActivateChild: [CanActivateChildGuard], 
    children: [
      { path: 'dashboard',  component: DashboardComponent },
      { path: 'contacts',  component: ContactListComponent },
      { path: 'contacts/:id',  component: ContactListComponent },
      { path: 'orders', component: OrderListComponent },
      { path: 'orders/:id', component: OrderListComponent },
      { path: 'ingredients',  component: IngredientListComponent },
      { path: 'ingredients/:id',  component: IngredientListComponent },
      { path: 'recipes',  component: RecipeListComponent },
      { path: 'recipes/:id',  component: RecipeListComponent }
    ]},
  { path: 'signin',  component: SigninComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateGuard, CanActivateChildGuard ]
})

export class RoutingModule {}
