import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ifUserIsGuess, ifUserIsSignedIn} from "../core/guards/firebase-user.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [ifUserIsGuess]
  },
  {
    path: 'todo',
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
    canActivate: [ifUserIsSignedIn]
  },
  {
    path: 'create-user',
    loadChildren: () => import('./create-user/create-user.module').then(m => m.CreateUserModule),
    canActivate: [ifUserIsGuess]
  },
  {
    path: 'lab',
    loadChildren: () => import('./lab/lab.module').then(m => m.LabModule),
    canActivate: [ifUserIsSignedIn]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
