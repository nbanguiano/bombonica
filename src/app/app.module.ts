import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RoutingModule } from './routing/routing.module';

import { WindowRefService } from './common/window-ref.service';
import { UserService } from './common/user.service';
import { CanActivateGuard } from './common/can-activate-guard.service';
import { CanActivateChildGuard } from './common/can-activate-child-guard.service';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { IngredientListComponent } from './ingredients/ingredient-list/ingredient-list.component';
import { IngredientDetailsComponent } from './ingredients/ingredient-details/ingredient-details.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactDetailsComponent,
    IngredientListComponent,
    IngredientDetailsComponent,
    OrderListComponent,
    OrderDetailsComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    SigninComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule
  ],
  providers: [WindowRefService, UserService, CanActivateGuard, CanActivateChildGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
