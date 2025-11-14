<script setup lang="ts">
import type { FormInstance } from 'element-plus'

const search = ref('')
const state = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 100,
})
const loading = ref(false)
const confirmLoading = ref(false)
const delVisible = ref(false)
const delItem = ref(null)
const dialogVisible = ref(false)
const formRef = ref<FormInstance>()
const form = reactive({
  username: '',
  name: '',
  password: '',
  loginable: true,
  permissions: [],
})
const data = ref([
  { username: 'admin', name: '管理员', permissions: '管理员' },
  { username: 'username1', name: '用户1', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'username2', name: '用户2', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'admin1', name: '管理员', permissions: '管理员' },
  { username: 'username11', name: '用户1', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'username12', name: '用户2', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'admin2', name: '管理员', permissions: '管理员' },
  { username: 'username21', name: '用户1', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'username22', name: '用户2', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'admin3', name: '管理员', permissions: '管理员' },
  { username: 'username31', name: '用户1', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'username32', name: '用户2', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'admin4', name: '管理员', permissions: '管理员' },
  { username: 'username41', name: '用户1', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'username42', name: '用户2', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'admin5', name: '管理员', permissions: '管理员' },
  { username: 'username51', name: '用户1', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'username52', name: '用户2', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'admin6', name: '管理员', permissions: '管理员' },
  { username: 'username61', name: '用户1', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'username62', name: '用户2', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'admin7', name: '管理员', permissions: '管理员' },
  { username: 'username71', name: '用户1', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'username72', name: '用户2', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'admin8', name: '管理员', permissions: '管理员' },
  { username: 'username81', name: '用户1', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
  { username: 'username82', name: '用户2', permissions: '泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机、数据查询' },
])
const permissionOptions: { key: string; label: string }[] = [{
  key: 'nishui',
  label: '泥水环流',
}, {
  label: '盾尾密封',
  key: 'dunwei',
},
{
  label: '推进系统',
  key: 'tuijin',
},
{
  label: '刀盘系统',
  key: 'daopan',
},
{
  label: '驱动电机',
  key: 'qudong',
},
{
  label: '数据查询',
  key: 'shujv',
}]

const update = () => {
  // loading.value = true
  console.log('search: ', search.value)
}

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

const openDailog = (item: any) => {
  dialogVisible.value = true
  console.log('item: ', item)
}

const handleConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  try {
    // const validated = await formEl.validate()

  } catch (error) {
    console.log(error)
  }
}

const handleDelete = (item: any) => {
  delItem.value = item
  delVisible.value = true
}

const onDelete = () => {
  console.log('delItem: ', delItem.value)
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <div class="search">
        <label>搜索：</label>
        <el-input placeholder="请输入关键词" v-model="search" style="width: 366px;" clearable @clear="update" @keyup.enter="update">
          <template #suffix>
            <el-icon class="search-icon" @click="update"><i-ep-search /></el-icon>
          </template>
        </el-input>
      </div>
      <el-button type="primary" @click="openDailog">新增
        <template #icon>
          <i-ep-plus />
        </template>
      </el-button>
    </div>
    <div class="card-body">
      <el-table :data="data" row-key="username" stripe height="100%" v-loading="loading">
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="permissions" label="权限" width="460px" />
        <el-table-column label="操作" width="120px">
          <template #default="{row}">
            <el-button type="primary" link @click="openDailog(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="card-footer">
      <el-pagination background layout="total, prev, pager, next, sizes" :page-sizes="[10, 20, 50, 100]"
        :total="state.total" v-model:current-page="state.currentPage" v-model:page-size="state.pageSize"
        :hide-on-single-page="false" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="新增用户" width="720">
    <el-form class="add-user" ref="formRef" :model="form" label-width="100px" style="width: 88%;">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="登录权限">
        <el-switch v-model="form.loginable" />
      </el-form-item>
      <el-form-item label="权限">
        <el-transfer v-model="form.permissions" :data="permissionOptions" :titles="['未选', '已选']" :button-texts="['移除', '添加']" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm(formRef)" :disabled="confirmLoading">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="delVisible" title="提示" width="420">
    <div class="dialog-content">
      <el-icon class="dialog-icon"><i-ep-warning /></el-icon>
      <el-text>删除后不可恢复，是否确认删除？</el-text>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="delVisible = false">取消</el-button>
        <el-button type="danger" @click="onDelete" :disabled="confirmLoading">
          删除
        </el-button>
      </div>
    </template>
  </el-dialog>
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

    &-icon {
      cursor: pointer;

      &:hover {
        color: var(--el-color-primary);
      }
    }

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

.add-user {
  :deep(.el-transfer) {
    --el-transfer-panel-body-height: 200px;
  }

  :deep(.el-transfer__buttons) {
    padding: 0 16px;
    display: inline-flex;
    flex-direction: column-reverse;

  }

  :deep(.el-transfer__button:nth-child(2)) {
    margin: 0 0 10px;
  }
}

.dialog-content {
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-bottom: 16px;

  .dialog-icon {
    margin-right: 10px;
    font-size: 24px;
    color: var(--el-color-warning);
  }
}
</style>