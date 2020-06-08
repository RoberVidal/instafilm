<template>
  <div class="container w-100">
    <div class="row no-gutters">
      <div
        class="card col-3 mr-4 mb-4"
        style="width: 18rem;"
        v-for="pelicula in peliculas"
        :key="pelicula.nombre"
      >
        <img class="card-img-top" :src="pelicula.portada" :alt="pelicula.nombre" />
        <div class="card-body">
          <h5 class="card-title">{{pelicula.nombre}}</h5>
          <p class="card-text sinopsis font-italic">{{pelicula.sinopsis}}</p>
          <router-link
            class="quitar btn colorPrincipal text-light"
            :to="{name:'pelis', params: {id: pelicula.id}}"
          >Ver más</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from "firebase";
import db from "../../config";
export default {
  name: "Trabajos",
  data() {
    return {
      peliculas: [],
      nombre: "",
      user: "",
      email: ""
    };
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

    db.collection("peliculas")
      .orderBy("nombre", "asc")
      .onSnapshot(snap => {
        this.peliculas.length = 0;
        snap.forEach(pelicula => {
          const datos = {
            nombre: pelicula.data().nombre,
            categoria: pelicula.data().categoria,
            megusta: pelicula.data().megusta,
            id: pelicula.data().id,
            portada: pelicula.data().portada,
            productora: pelicula.data().productora,
            sinopsis: pelicula.data().sinopsis
          };
          if (datos.productora == this.user.displayName)
            this.peliculas.push(datos);
        });
      });
  }
};
</script>
