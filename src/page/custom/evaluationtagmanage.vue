/*
 * @Author: WuFengliang 
 * @Date: 2017-10-19 14:17:28 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 评价标签管理   
 */
<template>
  <div class="evaluation-tag-manager">
    <div class="first-tag tag-box">
      <h3>一级标签
        <Button class="right" type="primary" @click="addTags('1')">新增</Button>
      </h3>
      <div class="tag-content">
        <ul>
          <li v-for="(item,index) in firstTags" :key="index">
            <a @click="deleteTag(index,1)"></a>
            <span v-text="item"></span>
            <input v-if="item.length === 0" type="text" @blur="checkValue" v-focus="status">
          </li>
        </ul>
      </div>
    </div>
  
    <div class="second-tag tag-box">
      <h3>二级标签
        <Button class="right" type="primary" @click="addTags('2')">新增</Button>
      </h3>
      <div class="tag-content">
        <ul>
          <li v-for="(item,index) in secondTags" :key="index">
            <a @click="deleteTag(index,2)"></a>
            <span v-text="item"></span>
            <input v-if="item.length === 0" type="text" @blur="checkValue" v-focus="status">
          </li>
        </ul>
      </div>
    </div>
  
    <div class="third-tag tag-box">
      <h3>三级标签
        <Button class="right" type="primary" @click="addTags('3')">新增</Button>
      </h3>
      <div class="tag-content">
        <ul>
          <li v-for="(item,index) in thirdTags" :key="index">
            <a @click="deleteTag(index,3)"></a>
            <span v-text="item"></span>
            <input v-if="item.length === 0" type="text" @blur="checkValue" v-focus="status">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'evaluationTag',
    directives: {
      focus: {
        inserted(el, value) {
          if (value) {
            el.focus()
          }
        }
      }
    },
    data() {
      return {
        firstTags: ['商品品质太差', '商品品质太差'],
        secondTags: ['商品品质太差', '商品品质太差'],
        thirdTags: ['商品品质太差', '商品品质太差'],
        status: false, // 状态值
        btnIndex: 1 //  新增序号
      }
    },
    methods: {
      addTags(name) {
        //  新增标签
        switch (name) {
          case '1':
            this.btnIndex = 1
            this.firstTags.push('')
            break
          case '2':
            this.btnIndex = 2
            this.secondTags.push('')
            break
          case '3':
            this.btnIndex = 3
            this.thirdTags.push('')
            break
        }
        this.status = true
      },
      checkValue(event) {
        //  检查值
        let value = event.target.value
        if (value.length === 0) {
          switch (this.btnIndex) {
            case 1:
              this.firstTags = this.firstTags.slice(0, this.firstTags.length - 1)
              break
            case 2:
              this.secondTags = this.secondTags.slice(0, this.firstTags.length - 1)
              break
            case 3:
              this.thirdTags = this.thirdTags.slice(0, this.firstTags.length - 1)
          }
        } else {
          switch (this.btnIndex) {
            case 1:
              this.firstTags.splice(this.firstTags.length - 1, 1, value)
              break
            case 2:
              this.secondTags.splice(this.secondTags.length - 1, 1, value)
              break
            case 3:
              this.thirdTags.splice(this.thirdTags.length - 1, 1, value)
          }
        }
        this.status = false
      },
      deleteTag(index, num) {
        //  删除标签
        switch (num) {
          case 1:
            this.firstTags.splice(index, 1)
            break
          case 2:
            this.secondTags.splice(index, 1)
            break
          case 3:
            this.thirdTags.splice(index, 1)
            break
        }
      }
    }
  }
</script>

<style scoped lang="css">
  .evaluation-tag-manager {
    overflow: hidden;
  }
  
  .right {
    float: right;
  }
  
  .tag-box {
    overflow: hidden;
    margin: 20px auto 10px;
  }
  
  .tag-box h3 {
    overflow: hidden;
  }
  
  .tag-content {
    box-sizing: border-box;
    padding: 20px;
    overflow: hidden;
    margin: 20px auto 10px;
    border: 1px solid #ccc;
  }
  
  .tag-content ul li {
    float: left;
    position: relative;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin: 10px 20px;
  }
  
  .tag-content ul li a {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 16px;
    height: 16px;
    border-radius: 40%;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 14px;
    background-color: #fff;
  }
  
  .tag-content ul li a::after {
    content: "\2715";
  }
  
  .tag-content ul li span:hover {
    background-color: #f1f1f1;
  }
</style>
