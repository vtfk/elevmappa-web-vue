<template>
  <v-container>
    <v-layout wrap>
      <v-container fluid grid-list-lg>
        <v-layout wrap>
          <v-flex xs12>
            <v-card>
              <v-card-title primary-title>
                <v-btn to="/" class="ma-5" color="primary" dark fab small>
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <div class="headline text-uppercase">Spørsmål og svar</div>
              </v-card-title>
              <v-card-text>
                <p>Nedenfor finner du ofte stilte spørsmål, svar og hurtigtaster.</p>
                <p>Feil, mangler og ønsker kan du sende til <a href="mailto:post.opplaring@vtfk.no" title="Send e-post til post.opplaring@vtfk.no" target="_blank">post.opplaring@vtfk.no</a></p>
                <div class="title text-uppercase">Om Elevmappa</div>
                <br />
                <p>Elevmappa gir deg mulighet til å søke opp elevene du er kontakt- og faglærer for.<br/>I elevmappene vil du finne dokumenter som tilhører eleven.</p>
                <p>På forsiden velger du en elev ved å trykke på navnet i listen.<br/>Når du har trykket på navnet til eleven får du se dokumentene du har leserettigheter til som lærer.</p>
                <div class="title text-uppercase">Spørsmål</div>
                <br />
                <p><b>Jeg finner ikke eleven jeg leter etter.</b></p>
                <p>Finner du ikke eleven du leter etter, ta kontakt med den som er ansvarlig for Extens eller administrativt personale på din skole.</p>
                <p><b>Jeg mangler leserettigheter til et dokument jeg mener jeg bør lese.</b></p>
                <p>Ta kontakt med din nærmeste leder som vil undersøke om du har rett til innsyn i dokumentet.</p>
                <p><b>Jeg får melding om "Finner ikke elevmappe. Kontakt arkivet"</b></p>
                <p>Ta kontakt med arkivet på e-post: <a href="mailto:7013@vtfk.no" target="_blank">7013@vtfk.no</a> eller tlf. 35 91 70 13</p>
                <div class="title text-uppercase">Hurtigtaster</div>
                <br />
                <p><strong>Dokumentvisning</strong></p>
                <p><code>+</code>Zoom inn</p>
                <p><code>-</code>Zoom ut</p>
                <p><code>0</code>Tilbakestill zoom</p>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>
<style scoped>
code {
  margin-right: 15px;
}
p {
  font-size: 18px !important;
  color: #3e3e3e;
}
.title {
  color: black;
}
</style>
