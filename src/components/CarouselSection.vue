<template>
  <div class="carousel-section">
    <div class="container">
      <el-carousel
        :interval="4000"
        arrow="hover"
        height="380px"
        indicator-position="outside"
      >
        <el-carousel-item v-for="item in carouselData" :key="item.id">
          <div
            class="carousel-slide"
            :style="{ backgroundImage: `url(${item.image})` }"
            @click="$router.push(item.link)"
          >
            <div class="carousel-mask">
              <div class="carousel-info">
                <h2 class="carousel-title">{{ item.title }}</h2>
                <p class="carousel-desc">{{ item.desc }}</p>
                <el-button type="primary" size="small" round>立即查看</el-button>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import gamesData from '@/data/games.json'

export default {
  name: 'CarouselSection',
  data() {
    return {
      carouselData: gamesData.carousel
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel-section {
  padding-bottom: $spacing-lg;
}

.carousel-slide {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: $radius-md;
  overflow: hidden;
  cursor: pointer;
}

.carousel-mask {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.1) 100%);
  @include flex-center;
  justify-content: flex-start;
  padding-left: 80px;
}

.carousel-info {
  color: $text-white;
  max-width: 400px;

  .carousel-title {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: $spacing-sm;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .carousel-desc {
    font-size: $font-size-lg;
    color: #ccc;
    margin-bottom: $spacing-lg;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }
}

::v-deep .el-carousel__indicator {
  .el-carousel__button {
    background: rgba($color-accent, 0.3);
  }

  &.is-active .el-carousel__button {
    background: $color-accent;
  }
}

::v-deep .el-carousel__arrow {
  background: rgba(0, 0, 0, 0.5);
  color: $text-white;
  border-radius: 50%;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    color: $color-accent;
  }
}
</style>
