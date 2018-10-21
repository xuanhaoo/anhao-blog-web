<template>
  <div class="app-container calendar-list-container">

   	<el-form :inline="true">
      <el-form-item>
        <el-input  placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button>查询</el-button>
        <el-button  type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button  type="danger" @click="" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%" @selection-change="selectionChangeHandle">
      <el-table-column type="selection" width="55">
    </el-table-column>
      <el-table-column align="center" :label="$t('ulTable.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="50px" align="center" :label="$t('ulTable.account')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.account}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('ulTable.avatar')">
        <template slot-scope="scope">
        	<img class="user-avatar" :src="scope.row.avatar+'?imageView2/1/w/80/h/80'">
          <!-- <span>{{scope.row.avatar}}</span> -->
        </template>
      </el-table-column>
      <el-table-column width="190px" align="center" :label="$t('ulTable.email')">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('ulTable.nickname')" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('ulTable.createDate')">
        <template slot-scope="scope">
          <span>{{scope.row.createDate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('ulTable.phone')">
        <template slot-scope="scope">
          <span>{{scope.row.mobilePhoneNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" align="center" :label="$t('ulTable.status')" width="100">
        <template slot-scope="scope">
        	<el-tag v-if="scope.row.status=='normal'" size="samll">正常
          </el-tag>
          <el-tag v-if="scope.row.status=='blocked'" size="small" type="danger">禁用中
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" align="center" :label="$t('ulTable.roles')" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.roles}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" align="center" :label="$t('ulTable.last_login')" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.lastLogin}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="addOrUpdateHandle(scope.row.id)">{{$t('table.edit')}}</el-button>
          <el-button type="danger" size="mini" @click="deleteHandel(scope.row.id)">{{$t('table.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="margin-top: 15px;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshList="getList"></add-or-update>
  	<!--可自定义按钮的样式、show/hide临界点、返回的位置  -->
    <!--如需文字提示，可在外部添加element的<el-tooltip></el-tooltip>元素  -->
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></back-to-top>
    </el-tooltip>
  </div>

  
</template>

<script>
import { fetchList, deleteUser } from '@/api/users'
import waves from '@/directive/waves' // 水波纹指令
import AddOrUpdate from './add-or-update'
import BackToTop from '@/components/BackToTop'
// import { parseTime } from '@/utils'

export default {
  name: 'users',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
      },
      dataListSelections: [],
      addOrUpdateVisible: false,
       myBackToTopStyle: {
        right: '40px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      }

      // showReviewer: false,
      // temp: {
      //   id: undefined,
      //   importance: 1,
      //   remark: '',
      //   timestamp: new Date(),
      //   title: '',
      //   type: '',
      //   status: 'published'
      // },
      // dialogFormVisible: false,
      // dialogStatus: '',
      // textMap: {
      //   update: 'Edit',
      //   create: 'Create'
      // },
      // dialogPvVisible: false,
      // pvData: [],
      // rules: {
      //   type: [{ required: true, message: 'type is required', trigger: 'change' }],
      //   timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
      //   title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      // },
      // downloadLoading: false
    }
  },
  filters: {
    // statusFilter(status) {
    //   const statusMap = {
    //     published: 'success',
    //     draft: 'info',
    //     deleted: 'danger'
    //   }
    //   return statusMap[status]
    // },
    // typeFilter(type) {
    //   return calendarTypeKeyValue[type]
    // }
  },
  components: {
  	AddOrUpdate,
  	BackToTop
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.totalCount
        this.listLoading = false
      })
    },
    //选择每页显示的条数
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    //选择当前页
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },

    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
      	this.$refs.addOrUpdate.init(id)
      })
    },
    //删除
    deleteHandel (id) {

    	var userIds = id ? [id] : this.dataListSelections.map(item => {
          return item.userId
        })
        this.$confirm(`确定对[id=${userIds.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	deleteUser(userIds).then(response => {
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

    }
  }
}
</script>
