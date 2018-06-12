import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Pessoa } from './pessoa.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Pessoa>;

@Injectable()
export class PessoaService {

    private resourceUrl =  SERVER_API_URL + 'api/pessoas';

    constructor(private http: HttpClient) { }

    create(pessoa: Pessoa): Observable<EntityResponseType> {
        const copy = this.convert(pessoa);
        return this.http.post<Pessoa>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(pessoa: Pessoa): Observable<EntityResponseType> {
        const copy = this.convert(pessoa);
        return this.http.put<Pessoa>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Pessoa>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Pessoa[]>> {
        const options = createRequestOption(req);
        return this.http.get<Pessoa[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Pessoa[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Pessoa = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Pessoa[]>): HttpResponse<Pessoa[]> {
        const jsonResponse: Pessoa[] = res.body;
        const body: Pessoa[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Pessoa.
     */
    private convertItemFromServer(pessoa: Pessoa): Pessoa {
        const copy: Pessoa = Object.assign({}, pessoa);
        return copy;
    }

    /**
     * Convert a Pessoa to a JSON which can be sent to the server.
     */
    private convert(pessoa: Pessoa): Pessoa {
        const copy: Pessoa = Object.assign({}, pessoa);
        return copy;
    }
}
