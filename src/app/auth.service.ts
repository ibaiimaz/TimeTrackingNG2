import { Injectable } from '@angular/core';
import HeaderEncoder from './header-encoder'
import { TrackingService } from './tracking.service';

@Injectable()
export class AuthService {

  user: any;
  sessionToken: string;
  authenticated: boolean;

  constructor() { }

  login(username: string, password: string, rememberMe: boolean){
    this.sessionToken = this.createHash(username, password);
  }

  logout(){

  }

  isAuthenticated(){

  }

  private clear(){
    this.authenticated = false;
    this.user = null;
    this.sessionToken = null;
  }

  private createHash(username: string, password: string){
    var token = username + ':' + password;
    return "Basic " + HeaderEncoder.encodeBase64(token);
  }

}
