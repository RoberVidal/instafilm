<template>
  <div>
    <div class="row d-flex justify-content-center mt-5">
      <div class="col-3">
        <img class="sombraFoto img-fluid w-100" :src="portada" />
      </div>
      <div class="col-7">
        <ul class="list-group col-12">
          <li class="list-group-item">
            <h1>{{ nombre }}</h1>
          </li>
          <li class="list-group-item h5">
            <i class="fas fa-file-alt"></i>
            Sinópsis:
            <span class="font-weight-light">{{ sinopsis }}</span>
          </li>
          <li class="list-group-item h5">
            <i class="fas fa-film"></i>
            Categoria:
            <span class="font-weight-normal">{{ categoria }}</span>
          </li>
          <li class="list-group-item h5">
            <i class="fas fa-users"></i>
            Productora:
            <span class="font-weight-normal">{{ productora }}</span>
          </li>
          <li v-if="votado" class="list-group-item h5 p-3">
            <button class="btn bg-danger text-white" @click="darMegusta">
              <i class="fas fa-heart"></i>
              {{ megusta }}
            </button>
          </li>
          <li v-else class="list-group-item h5 p-3">
            <button class="btn border" @click="darMegusta">
              <i class="fas fa-heart"></i>
              {{ megusta }}
            </button>
          </li>
        </ul>
        <button
          v-if="this.alquilado"
          @click="alquilar"
          class="w-50 btn btn-success col-3 botonAlquilar mt-2"
          disabled
        >
          Alquilar
          <span class="dividido">
            <b>3'50€</b>
          </span>
        </button>
        <button v-else @click="alquilar" class="w-50 btn btn-success col-3 botonAlquilar mt-2">
          Alquilar
          <span class="dividido">
            <b>3'50€</b>
          </span>
        </button>
        <a @click="$router.go(-1)" class="btn btn-dark text-white mt-2">Atrás</a>
        <div
          v-if="alquilado"
          class="alert alert-success mt-2"
          role="alert"
        >Gracias, ya has alquilado esta película</div>
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
              {{ comentario.usuario }}
            </h5>
            <small>{{ comentario.fecha }}</small>
          </div>
          <p class="mb-1">{{ comentario.texto }}</p>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../config";
import Firebase from "firebase";
export default {
  name: "pelicula",
  data() {
    return {
      id: "",
      nombre: "",
      categoria: "",
      megusta: 0,
      comentarios: [],
      portada: "",
      productora: "",
      nuevoComentario: null,
      user: "",
      textoComentario: null,
      usuarioComentario: null,
      fecha: null,
      votado: false,
      identificador: null,
      pelis: null,
      sinopsis: "",
      idEliminar: null,
      idNotificacion: null,
      alquilado: false
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
          this.productora = doc.data().productora;
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
        });
      });
    const otrothis = this;
    setTimeout(function() {
      otrothis.comprobarMegusta();
      otrothis.comprobarAlquiler();
    }, 500);
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
          fecha: this.fecha,
          tipo: "comentario"
        });

      var textoComentario = " ha comentado en la película ";
      this.notificar("comentario", textoComentario);
      this.nuevoComentario = "";
      document.getElementById("texto").value = "";
    },

    darMegusta: function() {
      const otrothis = this;
      if (!this.votado) {
        this.pelis.doc(this.identificador).update({
          megusta: this.megusta + 1
        });

        db.collection("peliculas")
          .doc(this.identificador)
          .collection("listamegusta")
          .add({
            email: this.user.email
          });

        var textoMensaje = " ha dado me gusta a la película ";
        this.notificar("megusta", textoMensaje);
        this.comprobarMegusta();
      } else {
        this.pelis.doc(this.identificador).update({
          megusta: this.megusta - 1
        });
        this.votado = false;

        db.collection("peliculas")
          .doc(this.identificador)
          .collection("listamegusta")
          .where("email", "==", this.user.email)
          .get()
          .then(snap => {
            snap.forEach(doc => {
              this.idEliminar = doc.id;
            });
          });

        /*db.collection("peliculas")
          .doc(this.identificador)
          .collection("listamegusta")
          .where("email", "==", this.user.email)
          .onSnapshot(snap => {
            snap.forEach(campo => {
              snap.forEach(campo => {
                this.idEliminar = campo.id;
              });
            });
          });*/
        const otrothis = this;
        setTimeout(function() {
          db.collection("peliculas")
            .doc(otrothis.identificador)
            .collection("listamegusta")
            .doc(otrothis.idEliminar)
            .delete();
        }, 500);
      }
    },
    comprobarMegusta: function() {
      db.collection("peliculas")
        .doc(this.identificador)
        .collection("listamegusta")
        .onSnapshot(snap => {
          snap.forEach(campo => {
            campo.data().email;
            if (campo.data().email == this.user.email) {
              this.votado = true;
            }
          });
        });
    },
    notificar: function(tipoUsuario, mensaje) {
      db.collection("productoras")
        .where("nombre", "==", this.productora)
        .get()
        .then(snap => {
          snap.forEach(campo => {
            this.idNotificacion = campo.id;
            db.collection("productoras")
              .doc(campo.id)
              .collection("mensajes")
              .add({
                contenido: mensaje,
                tipo: tipoUsuario,
                autor: this.user.email,
                pelicula: this.nombre,
                leido: false
              });
          });
        });
    },
    alquilar: function() {
      db.collection("cinefilos")
        .where("nombre", "==", this.user.displayName)
        .get()
        .then(snap => {
          snap.forEach(campo => {
            this.idNotificacion = campo.id;
            db.collection("cinefilos")
              .doc(this.idNotificacion)
              .collection("alquileres")
              .add({
                pelicula: this.nombre
              });
          });
        });

      db.collection("peliculas")
        .where("id", "==", this.$route.params.id)
        .get()
        .then(snap => {
          snap.forEach(campo => {
            this.idNotificacion = campo.id;
            db.collection("peliculas")
              .doc(this.idNotificacion)
              .collection("alquileres")
              .add({
                autor: this.user.displayName
              });
          });
        });
    },
    comprobarAlquiler: function() {
      db.collection("peliculas")
        .doc(this.identificador)
        .collection("alquileres")
        .onSnapshot(snap => {
          snap.forEach(campo => {
            campo.data().email;
            if (campo.data().autor == this.user.displayName) {
              this.alquilado = true;
            }
          });
        });
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
