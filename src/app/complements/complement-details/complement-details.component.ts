import { Component, Input, OnChanges } from '@angular/core';
import { Location } from '@angular/common';

import { Complement } from '../complement';
import { ComplementService } from '../complement.service';
import { OrderService } from '../../orders/order.service';

@Component({
  selector: 'complement-details',
  templateUrl: './complement-details.component.html',
  styleUrls: ['./complement-details.component.css'],
  providers: [OrderService]
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
              private orderService: OrderService,
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
                            this.updateHandler(updatedComplement);
                          });
  }

  deleteComplement(complementId: String) {
    this.complementService.deleteComplement(complementId)
                          .then((deletedComplementId: String) => {
                            this.deleteHandler(deletedComplementId);
                          });
  }

}
