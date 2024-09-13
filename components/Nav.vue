<template>
  <nav>
    <BackgroundGradient class="nav-bar">
      <span class="styled-text">syl</span>
      <div class="nav-bar__right">
        <div v-if="isMobileViewPort" class="nav-bar__mobile-menu" @click="toggleMobileMenu()">
          <span class="styled-text">
            {{
              showMobileMenu ? 'close' : 'menu'
            }}
          </span>
        </div>
        <div class="nav-toggle" @click="toggleTheme()">
          {{
            currentTheme === 'light' ? "&#x1F31E;" : "&#x1F31A;"
          }}
        </div>
      </div>
    </BackgroundGradient>
    <div v-if="showMobileMenu || !isMobileViewPort" class="nav-main">
      <div class="nav-routes">
        <div class="nav-route-item">
          <nuxt-link data-text="home" to="/">
            <div class="icon-folder"/>
            home
          </nuxt-link>
        </div>
        <div class="nav-route-item">
          <nuxt-link data-text="about" to="/about">
            <div class="icon-folder"/>
            about
          </nuxt-link>
        </div>
        <div class="nav-route-item">
          <nuxt-link data-text="games" to="/games">
            <div class="icon-folder"/>
            games
          </nuxt-link>
        </div>
      </div>
      <div class="nav-links">
        <a 
          class="link-hover styled-text"
          v-for="item in links"
          :key="item.link_name"
          :href="item.link"
          target="_blank"
        >
          {{ item.link_name }} &#8599;
        </a>
        <div class="nav-copy">
          <span class="styled-text">&copy; Su Li {{ currentYear }} </span>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    data() {
      return {
        showMobileMenu: false,
        isMobileViewPort: false,
        currentTheme: 'light',
        currentRoute: '',
        links: Array,
        currentYear: null,
      }
    },
    created() {
      this.links = this.$store.state.about.links;
    },
    watch: {
      '$route'(to, from) {
        this.updateRouteName();
        this.showMobileMenu = false;
      },
    },
    beforeMount() {
      this.setMobileViewPort();
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', this.setMobileViewPort);
      });
      this.updateRouteName();
      this.currentYear = new Date().getFullYear();
    },
    beforeUnmount() { 
      window.removeEventListener('resize', this.setMobileViewPort); 
    },
    methods: {
      updateRouteName: function () {
        this.currentRoute = this.$route.name
      },
      changeTheme: function (theme){
        this.currentTheme = theme;
        document.documentElement.setAttribute("data-theme", theme);
        
        try {
          localStorage.setItem('theme', theme);
        } catch {
          // do not store
        }
      },
      toggleTheme: function (){
        if (this.currentTheme === 'light'){
          this.changeTheme('dark');
        }else{
          this.changeTheme('light');
        }
      },
      setMobileViewPort: function (){
        if (window.innerWidth <= 700) {
          this.isMobileViewPort = true;
        } else {
          this.isMobileViewPort = false;
        }
      },
      toggleMobileMenu() {
        this.showMobileMenu = !this.showMobileMenu;
      }
    }
  }
</script>
<style lang="scss" scoped>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: $width-nav;
    height: 100vh;
    z-index: 10;
    border-right: $border;
    background-color: var(--background-color);
    .styled-text{
      font-size: $fs-xxs;
    }
    @include tablet {
      width: $width-nav__tablet;
    }
    @include mobile {
      width: 100vw;
      height: auto;
    }
  }
  .nav-bar{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: $spacing-xs;
    width: 100%;
    height: 10%;
    border-bottom: $border;
    span {
      font-size: $fs-xs;
      color: var(--text-strong-color);
    }
    .nav-toggle {
      font-size: $fs-m;
      cursor: var(--cursor-pointer);
    }
    &__right{
      display: flex;
      flex-direction: row;
    }
    &__mobile-menu{
      margin-right: $spacing-xs;
    }
  }
  .nav-main{
    padding: $spacing-s $spacing-xs;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  .nav-routes{
    .icon-folder{
      cursor: var(--cursor-pointer);
    }
    a {
      font-family: $secFont;
      display: inline-flex;
      flex-direction: column;
    }
    .nav-route-item{
      margin-bottom: $spacing-s;
      transition: transform 0.12s;
      &:hover{
        transform: translateY(-4px);
      }
    }
  }
  .nav-links{
    a {
      margin-top: $spacing-xs;
    }
    .nav-copy{
      margin-top: $spacing-m;
    }
  }
  @include mobile {
    .nav-bar {
      height: 52px;
    }
    .nav-main {
      border-bottom: $border;
    }
    .nav-routes {
      display: flex;
      flex-direction: row;
    }
    a { 
      margin-right: $spacing-xs;
    }
  }

</style>