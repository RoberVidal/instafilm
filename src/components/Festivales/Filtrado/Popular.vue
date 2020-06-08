<template>
  <div>
    <div class="row col-12 no-gutters">
      <router-link
        class="card zoom col-6 col-sm-6 col-md-4 col-lg-2 border-0 quitar mr-4 mb-4"
        v-for="pelicula in acciones"
        :key="pelicula.nombre"
        :to="{name:'pelis', params: {id: pelicula.id}}"
      >
        <img
          :src="pelicula.portada"
          class="card-img-top img-fluid image"
          alt="..."
          width="100%"
          height="450px"
        />
        <div class="card-body">
          <p class="card-text mx-auto col-12 text-center text-dark">{{pelicula.nombre}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "../config";
export default {
  name: "Dashboard",
  data() {
    return {
      acciones: []
    };
  },
  created() {
    db.collection("peliculas")
      .orderBy("megusta", "desc")
      .where("categoria", "==", "Acción")
      .onSnapshot(snap => {
        this.acciones.length = 0;
        snap.forEach(pelicula => {
          const datos = {
            nombre: pelicula.data().nombre,
            categoria: pelicula.data().categoria,
            megusta: pelicula.data().megusta,
            comentarios: pelicula.data().comentarios,
            id: pelicula.data().id,
            portada: pelicula.data().portada
          };
          this.acciones.push(datos);
        });
      });
  }
};
</script>