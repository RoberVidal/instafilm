<template>
  <div>
    <div class="jumbotron jumbotronInicio">
      <div class="container">
        <img class="img-fluid" src="@/assets/logo.png" />
        <p
          class="lead"
        >Uniendo a cinéfilos, productoras y festivales con el fin de crear una comunidad donde todos salgan beneficiados.</p>
        <hr class="my-4" />
        <p class="lead">
          <a class="btn bg-dark btn-lg text-light" href="#" role="button">Registrarse</a>
        </p>
      </div>
    </div>
    <div class="container pt-5 pb-5">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-title">
            <h2>¿Qué ofrecemos?</h2>
            <p>Encuentra aquí la plataforma cinemetográfica más completa a nivel nacional</p>
          </div>
        </div>
      </div>
      <div class="row pb-5">
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="services__item">
            <i class="fas fa-eye fa-3x pb-2 textoNaranja"></i>
            <h5>Insta Film TV</h5>
            <p>Nuestro catálogo de cortometrajes, largometrajes y festivales es extenso y con mucha variedad, regístrate y disfruta ya de él.</p>
            <a class="btn btn-dark" href="#">
              Registrarse
              <i class="fa fa-long-arrow-right"></i>
            </a>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="services__item">
            <i class="fas fa-film fa-3x pb-2 textoNaranja"></i>
            <h5>Publica tu película</h5>
            <p>¿Eres una productora audiovisual? Te ayudamos a dar a conocer tus trabajos por un coste reducido y sacarles rentabilidad</p>
            <a class="btn btn-dark" href="#">
              Registrarse
              <i class="fa fa-long-arrow-right"></i>
            </a>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="services__item">
            <i class="fas fa-video fa-3x pb-2 textoNaranja"></i>
            <h5>Publica tu festival</h5>
            <p>¿Eres organizador de festivales? Te ayudamos a dar a conocer tus ediciones por un coste reducido y llegar al máximo público posible.</p>
            <a class="btn btn-dark" href="#">
              Registrarse
              <i class="fa fa-long-arrow-right"></i>
            </a>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="services__item">
            <i class="fas fa-tools fa-3x pb-2 textoNaranja"></i>
            <h5>Soporte 24/7</h5>
            <p>Lo principal para un buen servicio es mantener todo en su correcto funcionamiento por ello disponemos de un soporte para errores y dudas.</p>
            <a class="btn btn-dark" href="#">
              Contacto
              <i class="fa fa-long-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../config";
export default {
  components: {},
  name: "DashboardInv",
  data() {
    return {};
  }
};
</script>

<style>
@import "../css/style.css";
</style>
