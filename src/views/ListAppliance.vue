<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="8">
        <v-card elevation="3" outlined>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" lg="4" md="4" sm="4">
                <v-text-field
                  v-model="name"
                  label="Nome"
                  outlined
                  hide-details
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="6" lg="3" md="3" sm="3">
                <v-select
                  :items="tensions"
                  v-model="tension"
                  label="Tensão"
                  outlined
                  hide-details
                  dense
                ></v-select>
              </v-col>
              <v-col cols="6" lg="3" md="3" sm="3">
                <v-select
                  :items="brands"
                  v-model="brand"
                  label="Marca"
                  outlined
                  hide-details
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" lg="2" md="2" sm="2" class="d-flex align-center">
                <v-btn block color="primary" @click="appliancesList()"> Buscar </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-card>
      </v-col>

      <v-col cols="12" lg="8">
        <ApplianceTable :appliances="appliances" :per_page="per_page" :loading="loading">
        </ApplianceTable>
      </v-col>

      <v-col cols="12" lg="8">
        <v-row>
          <v-col cols="4" lg="2" md="2" sm="2">
            <v-select
              :items="[5,10,15,20,25,50]"
              v-model="per_page"
              label="Por página"
              outlined
              hide-details
              @change="appliancesList()"
              dense
            ></v-select>
          </v-col>
          <v-col cols="8" lg="10" md="10" sm="10" class="d-flex justify-end">
            <v-pagination
              v-model="page"
              :length="last_page"
              :total-visible="5"
              @input="appliancesList()"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApplianceTable from "@/components/ApplianceTable.vue";
import { getAppliances } from "@/services/services.js";
export default {
  components: {
    ApplianceTable,
  },
  data: () => ({
    name: "",
    tensions: ["Todas", "110v", "220v"],
    tension: "Todas",
    brands: ["Todas", "Electrolux", "Brastemp", "Fischer", "Samsung", "LG"],
    brand: "Todas",
    appliances: [],
    page: 1,
    last_page: 1,
    per_page: 10,
    loading: true
  }),
  created() {
    this.appliancesList();
  },
  methods: {
    appliancesList() {
      this.loading = true;

      getAppliances(
        this.page,
        this.per_page,
        this.name,
        this.tension,
        this.brand
      )
        .then((response) => {
          this.appliances = response.data;
          this.page = response.current_page;
          this.last_page = response.last_page;
          this.loading = false;
        })
        .catch((error) => {
          console.log("error", error);
          this.loading = false;
        });
    },
  },
};
</script>
