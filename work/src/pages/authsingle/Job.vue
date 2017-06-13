<!--
  -- 工作信息
  -- @description 单期贷工作信息资料填写
  -- @author bigfact
  -- @date 2017.05.22
  -->
<template>
  <section class="authsingle-job container fs18">
    <!--工作信息-->
    <div class="form bg-white">
      <div class="row line"></div>
      <!--单位名称-->
      <div class="row">
        <span>单位名称</span>
        <input type="text" class="form-value" maxlength="18" v-model="work_info.name.model" placeholder="请输入工作单位全称">
      </div>
      <!--单位所在地-->
      <div class="row link" @click="showSelect(work_info.city)">
        <span>单位所在地</span>
        <p class="address-text form-value text-hide">{{ work_info.city.address }}</p>
      </div>
      <d-select-address class="fs15" :item="work_info.city" v-show="work_info.city.showSelect" @selected="workAddressSelected"></d-select-address>
      <!--详细地址-->
      <div class="row">
        <input type="text" class="address-input" v-model="work_info.address.model" placeholder="请填写详细地址，不少于5个字">
      </div>
      <!--单位电话-->
      <div class="row">
        <span>单位电话</span>
        <span class="form-value">
          <span>{{ work_info.tel.quCode }}</span>
        <span>-</span>
        <input type="tel" class="tel-input" maxlength="8" v-model="work_info.tel.input" placeholder="请输入座机号" @focus="telInputFocus($event)">
        </span>
      </div>
    </div>
    <!--分期贷追加工作信息-->
    <div class="form bg-white" v-if="applytype == 'multiple'">
      <div class="row line"></div>
      <!--行业类型-->
      <div class="row select" @click="showSelect(work_info.industry)">
        <span>行业类型</span>
        <p class="form-value">{{ work_info.industry.key }}</p>
      </div>
      <d-select id="industry-select" :datas="work_info.industry.datas" :value="work_info.industry.value" @selected="industrySelected" v-show="work_info.industry.showSelect"></d-select>
      <!--职位-->
      <div class="row select" @click="positionShowSelect()">
        <span>职位</span>
        <p class="form-value">{{ work_info.position.key }}</p>
      </div>
      <d-select id="position-select" :datas="work_info.position.datas" :value="work_info.position.value" @selected="positionSelected" v-show="work_info.position.showSelect"></d-select>
      <!--月收入-->
      <div class="row select" @click="showSelect(work_info.income)">
        <span>月收入</span>
        <p class="form-value">{{ work_info.income.key }}</p>
      </div>
      <d-select id="income-select" :datas="work_info.income.datas" :value="work_info.income.value" @selected="incomeSelected" v-show="work_info.income.showSelect"></d-select>
    </div>
    <!--提交按钮-->
    <button class="btn bottom fs20" v-submit="{cb: submit}">保存</button>
  </section>
</template>

<script>
  import DSelectAddress from '../../components/common/DSelectAddress'
  import DSelect from '../../components/common/DSelect'

  // 导入下拉列表数据
  import datasIndustry from '../../services/datas-industry.json'
  import datasIncome from '../../services/datas-income.json'

  var $data = {
    // 申请类型，单期 single ，分期 multiple
    applytype: sysinfo.getQueryString('applytype') || 'single',
    // // 是否为修改资料
    // modify: false,
    // 工作信息
    work_info: {
      // 名称
      name: {
        model: '',
        reg: function (val) {
          val = val || ''
          return regexp.empty(val) && val.length < 19
        },
        err: '请输入工作单位名称'
      },
      // 所在地
      city: {
        address: '',
        ready: false,
        showSelect: false,
        shengId: 0,
        shiId: 0,
        quId: 0,
        reg: regexp.empty,
        err: '请选择工作单位所在地'
      },
      // 详细地址
      address: {
        model: '',
        reg: function (val) {
          val = val || ''
          return regexp.empty(val) && val.length > 4
        },
        err: '请填写详细地址，不少于5个字'
      },
      // 单位电话
      tel: {
        quCode: '',
        input: '',
        model: '',
        reg: function (val) {
          return regexp.tel(val) && !/-400/.test(val)
        },
        err: '请填写正确的工作单位电话'
      },
      // 分期贷追加工作信息字段
      // 行业类型
      industry: {
        datas: datasIndustry,
        key: '',
        value: '',
        reg: regexp.empty,
        err: '请选择行业类型',
        showSelect: false
      },
      // 职位
      position: {
        datas: [],
        key: '',
        value: '',
        value2: '',
        reg: regexp.empty,
        err: '请选择职位',
        showSelect: false
      },
      // 月收入
      income: {
        datas: datasIncome,
        key: '',
        value: '',
        reg: regexp.empty,
        err: '请选择月收入',
        showSelect: false
      }
    },
  }

  export default {
    data() {
      // $data.modify = this.$route.query.type == 'modify'
      // // 设置标题
      // title($data.modify ? '工作信息' : $data.applytype == 'multiple' ? '工作信息（第2/4步）' : '工作信息（第2/3步）')
      /**
       * 获取用户数据
       * http://git.fond.io/b/paydayloan/wikis/appv1/individual-get-user-info
       */
      ajax.get('/v3/individual/get-user-info', {
        product_type: $data.applytype
      }).then(function (xhr, res) {
        if (res.code == 0) {
          if (res.data) {
            if (res.data.work_info) {
              // 单位、学校名称
              $data.work_info.name.model = res.data.work_info.individual_job_company_name
              // 单位电话
              $data.work_info.tel.model = res.data.work_info.individual_job_company_tel
              // 解析区号和尾号
              $data.work_info.tel.quCode = $data.work_info.tel.model.replace(/-.*$/, '')
              $data.work_info.tel.input = $data.work_info.tel.model.replace(/^.*-/, '')
              // 详细地址
              $data.work_info.address.model = res.data.work_info.individual_job_company_address
              // 单位、学校所在地
              $data.work_info.city.shengId = res.data.work_info.individual_job_company_parea_id
              $data.work_info.city.shiId = res.data.work_info.individual_job_company_carea_id
              $data.work_info.city.quId = res.data.work_info.individual_job_company_area_id
              $data.work_info.city.ready = true
              // 分期贷追加字段
              $data.work_info.industry.value = res.data.work_info.individual_job_industry || ''
              $data.work_info.position.value2 = res.data.work_info.individual_job_position || ''
              $data.work_info.income.value = res.data.work_info.individual_job_income || ''
            }
          }
        } else {
          layer.warning(res.message)
        }
      })
      return $data
    },
    methods: {
      /**
       * 工作地址下拉列表选择成功事件监听
       * @param {Object} data         事件附带数据
       * @param {Number} data.shengId 省唯一标识
       * @param {Number} data.shiId   市唯一标识
       * @param {Number} data.quId    区唯一标识
       * @param {String} data.address 显示地址
       * @param {String} data.code    区号
       */
      workAddressSelected(data) {
        $data.work_info.city.showSelect = false
        $data.work_info.city.shengId = data.shengId
        $data.work_info.city.shiId = data.shiId
        $data.work_info.city.quId = data.quId
        $data.work_info.city.address = data.address
        // 重置区号
        if (data.code != $data.work_info.tel.quCode) {
          $data.work_info.tel.quCode = data.code
          $data.work_info.tel.input = ''
          $data.work_info.tel.model = ''
        }
      },
      /**
       * 单位电话输入框获取焦点时先判断是否选择了单位所在地
       * @param {Object} e 事件数据对象
       */
      telInputFocus(e) {
        if (!this.validate($data.work_info.city.address, $data.work_info.city.reg, $data.work_info.city.err)) {
          try {
            e.target.blur()
          } catch (err) {
            console.log(err)
          }
        }
      },
      /**
       * 显示下拉列表
       * @param {Object} item            数据对象
       * @param {Object} item.showSelect 是否显示下拉列表
       */
      showSelect(item) {
        item.showSelect = true
      },
      /**
       * 行业类型选择成功回调函数
       * @param {Object} response         事件附带数据
       * @param {String} response.key     选择项显示值
       * @param {String} response.value   选择项实际值
       * @param {String} response.index   选择项序号
       */
      industrySelected(response) {
        $data.work_info.industry.showSelect = false
        if (typeof response.index == 'number' && response.index >= 0) {
          $data.work_info.industry.key = response.key
          $data.work_info.industry.value = response.value
          $data.work_info.position.datas = $data.work_info.industry.datas[response.index].position
          $data.work_info.position.key = ''
          $data.work_info.position.value = $data.work_info.position.value2
          $data.work_info.position.value2 = ''
        }
      },
      /**
       * 显示职位下拉列表
       */
      positionShowSelect() {
        if (!this.validate($data.work_info.industry.value, $data.work_info.industry.reg, $data.work_info.industry.err)) return
        $data.work_info.position.showSelect = true
      },
      /**
       * 职位选择成功回调函数
       * @param {Object} response         事件附带数据
       * @param {String} response.key     选择项显示值
       * @param {String} response.value   选择项实际值
       */
      positionSelected(response) {
        $data.work_info.position.showSelect = false
        if (typeof response.key != 'undefined') {
          $data.work_info.position.key = response.key
          $data.work_info.position.value = response.value
        }
      },
      /**
       * 月收入选择成功回调函数
       * @param {Object} response         事件附带数据
       * @param {String} response.key     选择项显示值
       * @param {String} response.value   选择项实际值
       */
      incomeSelected(response) {
        $data.work_info.income.showSelect = false
        if (typeof response.key != 'undefined') {
          $data.work_info.income.key = response.key
          $data.work_info.income.value = response.value
        }
      },
      /**
       * 验证方法
       * @param {String} value           待验证值
       * @param {Function} validFunction 验证方法
       * @param {String} errTip          错误提示
       */
      validate(value, validFunction, errTip) {
        if (validFunction(value)) return true
        layer.tip(errTip)
        return false
      },
      /**
       * 提交数据
       */
      submit() {
        var _this = this

        // 工作信息检查
        if (!_this.validate($data.work_info.name.model, $data.work_info.name.reg, $data.work_info.name.err)) return
        if (!_this.validate($data.work_info.city.address, $data.work_info.city.reg, $data.work_info.city.err)) return
        if (!_this.validate($data.work_info.address.model, $data.work_info.address.reg, $data.work_info.address.err)) return
        // 组装单位电话
        $data.work_info.tel.model = $data.work_info.tel.quCode + '-' + $data.work_info.tel.input
        if (!_this.validate($data.work_info.tel.model, $data.work_info.tel.reg, $data.work_info.tel.err)) return
        // 分期贷追加工作信息
        if ($data.applytype == 'multiple') {
          if (!_this.validate($data.work_info.industry.value, $data.work_info.industry.reg, $data.work_info.industry.err)) return
          if (!_this.validate($data.work_info.position.value, $data.work_info.position.reg, $data.work_info.position.err)) return
          if (!_this.validate($data.work_info.income.value, $data.work_info.income.reg, $data.work_info.income.err)) return
        }

        // 提交数据
        var data = {
          product_type: $data.applytype,
          is_student: 0,                                                           //	是	int	是否是学生（0：不是，1：是）
          individual_job_company_name: $data.work_info.name.model,                 //	否	string	单位名称(is_student为0时必传)
          individual_job_company_tel: $data.work_info.tel.model,                   //	否	string	单位电话(is_student为0时必传)
          individual_job_company_address: $data.work_info.address.model,           //	否	string	单位详细地址(is_student为0时必传)
          individual_job_company_area_id: $data.work_info.city.quId,               //	否	int	单位所在地，地区联动-区id(is_student为0时必传)
          individual_job_position: $data.work_info.position.value,                 //	否	int	职位，行业职位联动-职业id(is_student为0时必传)
          individual_job_industry: $data.work_info.industry.value,                 //	否	int	行业，行业职位联动-行业id(is_student为0时必传)
          individual_job_income: $data.work_info.income.value,                     //	否	string	收入，2000元以下, 2001-3000元,3001-5000元 ,5001-8000元 ,8001-12000元 ,12000元以上
        }

        // 路由对象
        var router = _this.$router
        // loading
        var lid = layer.loading2(false, '保存中...')
        /**
         * 提交数据
         * http://git.fond.io/b/paydayloan/wikis/appv1/individual-save-work-info
         */
        ajax.post('/v3/individual/save-work-info', data)
          .then(function (xhr, res) {
            if (res.code == 0) {
              // if ($data.modify) history.back()
              // else router.replace('/auth/relation')
              history.back()
            } else layer.warning(res.message)
          })
          .complete(function () {
            layer.close(lid)
          })
      }
    },
    components: {
      DSelectAddress: DSelectAddress,
      DSelect: DSelect,
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals';
  .authsingle-job {
    padding-bottom: px2rem(70);
    .form {
      margin-top: px2rem(10);
      .row {
        padding: px2rem(18) px2rem(16);
        &.link {
          padding: px2rem(18) px2rem(28) px2rem(18) px2rem(16);
          background-position-x: 97%;
        }
        &.select {
          padding: px2rem(18) px2rem(35) px2rem(18) px2rem(16);
          background-position-x: 97%;
        }
      }
      .line {
        padding: 0;
        height: 1px;
      }
      .photos {
        padding: px2rem(18) px2rem(16);
      }
    }
    .form-value {
      float: right;
      font-size: px2rem(15);
      margin-top: px2rem(3);
      text-align: right;
    }
    .tel-input {
      text-align: right;
      width: px2rem(90);
    }
    .address-text {
      width: 70%;
    }
    .address-input {
      text-align: right;
      width: 100%;
    }
    /*.radio {
      background-image: url(../../assets/auth/job/radio0.png);
      background-repeat: no-repeat;
      background-position: 0 center;
      background-size: contain;
      margin-right: px2rem(16);
      padding-left: px2rem(28);
      &.chosen {
        background-image: url(../../assets/auth/job/radio1.png);
      }
      &:last-of-type {
        margin: 0;
      }
    }*/
  }
</style>