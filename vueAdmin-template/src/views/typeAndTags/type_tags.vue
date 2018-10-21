<template>
	<div class="app-container">
		<!-- Type -->
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>Type</span>		    
			<el-button  style="float: right;" type="primary" @click="addOrEditType()" icon="el-icon-circle-plus" class="btn-style" size="small">新增</el-button>
		  </div>
			<el-row :gutter="28">
			  <el-col :span="4" v-for="item in list" class="singleType">
			  	<div class="grid-content bg-purple">
				  	<el-badge :value="item.counts" :max="99" class="item">
					  	<el-card :body-style="{ padding: '0px' }">
					      <img :src="'http://'+item.avatar" class="image">
					      <div style="padding: 14px;">
					        <span>{{ item.categoryName }}</span>
					        <div class="bottom clearfix">
					          <time class="time">{{ item.description }}</time>
					        </div>
					        <div class="button">
					          	<el-dropdown size="small" type="primary">
								  <el-button type="info" size="mini" round>
								   <i class="el-icon-setting"></i>
								  </el-button>
								  <el-dropdown-menu slot="dropdown">
								    <el-dropdown-item @click.native="addOrEditType(item.id)">编 辑</el-dropdown-item>
								    <el-dropdown-item divided @click.native="deleteType(item.id)">删 除</el-dropdown-item>
								  </el-dropdown-menu>
								</el-dropdown>
					          </div>
					      </div>
					    </el-card>
					</el-badge>
			    </div>
			  </el-col>		 
			</el-row>

	</el-card>
<!-- Tags -->
	<el-card class="box-card" style="margin-top: 10px;">
		  <div slot="header" class="clearfix">
		    <span>Tags</span>
		    <el-button style="float: right;" size="small" @click="addOrEditTags()">+ New Tag</el-button>
		  </div>
		<el-tag v-for="item2 in tagsList" type="info">
			<el-dropdown trigger="click">
		      <span class="tag-style">
		        {{ item2.tagName }}
		      </span>
		      <el-dropdown-menu slot="dropdown">
		        <el-dropdown-item @click.native="addOrEditTags(item2.id)">编辑</el-dropdown-item>
		        <el-dropdown-item @click.native="deleteTag(item2.id)">删除</el-dropdown-item>
		      </el-dropdown-menu>
    		</el-dropdown>
    	</el-tag>
	</el-card>


	<!-- 类别弹窗, 新增 / 修改 -->
    <addOrUpdateType v-if="addOrUpdateTypeVisible" ref="addOrUpdateType" @refreshList="getList"></addOrUpdateType>
	<!-- 标签弹窗 新增 / 修改 -->
	<addOrUpdateTags v-if="addOrUpdateTagsVisible" ref="addOrUpdateTags" @refreshTagList="getTagsList"></addOrUpdateTags>
		<!--可自定义按钮的样式、show/hide临界点、返回的位置  -->
    <!--如需文字提示，可在外部添加element的<el-tooltip></el-tooltip>元素  -->
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></back-to-top>
    </el-tooltip>
	</div>
</template>
<script>
import { queryList, deleteCate } from '@/api/category'
import { queryTagsList, deleteTag } from '@/api/tags'
import BackToTop from '@/components/BackToTop'
import AddOrUpdateType from './addOrUpdateType'
import AddOrUpdateTags from './addOrUpdateTags'
export default {
  data() {
    return {

      list: null,
      tagsList: null,
      
      myBackToTopStyle: {
        right: '40px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      },
      addOrUpdateTypeVisible: false,
      addOrUpdateTagsVisible: false,
      deleteArr: {
      	id: 0
      },
      deleteTagArr: {
      	id: 0
      }
    }
  },
  components: {
  	BackToTop,
  	AddOrUpdateType,
  	AddOrUpdateTags
  },
  created() {
  	this.getList()
  	this.getTagsList()

  },
  methods: {
  	getList() {
  		queryList().then(response => {
        this.list = response.data
      })
  	},
  	getTagsList() {
  		queryTagsList().then(response => {
  			this.tagsList = response.data
  		})
  	},
  	addOrEditType(id) {
  		this.addOrUpdateTypeVisible = true,
  		this.$nextTick(() => {
      	this.$refs.addOrUpdateType.init(id)
      })
  	},
  	deleteType (id) {
  		this.deleteArr.id = id
        this.$confirm(`确定删除操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	deleteCate(this.deleteArr).then(response => {
        		if (response.code === 0) {
        			this.$message({
	                message: '操作成功',
	                type: 'success',
	                duration: 1500,
	                onClose: () => {
	                  this.getList()
	                }
	              })		
        		} else {
        			this.$message.error(data.msg)
        		}
        	})
        })

  	},
  	addOrEditTags (id) {
  		this.addOrUpdateTagsVisible = true
  		this.$nextTick(() => {
  			this.$refs.addOrUpdateTags.init(id)
  		})
  	},
  	deleteTag (id) {
  		this.deleteTagArr.id = id
        this.$confirm(`确定删除操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	deleteTag(this.deleteTagArr).then(response => {
        		if (response.code === 0) {
        			this.$message({
	                message: '操作成功',
	                type: 'success',
	                duration: 1500,
	                onClose: () => {
	                  this.getTagsList()
	                }
	              })		
        		} else {
        			this.$message.error(data.msg)
        		}
        	})
        })
  	}
  }
}
</script>

<style>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  /*.bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }*/
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  /*.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }*/


  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    margin: 4px 0 5px 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .singleType {
  	min-height: 400px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .tag-style {
  	color: #909399;
  	cursor: pointer;

  }
</style>