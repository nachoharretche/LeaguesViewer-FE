import { Component, OnInit, Input, Output, ViewChild, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { Player } from '../../models/player';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-add-player-form',
  templateUrl: './add-player-form.component.html',
  styleUrls: ['./add-player-form.component.css']
})
export class AddPlayerFormComponent implements OnInit {
  public addPlayerForm: FormGroup;
  public player: Player;
  public submitted: boolean;
  public fullName: string;
  public age: number;
  public shirtNumber: number;
  @Input() public teamId: number;

  private readonly DEFAULT_FULL_NAME = '';
  private readonly DEFAULT_AGE: number = 20;
  private readonly DEFAULT_SHIRT_NUMBER: number = 10;
  private readonly MIN_AGE: number = 16;
  private readonly MAX_AGE: number = 55;
  private readonly MIN_SHIRT_NUMBER: number = 1;
  private readonly MAX_SHIRT_NUMBER: number = 99;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddPlayerFormComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar,
    private networkService: NetworkService
    ) {
    this.submitted = false;
    this.teamId = data.teamId;
  }

  ngOnInit() {
    this.addPlayerForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(this.MIN_AGE), Validators.max(this.MAX_AGE)]],
      shirtNumber: ['', [Validators.required, Validators.min(this.MIN_SHIRT_NUMBER), Validators.max(this.MAX_SHIRT_NUMBER)]]
    });
    this.setDefaultValuesToForm();
    this.player.teamId = this.teamId;
  }

  get f() { return this.addPlayerForm.controls; }

  public savePlayer() {
    this.submitted = true;
    if (this.addPlayerForm.invalid) {
      return;
    } else {
      this.savePlayerAttributes();
      this.setDefaultValuesToForm();
      this.player.teamId = this.teamId;

    }
  }

  public close() {
    this.dialogRef.close();
  }

  private savePlayerAttributes() {
    const name = this.getAttributeFromForm('name');
    const age = this.getAttributeFromForm('age');
    const shirtNumber = this.getAttributeFromForm('shirtNumber');
    const json = { id: 0, fullName: name, age,
                shirtNumber, teamId: this.teamId };
    this.player = new Player(json);
    this.networkService.postPlayer(this.player).subscribe(
      result => {
        this.dialogRef.close(new Player(result));
      },
      error => {
        console.log(error);
        this.snackBar.open(error.error, 'Error', {
          duration: 3000,
        });
      }
    );
  }

  private setDefaultValuesToForm() {
    const fullName = this.DEFAULT_FULL_NAME;
    this.setAttributeToForm('name', fullName);
    const age = this.DEFAULT_AGE;
    this.setAttributeToForm('age', age);
    const shirtNumber = this.DEFAULT_SHIRT_NUMBER;
    this.setAttributeToForm('shirtNumber', shirtNumber);
    const json = { id: 0, fullName, age,
                shirtNumber, teamId: 0 };
    this.player = new Player(json);
  }

  private getAttributeFromForm(attributeName: string): string {
    return this.addPlayerForm.get(attributeName).value;
  }

  private setAttributeToForm(attributeName: string, attributeValue): void {
    this.addPlayerForm.get(attributeName).setValue(attributeValue);
  }

}
