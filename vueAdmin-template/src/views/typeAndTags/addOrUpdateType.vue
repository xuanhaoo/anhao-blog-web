<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close="closeHandle">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="类别名" prop="categoryName">
        <el-input v-model="dataForm.categoryName" placeholder="类别名"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
        class="upload-demo"
        drag
        :action="uploadUrl"
        :before-upload="beforeUploadHandle"
        :on-success="successHandle"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      </el-form-item>   
      <el-form-item>
        <el-input v-model="dataForm.avatar" type="hidden"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="dataForm.description" placeholder="描述" type="textarea" autosize></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  
import { uploadImage, saveCate, updateCate, queryObject } from '@/api/category'
  export default {

    data() {
      var validateCategoryName = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('类别名不能为空！'))
        } else {
          callback()
        }
      }

      return {
        visible: false,
        dataForm: {
          id: 0,
          categoryName: '',
          avatar: null,
          description: ''
        },
        query: {
          id: 0
        },
        uploadUrl: '',
        dataRule: {
          categoryName: [
            { required: true, message: '类别名不能为空！', trigger: 'blur' }
          ]
       }
      }
    },
    methods: {
      init(id) {
        this.uploadUrl = uploadImage()
        this.visible = true
        this.dataForm.id = id || 0
        this.query.id = id || 0

        if (this.dataForm.id) {
          queryObject(this.query).then(response => {
            if (response && response.code == 0) {
              this.dataForm.categoryName = response.data.categoryName
              this.dataForm.description = response.data.description
              this.dataForm.avatar = response.data.avatar
            }
          })

        }


      },
      //上传之前
      beforeUploadHandle (file) {
        // this.uploadUrl = uploadImage()
        if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
          this.$message.error('只支持jpg、png、gif格式的图片！')
          return false
        }
        // let fd = new FormData()
        // fd.append('file', file)
        // uploadImage(fd).then(res => {
        //   // console.log(res)
        // })
      },
      //上传成功
      successHandle (response) {
        if(response && response.code === 0) {
          this.dataForm.avatar = response.data
          this.$message.success("上传成功！");
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
              'categoryName': this.dataForm.categoryName,
              'avatar': this.dataForm.avatar,
              'description': this.dataForm.description
              
            }
            var tick = !this.dataForm.id ? saveCate(datas) : updateCate(datas)
            tick.then(response => {
              if (response && response.code === 0) {
                 this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshList')
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
