<template>
  <div class="notfound">
    <h1>404</h1>
    <p>Page not found</p>
    <router-link
      to="/"
      class="home-btn"
    >
      Go to Home
    </router-link>
  </div>
</template>

<style scoped>
.notfound {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 12px;
    padding: 16px;
}
h1 {
    font-size: 4rem;
    margin: 0;
}
.home-btn {
    display: inline-block;
    padding: 8px 16px;
    background: #3b82f6;
    color: #fff;
    border-radius: 6px;
    text-decoration: none;
}
.home-btn:hover {
    opacity: 0.9;
}
</style>
