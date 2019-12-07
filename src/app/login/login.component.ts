import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;


  token: string;
  keepLoggedIn: boolean;

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
  }
  login() : void {

      let body = {"username": this.username, "password":this.password};
      let url = "https://api.amiv.ethz.ch/sessions"
      this.http.post(url, body).subscribe(ret => {
        if(ret && ret["token"]) {
          this.token = ret["token"];
          this.loginUsingToken();
        }
      })
      this.password = "";

      console.log("login");
      /*this.token = this.token.replace('"',"");

      localStorage.setItem("token", this.token);

      this.router.navigate(['/lecture']);
*/


}

  loginUsingToken() : void {

      console.log("login");
      this.token = this.token.replace('"',"");

      localStorage.setItem("token", this.token);

      this.router.navigate(['/lecture']);



}

}
