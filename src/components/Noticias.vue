<template>
  <div class="mt-5 p-4">
    <div class="row col-12" v-for="noticia in noticias" :key="noticia.nombre">
      <div class="card mb-3">
        <div class="row no-gutters">
          <div class="col-md-2">
            <img :src="noticia.portada" class="card-img" alt="..." />
          </div>
          <div class="col-md-10">
            <div class="card-body">
              <h5 class="card-title">
                <b>{{noticia.titulo}}</b>
              </h5>
              <p class="card-text">{{noticia.cuerpo}}</p>
              <hr class="my-4" />

              <p class="card-text">
                <i class="fas fa-user-edit"></i>
                {{noticia.autor}}
                <i class="fas fa-calendar-alt ml-2"></i>

                <small class="text-muted">{{noticia.fecha}}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Firebase from "firebase";
import db from "../config";
export default {
  name: "Trabajos",
  data() {
    return {
      noticias: [],
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

    db.collection("noticias")
      .orderBy("fecha", "desc")
      .onSnapshot(snap => {
        this.noticias.length = 0;
        snap.forEach(noticia => {
          const datos = {
            titulo: noticia.data().titulo,
            cuerpo: noticia.data().cuerpo,
            portada: noticia.data().portada,
            autor: noticia.data().autor,
            fecha: noticia.data().fecha
          };
          this.noticias.push(datos);
        });
      });
  }
};
</script>

