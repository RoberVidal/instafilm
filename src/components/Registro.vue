<template>
  <div class="d-flex justify-content-center w-100 h-100 fondoRegistro">
    <form class="col-4 mt-5" action="#" @submit.prevent="registro">
      <div class="form-group mt-5">
        <label for="exampleInputEmail1" class="h4">Nombre</label>
        <input
          type="name"
          class="form-control"
          id="exampleInputName1"
          aria-describedby="nameHelp"
          placeholder="Escribe tu nombre..."
          v-model="nombre"
        />
      </div>
      <div class="form-group">
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
        <label for="selectTipos" class="h4">Tipo de usuario</label>
        <select class="custom-select" id="selectTipos" required>
          <option selected>Elegir</option>
          <option value="cinefilos">Cinéfilo</option>
          <option value="productoras">Productora</option>
          <option value="festivales" disabled>Festival (prox.)</option>
        </select>
      </div>

      <div class="form-group">
        <label for="exampleInputPassword1" class="h4">Contraseña</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          aria-describedby="passwordHelp"
          placeholder="Escribe tu contraseña..."
          v-model="contraseña"
        />
        <small id="passwordHelp" class="form-text text-muted"
          >No reveles nunca tu contraseña.</small
        >
      </div>
      <button
        type="submit"
        class="btn colorPrincipal text-light mt-2 mr-2 btn-lg"
      >
        Registrarme
      </button>
      <div v-if="error" class="alert alert-danger mt-4" role="alert">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/config.js";
export default {
  name: "Registro",
  data() {
    return {
      nombre: "",
      email: "",
      contraseña: "",
      error: ""
    };
  },
  methods: {
    registro() {
      var select = document.getElementById("selectTipos");
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
                  var tipo = select.options[select.selectedIndex].value;
                  switch (tipo) {
                    case "cinefilos":
                      this.añadirTipo(tipo);
                      break;
                    case "productoras":
                      this.añadirTipo(tipo);
                      break;
                    case "festivales":
                      this.añadirTipo(tipo);
                      break;
                  }
                  this.nombre = "";
                  this.email = "";
                  this.contraseña = "";
                  this.error = "";
                  this.$router.push({ name: "dashboard" });
                })
                .catch(err => {
                  this.error = err.message;
                });
            }
          })
          .catch(err => {
            this.error =
              "El correo electrónico ya está en uso por otro usuario";
            alert("ERROR");
          });
      } else {
        this.error = "Todos los campos son requeridos";
      }
    },
    añadirTipo: function(tipo) {
      db.collection(tipo).add({
        id: this.nombre,
        nombre: this.nombre,
        email: this.email,
        tipo: tipo
      });
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
