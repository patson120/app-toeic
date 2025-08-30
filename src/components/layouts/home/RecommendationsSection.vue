<template>
  <div class="flex flex-col gap-3">
    <Recommandation
      title="Renforcez votre Business Vocabulary"
      content="Votre dernier mock interview montre des lacunes en termes financiers"
      priority="Priorité"
      btnText="Commencer le module "
    />
    <Recommandation
      title="Pratiquez les questions comportementales"
      content="Travaillez la structure de vos réponses STAR"
      btnText="Mock interview ciblé "
    />
    <Recommandation
      title="Test TOEIC Listening Part 3"
      content="Améliorez votre score sur les conversations longues"
      btnText="Entraînement ciblé "
    />
  </div>
</template>

<script setup lang="ts">
import Recommandation from './Recommandation.vue';
</script>