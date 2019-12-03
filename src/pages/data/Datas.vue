<template>
  <a-card>
    <div>
      <a-form layout="horizontal">
        <div>
          <a-row>
            <a-col :md="8" :sm="24">
              <a-form-item label="日期" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
                <a-range-picker @change="onChange" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col style="float:right;margin-bottom:5px">
              <a-button type="primary" @click="onChange()">查询</a-button>
            </a-col>
          </a-row>
        </div>
      </a-form>
    </div>
    <div>
      <a-table
        :scroll="{ x: 1700}"
        :columns="columns"
        :dataSource="dataSource"
        :loading="loading"
        :pagination='pagination'
        @change="handleTableChange"
        :rowKey="record => record.id"
      ></a-table>
    </div>
  </a-card>
</template>
<script>

const renderContent = (value, row, index) => {
  const obj =
    row.rechargeOne +
    "_" +
    row.rechargeTwo +
    "_" +
    row.rechargeThree +
    "_" +
    row.rechargeFour +
    "_" +
    row.rechargeFive +
    "_" +
    row.rechargeSix;
  return obj;
};

const columns = [
  {
    title: "日期",
    width:"60px",
    dataIndex: "recordDate",
    customRender: function(text) {
      let strs = text.split(" ");
      return strs[0];
    }
  },
  {
    title: "玩家总数",
    width:"70px",
    dataIndex: "playerSum"
  },
  {
    title: "充值总额",
    width:"70px",
    dataIndex: "rechargeAmountSum"
  },
  {
    title: "Android充值总额",
    width:"100px",
    dataIndex: "rechargeAmountAndroid"
  },
  {
    title: "Ios充值总额",
    width:"70px",
    dataIndex: "rechargeAmountIos"
  },
  {
    title: "充值总人数",
    width:"70px",
    dataIndex: "rechargePeopleSum"
  },
  {
    title: "今日新增玩家",
    width:"70px",
    dataIndex: "playerNum"
  },
  {
    title: "今日充值金额",
    width:"70px",
    dataIndex: "rechargeAmountNum"
  },
  {
    title: "今日活跃玩家",
    width:"70px",
    dataIndex: "aliveNum"
  },
  {
    title: "今日充值人数",
    width:"70px",
    dataIndex: "rechargePeopleNum"
  },
  {
    title: "每日留存率",
    width:"70px",
    dataIndex: "retentionRateTwo"
  },
  {
    title: "三日留存率",
    width:"70px",
    dataIndex: "retentionRateThree"
  },
  {
    title: "购买人数",
    width:"70px",
    dataIndex: "rechargeSexSum",
    customRender: renderContent
  }
];

const dataSource = [];

export default {
  name: "datas",
  data() {
    return {
      dataSource,
      pagination: {
        pageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        showQuickJumper: false,
        pageSizeOptions: ["10", "20", "50", "100", "200"],
        total: 0
      },
      loading: false,
      columns,
      params: {},
      pageNumber:1
    };
  },
  mounted() {
    this.params.pageNum = 1;
    this.params.pageSize = this.pagination.pageSize;

    this.$store.dispatch("DataPageList", this.params).then(res => {
      this.dataSource = res.data.list;
      this.pagination.total = res.data.total;
    });
  },
  methods: {
    handleTableChange(page) {
      this.pagination.pageSize = page.pageSize;
      this.params.pageNum = page.current;
      this.params.pageSize = page.pageSize;
      this.$store.dispatch("DataPageList", this.params).then(res => {
        this.dataSource = res.data.list;
        this.pagination.total = res.data.total;
      });
    },
    onChange(date, dateString) {
      this.params.pageNum = 1;
      this.params.pageSize = this.pagination.pageSize;
      if(dateString){
        this.params.sDate = dateString[0];
        this.params.eDate = dateString[1];
      }
      this.$store.dispatch("DataPageList", this.params).then(res => {
        this.dataSource = res.data.list;
        this.pagination.total = res.data.total;
      });
    }
  }
};
</script>