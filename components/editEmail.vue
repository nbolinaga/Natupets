<template>
	<div class="my-6">
		<input
			v-if="edit"
			v-model="user.email"
			type="text"
			class="px-4 py-2 text-center border-2 rounded-2xl border-yellow-400"/>
		<h3 v-if="!edit" class="px-4 py-2 text-center text-xl">
			{{ user.email }}
		</h3>
		<button  v-if="!edit" @click="edit = true"
			class="text-sm bg-[#501111] rounded-3xl px-4 py-2 text-white hover:text-yellow-400 mt-2">
			EDITAR EMAIL
		</button>
		<button v-if="edit" @click="editarInfoEmail"
			class="text-sm bg-[#501111] rounded-3xl px-4 py-2 text-white hover:text-yellow-400 mt-2">
			GUARDAR
		</button>
	</div>
</template>

<script>
export default {
	props: {
		userProp: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			edit: false,
		}
	},
	computed: {
		user() {
			return { ...this.userProp }
		},
	},
	methods: {
		editarInfoEmail() {
			const db = this.$fireModule.firestore()
			db.collection('users').doc(this.user.id).update({
				email: this.user.email,
			})
			this.edit = false
			this.$store.commit('setUser', this.user)
		},
	},
}
</script>

<style></style>
