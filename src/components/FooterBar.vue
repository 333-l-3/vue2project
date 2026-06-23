<template>
  <footer class="footer">
    <div class="footer-inner">
      <!-- 上部链接区 -->
      <div class="footer-links">
        <div class="footer-col">
          <h4>关于 GameStore</h4>
          <ul>
            <li><a href="#">关于我们</a></li>
            <li><a href="#">用户协议</a></li>
            <li><a href="#">隐私政策</a></li>
            <li><a href="#">法律声明</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>帮助与支持</h4>
          <ul>
            <li><a href="#">客服中心</a></li>
            <li><a href="#">常见问题</a></li>
            <li><a href="#">退款政策</a></li>
            <li><a href="#">账号安全</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>开发者</h4>
          <ul>
            <li><a href="#">开发者平台</a></li>
            <li><a href="#">发布游戏</a></li>
            <li><a href="#">API 文档</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>关注我们</h4>
          <ul>
            <li><a href="#">微博</a></li>
            <li><a href="#">微信公众号</a></li>
            <li><a href="#">Bilibili</a></li>
            <li><a href="#">Discord</a></li>
          </ul>
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="footer-divider"></div>

      <!-- 底部版权 -->
      <div class="footer-bottom">
        <p>&copy; 2026 GameStore. All Rights Reserved.</p>
        <p class="footer-disclaimer">
          本网站为实训项目作品，所有游戏图片和数据仅供学习交流使用。
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterBar'
}
</script>

<style lang="scss" scoped>

.footer {
  background: $bg-secondary;
  padding: $spacing-xxl 0 $spacing-lg;
  margin-top: $spacing-xxl;
}

.footer-inner {
  @include container;
}

.footer-links {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: $spacing-lg;
}

.footer-col {
  h4 {
    color: $text-white;
    font-size: $font-size-base;
    margin-bottom: $spacing-md;
    font-weight: bold;
  }

  ul li {
    margin-bottom: $spacing-sm;

    a {
      color: $text-secondary;
      font-size: $font-size-sm;
      transition: color 0.2s;

      &:hover {
        color: $color-accent;
      }
    }
  }
}

.footer-divider {
  height: 1px;
  background: $border-color;
  margin: $spacing-lg 0;
}

.footer-bottom {
  text-align: center;
  color: $text-dim;
  font-size: $font-size-sm;

  .footer-disclaimer {
    margin-top: $spacing-xs;
    font-size: 11px;
    color: lighten($text-dim, 5%);
  }
}
</style>
