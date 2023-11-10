import { Component } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  message: string = "Vous êtes déconnecté. (pikachu/pikachu)";
  name: string;
  password: string;
  auth: AuthService;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth = this.authService;
    this.password = "pikachu";
  }

  setMessage() {
    if (this.auth.isLoggedIn) {
      this.message = "Vous êtes connecté.";
    } else {
      this.message = "Identifiant ou mot de passe incorrect.";
    }
  }

  login() {
    this.message = "Tentative de connexion en cours ...";
    this.auth
      .login(this.name, this.password)
      .subscribe((isloggedIn: boolean) => {
        this.setMessage();
        if (this.auth.isLoggedIn) {
          this.router.navigate(["/pokemons"]);
        } else {
          this.password = "";
          this.router.navigate(["/login"]);
        }
      });
  }

  logout() {
    this.auth.logout();
    this.message = "Vous êtes déconnecté.";
  }
}
