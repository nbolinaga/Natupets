<template>
	<div class="p-10">
		<div class="text-center">
			<h1 class="md:text-6xl text-3xl font-bold text-[#501111] mb-6 font-main">
				{{ user.nombre }}
			</h1>
			<h3 v-if="user.admin" class="text-2xl mb-12 -mt-4">Administrador</h3>
		</div>
		<div class="grid gap-4 grid-cols-1 md:grid-cols-2 items-start text-center">
			<div
				class="border-2 border-yellow-400 rounded-2xl bg-gray-100 pb-10 overflow-hidden">
				<h2 class="text-xl bg-yellow-400 mb-4 font-main text-[#501111] py-4">
					INFORMACIÓN PERSONAL
				</h2>
                <!-- <EditPhone :user-prop="user" /> -->
                <h3 class="px-4 py-2 text-center text-xl mt-4">
                    {{ user.telefono }}
                </h3>
				<EditEmail :user-prop="user" />
				<EditDic :user-prop="user" />
			</div>
			<UserOrders titulo="PEDIDOS" :pedidos="porEntregar" />
			<UserOrders titulo="PEDIDOS PASADOS" :pedidos="entregados" />
		</div>
	</div>
</template>

<script>
export default {
    data() {
        return {
            pedidos: [],
        };
    },
    computed: {
        user() {
            return { ...this.$store.state.user };
        },
        porEntregar() {
            return this.pedidos.filter((pedido) => pedido.entregado === false && pedido.cancelado === false);
        },
        cancelados() {
            return this.pedidos.filter((pedido) => pedido.cancelado === true);
        },
        entregados() {
            return this.pedidos.filter((pedido) => pedido.entregado === true);
        },
    },
    beforeMount() {
        const db = this.$fireModule.firestore();
        const query = db.collection("pedidos").orderBy("fecha", "asc");
        query.onSnapshot((snapshot) => {
            this.pedidos = [];
            snapshot.forEach((res) => {
                const pedido = {
                    ...res.data(),
                    id: res.id,
                    cliente: res
                        .data()
                        .cliente.get()
                        .then((res) => {
                        pedido.cliente = res.data();
                    }),
                    fecha: this.getFormattedDate(res.data().fecha),
                    fechaPago: this.getFormattedDate(res.data().fechaPago),
                    fechaEntrega: this.getFormattedDate(res.data().fechaEntrega),
                    fechaCancelado: this.getFormattedDate(res.data().fechaCancelado),
                };
                if (res.data().cliente.id === this.user.id) {
                    this.pedidos.push(pedido);
                }
            });
        });
    },
    methods: {
        getFormattedDate(date) {
            try {
                date = date.toDate();
                const year = date.getFullYear();
                let month = (1 + date.getMonth()).toString();
                month = month.length > 1 ? month : "0" + month;
                let day = date.getDate().toString();
                day = day.length > 1 ? day : "0" + day;
                return (day +
                    "/" +
                    month +
                    "/" +
                    year +
                    " - " +
                    date.getHours() +
                    ":" +
                    date.getMinutes());
            }
            catch (e) {
                return "";
            }
        },
    },
}
</script>

<style></style>
