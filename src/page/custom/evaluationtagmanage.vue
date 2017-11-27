/*
 * @Author: WuFengliang 
 * @Date: 2017-10-19 14:17:28 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 评价标签管理   
 */
<template>
  <div class="evaluation-tag-manager" v-if="data">
    <Tabs @on-click="chooseTab">
        <TabPane label="配送评价"></TabPane>
        <TabPane label="档口评价"></TabPane>
    </Tabs>
    <div class="first-tag tag-box">
      <h3>一级标签
        <Button class="right" type="primary" @click="addTags('1')">新增</Button>
      </h3>
      <div class="tag-content">
        <ul>
          <li v-for="(item,index) in data.oneStar" :key="index">
            <a @click="deleteTag(item)"></a>
            <span v-text="item.tagContent" v-if="!item.status" @click="editItem('oneStar',index)"></span>
            <input v-if="item.tagContent.length === 0 || item.status" :value="item.tagContent" type="text" @blur="checkValue($event,'oneStar',index)" v-focus="status">
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
          <li v-for="(item,index) in data.twoStar" :key="index">
            <a @click="deleteTag(item)"></a>
            <span v-text="item.tagContent" v-if="!item.status" @click="editItem('twoStar',index)"></span>
            <input v-if="item.tagContent.length === 0 || item.status" :value="item.tagContent"  type="text" @blur="checkValue($event,'twoStar',index)" v-focus="status">
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
          <li v-for="(item,index) in data.threeStar" :key="index">
            <a @click="deleteTag(item)"></a>
            <span v-text="item.tagContent" v-if="!item.status" @click="editItem('threeStar',index)"></span>
            <input v-if="item.tagContent.length === 0 || item.status" :value="item.tagContent" type="text" @blur="checkValue($event,'threeStar',index)" v-focus="status">
          </li>
        </ul>
      </div>
    </div>

    <div class="four-tag tag-box">
      <h3>四级标签
        <Button class="right" type="primary" @click="addTags('4')">新增</Button>
      </h3>
      <div class="tag-content">
        <ul>
          <li v-for="(item,index) in data.fourStar" :key="index">
            <a @click="deleteTag(item)"></a>
            <span v-text="item.tagContent" v-if="!item.status" @click="editItem('fourStar',index)"></span>
            <input v-if="item.tagContent.length === 0 || item.status" :value="item.tagContent" type="text" @blur="checkValue($event,'fourStar',index)" v-focus="status">
          </li>
        </ul>
      </div>
    </div>

    <div class="five-tag tag-box">
      <h3>五级标签
        <Button class="right" type="primary" @click="addTags('5')">新增</Button>
      </h3>
      <div class="tag-content">
        <ul>
          <li v-for="(item,index) in data.fiveStar" :key="index">
            <a @click="deleteTag(item)"></a>
            <span v-text="item.tagContent" v-if="!item.status" @click="editItem('fiveStar',index)"></span>
            <input v-if="item.tagContent.length === 0 || item.status" :value="item.tagContent" type="text" @blur="checkValue($event,'fiveStar',index)" v-focus="status">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import * as http from 'api/common'
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
      status: false, // 状态值
      btnIndex: 1, //  新增序号
      params: {
        tagType: '1' //  1表示档口评价，2表示配送评价
      },
      data: null // 数据集合
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    //  加载数据
    loadData() {
      http.getTagLists(this.params).then(data => {
        this.data = data
        for (let i in this.data) {
          for (let n = 0; n < this.data[i].length; n++) {
            this.data[i][n].status = false
          }
        }
        console.log(this.data)
      })
    },
    //  Tab选择
    chooseTab(name) {
      this.params.tagType = Number(name) + 1
      this.loadData()
    },
    addTags(name) {
      this.btnIndex = name
      //  新增标签
      switch (name) {
        case '1':
          this.data.oneStar.push({ tagContent: '' })
          break
        case '2':
          this.data.twoStar.push({ tagContent: '' })
          break
        case '3':
          this.data.threeStar.push({ tagContent: '' })
          break
        case '4':
          this.data.fourStar.push({ tagContent: '' })
          break
        case '5':
          this.data.fiveStar.push({ tagContent: '' })
          break
      }
      this.status = true
    },
    editItem(name, index) {
      this.$set(this.data[name][index], 'status', true)
      this.$forceUpdate()
    },
    checkValue(event, name, index) {
      //  检查值
      let value = event.target.value

      if (this.data[name][index].rkTagId) {
        //  修改 ——> 值未变
        if (this.data[name][index].tagContent === value) {
          this.$set(this.data[name][index], 'status', false)
          this.$forceUpdate()
          return
        } else {
          //  有修改
          this.data[name][index].tagContent = value
          http.putTag(this.data[name][index]).then(data => {
            this.loadData()
          })
          // this.$set(this.data[name][index], 'status', false)
          this.$forceUpdate()
        }
      } else {
        //  新增
        if (value.length === 0) {
          switch (this.btnIndex) {
            case '1':
              this.data.oneStar = this.data.oneStar.slice(
                0,
                this.data.oneStar.length - 1
              )
              break
            case '2':
              this.data.twoStar = this.data.twoStar.slice(
                0,
                this.data.twoStar.length - 1
              )
              break
            case '3':
              this.data.threeStar = this.data.threeStar.slice(
                0,
                this.data.threeStar.length - 1
              )
              break
            case '4':
              this.data.fourStar = this.data.fourStar.slice(
                0,
                this.data.fourStar.length - 1
              )
              break
            case '5':
              this.data.fiveStar = this.data.fiveStar.slice(
                0,
                this.data.fiveStar.length - 1
              )
              break
          }
        } else {
          switch (this.btnIndex) {
            case '1':
              this.data.oneStar.splice(this.data.oneStar.length - 1, 1, {
                tagContent: value
              })
              break
            case '2':
              this.data.twoStar.splice(this.data.twoStar.length - 1, 1, {
                tagContent: value
              })
              break
            case '3':
              this.data.threeStar.splice(this.data.threeStar.length - 1, 1, {
                tagContent: value
              })
              break
            case '4':
              this.data.fourStar.splice(this.data.fourStar.length - 1, 1, {
                tagContent: value
              })
              break
            case '5':
              this.data.fiveStar.splice(this.data.fiveStar.length - 1, 1, {
                tagContent: value
              })
              break
          }
          http
            .addTag({
              tagContent: value,
              // tagLevel: this.data[name][0].tagLevel,
              tagLevel: parseInt(this.btnIndex),
              objType: this.params.tagType,
              tagStatus: 1
            })
            .then(data => {
              this.loadData()
            })
        }
        this.status = false
      }
    },
    deleteTag(item) {
      console.log(item)
      //  删除标签
      http
        .delTag({
          id: item.rkTagId
        })
        .then(data => {
          this.loadData()
        })
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
  content: '\2715';
}

.tag-content ul li span:hover {
  background-color: #f1f1f1;
}
</style>

