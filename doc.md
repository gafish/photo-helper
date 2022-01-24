# 开发文档


## 事件埋点及分享功能

### 页面曝光埋点

```js
const {aplus_queue} = window;
aplus_queue.push({
 action: 'aplus.sendPV',
  arguments: [{
      is_auto: false
  }, {
      param1： 111,
      param2: '222'
  }]
});
```

### 页面点击事件

```js
const {aplus_queue} = window;
aplus_queue.push({
 action: 'aplus.record',
  arguments: [eventCode, eventType, eventParams]
});
```
