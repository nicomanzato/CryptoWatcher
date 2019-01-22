import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CryptocurrencyService } from './../cryptocurrency.service';
import { Cryptocurrency } from './../model/cryptocurrency'

@Component({
  selector: 'app-cryptocurrency',
  templateUrl: './cryptocurrency.component.html',
  styleUrls: ['./cryptocurrency.component.scss']
})
export class CryptocurrencyComponent implements OnInit {

  private cryptocurrency: Cryptocurrency;
  private isLoadingCryptocurrency = true;

  constructor(
    private cryptocurrencyService: CryptocurrencyService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getCryptocurrency();
  }

  getCryptocurrency(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.cryptocurrencyService.getCryptocurrency(id)
      .subscribe(cryptocurrency => {
        this.cryptocurrency = cryptocurrency;
        this.isLoadingCryptocurrency = false;
      });
  };

  goBack(): void {
    this.location.back();
  }

}
