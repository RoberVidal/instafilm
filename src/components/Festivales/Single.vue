<template>
  <div>
    <div id="ver-pelicula" class="row d-flex justify-content-center mt-5 col-12">
      <div class="col-3">
        <img class="sombraFoto img-fluid w-100" :src="portada" />
      </div>
      <div class="col-7">
        <ul class="list-group col-12">
          <li class="list-group-item">
            <h1>{{nombre}}</h1>
          </li>
          <li class="list-group-item h5">
            <i class="fas fa-file-alt"></i>
            Sinópsis:
            <span class="font-weight-normal">{{sinopsis}}</span>
          </li>
          <li class="list-group-item h5">
            <i class="fas fa-film"></i>
            Categoria:
            <span class="font-weight-normal">{{categoria}}</span>
          </li>
          <button
            class="h4 btn text-left"
            :class="{'text-danger': votado, 'text-dark': !votado}"
            @click="darMegusta(votado)"
          >
            <i class="fas fa-heart"></i>
            {{megusta}}
          </button>
          <div v-if="mostrar" class="alert alert-success alert-dismissible fade show" role="alert">
            Gracias por aportar tu valoración
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div
            class="modal fade bd-example-modal-lg"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe class="embed-responsive-item" :src="trailer" allowfullscreen></iframe>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >Tráiler</button>

          <!-- Modal -->
          <div
            class="modal fade bd-example-modal-lg sinpadding"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe class="embed-responsive-item" :src="trailer" allowfullscreen></iframe>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" id="trailerModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <!-- 16:9 aspect ratio -->
                  <div class="embed-responsive embed-responsive-16by9">
                    <iframe
                      class="embed-responsive-item"
                      :src="trailer"
                      id="video"
                      allowscriptaccess="always"
                      allow="autoplay"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
        <router-link to="/dashboard" class="btn btn-dark mt-2">Atrás</router-link>
      </div>

      <div class="row mt-5 col-11">
        <div class="h2 col-12">Comentarios</div>
        <textarea
          class="form-control"
          rows="3"
          v-model="nuevoComentario"
          placeholder="Escribe aquí tu comentario"
          id="texto"
        ></textarea>
        <button @click="publicarComentario" class="btn btn-dark col-12 mb-2">Publicar</button>
        <li
          class="list-group-item bold col-12"
          v-for="comentario in comentarios"
          :key="comentario.texto"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1 text-muted">
              <i class="fas fa-user"></i>
              {{comentario.usuario}}
            </h5>
            <small>{{comentario.fecha}}</small>
          </div>
          <p class="mb-1">{{comentario.texto}}</p>
        </li>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#">Previous</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
    
<script>
import db from "../config";
import Firebase from "firebase";
export default {
  name: "ver-pelicula",
  data() {
    return {
      id: null,
      nombre: null,
      categoria: null,
      megusta: null,
      comentarios: [],
      portada: null,
      nuevoComentario: null,
      user: "",
      textoComentario: null,
      usuarioComentario: null,
      fecha: null,
      trailer: null,
      votado: false,
      mostrar: false,
      identificador: null,
      pelis: null,
      sinopsis: null
    };
  },
  created() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
    this.pelis = db.collection("peliculas");
    var sentencia = this.pelis
      .where("id", "==", this.$route.params.id)
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          this.identificador = doc.id;
          this.id = doc.data().id;
          this.nombre = doc.data().nombre;
          this.categoria = doc.data().categoria;
          this.sinopsis = doc.data().sinopsis;
          this.megusta = doc.data().megusta;
          this.portada = doc.data().portada;
          this.trailer = doc.data().trailer;
          this.pelis
            .doc(doc.id)
            .collection("comentarios")
            .orderBy("fecha", "desc")
            .limit(5)
            .onSnapshot(comentarios => {
              this.comentarios.length = 0;
              comentarios.forEach(campo => {
                const datos = {
                  texto: campo.data().comentario,
                  usuario: campo.data().nombre,
                  fecha: campo.data().fecha
                };
                this.comentarios.push(datos);
              });
            });

          db.collection("peliculas")
            .doc(this.identificador)
            .collection("dale")
            .onSnapshot(buscamegusta => {
              if (buscamegusta != null) {
                buscamegusta.forEach(campo => {
                  if (campo.data().nuevo == this.user.email) {
                    this.votado = true;
                    this.mostrar = true;
                  } else {
                    this.votado = false;
                    this.mostrar = false;
                  }
                });
              }
            });
        });
      });
  },
  methods: {
    publicarComentario: function() {
      var fechaLarga = new Date();
      var mes = fechaLarga.getMonth() + 1;
      var fechaCadena =
        fechaLarga.getDate() +
        "/" +
        "0" +
        mes +
        "/" +
        fechaLarga.getFullYear() +
        " " +
        fechaLarga.getHours() +
        ":" +
        fechaLarga.getMinutes();
      this.fecha = fechaCadena;

      db.collection("peliculas")
        .doc(this.identificador)
        .collection("comentarios")
        .add({
          nombre: this.user.displayName || this.user.email,
          comentario: this.nuevoComentario,
          fecha: this.fecha
        });
      this.nuevoComentario = "";
      document.getElementById("texto").value = "";
    },

    darMegusta: function() {
      if (this.votado == false) {
        db.collection("peliculas")
          .doc(this.identificador)
          .collection("dale")
          .doc()
          .set({
            nuevo: "veamos"
          });
        this.pelis.doc(this.identificador).update({
          megusta: this.megusta + 1
        });

        this.votado = true;
        this.mostrar = true;
      } else {
        this.pelis
          .doc(this.identificador)
          .collection("dale")
          .onSnapshot(buscamegusta => {
            buscamegusta.forEach(campo => {
              var idmegusta = campo.id;
              if (campo.data().nuevo == "veamos") {
                this.pelis
                  .doc(this.identificador)
                  .collection("dale")
                  .doc(idmegusta)
                  .delete();
              }
            });
          });
        this.votado = false;
        this.mostrar = false;
        this.pelis.doc(this.identificador).update({
          megusta: this.megusta - 1
        });
      }
    }
  }
  /*beforeRouteEnter(to, from, next) {
    db.collection("peliculas")
      .where("id", "==", to.params.id)
      .get()
      .then(peliculas => {
        peliculas.forEach(pelicula => {
          next(vm => {
            (vm.nombre = pelicula.data().nombre),
              (vm.categoria = pelicula.data().categoria),
              (vm.megusta = pelicula.data().megusta),
              (vm.comentarios = pelicula.data().comentarios),
              (vm.ide = pelicula.data().id);
            vm.portada = pelicula.data().portada;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  megusta: {
    fetchData() {
      db.collection("peliculas")
        .where("id", "==", this.$route.params.id)
        .get()
        .then(peliculas => {
          peliculas.forEach(pelicula => {
            this.id = pelicula.data().id;
            this.nombre = pelicula.data().nombre;
            this.categoria = pelicula.data().categoria;
            this.megusta = pelicula.data().megusta;
            this.comentarios = peliculas.data().comentarios;
          });
        });
    }
  }*/
};
</script>

<style scoped>
.sombraFoto {
  box-shadow: 1px 0px 10px 1px rgba(0, 0, 0, 0.6);
}

.sinpadding {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
