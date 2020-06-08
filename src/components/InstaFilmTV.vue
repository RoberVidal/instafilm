<template>
  <div>
    <div class="jumbotron">
      <div class="container">
        <img class="img-fluid" src="@/assets/logo.png" />
      </div>
    </div>
    <div class="row justify-content-center h-100 no-gutters container col-12">
      <div class="hidden-md-down col-2 w-100 barra">
        <ul class="nav flex-column ml-4 mb-3">
          <h4 class="text-secondary">Películas</h4>
          <li class="nav-item lateral">
            <button class="nav-link" @click="cambiarCategoria('Todas')">
              <h5>
                <i class="fas fa-list-alt"></i>
                Todas
              </h5>
            </button>
          </li>
          <li class="nav-item lateral">
            <button class="nav-link" @click="cambiarCategoria('Megusta')">
              <h5>
                <i class="fas fa-heart"></i>
                Más votadas
              </h5>
            </button>
          </li>
          <!--<li class="nav-item lateral">
            <button class="nav-link" @click="cambiarCategoria('Estrenos')">
              <h5><i class="fas fa-calendar-alt"></i> Estrenos</h5>
            </button>
          </li>-->
          <li class="nav-item lateral">
            <button class="nav-link" @click="cambiarCategoria('Cortometrajes')">
              <h5><i class="far fa-file-video"></i> Cortometrajes</h5>
            </button>
          </li>
          <li class="nav-item lateral">
            <button class="nav-link" @click="cambiarCategoria('Largometrajes')">
              <h5><i class="fas fa-file-video"></i> Largometrajes</h5>
            </button>
          </li>
          <li class="nav-item lateral">
            <button class="nav-link" @click="cambiarCategoria('Ficción')">
              <h5><i class="fas fa-radiation-alt"></i> Ficción</h5>
            </button>
          </li>
          <li class="nav-item lateral">
            <button class="nav-link" @click="cambiarCategoria('Drama')">
              <h5><i class="fas fa-frown"></i> Drama</h5>
            </button>
          </li>
          <li class="nav-item lateral">
            <button class="nav-link" @click="cambiarCategoria('Documental')">
              <h5><i class="fas fa-tv"></i> Documental</h5>
            </button>
          </li>
        </ul>
        <ul class="nav flex-column ml-4 mb-3">
          <h4 class="text-secondary">Festivales (prox.)</h4>
          <li class="nav-item lateral">
            <button
              class="nav-link"
              @click="cambiarCategoria('Todas')"
              disabled
            >
              <h5>
                <i class="fas fa-list-alt"></i>
                Todos
              </h5>
            </button>
          </li>
          <li class="nav-item lateral">
            <button
              class="nav-link"
              @click="cambiarCategoria('Megusta')"
              disabled
            >
              <h5>
                <i class="fas fa-heart"></i>
                Populares
              </h5>
            </button>
          </li>
        </ul>
      </div>
      <hr />
      <div class="row col-10 no-gutters pl-2">
        <template v-if="categoriaON === 'Todas'">
          <todas></todas>
        </template>
        <template v-else-if="categoriaON === 'Megusta'">
          <popularPelis></popularPelis>
        </template>
        <template v-else-if="categoriaON === 'Largometrajes'">
          <largometraje></largometraje>
        </template>
        <template v-else-if="categoriaON === 'Cortometrajes'">
          <cortometraje></cortometraje>
        </template>
        <template v-else-if="categoriaON === 'Ficción'">
          <ficcionPelis></ficcionPelis>
        </template>
        <template v-else-if="categoriaON === 'Drama'">
          <dramaPelis></dramaPelis>
        </template>
        <template v-else-if="categoriaON === 'Documental'">
          <documentalPelis></documentalPelis>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../config";
import todas from "./Peliculas/Categorias/Todas";
import popularPelis from "./Peliculas/Categorias/Popular";
import ficcionPelis from "./Peliculas/Categorias/Ficcion";
import documentalPelis from "./Peliculas/Categorias/Documental";
import dramaPelis from "./Peliculas/Categorias/Drama";
import largometraje from "./Peliculas/Categorias/Largometraje";
import cortometraje from "./Peliculas/Categorias/Cortometraje";
export default {
  components: {
    todas,
    popularPelis,
    ficcionPelis,
    documentalPelis,
    dramaPelis,
    largometraje,
    cortometraje
  },
  name: "InstaFilmTV",
  data() {
    return {
      categoriaON: "Todas"
    };
  },
  methods: {
    cambiarCategoria: function(tipo) {
      this.categoriaON = tipo;
      /*this.todas = false;
      this.estrenos = false;

      db.collection("peliculas")
        .where("categoria", "==", "Drama")
        .get()
        .then(peliculas => {
          peliculas.forEach(pelicula => {
            const datos = {
              nombre: pelicula.data().nombre,
              categoria: pelicula.data().categoria,
              megusta: pelicula.data().megusta,
              comentarios: pelicula.data().comentarios,
              id: pelicula.data().id,
              portada: pelicula.data().portada
            };

            this.populares.push(datos);
          });
        });*/
    }
  }
};
</script>

<style>
.zoom {
  transition: transform 0.2s; /* Animation */
}

.zoom:hover {
  transform: scale(1.04);
  border-radius: 0.8rem !important;
  box-shadow: 1px 0px 10px 1px rgba(0, 0, 0, 0.6);
}

.quitar {
  text-decoration: none !important;
  border-radius: 0.8rem !important;
}

.card:hover .overlay {
  opacity: 0.8;
  border-radius: 0.8rem;
}

.image {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 0.8rem;
}

h4,
h5,
h3 {
  font-size: 1.1vw;
}

h4 {
  font-weight: bold;
}

a {
  text-decoration: none;
  color: #626262;
}

.nav-link > h5 > i {
  color: #fd7e14;
}

.lateral {
  margin-bottom: 2px;
}

.lateral:hover i {
  color: black;
}

.nav-item {
  text-decoration: none !important;
}

.barra {
  border-right: 0.1px solid #dadada;
}

.card-text {
  height: 55px !important;
}

.jumbotron {
  background-image: url("../../src/assets/fondo.jpg");
  background-size: cover;
}

button {
  border: none;
  background: none;
  color: gray;
}

.lateral:hover button {
  border: none;
  background: none;
  color: black;
}
</style>
