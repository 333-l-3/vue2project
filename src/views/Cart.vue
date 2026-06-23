<template>
  <div class="cart-page">
    <NavBar />

    <div class="page-content">
      <div class="container">
        <h2 class="page-title">🛒 我的购物车</h2>

        <!-- 有商品 -->
        <div v-if="cartList.length > 0">
          <div class="cart-list">
            <div v-for="item in cartList" :key="item.id" class="cart-item">
              <div class="cart-item-cover" @click="$router.push('/game/' + item.id)">
                <img :src="item.cover" :alt="item.name" />
              </div>
              <div class="cart-item-info">
                <h4 class="cart-item-name" @click="$router.push('/game/' + item.id)">{{ item.name }}</h4>
                <div class="cart-item-meta">
                  <el-tag size="mini" type="info">{{ item.category }}</el-tag>
                </div>
              </div>
              <div class="cart-item-price">
                <span v-if="item.price === 0" class="price-free">免费</span>
                <span v-else class="price-current">¥{{ item.price }}</span>
              </div>
              <div class="cart-item-action">
                <el-button type="danger" size="small" icon="el-icon-delete" @click="removeFromCart(item.id)">移除</el-button>
              </div>
            </div>
          </div>

          <!-- 合计 -->
          <div class="cart-summary">
            <div class="summary-info">
              <span>共 <strong>{{ cartCount }}</strong> 款游戏</span>
              <span class="summary-total">合计：<strong>¥{{ cartTotal }}</strong></span>
            </div>
            <div class="summary-actions">
              <el-button @click="clearCart">清空购物车</el-button>
              <el-button type="primary" size="large" @click="checkout">立即结算</el-button>
            </div>
          </div>
        </div>

        <!-- 空购物车 -->
        <el-empty v-else description="购物车还是空的，快去逛逛吧！">
          <el-button type="primary" @click="$router.push('/')">去逛逛</el-button>
        </el-empty>
      </div>
    </div>

    <FooterBar />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CartView',
  components: { NavBar, FooterBar },
  computed: {
    ...mapGetters('cart', ['cartList', 'cartCount', 'cartTotal'])
  },
  methods: {
    ...mapActions('cart', ['removeFromCart', 'clearCart']),
    checkout() {
      this.$message.success('结算成功！感谢购买（实训模拟）')
      this.clearCart()
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-page {
  min-height: 100vh;
  padding-top: $navbar-height;
}

.page-content {
  padding: $spacing-lg 0 $spacing-xxl;
  min-height: calc(100vh - $navbar-height - 200px);
}

.page-title {
  font-size: $font-size-xxl;
  color: $text-white;
  margin-bottom: $spacing-lg;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  background: $bg-card;
  padding: $spacing-md;
  border-radius: $radius-md;
  transition: background 0.2s;
}

.cart-item-cover {
  width: 120px;
  height: 68px;
  border-radius: $radius-sm;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;

  img { width: 100%; height: 100%; object-fit: cover; }
}

.cart-item-info {
  flex: 1;

  .cart-item-name {
    color: $text-white;
    font-size: $font-size-lg;
    margin-bottom: $spacing-xs;
    cursor: pointer;
    &:hover { color: $color-accent; }
  }
}

.cart-item-price {
  .price-free { color: $color-price; font-weight: bold; font-size: $font-size-lg; }
  .price-current { color: $color-price; font-weight: bold; font-size: $font-size-lg; }
}

.cart-summary {
  margin-top: $spacing-xl;
  padding: $spacing-lg;
  background: $bg-card;
  border-radius: $radius-md;
  @include flex-between;

  .summary-info {
    color: $text-secondary;
    strong { color: $text-white; }
    .summary-total {
      margin-left: $spacing-xl;
      strong { color: $color-price; font-size: $font-size-xl; }
    }
  }

  .summary-actions {
    display: flex; gap: $spacing-sm;
  }
}
</style>
