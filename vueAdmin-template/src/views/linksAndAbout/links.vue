<template>
	<div class="app-container calendar-list-container">
		<div class="tip">
			<p>友链查看与编辑：编辑友链，当有新的链接加入时，直接追加即可，可别忘记保存哦 :)</p>
		</div>
		<el-form :model="dataForm" :rules="dataRules" ref="dataForm">
			<div class="editContent">
				<mavon-editor id="EditorId" ref="contentEditor"  style="height: 400px; margin-top: 3%" v-model="dataForm.body">
					</mavon-editor>
			</div>
				<el-form-item>
					<div style="margin-top: 40px;">
						<div style="float: right">
							<el-row>				  
							  <el-button type="primary" icon="el-icon-tickets" circle size="medium" @click="dataFormSubmit()">保存</el-button>
						</el-row>
						</div>					
					</div>		
			</el-form-item>
		</el-form>
		
	</div>
</template>

<script>
import { queryLinks, save, update } from '@/api/linksAndAbout'
	export default {
		data() {
			return {
				objectData: '',
				dataForm: {
					id: 0,
					type: 1,
					body: ''
        	
        		},
			}
		},
		created() {
			//初始化渲染数据
			this.getData()
		},
		methods: {
			//默认加载数据
			getData() {
				queryLinks().then(response => {
					this.objectData = response.data
					this.dataForm.id = this.objectData.id
					this.dataForm.type = this.objectData.type
					this.dataForm.body = this.objectData.content
				}) 
			},

			dataFormSubmit() {
				if(!this.dataForm.body){
	  			this.$message({message: '内容不能为空哦',type: 'warning',showClose: true})
	  			return
  				}
  				var datas = {
  					'id': this.dataForm.id || undefined,
 					'type': this.dataForm.type,
 					'content': this.dataForm.body
  				}

  				var tick = !this.dataForm.id ? save(datas) : update(datas)
  				tick.then(response => {
  					if (response && response.code === 0) 
		      			{
			                this.$message({
			                message: '操作成功',
			                type: 'success',
			                duration: 1500,
			                onClose: () => {
			                	this.getData()
			                }
		                	})
		                	
		              	}else {
		                this.$message.error(response.msg)
		              }
  				})

			}

		}
	}
</script>

<style>
	.app-container .tip{
		padding: 4px 16px;
	    background-color: #ecf8ff;
	    border-radius: 4px;
	    border-left: 5px solid #50bfff;
	    margin: 10px 0;
	}
	.app-container .tip p{
		font-size: 14px;
	    color: #5e6d82;
	    line-height: 1.5em;
	}
</style>