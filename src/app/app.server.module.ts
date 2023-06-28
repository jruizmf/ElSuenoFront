import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    CoreModule,
    SharedModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
