<template>
  <div class="d-flex justify-content-center mt-5">
    <form class="col-4" action="#" @submit.prevent="logeado">
      <div class="form-group mt-5">
        <label for="exampleInputEmail1" class="h4">Email</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Escribe tu email..."
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1" class="h4">Contraseña</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Escribe tu contraseña..."
          v-model="contraseña"
        />
        <small id="emailHelp" class="form-text text-muted">No reveles nunca tu contraseña.</small>
      </div>
      <button class="btn mt-2 mr-2 btn-lg colorPrincipal text-white" type="submit">
        Entrar
        <i class="fas fa-envelope"></i>
      </button>
      <!--<button class="btn btn-danger mt-2 btn-lg">
        Google
        <i class="fab fa-google"></i>
      </button>-->
    </form>
  </div>
</template>
    
<script>
import Firebase from "firebase";
import db from "@/config.js";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      contraseña: "",
      error: ""
    };
  },
  methods: {
    logeado() {
      if (this.email && this.contraseña) {
        Firebase.auth()
          .signInWithEmailAndPassword(this.email, this.contraseña)
          .then(user => {
            this.$router.push({ name: "dashboard" });
          })
          .catch(err => {
            this.error = err.message;
          });
      } else {
        this.error = "Todos los campos son requeridos";
      }
    }
    /*inicio() {
      if (email && contraseña) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.contraseña)
        .then(user => )
      } else {
        this.error = "Todos los campos son obligatorios";
      }
    }*/
  }
};
</script>