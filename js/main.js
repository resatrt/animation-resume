var result = `
/*
*面试官你好，我是xxx
*我将以动画的形式介绍我自己
*只用文字来介绍太单调了
*我用代码来介绍我自己
*首先准备一些样式
*/

*{
transition:all 1s;
}

html{
  background:rgb(222,222,222);
  font-size:16px;
}
#code{
border:1px solid red;
padding:16px;
}

/*我需要一些代码高亮*/

.token.selector{
  color: #690;
}

.token.property{
  color: #905;
}

.token.function{
  color: #DD4A68;
}
/*此处加高亮是为了有个颜色过渡的效果，将高亮代码的库里的样式先变为黑色，然后通过写入代码使其高亮*/

/*加点3D效果*/
#code{
  transform:rotate(360deg)
}
/*我需要一张白纸*/
#code{
  position:fixed;
  left:0;
  width:50%;
  height:100%;

}

`

var result2 = `
#paper{
    position:fixed;
    right:0;
    width:50%;
    height:100%;
    background:gray;
    padding:3px;
} 
 #paper > .content{
      width:100%;
      height:100%;
      background:white;
    }

 `
var md = `

自我介绍
-------

我叫xxx
1989年9月出生
xxxx学校毕业
自学前端半年
希望应聘前端开发岗位

技能介绍
-------

熟悉JavaScript css html

项目介绍
-------

- xxx轮播
- xxx简历
- xxx画板

联系方式
-------
> QQ xxxxxxx
> email xxxxxxxx
> 手机 xxxxxxxxxxx
`

var result3 = `
/*现在我要将这个markdown转换为HTML格式*/
`
var result4 = `
**谢谢观看**
`

//把code写到#code和style标签里
function writeCode(profix, code, fn) {
  let domCode = document.querySelector('#code')
  domCode.innerHTML = profix || '' //这个是前缀 ,
  let n = 0
  let timer = setInterval(() => {
    n += 1
    mainstyle.innerHTML = profix + code.substring(0, n)
    domCode.innerHTML = Prism.highlight(profix + code.substring(0, n), Prism.languages.css)
    domCode.scrollTop = domCode.scrollHeight
    //domCode.scrollTop=10000
    if (n >= code.length) {
      window.clearInterval(timer)//在timer完了再执行下面几个函数 
      fn.call()
    }
  }, 10)

}


writeCode('', result, () => { //writeCode call the function
  //’‘空字符串就是写profix + code.substring(0, n)这个能是整个result，
  createPaper(() => {
    writeCode(result, result2, () => {
      writeMD(md, () => {
        beforeToHtml(result3, () => {
          markdownToHtml(md +result4)
        })
      })
    })  //结果就是result+result2=domCode,innerHTML
  })
})


//新建一个div放到pre标签下面
function createPaper(fn) {
  var paper = document.createElement('div')
  paper.id = 'paper'
  document.body.appendChild(paper)
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  fn.call()
}

function writeMD(markdown, fn) {
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let timer = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(timer)
      fn.call()
    }
  }, 10);
}

function beforeToHtml(result, fn) {
  let  domPaper= document.querySelector('#paper>.content')
  let n = 0
  let timer = setInterval(() => {
    n += 1
    domPaper.innerHTML = result.substring(0, n)
    domPaper.scrollTop =  domPaper.scrollHeight
    if (n >= result.length) {
      window.clearInterval(timer)
      fn.call()
    }
  }, 10);
}


function markdownToHtml(markdown) {
  let  domPaper = document.querySelector('#paper>.content')
  let n = 0
  let timer = setInterval(() => {
    n += 1
    domPaper.innerHTML = marked(markdown).substring(0, n)
    domPaper.scrollTop =  domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(timer)

    }
  }, 10);
}

// function endWords(result,fn) {
//   let domPaper = document.querySelector('#paper>.content')
//   let n = 0
//   let timer = setInterval(() => {
//     n += 1
//     domPaper.innerHTML = result.substring(0, n)
//     domPaper.scrollTop = domPaper.scrollHeight
//     if (n >= result.length) {
//       window.clearInterval(timer)

//     }
//   }, 50);
// }