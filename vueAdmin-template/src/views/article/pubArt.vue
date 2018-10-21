<template>
	<div class="app-container">
		<el-form size="mini" :model="dataForm" :rules="dataRule" ref="dataForm">
			<el-form-item label="文章标题" label-width="80px" prop="title">
		    	<el-input placeholder="请输入文章标题" v-model="dataForm.title"></el-input>
		  	</el-form-item>
			<el-form-item label="文章类别" prop="category">
			    <el-select placeholder="分类" v-model="dataForm.category.id">
			    	<el-option
				      v-for="item1 in categoryFrom" 
				      :key="item1.id"
			    	  :label="item1.categoryName" 
			    	  :value="item1.id">
				    </el-option>
			    </el-select>
			</el-form-item>
			<el-form-item label="文章标签" prop="tagsList">				
				<el-select multiple placeholder="请选择" v-model="dataForm.tagsList" style="width: 800px;">
				    <el-option
				      v-for="item2 in tagsForm"
				      :key="item2.id"
				      :label="item2.tagName"
				      :value="item2.id">
				    </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="文章摘要" label-width="80px" prop="summary">
		    	<el-input placeholder="请输入文章摘要（80字内）" v-model="dataForm.summary"></el-input>
		  	</el-form-item>
		<div class="editContent">
			<mavon-editor id="EditorId" ref="contentEditor" @imgAdd="$imgAdd" @imgDel="imgDel()" style="height: 500px" v-model="dataForm.articleBody.content"></mavon-editor>
		</div>
		<el-form-item>
		<div style="margin-top: 50px;">
			<el-tooltip :content="'准许评论: ' + dataForm.allowComment" placement="top">
				<el-switch
				  v-model="dataForm.allowComment"
				  active-color="#13ce66"
				  active-text="允许评论"
				  active-value="1"
				  inactive-value="0"
				  inactive-text="拒绝评论">
				</el-switch>
			</el-tooltip>
			<div style="float: right">
				<el-row>				  
				  <el-button type="info" icon="el-icon-search" circle size="medium">查看列表</el-button>							
				  <el-button type="danger" icon="el-icon-edit-outline" circle size="medium" @click="dataFormSubmit(0)">存为草稿</el-button>
				  <el-button type="primary" icon="el-icon-tickets" circle size="medium" @click="dataFormSubmit(1)">正式发布</el-button>
			</el-row>
			</div>
			
		</div>
		
		</el-form-item>

		</el-form>			
	</div>


		
</template>
<script>

import { queryObject, queryTags, saveArticle, updateArticle, articleUploadImg } from '@/api/article'
import { queryTagsList } from '@/api/tags'
import { queryList } from '@/api/category'
	export default {
    data() {
      return {
        objectData: '',
        dataForm: {
        	id: 0,
        	title: '',
        	allowComment: '',
        	status: 0,
        	summary: '',
        	articleBody: {
        		id: 0,
        		content: '',
        		contentHtml: ''
        	},
        	category: {
        		id: ''
        	},
        	tagsList: []


        },
        //choiceCategory: '',
        //choiceTags: [],
        categoryFrom: [],
        tagsForm: [],

        dataRule: {
        	title: [
        		{ required: true, message: '请输入文章标题', trigger: 'blur' },
        		{ max: 30, message: '标题太长了哦！(30个字符以内)', trigger: 'blur' }
        	],
        	summary: [
	        	{ required: true, message: '请输入摘要', trigger: 'blur' },
	        	{ max: 80, message: '不能大于80个字符', trigger: 'blur' }
	      	],
	      	category: [
	        	{ required: true, message: '请选择文章分类', trigger: 'change' }
	      	],
	      	tagsList: [
	        	{ required: true, message: '请选择标签', trigger: 'change' }
	      	]
        }
           
      }
    },
    created() {
    	this.getData()
    },
    methods: {
    	// 编辑时，获取初始化数据
      	getData() {
      	// 取到路由带过来的参数 
        let routerParams = this.$route.params.art_id
        //me = this
        let me = this
        // 将数据放在当前组件的数据内
        this.dataForm.id = routerParams || 0
        queryList().then(response => {
        	this.categoryFrom = response.data
        })
        queryTagsList().then(response => {
        	this.tagsForm = response.data
        })
        //如果有数据代表是编辑，不是新增
        if (this.dataForm.id) {
        	queryObject(this.dataForm.id).then(response => {
        		this.objectData = response.data
        		this.dataForm.id = this.objectData.id
        		this.dataForm.title = this.objectData.title
        		this.dataForm.summary = this.objectData.summary
        		//转化为字符型 toFixed
        		this.dataForm.allowComment = this.objectData.allowComment.toFixed()
        		this.dataForm.category.id = this.objectData.category.id

        		this.dataForm.articleBody.content = this.objectData.articleBody.content
        		this.dataForm.articleBody.contentHtml = this.objectData.articleBody.contentHtml
        		this.dataForm.articleBody.id = this.objectData.articleBody.id
        	})
        	//查询已经有的标签
        	queryTags(this.dataForm.id).then(response => {
        		response.data.forEach(function(value) {
        			//循环遍历压入栈
        			//me.choiceTags.push(value.id)
        			me.dataForm.tagsList.push(value.id)
        		})
        	})

        }
      	},

      	//绑定imgAadd
      	$imgAdd(pos, $file) {
      		var formdata = new FormData()
      		formdata.append('image', $file)
      		articleUploadImg(formdata).then(response => {
      			this.$refs.contentEditor.$img2Url(pos, response.data)
      		})
      	},
     	/**
     	 * 文章表单提交
     	 * @Author   xuanhao
     	 * @DateTime 2018-04-02T10:36:19+0800
     	 * @param    {[type]}   pub_status [发布状态：pub_status=1:正式发布；pub_status=0：存为草稿]
     	 * @return   {[type]}                            [description]
     	 */
      	dataFormSubmit(pub_status) {
      		//let me = this
      		//验证文章内容是否为空
      		if(!this.dataForm.articleBody.content){
	  			this.$message({message: '内容不能为空哦',type: 'warning',showClose: true})
	  			return
  			}

  			this.$refs.dataForm.validate(valid => {
  				if(valid) {
					//设置是否正式发布
		      		if(pub_status === 1) {
		      			this.dataForm.status = 1
		      		}else {
		      			this.dataForm.status = 0
		      		}
		      		var datas = {
		      			'id': this.dataForm.id || undefined,
		      			'title': this.dataForm.title,
		      			//转化为整型
		      			'allowComment': parseInt(this.dataForm.allowComment),
		      			'status': this.dataForm.status,
		      			'tagsList': this.dataForm.tagsList,
		      			'summary': this.dataForm.summary,
		      			'category': {
		      				'id': this.dataForm.category.id
		      			},
		      			'articleBody': {
		      				'id': this.dataForm.articleBody.id,
		      				'content': this.dataForm.articleBody.content
		      			}
		      		}

		      		//根据id来判断编辑类型
		      		var tick = !this.dataForm.id ? saveArticle(datas) : updateArticle(datas)
		      		tick.then(response => {
		      			if (response && response.code === 0) 
		      			{
			                this.$message({
			                message: '操作成功',
			                type: 'success',
			                duration: 1500,
			                onClose: () => {
			                	//跳转至文章列表
			                	this.$router.push({ 
						        name: 'ArticleList'
						      })
			                }
		                	})
		                	
		              	}else {
		                this.$message.error(response.msg)
		              }
		      		})
  				}
  			})
  			
      	}
      },
      watch: {
      	'$route': 'getData'
      }
  }
</script>

<style type="text/css">
	
</style>