import { Component, OnInit } from '@angular/core';
import { CryptocurrencyService } from './../../cryptocurrency.service';
import { SearchFormService } from './../../search-form.service';
import { Cryptocurrency } from './../../model/cryptocurrency'
import { Observable } from 'rxjs';
import { RequestCryptocurrencyListLoad } from './../../store/cryptocurrency/cryptocurrency.actions';
import { Store, select } from '@ngrx/store';
import { State as CryptocurrencyState } from './../../store/cryptocurrency/cryptocurrency.reducer';
import * as fromRoot from './../../store/cryptocurrency/cryptocurrency.selector';

@Component({
  selector: 'app-cryptocurrencies',
  templateUrl: './cryptocurrencies.component.html',
  styleUrls: ['./cryptocurrencies.component.scss']
})
export class CryptocurrenciesComponent implements OnInit {

  cryptocurrencies$: Observable<Cryptocurrency[]>
  isLoadingCryptocurrencyList$: Observable<boolean>;

  constructor(
    private searchFormService: SearchFormService,
    private store: Store<{ cryptocurrency :CryptocurrencyState }>,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new RequestCryptocurrencyListLoad());

    this.cryptocurrencies$ = this.store.pipe(select(fromRoot.selectCryptocurrencyList))
    this.isLoadingCryptocurrencyList$ = this.store.select(state => state.cryptocurrency.isLoadingCryptocurrencyList);
  }

}
