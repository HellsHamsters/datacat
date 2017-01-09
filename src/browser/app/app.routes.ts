import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard';
import { WorkspaceComponent } from './components/workspace';

export const ROUTES: Routes = [
    { path: '',                 component: DashboardComponent },
    { path: 'workspace',        component: WorkspaceComponent },
];
