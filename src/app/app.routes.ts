import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ProductsComponent } from './components/products/products.component';


export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'formulario', component: FormularioComponent},
    {path: 'landing-page', component: LandingPageComponent},
    {path: 'products', component: ProductsComponent}

];
