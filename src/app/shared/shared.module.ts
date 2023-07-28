import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeatureComponent } from './components/feature/feature.component';
import { MatCardModule } from '@angular/material/card';
import { BaseLayoutComponent } from './components/layouts/base-layout/base-layout.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER, MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import {MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER, MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressComponent } from './components/progress/progress.component';
import { DndDirective } from '../helpers/directives/dnd.directive';
import { UploaderComponent } from './components/uploader/uploader.component';
import {MatChipsModule} from '@angular/material/chips';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {MatStepperModule} from '@angular/material/stepper';
import { HomeProductsComponent } from '../pages/home/home-products/home-products.component';

const commonModules = [
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatMenuModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatTooltipModule,
        MatRadioModule,
        MatListModule,
        MatAutocompleteModule, 
        MatSlideToggleModule,
        MatDialogModule,
        MatChipsModule,
        MatStepperModule
        
];

@NgModule({
  declarations: [HeaderComponent,  DndDirective, FooterComponent, FeatureComponent, BaseLayoutComponent, LoaderComponent, SidenavComponent, ErrorPageComponent, UploaderComponent, ProgressComponent],
  imports: [CommonModule,
    SweetAlert2Module.forRoot(), RouterModule, ...commonModules],
  exports: [HeaderComponent, FooterComponent, BaseLayoutComponent, FeatureComponent, LoaderComponent, SidenavComponent, UploaderComponent, ...commonModules],
  providers: [
    MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
]
})
export class SharedModule {}
