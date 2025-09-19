<script setup lang="ts">
const search = ref('')
const state = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 100,
})
const data = ref([
  { username: 'admin', name: '管理员', permissions: '管理员' },
  { username: 'username1', name: '用户1', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'username2', name: '用户2', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
])

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <div class="search">
        <label>搜索：</label>
        <el-input placeholder="请输入关键词" v-model="search" style="width: 366px;">
          <template #suffix>
            <el-icon><i-ep-search /></el-icon>
          </template>
        </el-input>
      </div>
      <el-button type="primary">新增
        <template #icon>
          <i-ep-plus />
        </template>
      </el-button>
    </div>
    <div class="card-body">
      <el-table :data="data" row-key="username" stripe>
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="permissions" label="权限" width="460px" />
        <el-table-column label="操作" width="120px" >
          <template #default>
            <el-button type="primary" link>编辑</el-button>
            <el-button type="danger" link>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="card-footer">
      <el-pagination
        background
        layout="total, prev, pager, next, sizes"
        :page-sizes="[10, 20, 50, 100]"
        :total="state.total"
        v-model:current-page="state.currentPage"
        v-model:page-size="state.pageSize"
        :hide-on-single-page="false"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgb(0 29 77 / 10%);

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    padding: 16px 0;
    border-bottom: 1px solid var(--el-border-color);
  }

  &-body {
    height: calc(100% - 120px);
    padding: 16px 0;

    :deep(.el-table__header-wrapper th.el-table__cell) {
      background-color: var(--el-fill-color-light);
    }
  }

  .search {
    display: flex;
    align-items: center;

    label {
      margin-left: 4px;
      margin-right: 10px;
      white-space: nowrap;
    }
  }

  &-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>