<template>
  <div class="game-section">
    <div class="container">
      <h2 class="section-title">{{ title }}</h2>
      <div class="game-grid">
        <div
          v-for="game in games"
          :key="game.id"
          class="game-card"
          @click="$router.push(`/game/${game.id}`)"
        >
          <!-- 封面 -->
          <div class="card-cover">
            <img :src="game.cover" :alt="game.name" />
            <!-- 折扣标签 -->
            <span v-if="game.originalPrice > game.price && game.price > 0" class="discount-tag">
              -{{ Math.round((1 - game.price / game.originalPrice) * 100) }}%
            </span>
          </div>

          <!-- 信息 -->
          <div class="card-info">
            <h4 class="card-name">{{ game.name }}</h4>
            <div class="card-meta">
              <el-tag size="mini" type="info">{{ game.category }}</el-tag>
              <el-rate
                v-model="game.rating"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
                class="card-rating"
              ></el-rate>
            </div>
            <div class="card-tags">
              <el-tag
                v-for="tag in game.tags"
                :key="tag"
                size="mini"
                class="game-tag"
              >{{ tag }}</el-tag>
            </div>
            <div class="card-bottom">
              <div class="card-price">
                <span v-if="game.price === 0" class="price-free">免费</span>
                <template v-else>
                  <span v-if="game.originalPrice > game.price" class="price-original">
                    ¥{{ game.originalPrice }}
                  </span>
                  <span class="price-current">¥{{ game.price }}</span>
                </template>
              </div>
              <el-button
                type="primary"
                size="mini"
                @click.stop="handleAddCart(game)"
              >加入购物车</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'GameSection',
  props: {
    title: { type: String, required: true },
    games: { type: Array, required: true }
  },
  methods: {
    ...mapActions('cart', ['addToCart']),
    handleAddCart(game) {
      this.addToCart(game)
      this.$message.success(`已将「${game.name}」加入购物车`)
    }
  }
}
</script>

<style lang="scss" scoped>
.game-section {
  padding: $spacing-lg 0;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: $spacing-md;

  @include tablet {
    grid-template-columns: repeat(3, 1fr);
  }

  @include mobile {
    grid-template-columns: repeat(2, 1fr);
  }
}

.game-card {
  background: $bg-card;
  border-radius: $radius-md;
  overflow: hidden;
  cursor: pointer;
  @include card-hover;
}

.card-cover {
  position: relative;
  width: 100%;
  padding-top: 133%; // 3:4 比例
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  &:hover img {
    transform: scale(1.05);
  }

  .discount-tag {
    position: absolute;
    top: $spacing-sm;
    right: $spacing-sm;
    background: $color-price;
    color: $bg-primary;
    padding: 2px 8px;
    border-radius: $radius-sm;
    font-size: $font-size-sm;
    font-weight: bold;
  }
}

.card-info {
  padding: $spacing-sm $spacing-md $spacing-md;
}

.card-name {
  font-size: $font-size-base;
  color: $text-white;
  margin-bottom: $spacing-sm;
  @include text-ellipsis;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-sm;

  .card-rating {
    ::v-deep .el-rate__icon {
      font-size: 12px;
    }
    ::v-deep .el-rate__text {
      font-size: 11px;
    }
  }
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: $spacing-sm;

  .game-tag {
    background: rgba($color-accent, 0.08);
    border-color: rgba($color-accent, 0.2);
    color: $color-accent;
    font-size: 10px;
  }
}

.card-bottom {
  @include flex-between;
  padding-top: $spacing-sm;
  border-top: 1px solid rgba($border-color, 0.5);
}

.card-price {
  .price-free {
    color: $color-price;
    font-weight: bold;
    font-size: $font-size-lg;
  }

  .price-original {
    color: $text-dim;
    text-decoration: line-through;
    font-size: $font-size-sm;
    margin-right: $spacing-xs;
  }

  .price-current {
    color: $color-price;
    font-weight: bold;
    font-size: $font-size-base;
  }
}
</style>
