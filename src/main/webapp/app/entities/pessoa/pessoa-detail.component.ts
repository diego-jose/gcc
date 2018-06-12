import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Pessoa } from './pessoa.model';
import { PessoaService } from './pessoa.service';

@Component({
    selector: 'jhi-pessoa-detail',
    templateUrl: './pessoa-detail.component.html'
})
export class PessoaDetailComponent implements OnInit, OnDestroy {

    pessoa: Pessoa;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pessoaService: PessoaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPessoas();
    }

    load(id) {
        this.pessoaService.find(id)
            .subscribe((pessoaResponse: HttpResponse<Pessoa>) => {
                this.pessoa = pessoaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPessoas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pessoaListModification',
            (response) => this.load(this.pessoa.id)
        );
    }
}
