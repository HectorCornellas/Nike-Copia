import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'formulario', component: FormularioComponent},
    {path: 'landing-page', component: LandingPageComponent},
    {path: 'products', component: ProductsComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { role: 'user' } },
    { path: '', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
