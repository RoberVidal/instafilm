<template>
  <div id="AddPeliculas" class="container">
    <div class="row">
      <div class="col-2">
        <div class="list-group" id="myList" role="tablist">
          <a
            class="list-group-item list-group-item-action active"
            data-toggle="list"
            href="#pelicula"
            role="tab"
          >Película</a>
          <a
            class="list-group-item list-group-item-action"
            data-toggle="list"
            href="#noticia"
            role="tab"
          >Noticia</a>
        </div>
      </div>
      <div class="col-10">
        <div class="tab-content">
          <div class="tab-pane active" id="pelicula" role="tabpanel">
            <form class="row" action="#" @submit.prevent="enviarPelicula">
              <div class="col-5">
                <img
                  v-if="!cargado"
                  src="../../assets/cartel.jpg"
                  alt
                  class="pb-4 rounded"
                  style="width: 250px"
                />

                <img v-else :src="portada" alt class="pb-4 rounded" style="width: 250px" />
                <input type="file" @change="onFileSelected" required />
                <div
                  v-if="cargado === false"
                  class="alert alert-danger mt-2"
                  role="alert"
                >Debes cargar la imagen</div>

                <button
                  class="btn colorPrincipal text-light mt-2 mr-2"
                  @click="onUpload"
                  data-toggle="modal"
                  data-target="#myModal"
                >Cargar</button>
              </div>
              <div class="col-7">
                <div class="form-group">
                  <label for="nombre" class="h4">Nombre</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Escribe un nombre"
                    id="nombre"
                    v-model="nombre"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="sinopsis" class="h4">Sinopsis</label>
                  <textarea
                    rows="4"
                    type="text"
                    class="form-control"
                    placeholder="Escribe una sinopsis"
                    id="sinopsis"
                    v-model="sinopsis"
                    required
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
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="video" class="h4">Archivo de vídeo</label>
                  <input
                    type="file"
                    class="col-12 p-0"
                    placeholder="Introduce la url del archivo"
                    id="video"
                    required
                  />
                </div>
                <button
                  v-if="!clickAñadir"
                  class="btn colorPrincipal text-light mt-2 btn-lg"
                  type="submit"
                >Añadir</button>
                <button
                  v-else
                  class="btn colorPrincipal text-light btn-lg mt-2"
                  type="button"
                  disabled
                >
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Enviando...
                </button>
              </div>
            </form>
            <div
              v-if="errorExtension"
              class="modal fade"
              id="myModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Error</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">La portada debe contener la extensión jpg, png o jpeg</div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane" id="noticia" role="tabpanel">
            <form class="row" action="#">
              <div class="col-5">
                <img
                  v-if="!cargado"
                  src="../../assets/cartel.jpg"
                  alt
                  class="pb-4 rounded"
                  style="width: 250px"
                />

                <img v-else :src="imagenNoticia" alt class="pb-4 rounded" style="width: 250px" />
                <input type="file" @change="onFileSelected" required />
                <div
                  v-if="cargado === false"
                  class="alert alert-danger mt-2"
                  role="alert"
                >Debes cargar la imagen</div>

                <button
                  class="btn colorPrincipal text-light mt-2 mr-2"
                  @click="subirImagenNoticia"
                  data-toggle="modal"
                  data-target="#myModal"
                >Cargar</button>
              </div>
              <div class="col-7">
                <div class="form-group">
                  <label for="nombre" class="h4">Título</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Escribe un título"
                    id="título"
                    v-model="titulo"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="categoria" class="h4">Cuerpo</label>
                  <textarea
                    rows="4"
                    class="form-control"
                    placeholder="Escribe el cuerpo de la noticia"
                    id="cuerpo"
                    v-model="cuerpo"
                    required
                  />
                </div>

                <button
                  class="btn colorPrincipal text-light mt-2 mr-2 btn-lg"
                  @click="enviarNoticia"
                >Añadir</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../../config";
export default {
  name: "AddPeliculas",
  data() {
    return {
      id: null,
      nombre: null,
      categoria: null,
      megusta: 0,
      portada: null,
      video: null,
      sinopsis: null,
      selectedFile: null,
      cargado: null,
      tamaño: 0,
      posicionInicial: 0,
      nombreArchivo: null,
      extension: null,
      errorExtension: false,
      titulo: null,
      cuerpo: null,
      imagenNoticia: null,
      idProductora: null,
      fecha: null,
      clickAñadir: null
    };
  },
  props: ["usuario"],
  methods: {
    enviarPelicula() {
      this.clickAñadir = true;
      if (!this.errorExtension && this.cargado) {
        db.collection("peliculas")
          .add({
            id: this.nombre,
            nombre: this.nombre,
            categoria: this.categoria,
            megusta: this.megusta,
            portada: this.portada,
            productora: this.usuario.displayName,
            sinopsis: this.sinopsis
          })
          .then(() => {
            var otrothis = this;
            setTimeout(function() {
              otrothis.clickAñadir = false;
              otrothis.$emit("click");
            }, 1500);
          });
      }
    },
    enviarNoticia() {
      this.clickAñadir = true;
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
      const otrothis = this;
      setTimeout(function() {
        if (!otrothis.errorExtension && otrothis.cargado) {
          db.collection("noticias")
            .add({
              titulo: otrothis.titulo,
              cuerpo: otrothis.cuerpo,
              portada: otrothis.imagenNoticia,
              autor: otrothis.usuario.displayName,
              fecha: otrothis.fecha
            })
            .then(() => {
              otrothis.$router.push("/noticias");
            });
        }
      }, 500);
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.cargado = false;

      var comprobarExtension = tamaño => {
        this.tamaño = parseInt(tamaño);
        this.posicionaInicial = parseInt(this.tamaño - 4);
        this.posicionaInicial2 = parseInt(this.tamaño - 5);
        this.nombreArchivo = this.selectedFile.name;
        this.extension = this.nombreArchivo.slice(
          this.posicionaInicial,
          this.tamaño
        );
        this.extension2 = this.nombreArchivo.slice(
          this.posicionaInicial2,
          this.tamaño
        );
      };

      comprobarExtension(this.selectedFile.name.length);
      if (
        this.extension == ".jpg" ||
        this.extension == ".png" ||
        this.extension2 == ".jpeg"
      ) {
        this.errorExtension = false;
      } else {
        this.errorExtension = true;

        alert("Sin error");
      }
    },
    onUpload() {
      if (!this.errorExtension) {
        const storage = firebase
          .storage()
          .ref("/portadas/" + this.selectedFile.name);
        const subir = storage.put(this.selectedFile);
        subir.on("state_changed", () => {
          subir.snapshot.ref.getDownloadURL().then(url => {
            this.portada = url;
            this.cargado = true;
          });
        });
      }
    },
    subirImagenNoticia() {
      if (!this.errorExtension) {
        const storage = firebase
          .storage()
          .ref("/noticias/" + this.selectedFile.name);
        const subir = storage.put(this.selectedFile);
        subir.on("state_changed", () => {
          subir.snapshot.ref.getDownloadURL().then(url => {
            this.imagenNoticia = url;
            this.cargado = true;
          });
        });
      }
    }
  }
};
</script>
