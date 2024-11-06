<template>
  <nav class="navbar">
    <router-link to="/profile" class="nav-button">Invest</router-link>
    <router-link to="/statistics" class="nav-button">Dashboard</router-link>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-around;
  background-color: #f4f4f4;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-button {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.nav-button:hover {
  color: #ff69b4; /* Change the color on hover */
}
</style>

