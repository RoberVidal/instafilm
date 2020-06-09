<template>
  <div class="panel bg-light">
    <div class="jumbotron jumbotronInicio">
      <div class="container">
        <img class="img-fluid" src="@/assets/logo.png" />
        <p
          class="lead"
        >Uniendo a cinéfilos, productoras y festivales con el fin de crear una comunidad donde todos salgan beneficiados.</p>
      </div>
    </div>
    <div class="container">
      <div class="row border-primary">
        <div class="col-12 align-self-center">
          <div class="section-title">
            <h2>
              Panel productora
              <b>{{this.user.displayName}}</b>
            </h2>
            <p>Navega por este submenú para conocer todas las funciones como productora</p>
          </div>
        </div>
      </div>
      <div class="row pb-5">
        <div class="col-lg-3 col-md-6 col-sm-6">
          <button class="btn btn-dark" @click="cambiarCategoria('Mensajes')">
            Mensajes
            <span class="badge badge-light">{{this.contador}}</span>
          </button>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <button class="btn btn-dark" @click="cambiarCategoria('Trabajos')">
            Trabajos
            <i class="fas fa-briefcase"></i>
          </button>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <button class="btn btn-dark active" @click="cambiarCategoria('Añadir')">
            Añadir
            <i class="fas fa-plus-square"></i>
          </button>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <router-link class="btn btn-dark" to="/catalogo">
            Insta Film TV
            <i class="fas fa-eye"></i>
          </router-link>
        </div>
      </div>
    </div>
    <div class="panel d-flex justify-content-center p-5">
      <div class="row col-10 no-gutters pl-2">
        <template v-if="categoriaON === 'Vacio'">
          <div class="container">
            <div class="row border-primary">
              <div class="col-12 align-self-center">
                <div class="jumbotron-fluid">
                  <h4 class="display-4">
                    No has seleccionado nada
                    <i class="fas fa-arrow-circle-up"></i>
                  </h4>
                  <p
                    class="lead"
                  >El tiempo es oro, así que no esperes más y revisa la bandeja de mensajes, supervisa tus trabajos subidos, comparte nuevos y analiza a la competencia.</p>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="categoriaON === 'Añadir'">
          <AddPeliculas :usuario="this.user" @click="cambiarCategoria('Trabajos')"></AddPeliculas>
        </template>
        <template v-else-if="categoriaON === 'Trabajos'">
          <Trabajos></Trabajos>
        </template>
        <template v-else-if="categoriaON === 'Mensajes'">
          <Mensajes></Mensajes>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../config";
import AddPeliculas from "./AddPeliculas";
import Trabajos from "./Trabajos";
import Mensajes from "./Mensajes";
import Firebase from "firebase";
export default {
  components: {
    AddPeliculas,
    Trabajos,
    Mensajes
  },
  name: "panelprod",
  data() {
    return {
      categoriaON: "Vacio",
      user: "",
      email: "",
      contador: 0,
      idMensaje: null,
      mensajesNo: [],
      usuario: ""
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
                otrothis.contador = 0;
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
                    otrothis.contador++;
                  }
                });
              });
          });
        });
    }, 500);
  },
  methods: {
    cambiarCategoria: function(tipo) {
      this.categoriaON = tipo;
    }
  }
};
</script>
<style>
@import "../../css/style.css";
</style>