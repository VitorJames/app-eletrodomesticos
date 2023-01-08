<template>
  <v-container>
    <v-card class="mt-10">
      <v-card-title> {{ pageTitle }} </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Nome"
            outlined
            dense
            required
          ></v-text-field>

          <v-textarea
            v-model="description"
            label="Descrição"
            rows="3"
            outlined
            dense
            required
          ></v-textarea>

          <v-select
            v-model="tension"
            :items="tensions"
            :rules="tensionRules"
            label="Tensão"
            outlined
            dense
            required
          ></v-select>

          <v-select
            v-model="brand"
            :items="brands"
            :rules="brandRules"
            label="Marca"
            outlined
            dense
            required
          ></v-select>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            {{ this.mode == "create" ? "Cadastrar" : "Editar" }}
          </v-btn>

          <v-btn text color="error" class="mr-4" @click="reset" v-if="mode == 'create'"> Limpar </v-btn>
          <v-btn text color="error" to="/" v-else> Cancelar </v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="65"></v-progress-circular>
    </v-overlay>

    <Alert :message="message"></Alert>
  </v-container>
</template>
  
  <script>
import Alert from "@/components/Notify";
import {
  createAppliance,
  showAppliance,
  editAppliance,
} from "@/services/services.js";
export default {
  props: {
    mode: String,
  },
  components: {
    Alert,
  },
  data: () => ({
    loading: false,
    valid: true,
    message: {},
    pageTitle: "",
    name: "",
    description: "",
    tension: null,
    brand: null,
    nameRules: [(v) => !!v || "O campo Nome é obrigatório"],
    tensionRules: [(v) => !!v || "O campo Tensão é obrigatório"],
    brandRules: [(v) => !!v || "O campo Marca é obrigatório"],
    tensions: ["110v", "220v"],
    brands: ["Electrolux", "Brastemp", "Fischer", "Samsung", "LG"],
    checkbox: false,
  }),
  created() {
    if (this.mode == "create") {
      this.pageTitle = "Novo eletrodoméstico";
    } else {
      this.pageTitle = "Editar eletrodoméstico";
      this.show();
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        if (this.mode == "create") {
            this.create();
        } else {
            this.edit();
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    create() {
      this.loading = true;

      createAppliance(this.name, this.description, this.tension, this.brand)
        .then((response) => {
          this.loading = false;
          this.reset();
          this.message = {
            text: response.message,
            color: "success",
          };
        })
        .catch((error) => {
          this.loading = false;
          this.message = {
            text: error.message,
            color: "error",
          };
        });
    },
    show() {
      this.loading = true;

      showAppliance(this.$route.params.id)
        .then((response) => {
          this.name = response.name;
          this.description = response.description;
          this.tension = response.tension;
          this.brand = response.brand;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    edit() {
      this.loading = true;

      editAppliance(
        this.$route.params.id,
        this.name,
        this.description,
        this.tension,
        this.brand
      )
        .then((response) => {
          this.loading = false;
          this.message = {
            text: response.message,
            color: "success",
          };
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
  