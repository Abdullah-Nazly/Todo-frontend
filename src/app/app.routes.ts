import { Routes } from '@angular/router';
import { Index } from './todo/index';
import { Create } from './todo/create/create';
import { Edit } from './todo/edit/edit';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Home } from './components/home/home';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'login', component: Login},
    { path: 'signup', component: Signup},
    { path: "todos", component: Index, canActivate: [authGuard]},
    { path: "todos/create", component: Create, canActivate: [authGuard]},
    { path: "todos/:todoId/edit", component: Edit, canActivate: [authGuard]}
];
