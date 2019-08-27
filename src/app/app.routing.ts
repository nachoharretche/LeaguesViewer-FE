import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { LeagueComponent } from './components/league/league.component';
import { TeamComponent } from './components/team/team.component';
import { LeagueInfoComponent } from './components/league-info/league-info.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'liga', pathMatch: 'full' },
    { path: 'liga', component: LeagueComponent },
    { path: 'liga/:leagueId', component: LeagueInfoComponent },
    { path: 'liga/:leagueId/equipo/:teamId', component: TeamComponent },
    { path: '**', redirectTo: '/liga' }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
