module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    jquery: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  extends: [
    'prettier',
    'prettier/vue',
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  plugins: ['prettier', 'vue', 'html'],
  // add your custom rules here
  rules: {
    'vue/max-attributes-per-line': [
      'off',
      {
        singleline: 3,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/no-v-html': 'off',
    'vue/name-property-casing': ['error', 'PascalCase'], // 强制驼峰命名法
    'vue/html-closing-bracket-newline': [
      'off',
      {
        singleline: 'never',
        multiline: 'always'
      }
    ],
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always'
      }
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'never'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/html-indent': [
      'off',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/script-indent': [
      'off',
      2,
      {
        switchCase: 1,
        baseIndent: 1
      }
    ],
    // Possible Errors
    'no-cond-assign': 'off', // 禁止条件表达式中出现赋值操作符
    'no-console': 'off', // 禁用 console
    'no-control-regex': 'error', // 禁止在正则表达式中使用控制字符
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 禁用 debugger
    'no-dupe-args': 'error', // 禁止 function 定义中出现重名参数
    'no-dupe-keys': 'error', // 禁止对象字面量中出现重复的 key
    'no-duplicate-case': 'error', // 禁止出现重复的 case 标签
    'no-empty-character-class': 'error', // 禁止在正则表达式中使用空字符集
    'no-ex-assign': 'error', // 禁止对 catch 子句的参数重新赋值
    'no-extra-boolean-cast': 'error', // 禁止不必要的布尔转换
    'no-extra-parens': ['error', 'functions'], // 禁止不必要的括号
    'no-func-assign': 'error', // 禁止对 function 声明重新赋值
    'no-inner-declarations': ['error', 'functions'],
    'no-invalid-regexp': 'error', // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
    'no-irregular-whitespace': 'error', // 禁止在字符串和注释之外不规则的空白
    'no-obj-calls': 'error', // 禁止把全局对象作为函数调用
    'no-regex-spaces': 'error', // 禁止正则表达式字面量中出现多个空格
    'no-sparse-arrays': 'error', // 禁用稀疏数组
    'no-unexpected-multiline': 'error', // 禁止出现令人困惑的多行表达式
    'no-unreachable': 'error', // 禁止在return、throw、continue 和 break 语句之后出现不可达代码
    'no-unsafe-finally': 'error', // 禁止在 finally 语句块中出现控制流语句
    'use-isnan': 'error', // 要求使用 isNaN() 检查 NaN
    'valid-typeof': 'error', // 强制 typeof 表达式与有效的字符串进行比较

    // Best Practices
    'accessor-pairs': 'error', // 强制 getter 和 setter 在对象中成对出现
    curly: ['error', 'multi-line'], // 强制所有控制语句使用一致的括号风格
    'dot-location': ['error', 'property'], // 强制在点号之前和之后一致的换行
    eqeqeq: ['error', 'allow-null'], // 要求使用 === 和 !==
    'guard-for-in': 'error', // 要求 for-in 循环中有一个 if 语句
    'no-caller': 'error', // 禁用 arguments.caller 或 arguments.callee
    'no-empty-pattern': 'error', // 禁止使用空解构模式
    'no-eval': 'error', // 禁用 eval()
    'no-extend-native': 'error', // 禁止扩展原生类型
    'no-extra-bind': 'error', // 禁止不必要的 .bind() 调用
    'no-fallthrough': 'error', // 禁止 case 语句落空
    'no-floating-decimal': 'error', // 禁止数字字面量中使用前导和末尾小数点
    'no-implied-eval': 'error', // 禁止使用类似 eval() 的方法
    'no-invalid-this': 'off', // 禁止 this 关键字出现在类和类对象之外
    'no-iterator': 'error', // 禁用 __iterator__ 属性
    'no-labels': [
      'error',
      {
        allowLoop: false,
        allowSwitch: false
      }
    ], // 禁用标签语句
    'no-lone-blocks': 'error', // 禁用不必要的嵌套块
    'no-multi-spaces': 'error', // 禁止使用多个空格
    'no-multi-str': 'error', // 禁止使用多行字符串
    'no-new-wrappers': 'error', // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-octal': 'error', // 禁用八进制字面量
    'no-octal-escape': 'error', // 禁止在字符串中使用八进制转义序列
    'no-proto': 'error', // 禁用 __proto__ 属性
    'no-redeclare': 'error', // 禁止多次声明同一变量
    'no-return-assign': ['error', 'except-parens'], // 禁止在 return 语句中使用赋值语句
    'no-self-assign': 'error', // 禁止自我赋值
    'no-self-compare': 'error', // 禁止自身比较
    'no-sequences': 'error', // 禁用逗号操作符
    'no-throw-literal': 'error', // 禁止抛出异常字面量
    'no-unmodified-loop-condition': 'error', // 禁用一成不变的循环条件
    'no-useless-call': 'error', // 禁止不必要的 .call() 和 .apply()
    'no-useless-escape': 'off', // 禁用不必要的转义字符
    'no-with': 'error', // 禁用 with 语句
    'wrap-iife': ['error', 'any'], // 要求 IIFE 使用括号括起来
    yoda: ['error', 'never'], // 要求或禁止 “Yoda” 条件

    // Variables
    'no-delete-var': 'error', // 禁止删除变量
    'no-label-var': 'error', // 不允许标签与变量同名
    'no-shadow-restricted-names': 'error', // 禁止将标识符定义为受限的名字
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none'
      }
    ], // 禁止出现未使用过的变量
    'no-undef': 'error', // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef-init': 'error', // 禁止将变量初始化为 undefined

    // Stylistic Issues
    'array-bracket-newline': 'off', // 在数组开括号后和闭括号前强制换行
    'array-bracket-spacing': ['error', 'never'], // 强制数组方括号中使用一致的空格
    'array-element-newline': 'off', // 强制数组元素间出现换行
    'block-spacing': ['error', 'always'], // 禁止或强制在代码块中开括号前和闭括号后有空格
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: true
      }
    ], // 强制在代码块中使用一致的大括号风格
    camelcase: [
      'off',
      {
        properties: 'always'
      }
    ], // 强制使用骆驼拼写法命名约定
    'comma-dangle': ['error', 'never'], // 要求或禁止末尾逗号
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ], // 强制在逗号前后使用一致的空格
    'comma-style': ['error', 'last'], // 强制使用一致的逗号风格
    'computed-property-spacing': 'error', // 强制在计算的属性的方括号中使用一致的空格
    'eol-last': 'error', // 要求或禁止文件末尾存在空行
    'func-call-spacing': 'error', // 要求或禁止在函数标识符和其调用之间有空格
    'jsx-quotes': ['error', 'prefer-single'], // 强制在 JSX 属性中一致地使用双引号或单引号
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true
      }
    ], // 强制在对象字面量的属性中键和值之间使用一致的间距
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ], // 强制在关键字前后使用一致的空格
    'linebreak-style': 'off', // 强制使用一致的换行风格
    'max-len': [
      'off',
      {
        code: 140,
        tabWidth: 2,
        ignoreUrls: true,
        ignorePattern: '^goog.(module|require)'
      }
    ], // 强制一行的最大长度
    'new-cap': [
      'error',
      {
        newIsCap: true,
        capIsNew: false
      }
    ], // 要求构造函数首字母大写
    'new-parens': 'error', // 要求调用无参构造函数时有圆括号
    'no-array-constructor': 'error', // 禁用 Array 构造函数
    'no-mixed-spaces-and-tabs': 'error', // 禁止空格和 tab 的混合缩进
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1
      }
    ], // 禁止出现多行空行
    'no-new-object': 'error', // 禁用 Object 的构造函数
    'no-tabs': 'error', // 禁用 tab
    'no-trailing-spaces': 'error', // 禁用行尾空格
    'no-unneeded-ternary': [
      'error',
      {
        defaultAssignment: false
      }
    ], // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-whitespace-before-property': 'error', // 禁止属性前有空白
    'object-curly-spacing': [
      'error',
      'always',
      {
        objectsInObjects: true
      }
    ], // 强制在大括号中使用一致的空格
    'one-var': [
      'error',
      {
        initialized: 'never'
      }
    ], // 强制函数中的变量要么一起声明要么分开声明
    'operator-linebreak': [
      'error',
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ], // 强制操作符使用一致的换行符
    'padded-blocks': ['error', 'never'], // 要求或禁止块内填充
    'quote-props': ['error', 'consistent'], // 要求对象字面量属性名称用引号括起来
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ], // 强制使用一致的反勾号、双引号或单引号
    semi: ['error', 'never'], // 要求或禁止使用分号代替 ASI
    'semi-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ], // 强制分号之前和之后使用一致的空格
    'space-before-blocks': ['error', 'always'], // 强制在块之前使用一致的空格
    'space-before-function-paren': ['error', 'never'], // 强制在 function的左括号之前使用一致的空格
    'space-in-parens': ['error', 'never'], // 强制在圆括号内使用一致的空格
    'space-infix-ops': 'error', // 要求操作符周围有空格
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false
      }
    ], // 强制在一元操作符前后使用一致的空格
    'spaced-comment': [
      'error',
      'always',
      {
        markers: [
          'global',
          'globals',
          'eslint',
          'eslint-disable',
          '*package',
          '!',
          ','
        ]
      }
    ], // 强制在注释中 // 或 /* 使用一致的空格
    'switch-colon-spacing': 'error', // 强制在 switch 的冒号左右有空格

    // ECMAScript 6
    'arrow-parens': ['error', 'always'], // 要求箭头函数的参数使用圆括号
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ], // 强制箭头函数的箭头前后使用一致的空格
    'constructor-super': 'error', // 要求在构造函数中有 super() 的调用
    'generator-star-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ], // 强制 generator 函数中 * 号周围使用一致的空格
    'no-class-assign': 'error', // 禁止修改类声明的变量
    'no-const-assign': 'error', // 禁止修改 const 声明的变量
    'no-dupe-class-members': 'error', // 禁止类成员中出现重复的名称
    'no-new-symbol': 'error', // 禁止 Symbolnew 操作符和 new 一起使用
    'no-this-before-super': 'error', // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-useless-computed-key': 'error', // 禁止在对象中使用不必要的计算属性
    'no-useless-constructor': 'error', // 禁用不必要的构造函数
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'prefer-const': 'error', // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-rest-params': 'error', // 要求使用剩余参数而不是 arguments
    'prefer-spread': 'error', // 要求使用扩展运算符而非 .apply()
    'rest-spread-spacing': 'error', // 强制剩余和扩展运算符及其表达式之间有空格
    'template-curly-spacing': ['error', 'never'], // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    'yield-star-spacing': ['error', 'both'], // 强制在 yield* 表达式中 * 周围使用空格

    // Deprecated
    'no-native-reassign': 'error',
    'no-negated-in-lhs': 'error',
    'no-spaced-func': 'error',

    // Node.js and CommonJS
    'handle-callback-err': [2, '^(err|error)$'], // 要求回调函数中有容错处理
    'no-new-require': 'error', // 禁止调用 require 时使用 new 操作符
    'no-path-concat': 'error' // 禁止对 __dirname 和 __filename 进行字符串连接
  }
}
