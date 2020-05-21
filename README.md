# RNCodeCoverageExample
# RN代码覆盖率调研及实践
## 1、背景
mini的opk使用React Native编写，为了多维度把控产品质量，特增加代码覆盖率统计纬度；
参考资料：横捷：https://testerhome.com/topics/8919
美团：https://www.infoq.cn/article/UPfOuyQIkVr6708DNV4V
## 2、方案介绍
- **插桩方案**：nyc 是新版 istanbul，解决了大量istanbul存在的问题；
- **本地统计**：nyc 和 istanbul 都用于【本地运行，本地统计覆盖率】的场景。
- **多端统计**：istanbul-middleware 是 istanbul 的一个 用于【多端运行，在服务端统计覆盖率总和】的场景
所以，我们采用nyc进行插桩，利用istanbul-middleware进行多端统计；
## 3、示例及代码说明
### 3.1 js覆盖率报告示例
首先可以从图中看到，nyc提供的js代码覆盖率报告是从Branches(分支)、Functions(函数)、Lines(行)三个维度统计的。
![image](https://github.com/OnTheWay111/RNCodeCoverageExample/blob/master/readme_pic/report.png)

### 3.2 代码示例
RN代码覆盖率 示例代码见：https://github.com/OnTheWay111/RNCodeCoverageExample

建议：先下载代码，然后看下文介绍，来熟悉整个代码结构。

如果要看原理：请看横捷之前的文章，写得非常好，https://testerhome.com/topics/8919 。

### 3.3 代码配置过程
#### （1）代码结构介绍
- index.js: 项目入口文件
- package.json：项目依赖管理文件
![image](https://github.com/OnTheWay111/RNCodeCoverageExample/blob/master/readme_pic/middleware.png)
![image](https://github.com/OnTheWay111/RNCodeCoverageExample/blob/master/readme_pic/RNdemo.png)
#### （2）JS插桩步骤
```shell script
cd coverage_middleware  # 进入coverage_middleware项目目录
mv ../RNdemo/js RNdemo  # 将RN项目RNdemo的js源码移动到coverage_middleware目录下
npm install  # 安装项目依赖包
```
- RN的js文件插入定时回传覆盖率数据的方法（每隔4秒自动回传，fetch方法是react native 提供的网络请求方法）:
```javascript
// post window.__coverage__ to server every 2 seconds
setInterval(function() {
  fetch('http://10.60.139.6:9999/coverage/client', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(window.__coverage__)
  })
  .then(function() {
    var date = new Date();
    console.log(date + "发送覆盖率成功!");
    console.log(window.__coverage__);
  })
  .catch(function(error) {
      console.log('发送覆盖率失败: ' + error.message);
      });
}, 4000);
```

- 执行插桩
```shell script
nyc instrument --complete-copy RNdemo ../RNdemo/js  # 将源码插桩后，放到../RNdemo/js
```

至此，插桩完成。

#### （3）启动服务端项目
```shell script
npm index
```
启动成功如图所示：
![image](https://github.com/OnTheWay111/RNCodeCoverageExample/blob/master/readme_pic/server_start.png)

#### （4）安装RNdemo到手机
- 确保手机连接电脑成功
- 进入RNdemo目录, 运行npm install
- 运行yarn android等待安装（这里有疑问的，看ReactNNative中文官方文档:https://reactnative.cn/docs/getting-started.html）
- 安装成功后，如图：
左图为手机，有图为reactNative控制台，图中可以看到打印的覆盖率回传log，以及每次回传的覆盖率对象；
![image](https://github.com/OnTheWay111/RNCodeCoverageExample/blob/master/readme_pic/coverage.png)

## 4、注意
因发现istanbul-middleware项目已经几年没有更新代码，且没有合并pull request，所以在自己的git把之前的pull request均合并了一下，所以建议package.json中配置更新后的istanbul-middleware。
![image](https://github.com/OnTheWay111/RNCodeCoverageExample/blob/master/readme_pic/notice.png)

## 5、踩坑记录
（1）【done】react-native启动时红屏报错：Unable to load script.Make sure you're either running a metro server or that ....
解决方法：https://www.cnblogs.com/shizk/p/11189978.html

（2）【done】nyc插桩无效
  - 问题原因：nyc 需要14.1.1版本，结果在package.json配置npm install后，直接运行命令nyc，用的是全局nyc，并不是项目依赖包node_modules中的nyc。
  - 建议：在package.json中配置nyc的script，配置后，nyc使用的就是node_module下的nyc，而非全局nyc。配置如下图：
![image](https://github.com/OnTheWay111/RNCodeCoverageExample/blob/master/readme_pic/nyc.png)
  - 问题描述及解决方法详见：https://testerhome.com/topics/23676
  
（3）插桩后丢文件
nyc instrument 后发现有丢文件的现象，所以为了安全起见，还是加上完成copy的参数吧；
```javascript
nyc instrument --complete-copy [input] [output]
```
（4）含有装饰器的js无法插桩
目前还未找到解决方法

（5）【待确认】istanbul-middleware覆盖率数据不准确
网友发现的问题，目前还没复现，回头等复杂项目验证后再出结论。
