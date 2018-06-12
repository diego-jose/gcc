import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Pessoa e2e test', () => {

    let navBarPage: NavBarPage;
    let pessoaDialogPage: PessoaDialogPage;
    let pessoaComponentsPage: PessoaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Pessoas', () => {
        navBarPage.goToEntity('pessoa');
        pessoaComponentsPage = new PessoaComponentsPage();
        expect(pessoaComponentsPage.getTitle())
            .toMatch(/gestaoApp.pessoa.home.title/);

    });

    it('should load create Pessoa dialog', () => {
        pessoaComponentsPage.clickOnCreateButton();
        pessoaDialogPage = new PessoaDialogPage();
        expect(pessoaDialogPage.getModalTitle())
            .toMatch(/gestaoApp.pessoa.home.createOrEditLabel/);
        pessoaDialogPage.close();
    });

    it('should create and save Pessoas', () => {
        pessoaComponentsPage.clickOnCreateButton();
        pessoaDialogPage.setNomeInput('nome');
        expect(pessoaDialogPage.getNomeInput()).toMatch('nome');
        pessoaDialogPage.setCpfInput('cpf');
        expect(pessoaDialogPage.getCpfInput()).toMatch('cpf');
        pessoaDialogPage.save();
        expect(pessoaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PessoaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-pessoa div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PessoaDialogPage {
    modalTitle = element(by.css('h4#myPessoaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    cpfInput = element(by.css('input#field_cpf'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNomeInput = function(nome) {
        this.nomeInput.sendKeys(nome);
    };

    getNomeInput = function() {
        return this.nomeInput.getAttribute('value');
    };

    setCpfInput = function(cpf) {
        this.cpfInput.sendKeys(cpf);
    };

    getCpfInput = function() {
        return this.cpfInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
