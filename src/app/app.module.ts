import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BaseComponent } from "./components/base/base.component";
import { BaseEditComponent } from "./components/base-edit/base-edit.component";
import { BaseDetailComponent } from "./components/base-detail/base-detail.component";
import { BaseCreateComponent } from "./components/base-create/base-create.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import "hammerjs";

const appRoutes: Routes = [
  {
    path: "bases",
    component: BaseComponent,
    data: { title: "FS Base List" }
  },
  {
    path: "base-details/:id",
    component: BaseDetailComponent,
    data: { title: "Base Details" }
  },
  {
    path: "base-create",
    component: BaseCreateComponent,
    data: { title: "Add New Base" }
  },
  {
    path: "base-edit/:id",
    component: BaseEditComponent,
    data: { title: "Edit Base" }
  },
  {
    path: "",
    redirectTo: "/bases",
    pathMatch: "full"
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    BaseDetailComponent,
    BaseCreateComponent,
    BaseEditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
