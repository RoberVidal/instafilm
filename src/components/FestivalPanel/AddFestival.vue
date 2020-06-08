<template>
  <div id="AddPeliculas" class="d-flex justify-content-center">
    <form class="col-4" action="#" @submit.prevent="enviarPelicula">
      <div class="form-group mt-5">
        <label for="nombre" class="h4">Nombre</label>
        <input
          type="text"
          class="form-control"
          placeholder="Escribe un nombre"
          id="nombre"
          v-model="nombre"
        />
      </div>
      <div class="form-group">
        <label for="categoria" class="h4">Categoría</label>
        <input
          type="text"
          class="form-control"
          placeholder="Escribe una categoría"
          id="categoria"
          v-model="categoria"
        />
      </div>
      <div class="form-group">
        <label for="portada" class="h4">Portada</label>
        <input
          type="text"
          class="form-control"
          placeholder="Escribe una categoría"
          id="portada"
          v-model="portada"
        />
      </div>
      <div class="form-group">
        <label for="trailer" class="h4">Tráiler</label>
        <input
          type="text"
          class="form-control"
          placeholder="Introduce el tráiler"
          id="trailer"
          v-model="trailer"
        />
      </div>
      <button class="btn btn-primary mt-2 mr-2 btn-lg" type="submit">Añadir</button>
    </form>
  </div>
</template>
    
<script>
import firebase from "firebase";
import db from "../config";
export default {
  name: "AddPeliculas",
  data() {
    return {
      id: null,
      nombre: null,
      categoria: null,
      megusta: 0,
      portada: null,
      trailer: null
    };
  },
  methods: {
    enviarPelicula() {
      db.collection("peliculas")
        .add({
          id: this.nombre,
          nombre: this.nombre,
          categoria: this.categoria,
          megusta: this.megusta,
          portada: this.portada,
          trailer: this.trailer
        })
        .then(docRef => this.$route.push("/dashboard"))
        .catch(error => alert(error.message));
    }
  }
};
</script>