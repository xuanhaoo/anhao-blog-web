<template>
	<div>
		<!-- <headroom> -->
			<div ref="headroom">
				<header id="header" class="header bg-white">
				    <div class="navbar-container">
				        <a class="navbar-logo">
				            <img  alt="Anhao"/>
				        </a>
				        <div class="navbar-menu">
                    <router-link id="" to="/blog" @click="indexStyle = 1" :class="{'head-link': indexStyle === 1}">首页</router-link>
                    <router-link id="" to="/archiving" @click="indexStyle = 2" :class="{'head-link': indexStyle === 2}">归档</router-link>
                    <router-link id="" to="/links" @click="indexStyle = 3" :class="{'head-link': indexStyle === 3}">友链</router-link>
                    <router-link id="" to="/about" @click="indexStyle = 4" :class="{'head-link': indexStyle === 4}">关于</router-link>
                    <router-link id="" to="/resume" @click="indexStyle = 5" :class="{'head-link': indexStyle === 5}">简历</router-link>
				        </div>
				        <div class="navbar-search" onclick="">
				            <span class="icon-search"></span>
				            <form role="search" onsubmit="return false;">
				                <span class="search-box">
				                    <input type="text" id="search-inp" class="input" placeholder="搜索..." maxlength="30"
				                           autocomplete="off"/>
				                </span>
				            </form>
				        </div>
				        <div class="navbar-mobile-menu" onclick="">
				            <span class="icon-menu cross"><span class="middle"></span></span>
				            <ul>
				                <li><router-link id="" to="/blog" @click="indexStyle = 1" :class="{'head-link': indexStyle === 1}">首页</router-link></li>
                        <li><router-link id="" to="/archiving" @click="indexStyle = 2" :class="{'head-link': indexStyle === 2}">归档</router-link></li>
				                <li><router-link id="" to="/links" @click="indexStyle = 3" :class="{'head-link': indexStyle === 3}">友链</router-link></li>
				                <li><router-link id="" to="/about" @click="indexStyle = 4" :class="{'head-link': indexStyle === 4}">关于</router-link></li>
				                <li><router-link id="" to="/resume" @click="indexStyle = 5" :class="{'head-link': indexStyle === 5}">简历</router-link></li>
				            </ul>
				        </div>
				    </div>
				</header>
			</div>
			
		<!-- </headroom> -->
		
	</div>
</template>
<script>
// import { headroom } from 'vue-headroom'

// export default {
// 	components: {
// 		headroom
// 	}
// }
// 
import Headroom from 'headroom.js'

export default {
  name: 'Comps-Headroom',
  data() {
    return {
       indexStyle: 1
    }
   
  },
  props: {
    offset: {
      type: Number,
      default: 0
    },
    tolerance: {
      type: [Object, Number],
      default: 0
    },
    scroller: String,
    initial: {
      type: String,
      default: 'headroom'
    },
    pinned: {
      type: String,
      default: 'headroom--pinned'
    },
    unpinned: {
      type: String,
      default: 'headroom--unpinned'
    },
    top: {
      type: String,
      default: 'headroom--not-top'
    },
    bottom: {
      type: String,
      default: 'headroom--bottom'
    },
    notBottom: {
      type: String,
      default: 'headroom--not-bottom'
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.initHeadroom()
    })
  },
  methods: {
    initHeadroom () {
      let _this = this
      let el = this.$refs['headroom']
      let scroller = window
      if (this.scroller && this.scroller.length > 0) {
        scroller = document.querySelector(this.scroller)
      }
      let headroom = new Headroom(el, {
        offset: this.offset,
        tolerance: this.tolerance,
        scroller: scroller,
        classes: {
          initial: this.initial,
          pinned: this.pinned,
          unpinned: this.unpinned,
          top: this.top,
          notTop: this.notTop,
          bottom: this.bottom,
          notBottom: this.notBottom
        },
        onPin () {
          _this.$emit('onPin', el)
        },
        onUnpin () {
          _this.$emit('onUnpin', el)
        },
        onTop () {
          _this.$emit('onTop', el)
        },
        onNotTop () {
          _this.$emit('onNotTop', el)
        },
        onBottom () {
          _this.$emit('onBottom', el)
        },
        onNotBottom () {
          _this.$emit('onNotBottom', el)
        }
      })
      headroom.init()
    }
  }
}

</script>


<style scoped>
	@import '../assets/css/style.min.css';
</style>
<style>
.headroom {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  animation-duration: .5s;
  animation-fill-mode: both;
  background: white;
  @include after-border();
  &.headroom--pinned {
    animation-name: slideDown;
  }
  &.headroom--unpinned {
    animation-name: slideUp;
  }
}
@keyframes slideDown {
  0% {
    transform:translateY(-44px);
  }
  100% {
    transform:translateY(0);
  }
}
@keyframes slideUp {
  0% {
    transform:translateY(0);
  }
  100% {
    transform:translateY(-44px);
  }
}
.head-link{
  color:#6fa3ef;
}
</style>