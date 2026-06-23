<template>
  <div class="search-section">
    <div class="container">
      <div class="search-wrapper">
        <h2 class="search-title">探索你的下一款游戏</h2>
        <div class="search-box">
          <el-input
            v-model="keyword"
            placeholder="搜索游戏名称、分类、标签..."
            size="large"
            clearable
            @keyup.enter.native="handleSearch"
          >
            <el-button slot="append" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          </el-input>
        </div>
        <div class="hot-tags">
          <span class="tag-label">热门标签：</span>
          <el-tag
            v-for="tag in hotTags"
            :key="tag"
            size="small"
            class="tag-item"
            @click="searchTag(tag)"
          >{{ tag }}</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchSection',
  data() {
    return {
      keyword: '',
      hotTags: ['开放世界', '角色扮演', '动作', '科幻', '生存', '竞技']
    }
  },
  methods: {
    handleSearch() {
      if (this.keyword.trim()) {
        this.$router.push({ path: '/games', query: { keyword: this.keyword.trim() } })
      }
    },
    searchTag(tag) {
      this.$router.push({ path: '/games', query: { keyword: tag } })
    }
  }
}
</script>

<style lang="scss" scoped>
.search-section {
  padding: $spacing-xxl 0 $spacing-lg;
  background: linear-gradient(180deg, darken($bg-primary, 3%) 0%, $bg-primary 100%);
}

.search-wrapper {
  text-align: center;
}

.search-title {
  font-size: $font-size-xxl;
  color: $text-white;
  margin-bottom: $spacing-lg;
  font-weight: bold;
}

.search-box {
  max-width: 600px;
  margin: 0 auto;

  ::v-deep .el-input__inner {
    background: #316282;
    border: 1px solid #316282;
    color: $text-primary;
    border-radius: $radius-sm 0 0 $radius-sm;
    height: 48px;
    font-size: $font-size-lg;

    &::placeholder {
      color: $text-dim;
    }

    &:focus {
      border-color: $color-accent;
      background: #3d7596;
    }
  }

  ::v-deep .el-input-group__append {
    background: $color-accent;
    border: none;
    border-radius: 0 $radius-sm $radius-sm 0;

    .el-button {
      color: $text-white;
      font-size: $font-size-lg;
      padding: 0 24px;
      height: 48px;
      border: none;

      &:hover {
        background: $color-accent-hover;
      }
    }
  }
}

.hot-tags {
  margin-top: $spacing-md;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: $spacing-sm;

  .tag-label {
    color: $text-secondary;
    font-size: $font-size-sm;
  }

  .tag-item {
    cursor: pointer;
    background: rgba($color-accent, 0.1);
    border-color: rgba($color-accent, 0.3);
    color: $color-accent;

    &:hover {
      background: rgba($color-accent, 0.2);
      border-color: $color-accent;
    }
  }
}
</style>
