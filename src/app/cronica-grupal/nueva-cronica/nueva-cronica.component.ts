import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-cronica',
  templateUrl: './nueva-cronica.component.html',
  styleUrls: ['./nueva-cronica.component.css']
})
export class NuevaCronicaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }

  irCronicaImprimir() {
    this.router.navigate(["cronicaGuardada"]);
  }
}
