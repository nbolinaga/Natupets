<template>
	<Login v-if="token == false" />
	<Loading v-else-if="user.id == null" color="#facc15" />
	<div v-else>
		<div
			v-if="opened"
			class="bg-black fixed top-0 left-0 w-screen h-screen md:hidden opacity-75"></div>
		<MobileHeader v-if="token != false" class="fixed bottom-0 left-0 md:hidden" />
		<Header v-if="token != false" class="hidden md:flex" />

		<Nuxt v-if="token != false && user.verificado" class="mb-[10vh] md:mb-0" />
		<Verificacion v-if="token != false && !user.verificado" />
	</div>
</template>

<script>
export default {
	computed: {
		token() {
			return this.$store.state.token
		},
		opened() {
			return this.$store.state.opened
		},
		user() {
			return { ...this.$store.state.user }
		},
	},
	mounted() {
		const db = this.$fireModule.firestore()
		const stock = db.collection('adminData').doc('stock')
		stock.onSnapshot((doc) => {
			this.$store.commit('setStock', doc.data().disponibles)
			this.$store.commit('setSold', doc.data().vendidas)
			this.$store.commit('setPrice', doc.data().price)
		})
		if (this.token !== false) {
			const user = db.collection('users').doc(this.token)
			user.onSnapshot((res) => {
				if (res.exists) {
					this.$store.commit('setUser', res.data())
				}
			})
		}
	},
}
</script>

<style>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
.text-last-center {
	text-align-last: center;
}
.masonry {
	column-gap: 1.5em;
	column-count: 1;
	row-gap: 1.5em;
}
.masonry-sm {
	column-gap: 1.5em;
	column-count: 2;
	row-gap: 1.5em;
}
.masonry-md {
	column-gap: 1.5em;
	column-count: 3;
}
.break-inside {
	break-inside: avoid;
}
</style>
