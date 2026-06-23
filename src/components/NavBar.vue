<template>
  <div class="navbar">
    <div class="navbar-inner">
      <!-- Logo -->
      <div class="navbar-logo" @click="$router.push('/')">
        <span class="logo-icon">🎮</span>
        <span class="logo-text">GameStore</span>
      </div>

      <!-- 导航菜单 -->
      <div class="navbar-menu">
        <router-link to="/" class="menu-item" exact>商店</router-link>
        <router-link to="/games" class="menu-item">浏览</router-link>
      </div>

      <!-- 搜索框 -->
      <div class="navbar-search">
        <el-input
          v-model="keyword"
          placeholder="搜索游戏..."
          prefix-icon="el-icon-search"
          size="small"
          clearable
          @keyup.enter.native="handleSearch"
          @clear="handleClear"
        ></el-input>
      </div>

      <!-- 购物车 -->
      <div class="navbar-cart" @click="$router.push('/cart')">
        <el-badge :value="cartCount" :hidden="cartCount === 0" class="cart-badge">
          <i class="el-icon-shopping-cart-2 cart-icon"></i>
        </el-badge>
        <span class="cart-text">购物车</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  data() {
    return {
      keyword: ''
    }
  },
  computed: {
    ...mapGetters('cart', ['cartCount'])
  },
  methods: {
    handleSearch() {
      if (this.keyword.trim()) {
        this.$router.push({ path: '/games', query: { keyword: this.keyword.trim() } })
      }
    },
    handleClear() {
      if (this.$route.path === '/games') {
        this.$router.push('/games')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $navbar-height;
  background: $bg-secondary;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.navbar-inner {
  @include container;
  height: 100%;
  @include flex-between;
}

// Logo
.navbar-logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  .logo-icon {
    font-size: 24px;
    margin-right: $spacing-sm;
  }

  .logo-text {
    font-size: $font-size-xl;
    font-weight: bold;
    color: $color-accent;
    letter-spacing: 1px;
  }
}

// 菜单
.navbar-menu {
  display: flex;
  gap: $spacing-sm;

  .menu-item {
    color: $text-secondary;
    padding: $spacing-xs $spacing-md;
    border-radius: $radius-sm;
    transition: all 0.2s;
    font-size: $font-size-base;

    &:hover {
      color: $text-white;
      background: rgba($color-accent, 0.1);
    }

    &.router-link-exact-active {
      color: $color-accent;
    }
  }
}

// 搜索框
.navbar-search {
  width: 280px;

  ::v-deep .el-input__inner {
    background: #316282;
    border: 1px solid #316282;
    color: $text-primary;
    border-radius: $radius-sm;

    &::placeholder {
      color: $text-dim;
    }

    &:focus {
      border-color: $color-accent;
      background: #3d7596;
    }
  }

  ::v-deep .el-input__prefix {
    color: $text-dim;
  }
}

// 购物车
.navbar-cart {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: $spacing-xs $spacing-sm;
  border-radius: $radius-sm;
  transition: all 0.2s;

  &:hover {
    background: rgba($color-accent, 0.1);

    .cart-icon {
      color: $color-accent;
    }
  }

  .cart-icon {
    font-size: 22px;
    color: $text-secondary;
    transition: color 0.2s;
  }

  .cart-text {
    margin-left: $spacing-xs;
    color: $text-secondary;
    font-size: $font-size-sm;
  }

  ::v-deep .el-badge__content {
    background: $color-accent;
    border: none;
  }
}
</style>
