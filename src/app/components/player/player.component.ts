import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { AddPlayerFormComponent } from '../add-player-form/add-player-form.component';
import { Player } from '../../models/player';
import { Team } from '../../models/team';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnChanges {
  public players: Array<Player>;
  @Input() public team: Team;
  public teamId: number;
  public displayAddPlayerForm: boolean;
  public tableColumns: string[] = ['fullName', 'age', 'shirtNumber'];
  public pageSize = 5;
  public currentPage = 0;
  public dataSource: Array<Player>;
  constructor(
    private networkService: NetworkService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.players = new Array<Player>();
    this.dataSource = new Array<Player>();
    this.displayAddPlayerForm = false;
   }

  ngOnInit() {
    this.teamId = this.team.id;
    this.getPlayers();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes.team !== undefined) {
      this.teamId = changes.team.currentValue.id;
      this.players = new Array<Player>();
      this.dataSource = new Array<Player>();
      this.getPlayers();
    }
  }

  getPlayers() {
    this.networkService.getPlayers(this.teamId).subscribe(
      result => {
          this.players = new Array<Player>();
          result.forEach(player => {
            this.players.push(new Player(player));
          });
          if (this.players.length > 0) {
            this.iterator();
          }
      },
      error => {
          console.log(error);
          this.snackBar.open(error, 'Error', {
            duration: 3000,
          });
          this.players = new Array<Player>();
      }
    );
  }

  showPlayerForm() {
    this.displayAddPlayerForm = true;
    const dialogConfig = this.getDialogConfig();
    const dialogRef = this.dialog.open(AddPlayerFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if ((typeof data) !== 'undefined') {
        const player: Player = data as Player;
        this.players.push(player);
        this.iterator();
        this.snackBar.open('Jugador guardado', 'exitosamente', {
          duration: 3000,
        });
      }
    });

  }

  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '230px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { teamId: this.teamId };
    return dialogConfig;
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.players.slice(start, end);
    this.dataSource = part;
  }
}
