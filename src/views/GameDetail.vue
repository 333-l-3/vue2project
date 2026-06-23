<template>
  <div class="game-detail-page">
    <NavBar />

    <div class="page-content" v-if="game">
      <div class="container">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/games' }">游戏列表</el-breadcrumb-item>
          <el-breadcrumb-item>{{ game.name }}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 游戏详情 -->
        <div class="detail-main">
          <div class="detail-cover">
            <img :src="game.cover" :alt="game.name" />
          </div>
          <div class="detail-info">
            <h1 class="detail-title">{{ game.name }}</h1>
            <div class="detail-meta">
              <el-tag type="info">{{ game.category }}</el-tag>
              <el-rate v-model="game.rating" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
              <span class="meta-divider">|</span>
              <el-tag v-for="tag in game.tags" :key="tag" size="small" class="detail-tag">{{ tag }}</el-tag>
            </div>
            <div class="detail-desc">
              <p>{{ game.description }}</p>
            </div>
            <div class="detail-price-box">
              <div v-if="game.price === 0" class="detail-free">
                <span class="free-label">免费开玩</span>
                <el-button type="success" size="large" @click="handleAddCart(game)">添加到库</el-button>
              </div>
              <div v-else class="detail-buy">
                <div class="price-area">
                  <span v-if="game.originalPrice > game.price" class="price-original">¥{{ game.originalPrice }}</span>
                  <span class="price-current">¥{{ game.price }}</span>
                </div>
                <el-button type="primary" size="large" @click="handleAddCart(game)">
                  <i class="el-icon-shopping-cart-2"></i> 加入购物车
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 截图 -->
        <div v-if="game.screenshots && game.screenshots.length" class="detail-screenshots">
          <h3 class="section-title">游戏截图</h3>
          <div class="screenshot-grid">
            <img v-for="(shot, i) in game.screenshots" :key="i" :src="shot" class="screenshot-item" @click="previewImg(shot)" />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading-box"><p>加载中...</p></div>

    <el-dialog :visible.sync="previewVisible" width="800px" :append-to-body="true">
      <img :src="previewSrc" style="width: 100%;" />
    </el-dialog>

    <FooterBar />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import gamesData from '@/data/games.json'
import { mapActions } from 'vuex'

export default {
  name: 'GameDetail',
  components: { NavBar, FooterBar },
  data() {
    return {
      game: null,
      previewVisible: false,
      previewSrc: ''
    }
  },
  created() {
    const id = Number(this.$route.params.id)
    this.game = gamesData.allGames.find(g => g.id === id) || null
  },
  methods: {
    ...mapActions('cart', ['addToCart']),
    handleAddCart(game) {
      this.addToCart(game)
      this.$message.success('已将「' + game.name + '」加入购物车')
    },
    previewImg(src) {
      this.previewSrc = src
      this.previewVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.game-detail-page {
  min-height: 100vh;
  padding-top: $navbar-height;
}

.page-content {
  padding: $spacing-lg 0 $spacing-xxl;
  min-height: calc(100vh - $navbar-height - 200px);
}

.breadcrumb {
  margin-bottom: $spacing-lg;
  ::v-deep .el-breadcrumb__inner { color: $text-secondary; }
  ::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner { color: $text-white; }
}

.detail-main {
  display: flex; gap: $spacing-xl; margin-bottom: $spacing-xxl;
  @include mobile { flex-direction: column; }
}

.detail-cover {
  flex-shrink: 0; width: 300px; border-radius: $radius-md; overflow: hidden;
  img { width: 100%; display: block; }
}

.detail-info { flex: 1; }

.detail-title {
  font-size: 32px; color: $text-white; margin-bottom: $spacing-md;
}

.detail-meta {
  display: flex; align-items: center; gap: $spacing-sm;
  margin-bottom: $spacing-lg; flex-wrap: wrap;
  .meta-divider { color: $text-dim; }
  .detail-tag {
    background: rgba($color-accent, 0.08);
    border-color: rgba($color-accent, 0.2); color: $color-accent;
  }
}

.detail-desc {
  color: $text-secondary; line-height: 1.8;
  margin-bottom: $spacing-xl; font-size: $font-size-base;
}

.detail-price-box {
  background: $bg-card; border-radius: $radius-md; padding: $spacing-lg;
  .detail-free {
    @include flex-between;
    .free-label { font-size: $font-size-xl; color: $color-price; font-weight: bold; }
  }
  .detail-buy {
    @include flex-between;
    .price-area {
      .price-original { color: $text-dim; text-decoration: line-through; font-size: $font-size-lg; margin-right: $spacing-md; }
      .price-current { color: $color-price; font-size: 28px; font-weight: bold; }
    }
  }
}

.detail-screenshots {
  .screenshot-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: $spacing-md; }
  .screenshot-item { width: 100%; border-radius: $radius-sm; cursor: pointer; transition: transform 0.3s; }
  .screenshot-item:hover { transform: scale(1.02); }
}

.loading-box {
  padding-top: 200px; text-align: center; color: $text-dim;
}
</style>
