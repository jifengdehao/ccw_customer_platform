<template>
  <div>
    <Row class="mb10">
      <Col span="6">
      <span class="expand-key">交易号：</span>
      <span class="expand-value">{{ row.transactionNumber }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">收货人手机：</span>
      <span class="expand-value">{{ row.consigneeTel }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">收货人：</span>
      <span class="expand-value">{{ row.consignee }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">下单时间：</span>
      <span class="expand-value">{{ row.orderTime }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="6">
      <span class="expand-key">订单状态：</span>
      <span class="expand-value">{{ row.orderStatus }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">商户ID：</span>
      <span class="expand-value">{{ row.sellerId }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">商品价格：</span>
      <span class="expand-value">{{ row.goodPrice }}</span>
      </Col>
    </Row>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      row: Object
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
