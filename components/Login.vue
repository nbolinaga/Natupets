<template>
  <div class="w-screen overflow-hidden">
    <h1
      class="md:text-7xl text-5xl w-screen bg-yellow-400 text-[#501111] text-center py-5 font-main"
    >
      NATUPETS
    </h1>
    <p
      class="text-2xl text-justify md:px-[25vw] px-[8vw] my-8 text-last-center"
    >
      Bienvenido a <span class="text-yellow-400 font-main">Natupets</span> esta
      página es una prueba piloto para manejar la compra de la comida de tu
      mascota, de manera fácil y rápida
    </p>
    <!-- DESKTOP ONLY -->
    <div class="hidden md:block">
      <button @click="googleSignIn">
        <img
          src="../static/btn_google_signin_dark_normal_web@2x.png"
          alt="login con google"
          class="md:w-[20vw] md:mx-[40vw] w-[80vw] mx-[10vw] mb-2"
        />
      </button>
      <p class="text-sm w-screen text-justify px-[8vw] text-last-center mb-8">
        No recolectamos ninguna información de tu correo electrónico,
        simplemente usamos gmail para facilitar el manejo de ingreso de nuestros
        clientes
      </p>
    </div>
    <img
      src="../static/dog.jpg"
      alt="login con google"
      class="w-[50vw] mx-[25vw] mb-8"
    />
    <!-- PHONE ONLY -->
    <div class="md:hidden">
      <button @click="googleSignIn">
        <img
          src="../static/btn_google_signin_dark_normal_web@2x.png"
          alt="login con google"
          class="md:w-[20vw] md:mx-[40vw] w-[80vw] mx-[10vw] mb-2"
        />
      </button>
      <p class="text-sm w-screen text-justify px-[8vw] text-last-center mb-8">
        No recolectamos ninguna información de tu correo electrónico,
        simplemente usamos gmail para facilitar el manejo de ingreso de nuestros
        clientes
      </p>
    </div>
  </div>
</template>

<script>
import userTemp from '../static/user.js'
export default {
  beforeMount() {
    const token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : false
    if (token !== false) {
      this.$store.commit('setToken', token)
    }
  },
  methods: {
    googleSignIn() {
      const db = this.$fireModule.firestore().collection('users')
      this.provider = new this.$fireModule.auth.GoogleAuthProvider()
      this.$fireModule
        .auth()
        .signInWithPopup(this.provider)
        .then((result) => {
          localStorage.setItem('token', result.user.uid)
          this.$store.commit('logIn', result.user.uid)
          const doc = db.doc(result.user.uid)
          doc.get().then((res) => {
            if (res.exists) {
              this.$store.commit('setUser', res.data())
            } else {
              this.$store.commit('setUser', {
                ...userTemp,
                id: result.user.uid,
                nombre: result.user.displayName,
                email: result.user.email,
                fotoURL: result.user.photoURL,
              })
              db.doc(result.user.uid).set({
                ...userTemp,
                id: result.user.uid,
                nombre: result.user.displayName,
                email: result.user.email,
                fotoURL: result.user.photoURL,
              })
            }
          })
        })
    },
  },
}
</script>

<style scoped></style>
