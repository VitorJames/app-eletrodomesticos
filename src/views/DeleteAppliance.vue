<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="12" lg="6" md="6" sm="6">
            <v-card class="mt-10" elevation="3" outlined v-if="!loading">
              <v-card-title class="red--text">
                Deletar eletrodoméstico
              </v-card-title>
              <v-card-text>
                <p>Deseja realmente deletar o seguinte item?</p>
                <v-list outlined>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title><b>Nome:</b></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action-text>
                      <v-list-item-title>{{ appliance.name }}</v-list-item-title>
                    </v-list-item-action-text>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title><b>Descrição:</b></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action-text>
                      <v-list-item-title>{{ appliance.description }}</v-list-item-title>
                    </v-list-item-action-text>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title><b>Tensão:</b></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action-text>
                      <v-list-item-title>{{ appliance.tension }}</v-list-item-title>
                    </v-list-item-action-text>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title><b>Marca:</b></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action-text>
                      <v-list-item-title>{{ appliance.brand }}</v-list-item-title>
                    </v-list-item-action-text>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title><b>Criado em:</b></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action-text>
                      <v-list-item-title>{{ appliance.created_at | formatDate() }}</v-list-item-title>
                    </v-list-item-action-text>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn to="/" text color="green">
                  Cancelar
                </v-btn>
                <v-btn text color="red" @click="del()">
                  Deletar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="65"></v-progress-circular>
    </v-overlay>

    <Alert :message="message"></Alert>
  </v-container>
</template>

<script>
import { format, parseISO } from "date-fns";
import { showAppliance, deleteAppliance } from "@/services/services.js";
import Alert from "@/components/Notify";
export default {
  components: {
    Alert,
  },
  data: () => ({
    loading: true,
    message: {},
    appliance: {
      name: "",
      description: "",
      tension: null,
      brand: null,
      created_at: ""
    }
  }),
  created(){
    this.show();
  },
  filters: {
    formatDate(val) {
      return format(parseISO(val), "dd/MM/yyy");
    },
  },
  methods: {
    show() {
      this.loading = true;

      showAppliance(this.$route.params.id)
        .then((response) => {
          this.appliance = response;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    del() {
      this.loading = true;

      deleteAppliance(this.$route.params.id)
        .then((response) => {
          this.loading = false;
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          this.loading = false;
          this.message = {
            text: error.message,
            color: "error",
          };
        });
    },
  },
};
</script>
