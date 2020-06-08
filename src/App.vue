<template>
  <div>
    <!-- NAVIGATION -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <!--<h3>
          Insta
          <span class="text-warning">Film</span>
        </h3>-->
        <img class="img-fluid" src="@/assets/brand.png" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/">
              <a class="nav-link" href="#">
                Inicio
                <span class="sr-only"></span>
              </a>
            </router-link>
          </li>
          <li v-if="user" class="nav-item active">
            <router-link to="/catalogo">
              <a class="nav-link" href="#">
                Insta Film TV
                <span class="sr-only"></span>
              </a>
            </router-link>
          </li>
          <li v-if="user" class="nav-item active">
            <router-link to="/noticias">
              <a class="nav-link" href="#">
                Noticias
                <span class="sr-only"></span>
              </a>
            </router-link>
          </li>
          <!--<li v-if="user" class="nav-item active">
            <router-link to="/premios">
              <a class="nav-link" href="#">
                Premios
                <span class="sr-only"></span>
              </a>
            </router-link>
          </li>-->
          <li class="nav-item active">
            <router-link to="/contacto">
              <a class="nav-link" href="#">
                Contacto
                <span class="sr-only"></span>
              </a>
            </router-link>
          </li>
        </ul>
        <template v-if="user">
          <form class="form-inline my-2 my-lg-0 mr-2">
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Hola, {{ user.displayName || user.email }}</button>
              <div class="dropdown-menu mr-10" aria-labelledby="dropdownMenuButton">
                <router-link to="/" class="dropdown-item btn">Dasboard</router-link>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item btn" @click="logout">Cerrar sesión</a>
              </div>
            </div>
          </form>
        </template>
        <template v-else>
          <form class="form-inline my-2 my-lg-0">
            <router-link to="/login" class="btn btn-light text-dark text-decoration-none mr-2">Login</router-link>
            <router-link
              to="/registro"
              class="btn colorPrincipal text-light text-decoration-none"
            >Registro</router-link>
          </form>
        </template>
      </div>
    </nav>

    <!-- MAIN CONTENT 
    <div class="container">
      <div class="row mt-5">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-header">
              <h3>Add a New Website</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="addWebsite">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="newWebsite.name"
                    placeholder="Name"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="newWebsite.author"
                    placeholder="Author"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="newWebsite.url"
                    placeholder="URL"
                  />
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm-8 text-center">
          <img src="./assets/logo.png" alt />
          <div class="card">
            <div class="card-header">
              <h3>Websites List</h3>
            </div>
            <div class="card-body">
              <table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Operations</th>
                    <p>{{ name }}</p>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="ws in websites" v-bind:key="ws.id">
                    <td>
                      <a v-bind:href="w.url" target="_blank">{{ w.name }}</a>
                    </td>
                    <td>{{ w.author }}</td>
                    <td>
                      <button @click="deleteWebsite(w)" class="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>-->
    <router-view class="pb-5 contenido" :usuario="this.user" />
    <!--<Footer></Footer>
    <div class="bg-dark text-light pie w-100">
      <div class="container">
        <div class="container">
          <div class="row">
            <div class="col-md-12 pt-5">
              <div class="mb-5 justify-content-center d-flex">
                <a class="fb-ic">
                  <i class="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 ml-5 fa-2x"></i>
                </a>
                <a class="tw-ic">
                  <i class="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                </a>
                <a class="gplus-ic">
                  <i class="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                </a>
                <a class="ins-ic">
                  <i class="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-copyright text-center pb-3">
          © 2020 Copyright:
          <a href="http://localhost:8080/">InstaFilm.com</a>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
// Firebase
import Firebase from "firebase";
import config from "./config";
import firestore from "firebase/firestore";
import Dashboard from "./components/DashboardInv";
import Footer from "@/components/Footer";

export default {
  components: {
    Dashboard,
    Footer
  },
  name: "App",
  firebase: {
    //websites: websitesRef
  },
  data() {
    return {
      nombre: "",
      user: "",
      email: ""
    };
  },
  methods: {
    logout() {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.$router.push("login");
        });
    }
  },
  created() {
    Firebase.auth().onAuthStateChanged(usuario => {
      if (usuario) {
        this.user = usuario;
        this.email = usuario.email;
      } else {
        this.user = null;
      }
    });
  }
};
</script>
<style>
@import "/css/style.css";
</style>
