import { NgModule } from '@angular/core';
import { defaultDeclarations, defaultImports, defaultProviders } from './defaultConfig';

@NgModule({
    declarations: defaultDeclarations,
    imports: defaultImports,
    providers: defaultProviders,
})
export class AuthModule {}
