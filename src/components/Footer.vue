<template>
  <v-footer color="primary" dark>
    <v-col
      class="text-center"
      cols="12"
    >
    &copy; {{ new Date().getFullYear() }} — {{ productOwner }}
    </v-col>
  </v-footer>
</template>

<script>
import config from '../../config'

export default {
  name: 'Footer',
  data: () => ({
    productOwner: config.productOwner
  })
}
</script>
