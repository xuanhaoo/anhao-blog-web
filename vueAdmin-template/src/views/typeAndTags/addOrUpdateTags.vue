<template>
	<el-dialog
  :title="!dataForm.id ? '新增' : '修改'"
  :visible.sync="visible"
  width="30%"
  center
  @close="closeHandle">
  <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="标签名称" prop="tagName">
        <el-input v-model="dataForm.tagName" placeholder="标签名"></el-input>
      </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="visible = false">取 消</el-button>
    <el-button type="primary" @click="dataFormSubmit">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import { queryTagObject, saveTag, updateTag } from '@/api/tags'
	export default {
		data() {
			var validatetagName = (rule, value, callback) => {
		        if (!this.dataForm.id && !/\S/.test(value)) {
		          callback(new Error('标签名不能为空！'))
		        } else {
		          callback()
		        }
		      }
			return {
				visible:false,
				dataForm: {
					id: 0,
					tagName: ''
				},
				query: {
					id: 0
				},
				dataRule: {
		          tagName: [
		            { required: true, message: '标签名不能为空！', trigger: 'blur' }
		          ]
		       }
			}
		},
		methods: {
			init (id) {
				this.visible = true
				this.dataForm.id = id || 0
        		this.query.id = id || 0
        		if (this.dataForm.id) {
		          queryTagObject(this.query).then(response => {
		            if (response && response.code == 0) {
		              this.dataForm.tagName = response.data.tagName
		            }
		          })

		        }


			},
			// 弹窗关闭时
	      closeHandle () {
	        this.$refs['dataForm'].resetFields()
	      },
	      //保存
	      dataFormSubmit () {
	        this.$refs.dataForm.validate(valid => {
	          if (valid) {
	            var datas = {
	              'id': this.dataForm.id || undefined,
	              'tagName': this.dataForm.tagName 
	            }
	            var tick = !this.dataForm.id ? saveTag(datas) : updateTag(datas)
	            tick.then(response => {
	              if (response && response.code === 0) {
	                 this.$message({
	                  message: '操作成功',
	                  type: 'success',
	                  duration: 1500,
	                  onClose: () => {
	                    this.visible = false
	                    this.$emit('refreshTagList')
	                    this.$refs['dataForm'].resetFields()
	                  }
	                })
	              }else {
	                this.$message.error(response.msg)
	              }
	            })
	          }
	        })

	      }
		}
	}
</script>