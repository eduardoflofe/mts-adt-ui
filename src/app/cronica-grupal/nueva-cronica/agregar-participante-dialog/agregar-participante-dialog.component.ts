import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare var $: any;
declare var $gmx: any;

@Component({
    selector: 'agregar-participante-dialog',
    templateUrl: './agregar-participante-dialog.component.html',
    styleUrls: ['./agregar-participante-dialog.component.css']
})

export class AgregarParticipanteDialogComponent implements OnInit {
    public descripcion: string = "";
    public descNotData: string = "Sin información disponible" || "Sin resultados para mostrar";
    public pacientesList: [] = [];

    public numitems: number = 3;
    public pagactual: number = 1;
    public dtOptions: DataTables.Settings = {};

    public editForm = this.fb.group({
        nssPaciente: [null, Validators.required]
    })

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<AgregarParticipanteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.descripcion = data.descripcion;
    }

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'simple_numbers',
            pageLength: this.numitems,
            processing: true,
            info: false,
            searching: false,
            "lengthChange": false,
            "dom": "t<'table-pie' <'#cargalay.col-md-4'><'col-md-4 col-lg-4 text-center'p><'#nopag.col-md-4'>>",
            "language": {
                "paginate": {
                    "first": "First page",
                    "previous": '<span class="glyphicon glyphicon-menu-left paginacion-icon-navegacion" aria-hidden="true"></span>',
                    "next": '<span class="glyphicon glyphicon-menu-right paginacion-icon-navegacion" aria-hidden="true"></span>',
                    "last": "last"
                }
            }
        };
    }

    limpiarBusqueda(): void {
        this.editForm.reset();
        this.pacientesList = [];
    }

    buscarPaciente(): void {
        console.log(this.editForm.value);
        //TO-DO Servicio para buscar paciente por NSS
    }

    cancelar(): void {
        this.dialogRef.close(false);
    }
}