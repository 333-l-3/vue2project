<template>
  <div class="home">
    <!-- 固定导航栏 -->
    <NavBar />

    <!-- 主内容区 -->
    <div class="home-content">
      <!-- 搜索模块 -->
      <SearchSection />

      <!-- 轮播展示模块 -->
      <CarouselSection />

      <!-- 广告位模块 -->
      <AdBanner />

      <!-- 热销排行列表 -->
      <GameSection title="🔥 热销排行" :games="hotGames" />

      <!-- 新品上市列表 -->
      <GameSection title="🆕 新品上市" :games="newGames" />

      <!-- 免费畅玩列表 -->
      <GameSection title="🆓 免费畅玩" :games="freeGames" />
    </div>

    <!-- 底部信息 -->
    <FooterBar />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import SearchSection from '@/components/SearchSection.vue'
import CarouselSection from '@/components/CarouselSection.vue'
import AdBanner from '@/components/AdBanner.vue'
import GameSection from '@/components/GameSection.vue'
import gamesData from '@/data/games.json'

export default {
  name: 'HomeView',
  components: {
    NavBar,
    FooterBar,
    SearchSection,
    CarouselSection,
    AdBanner,
    GameSection
  },
  data() {
    return {
      hotGames: gamesData.hot,
      newGames: gamesData.new,
      freeGames: gamesData.free
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  padding-top: $navbar-height;
}

.home-content {
  min-height: calc(100vh - $navbar-height - 200px);
}
</style>
