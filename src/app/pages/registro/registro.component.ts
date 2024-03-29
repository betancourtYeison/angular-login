import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UsuarioModel } from "../../model/usuario.model";
import { AuthService } from "../../services/auth.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"]
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(registroForm: NgForm) {
    if (registroForm.invalid) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      type: "info",
      text: "Espere por favor..."
    });
    Swal.showLoading();
    this.auth.nuevoUsuario(this.usuario).subscribe(
      resp => {
        Swal.close();
        this.router.navigateByUrl("/home");
        if (this.recordarme) {
          localStorage.setItem("email", this.usuario.email);
        }
      },
      err => {
        Swal.fire({
          type: "error",
          title: "Error al autenticar",
          text: err.error.error.message
        });
      }
    );
  }
}
