<template>
  <div>
    <div class="jumbotron jumbotronInicio">
      <div class="container">
        <img class="img-fluid" src="@/assets/logo.png" />
        <p
          class="lead"
        >Una buena crítica constructiva nos puede ayudar a mejorar la experiencia de los usuarios y facilitar nuestro trabajo, ¡ayúdanos!</p>
      </div>
    </div>
    <form class="container">
      <div class="form-group">
        <label for="exampleFormControlInput1">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Introduce tu nombre"
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Tipo de usuario</label>
        <select class="form-control" id="exampleFormControlSelect1">
          <option>Cinéfilo</option>
          <option>Productora</option>
          <option>Festival</option>
        </select>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputCity">Ciudad</label>
          <input type="text" class="form-control" id="inputCity" placeholder="Introduce tu ciudad" />
        </div>
        <div class="form-group col-md-4">
          <label for="inputState">País</label>
          <select id="inputState" class="form-control">
            <option selected>Elegir...</option>
            <option>...</option>
          </select>
        </div>
        <div class="form-group col-md-2">
          <label for="inputZip">CP</label>
          <input type="text" class="form-control" id="inputZip" placeholder="Introduce tu CP" />
        </div>
      </div>
      <div class="form-group">
        <div class="row no-gutters">
          <div class="col-2 mr-5">
            <label for="exampleFormControlSelect2">Nivel experiencia</label>
            <select multiple class="form-control" id="exampleFormControlSelect2">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div class="col-2 mr-5">
            <label for="exampleFormControlSelect3">Nivel usabilidad</label>
            <select multiple class="form-control" id="exampleFormControlSelect3">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div class="col-2 mr-5">
            <label for="exampleFormControlSelect4">Nivel accesibilidad</label>
            <select multiple class="form-control" id="exampleFormControlSelect4">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div class="col-2 mr-5">
            <label for="exampleFormControlSelect5">Nivel recomendación</label>
            <select multiple class="form-control" id="exampleFormControlSelect5">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">¿Qué funciones utilizas más?</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Escribe aquí lo que más usas"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">¿Qué errores tiene nuestra plataforma?</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Escribe aquí los errores"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea2">¿Qué mejoras podemos implementar?</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea2"
          rows="3"
          placeholder="Escribe aquí tus mejoras"
        ></textarea>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value id="defaultCheck1" />
        <label
          class="form-check-label"
          for="defaultCheck1"
        >Acepto que mis datos sean usados para estadísticas internas.</label>
      </div>
      <button type="button" class="btn btn-dark mb-2 mt-2">Enviar</button>
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
      error: ""
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