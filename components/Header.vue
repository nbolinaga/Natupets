<template>
	<nav class="flex justify-between py-5 bg-yellow-400 text-white w-screen">
		<h1 class="font-main text-[#501111] text-2xl ml-12 my-auto">NATUPETS</h1>
		<ul class="flex justify-right mr-12">
			<li class="ml-12 px-4 py-2">
				<nuxt-link to="/" class="hover:text-[#501111]">INICIO</nuxt-link>
			</li>
			<li class="ml-12 px-4 py-2">
				<nuxt-link to="/pedidos" class="hover:text-[#501111]">PEDIDOS</nuxt-link>
			</li>
			<li class="ml-12 px-4 py-2">
				<nuxt-link to="/perfil" class="hover:text-[#501111]">PERFIL</nuxt-link>
			</li>
			<li v-if="user.admin" class="ml-12 px-4 py-2">
				<nuxt-link to="/admin" class="hover:text-[#501111]">ADMIN</nuxt-link>
			</li>
			<li
				class="ml-12 hover:text-[#501111] border-2 rounded-3xl border-white px-4 py-2 hover:border-[#501111] cursor-pointer"
				@click="logOut">
				<p class="flex inline">
					DESCONECTAR
					<svg
						class="ml-4 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
					</svg>
				</p>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
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
				})
				.catch((e) => {
					this.$snotify.error(e.message)
				})
		},
	},
}
</script>

<style scoped></style>
