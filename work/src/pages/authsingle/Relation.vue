<!--
  -- 联系人信息
  -- @description 单期贷联系人信息资料填写
  -- @author bigfact
  -->
<template>
  <section class="authsingle-relation fs18">
    <div class="title fs14 c-placeholder">请填写两个联系人的信息，非紧急情况，我们不会打扰您的联系人。</div>
    <div class="form bg-white" v-for="($index, i) in contacts">
      <div class="row select" @click="showSelect(i.relation)">
        <span>关系</span>
        <span class="form-value">{{ i.relation.key }}</span>
      </div>
      <d-select :datas="i.relation.datas" :value="i.relation.value" :id="'contacts-select-' + $index" @selected="relationSelected" v-show="i.relation.showSelect"></d-select>
      <div class="row">
        <span>姓名</span>
        <input type="text" class="contact-input" v-model="i.name.model" placeholder="请输入该联系人姓名">
        <button class="get-contact-btn" v-submit="{cb: showContacts, data: $index}">选择联系人</button>
      </div>
      <div class="row">
        <span>电话</span>
        <input type="text" class="form-value" v-model="i.tel.model" placeholder="请输入联系人电话">
      </div>
    </div>
    <!--提交按钮-->
    <button class="btn bottom fs20" v-submit="{cb: submit}">保存</button>
  </section>
</template>

<script>
  import DSelect from '../../components/common/DSelect'

  import datasRelation from '../../services/datas-relation.json'

  var $data = {
    // 申请类型，单期 single ，分期 multiple
    applytype: sysinfo.getQueryString('applytype') || 'single',
    // 是否为修改资料
    modify: false,
    contacts: [
      {
        // 唯一标识
        id: '',
        // 姓名
        name: {
          model: '',
          maxlength: 18,
          reg: regexp.name,
          err: '请输入正确姓名'
        },
        // 关系
        relation: {
          key: '',
          value: '',
          showSelect: false,
          datas: [
            datasRelation[0],
            datasRelation[1],
            datasRelation[3]
          ],
          reg: regexp.empty,
          err: '请选择关系'
        },
        // 单位区号
        tel: {
          model: '',
          reg: regexp.empty,
          err: '请输入联系人电话'
        }
      },
      {
        // 唯一标识
        id: '',
        // 姓名
        name: {
          model: '',
          maxlength: 18,
          reg: regexp.name,
          err: '请输入正确姓名'
        },
        // 关系
        relation: {
          key: '',
          value: '',
          showSelect: false,
          datas: datasRelation,
          reg: regexp.empty,
          err: '请选择关系'
        },
        // 单位区号
        tel: {
          model: '',
          reg: regexp.empty,
          err: '请输入联系人电话'
        }
      }
    ],
    cbName: 'getContactCb' + Date.now()
  }

  export default {
    data() {
      /**
       * http://git.fond.io/b/paydayloan/wikis/appv1/individual-get-user-info
       * 获取用户数据
       */
      ajax.get('/v3/individual/get-user-info', {
        product_type: $data.applytype
      }).then(function (xhr, res) {
        if (res.code == 0) {
          if (res.data) {
            var contact_list = res.data.contact_list
            if (contact_list instanceof Array) {
              for (var i = 0; i < contact_list.length; i++) {
                $data.contacts[i].id = contact_list[i].individual_contact_id
                $data.contacts[i].name.model = contact_list[i].individual_contact_name
                $data.contacts[i].tel.model = contact_list[i].individual_contact_phone
                $data.contacts[i].relation.value = contact_list[i].individual_contact_type
              }
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
       * 显示下拉列表
       * @param {Object} item            数据对象
       * @param {Object} item.showSelect 是否显示下拉列表
       */
      showSelect(item) {
        item.showSelect = true
      },
      /**
       * 关系选择成功回调函数
       * @param {Object} response         事件附带数据
       * @param {String} response.key     选择项显示值
       * @param {String} response.value   选择项实际值
       * @param {String} response.id      触发项唯一标识
       */
      relationSelected(response) {
        var index = response.id.replace('contacts-select-', '')
        $data.contacts[index].relation.showSelect = false
        if (typeof response.key != 'undefined') {
          $data.contacts[index].relation.key = response.key
          $data.contacts[index].relation.value = response.value
        }
      },
      /**
       * 显示联系人选择组件 (app api)
       * @param {String} index 唯一标识序号
       */
      showContacts(index) {
        if (typeof window[$data.cbName] !== 'function') {
          window[$data.cbName] = function (index, name, mobile) {
            try {
              console.log(index, name, mobile)
              index = parseInt(index)
              $data.contacts[index].name.model = name
              $data.contacts[index].tel.model = mobile
            } catch (err) {
              console.log(err)
            }
          }
        }
        sysinfo.dsq.getContact($data.cbName, index)
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

        // 提交数据
        var data = []

        // 检查字段、组装提交数据
        for (var i = 0; i < $data.contacts.length; i++) {
          if (!_this.validate($data.contacts[i].relation.value, $data.contacts[i].relation.reg, $data.contacts[i].relation.err)) return
          if (!_this.validate($data.contacts[i].name.model, $data.contacts[i].name.reg, $data.contacts[i].name.err)) return
          if (!_this.validate($data.contacts[i].tel.model, $data.contacts[i].tel.reg, $data.contacts[i].tel.err)) return
          data.push({
            individual_contact_id: $data.contacts[i].id,
            individual_contact_name: $data.contacts[i].name.model,
            individual_contact_phone: $data.contacts[i].tel.model,
            individual_contact_type: $data.contacts[i].relation.value
          })
        }

        // 路由对象
        var router = _this.$router
        // loading
        var lid = layer.loading2(false, '保存中...')
        /**
         * 提交数据
         * http://git.fond.io/b/paydayloan/wikis/appv1/contact-save-contacts
         */
        ajax.post('/v3/contact/save-contacts', {
          contacts: data
        }).then(function (xhr, res) {
          if (res.code == 0) {
            // if ($data.modify) history.back()
            // else router.replace($data.applytype == 'multiple' ? '/auth/other' : '/auth/confirm')
            history.back()
          } else layer.warning(res.message)
        }).complete(function () {
          layer.close(lid)
        })
      }
    },
    components: {
      DSelect: DSelect
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals';
  .authsingle-relation {
    min-height: 100%;
    box-sizing: border-box;
    padding-bottom: px2rem(60);
    .title {
      padding: px2rem(15);
    }
    .form {
      margin-top: px2rem(10);
      .row {
        padding: px2rem(18) px2rem(16);
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
      margin-top: px2rem(3);
      text-align: right;
    }
    .err {
      color: $red;
      text-align: right;
      padding: px2rem(10) 0;
    }
    .contact-input {
      float: right;
      width: px2rem(140);
      margin: px2rem(4) px2rem(95) 0 0;
      text-align: right;
    }
    .get-contact-btn {
      background: #fff;
      border: 1px solid #383838;
      border-radius: px2rem(50);
      font-size: px2rem(14);
      height: px2rem(30);
      line-height: px2rem(30);
      margin: auto 0;
      padding: 0 px2rem(10);
      position: absolute;
      top: 0;
      bottom: 0;
      right: px2rem(13);
    }
  }
</style>