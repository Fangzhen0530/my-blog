<template>
    <form id="data-form-container" ref="form" class="data-form-container" @submit.prevent="handleSubmit">
        <!-- 因为表单自带提交功能，但是会刷新页面。我们用Ajax做提交，所以要阻止表单的事件。 @submit.prevent="" 就是绑定事件并且阻止默认事件 -->
        <div class="form-item">
            <div class="input-area">
                <input
                type="text"
                maxlength="10"
                v-model="formData.nickname"
                placeholder="用户昵称"
                />
                <span class="tip">{{ formData.nickname.length }}/10</span>
            </div>
            <div class="error">{{ error.nickname }}</div>
        </div>
        <div class="form-item">
            <div class="text-area">
                <textarea
                maxlength="300"
                placeholder="输入内容"
                v-model="formData.content"
                ></textarea>
                <span class="tip">{{ formData.content.length }}/300</span>
            </div>
            <div class="error">{{ error.content }}</div>
        </div>
        <div class="form-item">
            <div class="button-area">
                <button :disabled="isSubmiting">
                {{ isSubmiting ? "提交中..." : "提交" }}
                </button>
            </div>
        </div>
    </form>
</template>

<script>
// 注意：表单输入内容后，按回车和按钮都会提交。如果只把点击事件注册再按钮上，那么回车提交就检测不到。所以要再form表单上注册submit事件
export default {
    data(){
        return {
            formData : {//表单数据
                nickname :'',
                content : ''
            },
            error : {//错误消息
                nickname : '',//昵称错误消息
                content : ''//内容错误消息
            },
            isSubmiting :false//提交按钮的状态
        }
    },
    methods : {
        handleSubmit(){//点击提交触发事件
            // 首先要对表单内的内容进行判断
            // 如果表单内没有填写内容，不能提交且提示错误信息
            this.error.nickname = this.formData.nickname ? "" : "请填写昵称";
            this.error.content = this.formData.content ? "" : "请填写内容";
            if (this.error.nickname || this.error.content) {
              // 有错误
              return;
            }
            //提交内容正常：
            //因为这个组件会在不同的地方用，所以点击后具体做什么，要由父组件决定
            this.isSubmiting = true//提交后，状态设为不可重复点击
            this.$emit("submit",this.formData,(successMsg) => {
              this.$showMessage({//评论成功提示弹窗
                content: successMsg,
                type: "success",
                duration: 1000,
                container: this.$refs.form,
              })
              this.isSubmiting = false
              this.formData.nickname = ''
              this.formData.content = ''

            })//回调函数是在父组件做完后，这里在做一些事
        }
    }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.data-form-container {
  margin-bottom: 20px;
  overflow: hidden;
}
.form-item {
  margin-bottom: 8px;
}
.input-area {
  width: 50%;
  position: relative;
}
.text-area {
  position: relative;
}
.tip {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #b4b8bc;
  font-size: 12px;
}
input,
textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed @gray;
  outline: none;
  color: @words;
  font-size: 14px;
  border-radius: 4px;
  &:focus {
    border-color: @primary;
  }
}
input {
  padding: 0 15px;
  height: 40px;
}
textarea {
  resize: none;
  padding: 8px 15px;
  height: 120px;
}
.error {
  margin-top: 6px;
  color: @danger;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
button {
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;
  width: 100px;
  height: 34px;
  color: #fff;
  border-radius: 4px;
  background: @primary;
  &:hover {
    background: darken(@primary, 10%);
  }
  &:disabled {
    background: lighten(@primary, 20%);
    cursor: not-allowed;
  }
}
</style>