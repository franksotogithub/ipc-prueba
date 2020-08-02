import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-inicial',
  templateUrl: './menu-inicial.component.html',
  styleUrls: ['./menu-inicial.component.scss']
})
export class MenuInicialComponent implements OnInit {

  constructor( private router : Router, private authService : AuthService) { }

  ngOnInit() {
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
