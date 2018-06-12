import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestaoSharedModule } from '../../shared';
import {
    PessoaService,
    PessoaPopupService,
    PessoaComponent,
    PessoaDetailComponent,
    PessoaDialogComponent,
    PessoaPopupComponent,
    PessoaDeletePopupComponent,
    PessoaDeleteDialogComponent,
    pessoaRoute,
    pessoaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...pessoaRoute,
    ...pessoaPopupRoute,
];

@NgModule({
    imports: [
        GestaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PessoaComponent,
        PessoaDetailComponent,
        PessoaDialogComponent,
        PessoaDeleteDialogComponent,
        PessoaPopupComponent,
        PessoaDeletePopupComponent,
    ],
    entryComponents: [
        PessoaComponent,
        PessoaDialogComponent,
        PessoaPopupComponent,
        PessoaDeleteDialogComponent,
        PessoaDeletePopupComponent,
    ],
    providers: [
        PessoaService,
        PessoaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestaoPessoaModule {}
