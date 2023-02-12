<template>
  <div class="main">
    {{ cs.data.name }}
  </div>
</template>
<script setup>
  const { client } = usePrismic();
  const route = useRoute();
  const doc_uid = route.params.id;
  const { data: cs } = await useAsyncData('case_study',
    () => client.getByUID('case_study', doc_uid)
  );
</script>