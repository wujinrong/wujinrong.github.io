<!--
  -- 身份信息
  -- @author bigfact
  -->
<template>
  <section class="auth-identity fs18">
    <!--身份信息-->
    <div class="form bg-white">
      <div class="row line"></div>
      <!--<div class="row link" @click="showOcr()">-->
      <div class="row link" v-submit="{cb: showOcr, time: 3000}">
        <p>身份证{{ ocrStatus ? '已' : '未' }}识别</p>
        <p class="fs14 c-placeholder">{{ ocrStatus ? '请确认姓名、身份证号无误' : '请点击按钮以打开相机识别'}}</p>
      </div>
      <div class="row">
        <span>您的姓名</span>
        <span class="form-value">{{ name.model }}</span>
      </div>
      <div class="row">
        <span>身份证号</span>
        <span class="form-value">{{ id_num.model }}</span>
      </div>
      <!--<div class="row link" @click="showLivingIdentity()">-->
      <div class="row link" v-submit="{cb: showLivingIdentity, time: 3000}">
        <span>人脸识别</span>
        <span class="face-vaild form-value c-placeholder" :class="livingIdentityStatus ? 'yes' : 'no'">{{ livingIdentityStatus ? '已' : '未' }}识别</span>
      </div>
    </div>
    <!--现居城市和详细地址-->
    <div class="form bg-white">
      <div class="row line"></div>
      <div class="row link" @click="showSelect(city)">
        <span>现居城市</span>
        <p class="address-text form-value text-hide">{{ city.address }}</p>
      </div>
      <d-select-address class="fs15" :item="city" v-show="city.showSelect" @selected="addressSelected"></d-select-address>
      <div class="row">
        <span>详细地址</span>
        <input v-model="address.model" maxlength="100" class="address-input text-hide" type="text" placeholder="请填写详细地址">
        <!--<button class="get-address-btn" @click="getAddress()">获取地址</button>-->
        <button class="get-address-btn" v-submit="{cb: getAddress}">获取地址</button>
      </div>
    </div>
    <!--婚姻-->
    <div class="form bg-white">
      <div class="row select" @click="showSelect(marryStatus)">
        <span>婚姻</span>
        <p class="form-value">{{ marryStatus.key }}</p>
      </div>
      <d-select id="marryStatus-select" :datas="marryStatus.datas" :value="marryStatus.value" @selected="marryStatusSelected" v-show="marryStatus.showSelect"></d-select>
    </div>
    <!--分期贷追加表单-->
    <div class="form bg-white" v-if="applytype == 'multiple'">
      <div class="row line"></div>
      <!--学历-->
      <div class="row select" @click="showSelect(education)">
        <span>学历</span>
        <p class="form-value">{{ education.key }}</p>
      </div>
      <d-select id="education-select" :datas="education.datas" :value="education.value" @selected="educationSelected" v-show="education.showSelect"></d-select>
      <!--住房性质-->
      <div class="row select" @click="showSelect(houseType)">
        <span>住房性质</span>
        <p class="form-value">{{ houseType.key }}</p>
      </div>
      <d-select id="houseType-select" :datas="houseType.datas" :value="houseType.value" @selected="houseTypeSelected" v-show="houseType.showSelect"></d-select>
    </div>
    <!--调试工具-->
    <d-debuger style="height: 3rem;"></d-debuger>
    <!--提交按钮-->
    <button class="btn bottom fs20" v-submit="{cb: submit}">{{ modify ? '保存' : '下一步' }}</button>
  </section>
</template>

<script>
  import DSelectAddress from '../../components/common/DSelectAddress'
  import DSelect from '../../components/common/DSelect'
  import DDebuger from '../../components/common/DDebuger.vue'

  // 导入下拉列表数据
  import datasEducation from '../../services/datas-education.json'
  import datasMarryStatus from '../../services/datas-marry-status.json'
  import datasHouseType from '../../services/datas-house-type.json'

  var $data = {
    // 申请类型，单期 single ，分期 multiple
    applytype: sysinfo.getQueryString('applytype') || 'single',
    // 是否为修改资料
    modify: false,
    // 身份验证状态
    ocrStatus: 0,
    // ocr sdk type
    ocrSdkType: 1,
    // OCR 认证完成回调函数
    ocrCbName: 'ocrCb' + Date.now(),
    // 您的姓名
    name: {
      model: '',
      reg: regexp.name,
      err: '请输入正确姓名'
    },
    // 身份证号
    id_num: {
      model: '',
      reg: regexp.idcard,
      err: '请填写正确的身份证号'
    },
    // 活体识别状态
    livingIdentityStatus: false,
    // 活体识别 sdk type
    livingIdentitySdkType: 1,
    // 活体识别状态认证完成回调函数
    livingIdentityCbName: 'livingIdentityCb' + Date.now(),
    // 现居城市
    city: {
      address: '',
      ready: false,
      showSelect: false,
      shengId: 0,
      shiId: 0,
      quId: 0,
      reg: function (val) {
        return val > 0
      },
      err: '请选择现居城市'
    },
    // 详细地址
    address: {
      model: '',
      reg: regexp.empty,
      err: '请填写详细地址',
      CbName: 'addressCb' + Date.now()
    },
    // 婚姻
    marryStatus: {
      datas: datasMarryStatus,
      key: '',
      value: '',
      reg: regexp.empty,
      err: '请选择婚姻',
      showSelect: false
    },
    // 分期贷追加字段
    // 学历
    education: {
      datas: datasEducation,
      key: '',
      value: '',
      reg: regexp.empty,
      err: '请选择学历',
      showSelect: false
    },
    // 住房性质
    houseType: {
      datas: datasHouseType,
      key: '',
      value: '',
      reg: regexp.empty,
      err: '请选择住房性质',
      showSelect: false
    }
  }

  export default {
    data() {
      $data.modify = this.$route.query.type == 'modify'
      // 设置标题
      title($data.modify ? '身份信息' : $data.applytype == 'multiple' ? '身份信息（第1/4步）' : '身份信息（第1/3步）')
      /**
       * 获取 app sdk 配置信息
       * http://git.fond.io/b/paydayloan/wikis/appv1/individual-ocrliving-config
       */
      ajax.get('/v3/individual/ocrliving-config')
        .then(function (xhr, res) {
          if (res.code == 0) {
            $data.ocrSdkType = res.data.identity_ocr_sdk
            $data.livingIdentitySdkType = res.data.identity_living_sdk
          } else {
            layer.warning(res.message)
          }
        })
      /**
       * 获取用户数据
       * http://git.fond.io/b/paydayloan/wikis/appv1/individual-get-user-info
       */
      ajax.get('/v3/individual/get-user-info', {
        product_type: $data.applytype
      }).then(function (xhr, res) {
        if (res.code == 0) {
          if (res.data) {
            // 身份验证状态
            $data.ocrStatus = res.data.base_info.identity_ocr_status
            // 姓名身份证号
            $data.name.model = res.data.base_info.individual_name
            $data.id_num.model = res.data.base_info.individual_identity
            // 活体识别状态
            $data.livingIdentityStatus = res.data.base_info.living_identity
            // 现居城市
            $data.city.quId = res.data.base_info.area_district_id
            $data.city.shiId = res.data.base_info.city_district_id
            $data.city.shengId = res.data.base_info.province_district_id
            $data.city.ready = true
            // 详细地址
            $data.address.model = res.data.base_info.address_content || ''
            // 婚姻
            $data.marryStatus.value = res.data.base_info.individual_extend_marry_status || ''
            // 分期贷追加字段
            $data.education.value = res.data.base_info.individual_extend_education || ''
            $data.houseType.value = res.data.base_info.individual_extend_house_type || ''
          }
        } else {
          layer.warning(res.message)
        }
      })
      return $data
    },
    methods: {
      /**
       * 显示 OCR 身份验证
       */
      showOcr() {
        if (typeof window[$data.ocrCbName] !== 'function') {
          window[$data.ocrCbName] = function (response) {
            try {
              console.log(response)
              var obj = JSON.parse(response)
              $data.name.model = obj.name
              $data.id_num.model = obj.idnum
              $data.ocrStatus = 1
            } catch (err) {
              console.log(err)
            }
          }
        }
        // 是否可以修改 ocr 信息，是根据活体识别认证状态来判断的，如果活体已经识别，则不让修改，否则可以修改
        sysinfo.dsq.openOCR($data.ocrCbName, $data.ocrSdkType, $data.livingIdentityStatus ? 0 : 1)
      },
      /**
       * 显示人脸识别
       */
      showLivingIdentity() {
        // 先检查 ocr 是否认证
        if (!$data.ocrStatus) {
          layer.tip('请先验证身份证')
          return
        }

        // 如果用户已经识别过，则不再显示人脸识别
        if ($data.livingIdentityStatus) {
          layer.tip('您已识别')
          return
        }

        if (typeof window[$data.livingIdentityCbName] !== 'function') {
          window[$data.livingIdentityCbName] = function (response) {
            console.log(response)
            $data.livingIdentityStatus = response
          }
        }

        sysinfo.dsq.openFaceIdentify($data.livingIdentityCbName, $data.name.model, $data.id_num.model, $data.livingIdentitySdkType)
      },
      /**
       * 显示地址下拉列表
       */
      showSelectAddress() {
        $data.city.show = true
      },
      /**
       * 地址下拉列表选择成功事件监听
       * @param {Object} data         事件附带数据
       * @param {Number} data.shengId 省唯一标识
       * @param {Number} data.shiId   市唯一标识
       * @param {Number} data.quId    区唯一标识
       * @param {String} data.address 显示地址
       */
      addressSelected(data) {
        $data.city.showSelect = false
        $data.city.shengId = data.shengId
        $data.city.shiId = data.shiId
        $data.city.quId = data.quId
        $data.city.address = data.address
      },
      /**
       * 获取详细地址
       */
      getAddress() {
        if (typeof window[$data.address.CbName] !== 'function') {
          window[$data.address.CbName] = function (response) {
            console.log(response)
            $data.address.model = response
          }
        }
        sysinfo.dsq.getLocation($data.address.CbName)
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
       * 学历选择成功回调函数
       * @param {Object} response         事件附带数据
       * @param {String} response.key     选择项显示值
       * @param {String} response.value   选择项实际值
       */
      educationSelected(response) {
        $data.education.showSelect = false
        $data.education.key = response.key
        $data.education.value = response.value
      },
      /**
       * 婚姻选择成功回调函数
       * @param {Object} response         事件附带数据
       * @param {String} response.key     选择项显示值
       * @param {String} response.value   选择项实际值
       */
      marryStatusSelected(response) {
        $data.marryStatus.showSelect = false
        $data.marryStatus.key = response.key
        $data.marryStatus.value = response.value
      },
      /**
       * 住房性质选择成功回调函数
       * @param {Object} response         事件附带数据
       * @param {String} response.key     选择项显示值
       * @param {String} response.value   选择项实际值
       */
      houseTypeSelected(response) {
        $data.houseType.showSelect = false
        $data.houseType.key = response.key
        $data.houseType.value = response.value
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
      // 提交数据
      submit() {
        var _this = this

        // 检查表单
        if (!$data.ocrStatus) {
          layer.tip('请先验证身份证')
          return
        }
        if (!$data.livingIdentityStatus) {
          layer.tip('请先验证人脸识别')
          return
        }
        if (!_this.validate($data.city.quId, $data.city.reg, $data.city.err)) return
        if (!_this.validate($data.address.model, $data.address.reg, $data.address.err)) return
        if (!_this.validate($data.marryStatus.value, $data.marryStatus.reg, $data.marryStatus.err)) return

        // 检查分期贷字段
        if ($data.applytype == 'multiple') {
          if (!_this.validate($data.education.value, $data.education.reg, $data.education.err)) return
          if (!_this.validate($data.houseType.value, $data.houseType.reg, $data.houseType.err)) return
        }

        // 检查通过提交数据
        var data = {
          area_district_id: $data.city.quId,
          address_content: $data.address.model,
          individual_extend_education: $data.education.value,
          individual_extend_marry_status: $data.marryStatus.value,
          individual_extend_house_type: $data.houseType.value,
          product_type: $data.applytype
        }

        // 路由对象
        var router = _this.$router
        // loading
        var lid = layer.loading(false)
        /**
         * 提价数据
         * http://git.fond.io/b/paydayloan/wikis/appv1/individual-save-base-info
         */
        ajax.post('/v3/individual/save-base-info', data)
          .then(function (xhr, res) {
            if (res.code == 0) {
              if ($data.modify) history.back()
              else router.replace('/auth/job')
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
      DDebuger: DDebuger
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals';
  .auth-identity {
    box-sizing: border-box;
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
    }
    .form-value {
      float: right;
      font-size: px2rem(15);
      margin-top: px2rem(2);
      text-align: right;
    }
    .address-text {
      width: 70%;
    }
    .face-vaild {
      background: url(../../assets/auth/identity/warning.png) no-repeat 0 center;
      background-size: contain;
      padding-left: px2rem(22);
      &.yes {
        background: url(../../assets/auth/identity/success.png) no-repeat 0 center;
        background-size: contain;
      }
    }
    .address-input {
      float: right;
      width: px2rem(120);
      margin: px2rem(4) px2rem(85) 0 0;
    }
    .get-address-btn {
      background: #fff;
      border: 1px solid #383838;
      border-radius: px2rem(50);
      font-size: px2rem(14);
      height: px2rem(30);
      line-height: px2rem(30);
      margin: auto 0;
      padding: 0 px2rem(17);
      position: absolute;
      top: 0;
      bottom: 0;
      right: px2rem(13);
    }
  }
</style>