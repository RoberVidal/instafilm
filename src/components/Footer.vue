<template class="d-flex justify-content-center">
  <div class="footer">
    <div class="col-md-12 pt-5">
      <div class="mb-5 justify-content-center d-flex">
        <a class="fb-ic">
          <i class="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 ml-5 fa-2x"></i>
        </a>
        <a class="tw-ic">
          <i class="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
        </a>
        <a class="gplus-ic">
          <i class="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
        </a>
        <a class="ins-ic">
          <i class="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
        </a>
      </div>

      <div class="footer-copyright text-center">
        © 2020 Copyright:
        <a href="http://localhost:8080/" class="textoNaranja">InstaFilm.com</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Footer"
};
</script>

<style>
@import "../css/style.css";

.footer {
  background-color: #212529;
  color: white;
}
</style>