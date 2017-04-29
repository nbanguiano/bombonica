import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Complement } from '../complement';
import { ComplementService } from '../complement.service';

import { ComplementDetailsComponent } from '../complement-details/complement-details.component';

@Component({
  selector: 'complement-list',
  templateUrl: './complement-list.component.html',
  styleUrls: ['./complement-list.component.css'],
  providers: [ComplementService]
})

export class ComplementListComponent implements OnInit {

  complements: Complement[]
  selectedComplement: Complement

  constructor(private complementService: ComplementService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.complementService
        .getComplements()
        .then((complements: Complement[]) => {this.complements = complements});

    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      let complementId = params['id'];
      if (complementId && complementId !== "undefined") {
        this.complementService.getOneComplement(complementId)
            .then((complement: Complement) => {this.selectComplement(complement)})
      }
    });

  }

  private getIndexOfComplement = (complementId: String) => {
    return this.complements.findIndex((complement) => {
      return complement._id === complementId;
    });
  };

  selectComplement(complement: Complement) {
    this.selectedComplement = complement;
  }

  createNewComplement() {
    var complement: Complement = {
      name: '',
      meassure: '',
      cost: 0
    };
    // By default, a newly-created contact will have the selected state.
    this.selectComplement(complement);
  }

  deleteComplement = (complementId: String) => {
    var idx = this.getIndexOfComplement(complementId);
    if (idx !== -1) {
      this.complements.splice(idx, 1);
      this.selectComplement(null);
    }
    return this.complements;
  }

  addComplement = (complement: Complement) => {
    this.complements.push(complement);
    this.selectComplement(complement);
    return this.complements;
  }

  updateComplement = (complement: Complement) => {
    var idx = this.getIndexOfComplement(complement._id);
    if (idx !== -1) {
      this.complements[idx] = complement;
      this.selectComplement(complement);
    }
    return this.complements;
  }
}
