<template>
  <div class="ad-section">
    <div class="container">
      <div class="ad-banner" @click="handleClick">
        <div class="ad-content">
          <div class="ad-tag">限时特惠</div>
          <h3 class="ad-title">🎉 夏日游戏节特卖</h3>
          <p class="ad-desc">精选大作低至 5 折，还有海量独立游戏等你发现！</p>
          <el-button type="warning" size="small" round>立即抢购</el-button>
        </div>
        <div class="ad-image">
          <span class="ad-icon">🔥</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdBanner',
  methods: {
    handleClick() {
      this.$router.push('/games')
    }
  }
}
</script>

<style lang="scss" scoped>
.ad-section {
  padding: $spacing-md 0 $spacing-lg;
}

.ad-banner {
  background: linear-gradient(135deg, #ff6b35 0%, #d4347e 50%, #6b3fa0 100%);
  border-radius: $radius-md;
  padding: $spacing-xl $spacing-xxl;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(212, 52, 126, 0.3);
  }
}

.ad-content {
  .ad-tag {
    display: inline-block;
    background: rgba(255, 255, 255, 0.2);
    color: $text-white;
    padding: 2px 12px;
    border-radius: 20px;
    font-size: $font-size-sm;
    margin-bottom: $spacing-sm;
  }

  .ad-title {
    font-size: 28px;
    color: $text-white;
    margin-bottom: $spacing-sm;
    font-weight: bold;
  }

  .ad-desc {
    font-size: $font-size-base;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: $spacing-md;
  }
}

.ad-image {
  .ad-icon {
    font-size: 80px;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }
}
</style>
