"use strict";window,document,$(".highlight .code pre").before('<button class="btn-copy" data-clipboard-snippet="">  <i class="fa fa-clipboard"></i><span>复制代码</span></button>'),new ClipboardJS(".btn-copy",{target:function(t){return t.nextElementSibling}});