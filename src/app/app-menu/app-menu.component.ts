import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  pacientesRuta() { this.router.navigate(['busqueda']); }

}
