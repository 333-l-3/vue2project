<template>
  <div class="game-list-page">
    <NavBar />

    <div class="page-content">
      <div class="container">
        <!-- 搜索与筛选 -->
        <div class="filter-bar">
          <div class="filter-search">
            <el-input
              v-model="keyword"
              placeholder="搜索游戏..."
              prefix-icon="el-icon-search"
              size="medium"
              clearable
              @input="handleSearch"
            ></el-input>
          </div>
          <div class="filter-categories">
            <el-tag
              v-for="cat in categories"
              :key="cat"
              :type="activeCategory === cat ? '' : 'info'"
              :effect="activeCategory === cat ? 'dark' : 'plain'"
              class="cat-tag"
              @click="activeCategory = cat"
            >{{ cat }}</el-tag>
          </div>
        </div>

        <!-- 结果统计 -->
        <div class="result-info">
          共找到 <strong>{{ filteredGames.length }}</strong> 款游戏
        </div>

        <!-- 游戏列表 -->
        <div v-if="filteredGames.length > 0" class="game-grid">
          <div
            v-for="game in pagedGames"
            :key="game.id"
            class="game-card"
            @click="$router.push(`/game/${game.id}`)"
          >
            <div class="card-cover">
              <img :src="game.cover" :alt="game.name" />
              <span v-if="game.originalPrice > game.price && game.price > 0" class="discount-tag">
                -{{ Math.round((1 - game.price / game.originalPrice) * 100) }}%
              </span>
            </div>
            <div class="card-info">
              <h4 class="card-name">{{ game.name }}</h4>
              <div class="card-meta">
                <el-tag size="mini" type="info">{{ game.category }}</el-tag>
                <el-rate v-model="game.rating" disabled show-score text-color="#ff9900" score-template="{value}" class="card-rating"></el-rate>
              </div>
              <div class="card-tags">
                <el-tag v-for="tag in game.tags" :key="tag" size="mini" class="game-tag">{{ tag }}</el-tag>
              </div>
              <div class="card-bottom">
                <div class="card-price">
                  <span v-if="game.price === 0" class="price-free">免费</span>
                  <template v-else>
                    <span v-if="game.originalPrice > game.price" class="price-original">¥{{ game.originalPrice }}</span>
                    <span class="price-current">¥{{ game.price }}</span>
                  </template>
                </div>
                <el-button type="primary" size="mini" @click.stop="handleAddCart(game)">加入购物车</el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <el-empty v-else description="没有找到匹配的游戏"></el-empty>

        <!-- 分页 -->
        <div v-if="filteredGames.length > pageSize" class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="filteredGames.length"
            :page-size="pageSize"
            :current-page.sync="currentPage"
          ></el-pagination>
        </div>
      </div>
    </div>

    <FooterBar />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import gamesData from '@/data/games.json'
import { mapActions } from 'vuex'

export default {
  name: 'GameList',
  components: { NavBar, FooterBar },
  data() {
    return {
      allGames: gamesData.allGames,
      categories: gamesData.categories,
      keyword: '',
      activeCategory: '全部',
      currentPage: 1,
      pageSize: 8
    }
  },
  computed: {
    filteredGames() {
      let list = this.allGames
      if (this.keyword) {
        const kw = this.keyword.toLowerCase()
        list = list.filter(g =>
          g.name.toLowerCase().includes(kw) ||
          g.category.toLowerCase().includes(kw) ||
          g.tags.some(t => t.toLowerCase().includes(kw))
        )
      }
      if (this.activeCategory !== '全部') {
        list = list.filter(g => g.category === this.activeCategory)
      }
      return list
    },
    pagedGames() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.filteredGames.slice(start, start + this.pageSize)
    }
  },
  watch: {
    activeCategory() { this.currentPage = 1 },
    keyword() { this.currentPage = 1 }
  },
  created() {
    if (this.$route.query.keyword) {
      this.keyword = this.$route.query.keyword
    }
  },
  methods: {
    ...mapActions('cart', ['addToCart']),
    handleSearch() {
      this.currentPage = 1
    },
    handleAddCart(game) {
      this.addToCart(game)
      this.$message.success(`已将「${game.name}」加入购物车`)
    }
  }
}
</script>

<style lang="scss" scoped>
.game-list-page {
  min-height: 100vh;
  padding-top: $navbar-height;
}

.page-content {
  padding: $spacing-lg 0 $spacing-xxl;
  min-height: calc(100vh - $navbar-height - 200px);
}

.filter-bar {
  @include flex-between;
  flex-wrap: wrap;
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
  padding: $spacing-md;
  background: $bg-card;
  border-radius: $radius-md;
}

.filter-search {
  width: 320px;

  ::v-deep .el-input__inner {
    background: #316282;
    border-color: #316282;
    color: $text-primary;

    &::placeholder { color: $text-dim; }
    &:focus { border-color: $color-accent; background: #3d7596; }
  }
}

.filter-categories {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;

  .cat-tag {
    cursor: pointer;
  }
}

.result-info {
  color: $text-secondary;
  font-size: $font-size-sm;
  margin-bottom: $spacing-md;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-md;

  @include tablet { grid-template-columns: repeat(3, 1fr); }
  @include mobile { grid-template-columns: repeat(2, 1fr); }
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
  padding-top: 133%;
  overflow: hidden;

  img {
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
  &:hover img { transform: scale(1.05); }

  .discount-tag {
    position: absolute; top: $spacing-sm; right: $spacing-sm;
    background: $color-price; color: $bg-primary;
    padding: 2px 8px; border-radius: $radius-sm;
    font-size: $font-size-sm; font-weight: bold;
  }
}

.card-info {
  padding: $spacing-sm $spacing-md $spacing-md;
}

.card-name {
  font-size: $font-size-base; color: $text-white;
  margin-bottom: $spacing-sm;
  @include text-ellipsis;
}

.card-meta {
  display: flex; align-items: center; gap: $spacing-sm;
  margin-bottom: $spacing-sm;

  .card-rating {
    ::v-deep .el-rate__icon { font-size: 12px; }
    ::v-deep .el-rate__text { font-size: 11px; }
  }
}

.card-tags {
  display: flex; flex-wrap: wrap; gap: 4px;
  margin-bottom: $spacing-sm;

  .game-tag {
    background: rgba($color-accent, 0.08);
    border-color: rgba($color-accent, 0.2);
    color: $color-accent; font-size: 10px;
  }
}

.card-bottom {
  @include flex-between;
  padding-top: $spacing-sm;
  border-top: 1px solid rgba($border-color, 0.5);
}

.card-price {
  .price-free { color: $color-price; font-weight: bold; font-size: $font-size-lg; }
  .price-original { color: $text-dim; text-decoration: line-through; font-size: $font-size-sm; margin-right: $spacing-xs; }
  .price-current { color: $color-price; font-weight: bold; font-size: $font-size-base; }
}

.pagination {
  display: flex; justify-content: center;
  margin-top: $spacing-xl;
}
</style>
