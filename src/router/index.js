import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/DashboardInv";
import Login from "@/components/Login";
import Registro from "@/components/Registro";
import Firebase from "firebase";
import Nuevo from "@/components/ProductoraPanel/AddPeliculas";
import PanelProd from "@/components/ProductoraPanel/Dashboard";
import FestivalProd from "@/components/FestivalPanel/Dashboard";
import Pelicula from "@/components/Peliculas/Single";
import Catalogo from "@/components/InstaFilmTV";
import Contacto from "@/components/Contacto";
import Resultados from "@/components/Resultados";
import Noticias from "@/components/Noticias";
import db from "../config";

var inicio = "";
var otrothis = this;
Vue.use(Router);

/*function enviar() {
  Firebase.auth().onAuthStateChanged(usuario => {
    if (usuario) {
      var tipos = ["cinefilos", "festivales", "peliculas", "productoras"];

      tipos.forEach(tipo => {
        db.collection(tipo).onSnapshot(snap => {
          snap.forEach(documento => {
            if (documento.data().nombre == usuario.displayName) {
              inicio = documento.data().tipo;
              return seleccionar(inicio);
            }
          });
        });
      });
    }
  });
}

function seleccionar(home) {
  if (home == "cinefilos") {
    return Dashboard;
  } else if (home == "productoras") {
    return "PanelProd";
  } else {
    return "Dashboard";
  }
}*/

const router = new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      beforeEnter(to, from, next) {
        Firebase.auth().onAuthStateChanged(usuario => {
          if (usuario) {
            var tipos = [
              "cinefilos",
              "festivales",
              "peliculas",
              "productoras",
              "noticias"
            ];

            tipos.forEach(tipo => {
              db.collection(tipo)
                .get()
                .then(snap => {
                  snap.forEach(documento => {
                    if (documento.data().email == usuario.email) {
                      inicio = tipo;

                      if (inicio == "cinefilos") {
                        let components = {
                          default: Catalogo
                        };

                        to.matched[0].components = components;
                        next();
                      } else if (inicio == "productoras") {
                        let components = {
                          default: PanelProd
                        };

                        to.matched[0].components = components;
                        next();
                      } else if (inicio == "festivales") {
                        let components = {
                          default: FestivalProd
                        };

                        to.matched[0].components = components;
                        next();
                      } else {
                        let components = {
                          default: Dashboard
                        };
                        to.matched[0].components = components;
                        next();
                      }
                    }
                  });
                });
            });
          } else {
            let components = {
              default: Dashboard
            };
            to.matched[0].components = components;
            next();
          }
        });
      }
    },
    {
      path: "/login",
      component: Login
    },
    {
      name: "registro",
      path: "/registro",
      component: Registro,
      meta: {
        loged: true
      }
    },
    {
      path: "/panelprod",
      name: "panelprod",
      component: PanelProd,
      meta: {
        loged: true,
        requiresAuth: true
      }
    },
    {
      path: "/nuevo",
      name: "nuevo",
      component: Nuevo,
      meta: {
        loged: true
      }
    },
    {
      path: "/catalogo",
      name: "Catalogo",
      component: Catalogo,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/contacto",
      name: "Contacto",
      component: Contacto,
      meta: {
        loged: true
      }
    },
    {
      path: "/resultados",
      name: "resultados",
      component: Resultados,
      meta: {
        loged: true
      }
    },
    {
      path: "/noticias",
      name: "noticias",
      component: Noticias,
      meta: {
        loged: true
      }
    },
    {
      path: "/:id",
      name: "pelis",
      component: Pelicula,
      meta: {
        loged: true
      }
    }
  ],
  linkActiveClass: "active",
  mode: "history"
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(ruta => ruta.meta.requiresAuth)) {
    setTimeout(function() {
      const user1 = Firebase.auth().currentUser;
      if (user1) {
        next();
      } else {
        next("login");
      }
    }, 500);
  } else {
    next();
  }

  if (to.matched.some(ruta => !ruta.meta.loged)) {
    const user2 = Firebase.auth().currentUser;
    if (user2.email) {
      next();
    } else {
      next("login");
    }
  } /*else {
    setTimeout(function() {
      next();
    }, 500);
  }*/
});

export default router;
