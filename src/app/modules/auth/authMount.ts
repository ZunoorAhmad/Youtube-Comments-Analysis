import { Type } from '@angular/core';
import { mount, MountConfig } from 'cypress/angular';
import { defaultDeclarations, defaultImports, defaultProviders } from './defaultConfig';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';

declare global {
    namespace Cypress {
        interface Chainable {
            mount: typeof authMount;
        }
    }
}

const declarations = defaultDeclarations;
const imports = [...defaultImports, [BrowserAnimationsModule, HttpClientModule]];
const providers = [...defaultProviders, [DialogService, MessageService, DynamicDialogRef, ConfirmationService]];

export function authMount<T>(component: string | Type<T>, config?: MountConfig<T>) {
    if (!config) {
        config = { declarations: [...declarations], imports, providers };
    } else {
        config.declarations = [...(config?.declarations || []), ...declarations];
        config.imports = [...(config?.imports || []), ...imports];
        config.providers = [...(config?.providers || []), ...providers];
    }
    return mount<T>(component, config);
}
