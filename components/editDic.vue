<template>
  <div class="mb-6">
        <textarea
            v-if="edit"
            v-model="user.direccion"
            type="text"
            class="px-4 py-2 text-center border-2 rounded-2xl border-yellow-400"/>
        <h3 v-if="!edit" class="px-4 py-2 text-center text-xl">
            {{ user.direccion }}
        </h3>
        <button
            class="text-sm bg-[#501111] rounded-3xl px-4 py-2 text-white hover:text-yellow-400">
            <span v-if="!edit" @click="edit = true">EDITAR DIRECCIÓN</span><span v-if="edit" @click="editarInfoDireccion">GUARDAR</span>
        </button>
        <p class="mt-4">Su dirección sera usada solo para las entregas de la comida</p>
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
		editarInfoDireccion() {
            const db = this.$fireModule.firestore();
            db.collection("users").doc(this.user.id).update({
                direccion: this.user.direccion,
            });
            this.edit = false;
            this.$store.commit("setUser", this.user);
        },
	},
}
</script>

<style>

</style>