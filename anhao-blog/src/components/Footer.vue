<template>
	<!-- <el-footer class="me-area">
		<div class="me-footer">
			<span>&copy; Copyright 2018
			<router-link to="/" class="me-login-design-color">Anhao</router-link>
			</span>
		</div>
	</el-footer> -->
  


   <footer class="footer bg-white">
    <div class="footer-social">
      <div class="footer-container clearfix">
            <div class="social-list">
                <th>
                    <th>
                        <th>
                            <th>
                                <a class="social weibo" target="blank"
                                   href="">微博</a>
                            </th:block>
                            <th>
                                <a class="social zhihu" target="blank"
                                   href="">码云</a>
                            </th>                            
                            <th>
                                <a class="social twitter" target="blank"
                                   href="">公众号</a>
                            </th>
                            <th>
                                <a class="social github" target="blank"
                                   href="">Github</a>
                            </th>
                        </th>
                    </th>
                </th>
            </div>
        </div>
    </div>
    <div class="footer-meta">
        <div class="footer-container">
            <div class="meta-item meta-copyright">
                <div class="meta-copyright-info">
                    <div class="info-text">
                        <a href="http://blog.hanshuai.xin" style="display: block;margin: 0 auto;" class="info-logo">
                            <img style="display: block;margin: 0 auto;" src=""
                                 alt=""/>
                        </a>
                        <br/>
                        <p>&copy; 版权所有 <a href="https://github.com/ZHENFENG13/My-Blog" target="_blank"
                                          rel="nofollow">Anhao</a> 保留一切权利
                        </p>
                        <br/>
                        <th>
                            <p text=""></p>
                        </th>
                    </div>
                </div>
            </div>

        </div>
    </div>
</footer>


</template>

<script>
export default {
  name: 'Footer',
  data (){
  	return {
  	}
  },
  created: function () {

  }
}
</script>
<style scoped>
  @import '../assets/css/style.min.css';
</style>

<style>

/*.el-footer {
  min-width: 100%;
  box-shadow: 0 -2px 3px hsla(0,0%,7%,.1), 0 0 0 1px hsla(0,0%,7%,.1);
  position:absolute;
  bottom:0;
  left:0;
  z-index: 1024;
  background-color: #fff!important;
}
.me-footer{
  text-align: center;
  line-height: 60px;
  font-family: sans-serif;
  font-size: 16px;
  
}
.me-login-design-color{
  color: #75726c !important;
}*/
.footer-meta[data-v-1260502b] {
     padding: 0 0 0; 
}
.footer-meta .footer-container[data-v-1260502b] {
      height: 60px; 
}
.footer-social[data-v-1260502b] {
    border-top: 1px solid rgba(184,197,214,.2);
    border-bottom: 0px; 
}

   
</style>

