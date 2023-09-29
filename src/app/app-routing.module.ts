import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AdminAuthComponent} from "./components/admin-auth/admin-auth.component";
import {AdminHomeComponent} from "./components/admin-home/admin-home.component";
import {AuthGuard} from "./auth.guard";
import {AdminAddProductComponent} from "./components/admin-add-product/admin-add-product.component";
import {AdminUpdateProductComponent} from "./components/admin-update-product/admin-update-product.component";
import {SearchComponent} from "./components/search/search.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {UserAuthComponent} from "./components/user-auth/user-auth.component";
import {CartPageComponent} from "./components/cart-page/cart-page.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {MyOrdersComponent} from "./components/my-orders/my-orders.component";
import {UserDetailProfileComponent} from "./components/user-detail-profile/user-detail-profile.component";
import {ContactComponent} from "./components/contact/contact.component";
import {SuccessfulBuyingComponent} from "./components/successful-buying/successful-buying.component";

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'admin-auth',
    component: AdminAuthComponent
  },
  {
    path:'admin-home',
    component: AdminHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'admin-add-product',
    component: AdminAddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'admin-update-product/:id',
    component: AdminUpdateProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'search/:query',
    component: SearchComponent,
  },
  {
    path:'details/:productId',
    component: ProductDetailsComponent,
  },
  {
    path:'user-auth',
    component: UserAuthComponent,
  },
  {
    path:'cart-page',
    component: CartPageComponent,
  },
  {
    path:'checkout',
    component: CheckoutComponent,
  },
  {
    path:'my-orders',
    component: MyOrdersComponent,
  },
  {
    path:'user-profile',
    component: UserDetailProfileComponent,
  },
  {
    path:'contact',
    component: ContactComponent,
  },
  {
    path:'successful-buying',
    component: SuccessfulBuyingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
