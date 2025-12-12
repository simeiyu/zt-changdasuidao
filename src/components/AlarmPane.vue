<script setup lang="ts">
import { filter } from 'lodash'

defineProps({
  height: {
    type: Number,
    default: 265
  },
  data: {
    type: Array<{time: string, content: string}>,
    default: () => []
  },
  collects: {
    type: Array<{label: string, value: number}>,
    default: () => []
  }
})
const dialogVisible = ref(false)
const form = reactive({
  xt: '',
  time: '',
  status: ''
})

const page = reactive({
  current: 1,
  size: 10,
})

const constSource = [{
  id: 1,
  xt: '推进系统',
  time: '2025-11-24 11:28:37',
  content: '推进油缸位移9出现异常，可能出现内泄露故障，建议降低推进速度，通过盾构姿态控制系统补偿位移偏差',
  status: '已恢复',
  clStatus: '已处理'
}, {
  id: 2,
  xt: '驱动电机',
  time: '2025-10-21 14:37:54',
  content: '1#电机过载，建议降低负载，进行排查',
  status: '已恢复',
  clStatus: '已处理'
}, {
  id: 3,
  xt: '刀盘系统',
  time: '2025-10-05 11:43:07',
  content: '存在显著刀盘负载异常，结泥饼风险较高，建议进行冲洗',
  status: '已恢复',
  clStatus: '已处理'
}, {
  id: 4,
  xt: '驱动电机',
  time: '2025-09-21 16:46:22',
  content: '6#电机可能轴承损坏，建议进行排查',
  status: '已恢复',
  clStatus: '已处理'
}, {
  id: 5,
  xt: '刀盘系统',
  time: '2025-09-15 13:43:54',
  content: '刀盘负载异常，存在结泥饼风险，建议进行冲洗',
  status: '已恢复',
  clStatus: '已处理'
}, {
  id: 6,
  xt: '盾尾密封',
  time: '2025-09-06 10:27:14',
  content: '盾尾密封前中腔4压力压力突然升高，密封口可能形成堵塞，建议检查密封口',
  status: '已恢复',
  clStatus: '已处理'
}, {
  id: 7,
  xt: '驱动电机',
  time: '2025-09-03 10:27:23',
  content: '12#电机过载，建议降低负载，进行排查',
  status: '已恢复',
  clStatus: '已处理'
}, {
  id: 8,
  xt: '泥水环流',
  time: '2025-08-26 09:46:17',
  content: 'P2.1可能异常磨损，建议关闭故障泵的进浆阀、排浆阀，检查关键部位磨损量',
  status: '已恢复',
  clStatus: '已处理'
}, {
  id: 9,
  xt: '驱动电机',
  time: '2025-08-22 16:12:31',
  content: '6#电机过载，建议降低负载，进行排查',
  status: '已恢复',
  clStatus: '已处理'
}, {
  id: 10,
  xt: '推进系统',
  time: '2025-07-22 17:34:42',
  content: '推进B组压力过高，建议降低 A 组推进比例阀电流',
  status: '已恢复',
  clStatus: '已处理'
}, {
  id: 11,
  xt: '盾尾密封',
  time: '2025-07-18 15:34:22',
  content: '盾尾密封前中腔4压力压力突然升高，密封口可能形成堵塞，建议检查密封口',
  status: '已恢复',
  clStatus: '已处理'
}, {
  id: 12,
  xt: '推进系统',
  time: '2025-06-14 10:26:31',
  content: '进泵12压力压力过高，建议检查出口溢流阀',
  status: '已恢复',
  clStatus: '已处理'
}, {
  id: 13,
  xt: '泥水环流',
  time: '2025-05-22 15:54:12',
  content: 'P0.4可能异常磨损，建议关闭故障泵的进浆阀、排浆阀，检查关键部位磨损量',
  status: '已恢复',
  clStatus: '已处理'
}, {
  id: 14,
  xt: '盾尾密封',
  time: '2025-05-14 15:34:22',
  content: '盾尾密封前中腔4压力压力突然升高，密封口可能形成堵塞，建议检查密封口',
  status: '已恢复',
  clStatus: '已处理'
}, {
  id: 15,
  xt: '刀盘系统',
  time: '2025-04-21 10:16:39',
  content: '刀盘负载异常，存在结泥饼风险，建议进行冲洗',
  status: '已恢复',
  clStatus: '已处理'
}, {
  id: 16,
  xt: '泥水环流',
  time: '2025-03-18 16:37:31',
  content: 'P1.1可能出现密封失效，建议关闭故障泵的进浆阀、排浆阀，进行排查',
  status: '已恢复',
  clStatus: '已处理'
}, {
  id: 17,
  xt: '盾尾密封',
  time: '2025-02-14 16:17:56',
  content: '盾尾密封后腔腔2压力变化速度异常，可能出现盾尾密封刷泄露，建议暂停推进，进行排查定位泄露区域',
  status: '已恢复',
  clStatus: '已处理'
}]

const source = ref(constSource)

const updateSource = () => {
  page.current = 1
  source.value = !form.xt && !form.time && !form.status ? constSource : filter(constSource, ({xt, time, status}) => {
    return !!form.xt && form.xt === xt || !!form.time && time.indexOf(form.time) > -1 || !!form.status && status === form.status 
  })
}

const alarmList = computed(() => source.value.slice((page.current - 1) * page.size, page.current * page.size))
</script>

<template>
  <Title1 class="mg-t mg-l mg-r">预测报警</Title1>
  <div class="alarm-btn">
    <el-button size="small" @click="dialogVisible=true">详情<el-icon class="el-icon--right"><i-ep-arrow-right /></el-icon></el-button>
  </div>
  <div class="alarm">
    <div class="alarm-item" v-for="item in collects" key="item.label">
      <span class="alarm-value">{{ item.value }}</span>
      <span class="alarm-label">{{ item.label }}</span>
    </div>
  </div>
  <div class="alarm-table">
    <el-table :data="data" size="small" :height="height">
      <el-table-column label="序号" type="index" width="44" />
      <el-table-column prop="time" label="时间" width="96" />
      <el-table-column prop="content" label="报警内容" />
    </el-table>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="报警记录"
    width="66vw"
  >
    <el-form inline>
      <el-form-item label="报警系统" :label-width="80">
        <el-select style="width: 200px;" v-model="form.xt" :options="[{label: '泥水环流', value: '泥水环流'}, {label: '盾尾密封', value: '盾尾密封'}, {label: '推进系统', value: '推进系统'}, {label: '刀盘系统', value: '刀盘系统'}, {label: '驱动电机', value: '驱动电机'}]" @change="updateSource" clearable />
      </el-form-item>
      <el-form-item label="报警时间">
        <el-date-picker v-model="form.time" value-format="YYYY-MM-DD" @change="updateSource" />
      </el-form-item>
      <el-form-item label="报警状态">
        <el-select style="width: 200px;" v-model="form.status" :options="[{label: '已恢复', value: '已恢复'}, {label: '报警中', value: '报警中'}]" @change="updateSource" clearable />
      </el-form-item>
    </el-form>
    <el-table class="tb" :data="alarmList" :height="462" stripe>
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column prop="xt" label="报警系统" width="100" />
      <el-table-column prop="time" label="报警时间" width="160" />
      <el-table-column prop="content" label="报警内容" show-overflow-tooltip />
      <el-table-column prop="status" label="报警状态" width="100" />
      <el-table-column prop="clStatus" label="处理状态" width="100">
        <template #default="scope">
          <el-tag
            :type="scope.row.clStatus === '待处理' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.clStatus }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template #default>
          <el-button link type="primary" :disabled="true">处理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <template #footer>
      <el-pagination
        class="pagination" layout="total, prev, pager, next, sizes" background
        v-model:current-page="page.current"
        v-model:page-size="page.size"
        :total="source.length"
      />
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.alarm {
  display: flex;
  justify-content: space-around;
  align-items: center;

  &-btn {
    padding: 8px 8px 0;
    display: flex;
    justify-content: flex-end;
  }

  &-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 12px;
    font-size: 14px;
    color: #4C5A67;
  }

  &-value {
    font-size: 16px;
    font-weight: bold;
    color: #F53F3F;
    line-height: 24px;
  }

  &-table {
    padding: 0 8px;

    :deep(.el-table--small) {
      font-size: var(--el-font-size-base);
    }

    :deep(.el-table th.el-table__cell) {
      font-weight: normal;
      background-color: #F4F6F9;
    }

    :deep(.el-table__body td.el-table__cell) {
      color: var(--el-text-color-primary);
    }
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
}

.tb {
  :deep(.el-table__header th.el-table__cell) {
    background-color: #F4F6F9;
  }
}
</style>
