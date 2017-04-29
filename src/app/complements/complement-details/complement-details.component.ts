import { Component, Input, OnChanges } from '@angular/core';
import { Location } from '@angular/common';

import { Complement } from '../complement';
import { ComplementService } from '../complement.service';
import { RecipeService } from '../../recipes/recipe.service';

@Component({
  selector: 'complement-details',
  templateUrl: './complement-details.component.html',
  styleUrls: ['./complement-details.component.css'],
  providers: [RecipeService]
})

export class ComplementDetailsComponent implements OnChanges {
  @Input()
  complement: Complement;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private complementService: ComplementService,
              private recipeService: RecipeService,
              private location: Location) {}

  meassures = [
    {id: "Ud.", label: "Unidad"},
    {id: "Kg", label: "Kilo"},
    {id: "gr", label: "Gramo"},
    {id: "Lt", label: "Litro"},
    {id: "ml", label: "Mililitro"}
  ];

  ngOnChanges() {
    if (this.complement) {
      this.location.replaceState("/admin/complements/" + this.complement._id);
    }
  }

  createComplement(complement: Complement) {
    this.complementService.createComplement(complement)
                          .then((newComplement: Complement) => {
                            this.createHandler(newComplement);
                          });
  }

  updateComplement(complement: Complement) {
    this.complementService.updateComplement(complement)
                          .then((updatedComplement: Complement) => {
                            //this.recipeService.updateAllCosts();
                            this.updateHandler(updatedComplement);
                          });
  }

  deleteComplement(complementId: String) {
    this.complementService.deleteComplement(complementId)
                          .then((deletedComplementId: String) => {
                            //this.recipeService.updateAllCosts();
                            this.deleteHandler(deletedComplementId);
                          });
  }

}
