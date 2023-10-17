import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareFilePageComponent} from "./share-file-page/share-file-page.component";
import {ContentComponent} from "./content/content.component";
import {WelcomeContentComponent} from "./welcome-content/welcome-content.component";

const routes: Routes = [
  { path: 'share/:id', component: ShareFilePageComponent },
  { path: '', component: ContentComponent },
  { path: '**', component: WelcomeContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
