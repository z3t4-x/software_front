import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestUser } from 'src/app/_model/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-user',
  templateUrl: './registro-user.component.html',
  styleUrls: ['./registro-user.component.css']
})
export class RegistroUserComponent implements OnInit {


  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder, private userService: UserService,
    private router: Router)
     {

     }



  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      name: ['', [Validators.required]], 
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      direccion: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      // Suponiendo que inicialmente todos los usuarios se registran con el mismo rol
     roles: [[{ idRol: '' }]] // Este es un valor temporal, deberías cambiarlo según tu lógica.
    });
  }


/**
 * método para registrar usuario
 * @returns 
 */
  
  registrarUsuario() {
    if (this.registerForm.invalid) {
      return;
    }

    const datosUsuarioForm= this.registerForm.value;
    const user: RequestUser ={

      name: datosUsuarioForm.name,
      direccion: datosUsuarioForm.direccion,
      password: datosUsuarioForm.password,
      username: datosUsuarioForm.username,
      email: datosUsuarioForm.email,
      roles: [
        {
          idRol: 2
        }
      ] 
    };

    this.userService.registrarUsuario(user).subscribe(
      response =>{
        Swal.fire('Éxito', 'El usuario ha sido registrado correctamente', 'success');
        
        this.registerForm.reset();
    
        this.router.navigate(['/login']);
     
      }
      ,
      error => {
        // Aquí puedes manejar el error en caso de que ocurra
        Swal.fire('Error', 'Ocurrió un error al guardar', error.error);
      }
  );


  }
}






 