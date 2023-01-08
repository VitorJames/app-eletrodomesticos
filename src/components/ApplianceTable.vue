<template>
  <v-data-table
    :headers="headers"
    :items="appliances"
    :items-per-page="per_page"
    class="elevation-1"
    hide-default-footer
    :loading="loading"
    no-data-text="Sem registros no momento"
    :header-props="headerProps"
  >
    <template v-slot:item.created_at="{ item }">
      {{ item.created_at | formatDate() }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn
        :to="`/edit/${item.id}`"
        icon
        class="mr-1"
        color="primary"
        title="Editar"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn :to="`/delete/${item.id}`" icon color="red" title="Deletar">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>
  
<script>
import { format, parseISO } from "date-fns";
export default {
  props: {
    appliances: {
      default: [],
    },
    per_page: {
      type: Number,
      default: 10,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    headerProps: {
      sortByText: "Filtrar por",
    },
    headers: [
      {
        text: "Nome",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Descrição", value: "description", sortable: false },
      { text: "Tensão", value: "tension", sortable: true },
      { text: "Marca", value: "brand", sortable: true },
      { text: "Cadastrado em", value: "created_at", sortable: true },
      { text: "", value: "actions", align: "end", sortable: false },
    ],
  }),
  filters: {
    formatDate(val) {
      return format(parseISO(val), "dd/MM/yyy");
    },
  },
};
</script>
  