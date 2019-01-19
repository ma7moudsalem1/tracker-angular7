import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public loggedIn: boolean;
  constructor(
    private _token: TokenService,
    private _router: Router, 
    private _auth: AuthService
  ) { }

  ngOnInit() {
    this._auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this._token.remove();
    this._auth.changeAuthStatus(false);
    this._router.navigateByUrl('/login');
  }

}
