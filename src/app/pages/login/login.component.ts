import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UsuarioModel } from "../../model/usuario.model";
import { AuthService } from "../../services/auth.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem("email")) {
      this.usuario.email = localStorage.getItem("email");
      this.recordarme = true;
    }
  }

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      type: "info",
      text: "Espere por favor..."
    });
    Swal.showLoading();
    this.auth.login(this.usuario).subscribe(
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
