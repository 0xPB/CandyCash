<template>
  <div class="homepage">
    <h1>Bienvenue sur CandyCash</h1>
    <p>Suivez vos investissements avec un soupçon de douceur !</p>
    <div class="buttons">
      <RouterLink to="/login" class="btn login">Se connecter</RouterLink>
      <RouterLink to="/register" class="btn signup">S'inscrire</RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.homepage {
  margin-top: 100px;
}

p {
  font-size: 1.5rem;
  color: white;
  margin-bottom: 40px;
}

.buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}
</style>
