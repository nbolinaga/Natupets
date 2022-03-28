<template>
  <nav
    class="flex justify-center py-5 bg-yellow-400 text-white w-screen text-center z-50"
  >
    <button
      v-if="!opened"
      class="font-main text-white text-2xl my-auto"
      @click="open"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
    <ul v-if="opened" class="flex flex-col">
      <li class="flex flex-col">
        <button
          class="font-main text-white text-2xl mb-10 my-auto"
          @click="close"
        >
          x
        </button>
        <h1 class="font-main text-[#501111] text-2xl my-auto">NATUPETS</h1>
        <br />
      </li>
      <li class="px-4 py-2">
        <nuxt-link to="/" class="hover:text-[#501111]">INICIO</nuxt-link>
      </li>
      <li class="px-4 py-2">
        <nuxt-link to="/pedidos" class="hover:text-[#501111]"
          >PEDIDOS</nuxt-link
        >
      </li>
      <li class="px-4 py-2">
        <nuxt-link to="/perfil" class="hover:text-[#501111]">PERFIL</nuxt-link>
      </li>
      <li v-if="user.admin" class="px-4 py-2">
        <nuxt-link to="/admin" class="hover:text-[#501111]">ADMIN</nuxt-link>
      </li>
      <li
        class="mt-4 hover:text-[#501111] border-2 rounded-3xl border-white px-4 py-2 hover:border-[#501111] cursor-pointer"
        @click="logOut"
      >
        <p class="flex inline">
          DESCONECTAR<svg
            class="ml-4 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </p>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      opened: false,
    }
  },
  computed: {
    user() {
      return { ...this.$store.state.user }
    },
  },
  methods: {
    logOut() {
      this.$fireModule
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem('token')
          this.$store.commit('logOut')
          this.close()
        })
        .catch((e) => {
          this.$snotify.error(e.message)
        })
    },
    close() {
      this.opened = false
      this.$store.commit('setOpened', false)
      document.documentElement.style.overflow = 'auto'
    },
    open() {
      this.opened = true
      this.$store.commit('setOpened', true)
      document.documentElement.style.overflow = 'hidden'
    },
  },
}
</script>

<style scoped></style>
