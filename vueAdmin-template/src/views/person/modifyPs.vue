<template>
	<div class="app-container calendar-list-container">
    <div class="modify-style">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item  label="原密码" prop="oldPassword">
          <el-input v-model="dataForm.oldPassword" type="password" placeholder="原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" >
          <el-input v-model="dataForm.newPassword" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
         <el-form-item label="确认密码" prop="comfirmPassword" >
          <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="请再次输入新密码"></el-input>
        </el-form-item>

        <el-form-item>
         <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
         <el-button @click="resetForm('dataForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
		
	</div>
</template>


<script>
  import { updatePs } from '@/api/users'
  export default {
    data () {
      var validatePassword = (rule, value, callback) => {
        if (!/\S/.test(value)) {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }
      var validateComfirmPassword = (rule, value, callback) => {
        if (!/\S/.test(value)) {
          callback(new Error('确认密码不能为空'))
        } else if (this.dataForm.newPassword !== value) {
          callback(new Error('确认密码与密码输入不一致'))
        } else {
          callback()
        }
      }
      
      return {
        dataForm: {        
          oldPassword: '',
          newPassword: '',
          comfirmPassword: '',        
        },
        query: {
          id: 0
        },
        dataRule: {
          oldPassword: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          newPassword: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          comfirmPassword: [
            { validator: validateComfirmPassword, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      //表单提交
      dataFormSubmit () {
        this.$refs.dataForm.validate(valid => {
          if (valid) {
            var datas = {            	
              'oldPassword': this.dataForm.oldPassword,
              'newPassword': this.dataForm.newPassword
            }
           
            updatePs(datas).then(response => {
              if (response && response.code === 0) {
                 this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                })
              }else {
                this.$message.error(response.msg)
              }
            })
          }
        })
      },
       resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
  .modify-style {
    max-width: 400px;
    margin: 0 auto;
  }
</style>