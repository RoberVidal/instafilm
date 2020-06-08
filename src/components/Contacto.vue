<template>
  <div>
    <div class="jumbotron jumbotronInicio h-100">
      <div class="container">
        <h1 class="display-4">Contacto</h1>
        <p class="lead">
          Envía alguna sugerencia, consulta, reclamo o aporte al equipo de
          InstaFilm completando los campos. Responderemos lo más pronto posible.
        </p>
      </div>
    </div>
    <form class="container" @submit.prevent="enviarContacto = true">
      <div class="form-group">
        <label for="exampleFormControlInput1">Correo electrónico</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Escribe aquí tu correo electrónico"
          required
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Tipo de consulta</label>
        <select class="form-control" id="exampleFormControlSelect1" required>
          <option>Duda</option>
          <option>Sugerencia</option>
          <option>Reclamación</option>
          <option>Propuesta</option>
        </select>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Mensaje</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Escribe aquí tu mensaje"
          required
        ></textarea>
      </div>
      <button
        class="btn colorPrincipal text-light mt-2 mr-2 btn-lg"
        type="submit"
      >
        Enviar
      </button>
      <div v-if="enviarContacto" class="alert alert-success mt-2" role="alert">
        Gracias, tu mensaje será respondido con la mayor brevedad posible.
      </div>
    </form>
  </div>
</template>

<script>
import Firebase from "firebase";
import db from "@/config.js";
export default {
  name: "Contacto",
  data() {
    return {
      nombre: "",
      email: "",
      contraseña: "",
      error: "",
      enviarContacto: false
    };
  },
  methods: {
    registro() {
      if (this.nombre && this.email && this.contraseña) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.contraseña)
          .then(user => {
            if (user) {
              user.user
                .updateProfile({
                  displayName: this.nombre
                })
                .then(u => {
                  this.nombre = "";
                  this.email = "";
                  this.contraseña = "";
                  this.error = "";
                  this.$router.push("dashboard");
                })
                .catch(err => {
                  this.error = err.message;
                });
            }
          })
          .catch(err => {
            this.error = err.message;
          });
      } else {
        this.error = "Todos los campos son requeridos";
      }
    }
  }
};
</script>
