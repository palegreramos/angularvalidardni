import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Usuario } from '../model/usuarios';
import { DniValidator } from '../validators/dni.validator';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit{
  usuario!: Usuario;
  usuarioForm!: FormGroup;
  message!: string;
  resp: any;
  usuarios$!: Observable<Usuario[]>;

  constructor(private fb: FormBuilder, private http: HttpService) {
    this.createForm();
  }

  ngOnInit(): void {this.usuarios$=this.http.getDatos()}

  createForm() {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      dni: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{8}[a-zA-Z]$'),
          DniValidator,
        ],
      ],
    });
  }
  createUsuario() {
    if (this.usuarioForm.invalid) {
      console.log('Error', this.usuarioForm.value);
      this.message = 'Please correct all errors and resubmit the form';
    } else {
      this.message = '';
      this.usuario = this.usuarioForm.value;
      console.log('Creating usuario', this.usuario);
      this.http
        .postDato(this.usuario)
        .subscribe({
          next: (resp) => this.resp = resp,
          error: (err) => console.log(err),
          complete: ()=> this.usuarios$=this.http.getDatos()
        });
    }
    }
  

  get nombre() {
    return this.usuarioForm.get('nombre');
  }
  get apellidos() {
    return this.usuarioForm.get('apellidos');
  }
  get dni() {
    return this.usuarioForm.get('dni');
  }

  getErrornombreapellidos() {
    let msg: string = '';
    if (this.nombre?.hasError('required')) msg = 'Valor obligatorio';
    else if (this.nombre?.hasError('minlength'))
      msg = `Longitud debe ser mínimo 2 caracteres`;
    return msg;
  }

  getErrordni() {
    let msg: string = '';
    if (this.dni?.hasError('required')) msg = 'Dni es obligatorio';
    else if (this.dni?.hasError('pattern'))
      msg = ` Formato del dni incorrecto desde pattern`;
    else if (this.dni?.hasError('invalidDni'))
      msg = `DNI incorrecto. El formato está bien pero: '${this.dni?.getError(
        'invalidDni'
      )}'`;
    return msg;
  }

  ver(e:any) {
    console.log(e.target.textContent)
    //aquí se podría hacer una petición de ese valor para ver el resto de los datos, por ejemplo
  }
}
