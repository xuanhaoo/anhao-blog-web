<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close="clearCache">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户名" prop="account">
        <el-input v-model="dataForm.account" placeholder="登录帐号" :disabled="dataForm.id != 0"></el-input>
      </el-form-item>
      <el-form-item v-if="!dataForm.id" label="密码" prop="password" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item v-if="!dataForm.id" label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="dataForm.nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobilePhoneNumber">
        <el-input v-model="dataForm.mobilePhoneNumber" placeholder="手机号"></el-input>
      </el-form-item>
     <!--  <el-form-item label="角色" size="mini" prop="roleIdList">
        <el-checkbox-group v-model="dataForm.roleIdList">
          <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{ role.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">正常</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { addUser, updateUser, getUser } from '@/api/users'
  import { isEmail, isMobile } from '@/utils/validate'
  export default {
    data () {
      var validatePassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }
      var validateComfirmPassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('确认密码不能为空'))
        } else if (this.dataForm.password !== value) {
          callback(new Error('确认密码与密码输入不一致'))
        } else {
          callback()
        }
      }
      var validateEmail = (rule, value, callback) => {
        if (!isEmail(value)) {
          callback(new Error('邮箱格式错误'))
        } else {
          callback()
        }
      }
      var validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        roleList: [],
        dataForm: {
          id: 0,
          account: '',
          password: '',
          comfirmPassword: '',
          // salt: '',
          nickname: '',
          email: '',
          mobilePhoneNumber: '',

          // roles: '',
          status: 0,

        },
        query: {
          id: 0
        },
        dataRule: {
          account: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          comfirmPassword: [
            { validator: validateComfirmPassword, trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '昵称不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { validator: validateEmail, trigger: 'blur' }
          ],
          mobilePhoneNumber: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.query.id = id || 0
        this.visible = true
        if (this.dataForm.id) {
          getUser(this.query).then(response => {
            if (response && response.code === 0) {
              this.dataForm.account = response.data.account
              this.dataForm.nickname = response.data.nickname
              this.dataForm.salt = response.data.salt
              this.dataForm.email = response.data.email
              this.dataForm.mobilePhoneNumber = response.data.mobilePhoneNumber
              if (response.data.status == 'normal') {
                this.dataForm.status = 0
              } else {
                this.dataForm.status = 1
              }
              
            }
          })
        }
      },
      //表单提交
      dataFormSubmit () {
        this.$refs.dataForm.validate(valid => {
          if (valid) {
            var datas = {
              'id': this.dataForm.id || undefined,
              'account': this.dataForm.account,
              'password': this.dataForm.password,
              'nickname': this.dataForm.nickname,
              'email': this.dataForm.email,
              'mobilePhoneNumber': this.dataForm.mobilePhoneNumber,
              'status': this.dataForm.status
            }
            var tick = !this.dataForm.id ? addUser(datas) : updateUser(datas)
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
      },
      //关闭后清空表单
      clearCache () {
        this.$refs['dataForm'].resetFields()
      }
    }
  }
</script>