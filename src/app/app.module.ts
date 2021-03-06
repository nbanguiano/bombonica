import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RoutingModule } from './routing/routing.module';

import { WindowRefService } from './common/window-ref.service';
import { UserService } from './common/user.service';
import { IngredientService } from './ingredients/ingredient.service';
import { RecipeService } from './recipes/recipe.service';
import { ComplementService } from './complements/complement.service';
import { CanActivateGuard } from './common/can-activate-guard.service';
import { CanActivateChildGuard } from './common/can-activate-child-guard.service';

import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { IngredientListComponent } from './ingredients/ingredient-list/ingredient-list.component';
import { IngredientDetailsComponent } from './ingredients/ingredient-details/ingredient-details.component';
import { ComplementListComponent } from './complements/complement-list/complement-list.component';
import { ComplementDetailsComponent } from './complements/complement-details/complement-details.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { RecipeInputComponent } from './orders/order-details/recipe-input.component';
import { ComplementInputComponent } from './orders/order-details/complement-input.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { IngredientInputComponent } from './recipes/recipe-details/ingredient-input.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImageInputComponent } from './images/image-input/image-input.component';
import { ImageListComponent } from './images/image-list/image-list.component';

import { CalendarModule } from 'primeng/primeng';
import { OrderListContactComponent } from './orders/order-list-contact/order-list-contact.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactDetailsComponent,
    IngredientListComponent,
    IngredientDetailsComponent,
    OrderListComponent,
    OrderDetailsComponent,
    RecipeInputComponent,
    ComplementInputComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    IngredientInputComponent,
    SigninComponent,
    DashboardComponent,
    ImageInputComponent,
    FileSelectDirective,
    ImageListComponent,
    OrderListContactComponent,
    ComplementListComponent,
    ComplementDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RoutingModule,
    CalendarModule
  ],
  providers: [
    WindowRefService,
    UserService,
    IngredientService,
    RecipeService,
    ComplementService,
    CanActivateGuard,
    CanActivateChildGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
