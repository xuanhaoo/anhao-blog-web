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
      style="width: 100%" @selection-change="selectionChangeHandle" size="small">
      <el-table-column type="selection" width="55">
    </el-table-column>
      <el-table-column align="center" :label="$t('artTable.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" :label="$t('artTable.title')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" align="center" :label="$t('artTable.summary')">
        <template slot-scope="scope">
          <span>{{scope.row.summary}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="$t('artTable.author')">
        <template slot-scope="scope">
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('artTable.category')" width="120">
        <template slot-scope="scope">
          <el-button>{{scope.row.category.categoryName}}</el-button>         
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="$t('artTable.viewCounts')">
        <template slot-scope="scope">
          <span style="font-family: Arial;font-size:16px;">{{scope.row.viewCounts}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('artTable.createDate')">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createDate | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="$t('artTable.commentCounts')">
        <template slot-scope="scope">
          <span style="font-family: Arial;font-size:16px;">{{scope.row.commentCounts}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="$t('artTable.weight')">
        <template slot-scope="scope">
           <el-button type="success" icon="el-icon-upload2" v-if="scope.row.weight==1" size="mini" circle></el-button>
           <el-button type="info" icon="el-icon-minus" v-if="scope.row.weight==0" size="mini" circle></el-button>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" align="center" :label="$t('artTable.status')" width="100">
        <template slot-scope="scope">         
        	<el-tag v-if="scope.row.status==1" size="small">已发表
          </el-tag>
          <el-tag v-if="scope.row.status==0" size="small" type="danger">草稿
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="addOrUpdateHandle(scope.row.id)" icon="el-icon-edit" title="编辑"></el-button>
          <el-button type="danger" size="mini" @click="deleteHandel(scope.row.id)" icon="el-icon-delete" title="删除"></el-button>
          <el-button type="warning" size="mini" @click="" v-if="scope.row.status==0" icon="el-icon-success" title="发布"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="margin-top: 15px;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 弹窗, 新增 / 修改 -->
    <!-- <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshList="getList"></add-or-update> -->
  	<!--可自定义按钮的样式、show/hide临界点、返回的位置  -->
    <!--如需文字提示，可在外部添加element的<el-tooltip></el-tooltip>元素  -->
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></back-to-top>
    </el-tooltip>
  </div>

  
</template>

<script>
import { queryList, deleteArticle } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import BackToTop from '@/components/BackToTop'
import { parseTime } from '@/utils'

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
      siderBoolean: false,
      dataListSelections: [],
      deleteArticleId: {
        id: 0
      },
      // addOrUpdateVisible: false,
      // 
      // 返回顶部小组件
       myBackToTopStyle: {
        right: '40px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      }
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
  	BackToTop
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryList(this.listQuery).then(response => {
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
   //新增 / 修改
    addOrUpdateHandle (id) {
      // 跳转路由
      this.$router.push({ 
        //path: '/article/pubArt',
        name: 'PubArticle',
        params: {
          art_id: id
        }
      })
    },
    //删除
    deleteHandel (id) {

    	this.deleteArticleId.id = id
        this.$confirm(`确定删除操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteArticle(this.deleteArticleId).then(response => {
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
