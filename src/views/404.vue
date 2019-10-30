<template>
  <v-container>
    <v-layout wrap>
      <v-container fluid grid-list-lg>
        <v-layout wrap>
          <v-flex xs12>
            <v-card>
              <v-card-title primary-title>
                <h3 class="headline">Ikke funnet</h3>
              </v-card-title>
              <v-card-text>
                <p>
                  Siden ble ikke funnet.
                </p>
                <p>
                  Vennligst kontroller adressen eller gå til <a href="/">hjem</a> siden.
                </p>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<style scoped>
p {
  font-size: 18px !important;
  color: #3e3e3e;
}
</style>
