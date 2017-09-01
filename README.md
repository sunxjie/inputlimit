# sLimit.js
输入框文字长度限制，超出限制长度时自动截取。同时支持 jQuery 和 Zepto 。

限制的长度以中文汉字为标准，英文字符按半个汉字计算。

## 使用示例

**HTML**

```html
<input text="type" name="title" class="title" />
<span class="limit">0</span> / 10
```

**JAVASCRIPT**

```javascript
<script src="inputlimit.min.js"></script>
<script>
    $(".title").inputlimit({
        max: 10,
        tip: ".limit",
        rule: "asc"
    })
</script>
```

## 参数

选项 | 类型 | 默认值 | 描述
-----|------|--------|-----
max | Number | 0 | 必填，最大长度(英文字符按0.5计算)
tip | String | "" | 选填，显示计数的选择器
rule | String | "asc" | 选填，计数显示的规则，有两个可选填：<br/>"asc": 计数增加；<br/>"desc"：计数倒数
