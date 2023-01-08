<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="12" lg="6" md="6" sm="8">
            <FormAppliance :mode="mode"></FormAppliance>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormAppliance from '@/components/FormAppliance';
export default {
  components:{
    FormAppliance
  },
  data: () => ({
    mode: "edit"
  }),
  methods: {
    //
  },
};
</script>
