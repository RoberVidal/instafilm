<template>
  <div class="container w-100">
    <div class="row no-gutters">
      <div id="accordion" class="col-12 list-group">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h2 class="mb-0">
              <button
                class="btn"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <b class="float-left">
                  <i class="fas fa-envelope"></i> Mensajes no leídos
                </b>
              </button>
              <h4 class="float-right pt-2">
                <span class="badge badge-secondary colorPrincipal">
                  Marcar como leído con
                  <i class="far fa-eye"></i>
                </span>
              </h4>
            </h2>
          </div>

          <div
            id="collapseOne"
            class="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div v-if="this.mensajesNo.length === 0">
              <div class="card-body">
                <li class="list-group-item">Ningún mensaje sin leer.</li>
              </div>
            </div>
            <div class="card-body">
              <li class="list-group-item" v-for="mensaje in mensajesNo" :key="mensaje.contenido">
                <b>{{mensaje.autor}}</b>
                {{mensaje.contenido}}
                <router-link :to="mensaje.pelicula">
                  <u>{{mensaje.pelicula}}</u>
                </router-link>
                <i class="far fa-eye btn" @click="marcarComoLeido(mensaje.identificador)"></i>
              </li>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingTwo">
            <h5 class="mb-0">
              <button
                class="btn collapsed"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <i class="fas fa-envelope-open"></i>
                <b>Mensajes leídos</b>
              </button>
            </h5>
          </div>
          <div
            id="collapseTwo"
            class="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordion"
          >
            <div class="card-body">
              <li class="list-group-item" v-for="mensaje in mensajesSi" :key="mensaje.contenido">
                <b>{{mensaje.autor}}</b>
                {{mensaje.contenido}}
                <router-link :to="mensaje.pelicula">
                  <u>{{mensaje.pelicula}}</u>
                </router-link>
              </li>
            </div>
          </div>
        </div>
        <!--<h2>
        Mensajes negativos
        <span class="badge badge-light">1</span>
      </h2>
      <div class="alert alert-danger" role="alert">
        La inscripción al festival
        <b>Festival Alfaz del Pi</b> ha sido rechazada
      </div>
      <h2>
        Mensajes positivos
        <span class="badge badge-light">2</span>
      </h2>
      <div class="alert alert-success" role="alert">
        La inscripción al festival
        <b>Festival de la Ciudad de Alicante</b> ha sido aceptada
      </div>
      <div class="alert alert-success" role="alert">
        Tu película
        <b>Vida</b> ha superado los 100 me gusta
        </div><-->
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
      pelis: "",
      nombre: "",
      user: "",
      email: "",
      nombre: null,
      mensajesNo: [],
      mensajesSi: [],
      nuevoComentario: null,
      textoComentario: null,
      usuarioComentario: null,
      fecha: null,
      mostrar: false,
      idMensaje: null,
      marcarLeido: false
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

    const otrothis = this;
    setTimeout(function() {
      db.collection("productoras")
        .where("nombre", "==", otrothis.user.displayName)
        .onSnapshot(snap => {
          snap.forEach(campo => {
            otrothis.idMensaje = campo.id;
            db.collection("productoras")
              .doc(otrothis.idMensaje)
              .collection("mensajes")
              .onSnapshot(mensajes => {
                otrothis.mensajesNo.length = 0;
                otrothis.mensajesSi.length = 0;
                mensajes.forEach(mensaje => {
                  if (!mensaje.data().leido) {
                    const datosNo = {
                      contenido: mensaje.data().contenido,
                      tipo: mensaje.data().tipo,
                      autor: mensaje.data().autor,
                      pelicula: mensaje.data().pelicula,
                      leido: mensaje.data().leido,
                      identificador: mensaje.ref.id
                    };
                    otrothis.mensajesNo.push(datosNo);
                  } else {
                    //mensaje.ref.update({ leido: false });
                    const datosSi = {
                      contenido: mensaje.data().contenido,
                      tipo: mensaje.data().tipo,
                      autor: mensaje.data().autor,
                      pelicula: mensaje.data().pelicula,
                      leido: mensaje.data().leido,
                      identificador: mensaje.ref.id
                    };
                    otrothis.mensajesSi.push(datosSi);
                  }
                });
              });
          });
        });
    }, 500);
  },
  methods: {
    marcarComoLeido: function(identificador) {
      this.marcarLeido = true;
      db.collection("productoras")
        .doc(this.idMensaje)
        .collection("mensajes")
        .doc(identificador)
        .update({
          leido: true
        });
    }
  }
};
</script>