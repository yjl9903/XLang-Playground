const Examples = [
  {
    name: 'HelloWorld',
    content: `fn main() {\n\tprintln("Hello World!");\n}`
  },
  {
    name: 'A + B',
    content: `fn main(a: number, b: number) {\n\tprintln(Number::to_string(a + b));\n}`
  },
  {
    name: '等差数列求和',
    content: `fn cal(a: number) -> number {
  if (a > 1) {
    return a + cal(a - 1);
  } else {
    return a;
  }
}

fn main(a: number) {
  println(Number::to_string(cal(a)));
}`
  },
  {
    name: '斐波那契数列 - 递归',
    content: `fn fib(a: number) -> number {
  if (a <= 1) {
    return 1;
  } else {
    return fib(a - 1) + fib(a - 2);
  }
}

fn main(a: number) {
  println(Number::to_string(fib(a)));
}`
  },
  {
    name: '复读机',
    content: `fn main(a: number) {
  let i = 0;
  if (a >= 0) {
    while (i <= a) {
      println("" + i);
      i = i + 1;
    }
  } else {
    println("a should not be negative");
  }
}`
  },
  {
    name: '绩点计算',
    content: `fn main(score: number) {
  if (score > 100 || score < 0) {
    println("Your score \\"" + score + "\\" is illegal!");
    return ;
  }
  if (score >= 90) {
    println("Excellent!");
  } else if (score >= 80) {
    println("Good!");
  } else if (score >= 70) {
    println("Common");
  } else if (score >= 60) {
    println("Pass");
  } else {
    println("emmmmmmm");
  }
  if (score < 60 && score == 0) {
    println("0!");
  }
}`
  },
  {
    name: '斐波那契数列 - 循环',
    content: `fn main(a: number) {
  if (a < 0) {
    println("emmmm");
    return ;
  } else if (a <= 1) {
    println("1");
    return ;
  }
  Array::new("fib");
  Array::assign("fib", a + 1);
  Array::set("fib", 0, 1);
  Array::set("fib", 1, 1);
  for (let i = 2; i <= a; i = i + 1) {
    Array::set("fib", i, Array::get("fib", i - 1) + Array::get("fib", i - 2));
  }
  println(Number::to_string(Array::get("fib", a)));
}`
  },
  {
    name: '数组输入',
    content: `fn main() {
  const n = In::nextNumber();
  for (let i = 1; i <= n; i = i + 1) {
    const a = In::nextNumber();
    println(Number::to_string(a));
  }
}`
  },
  {
    name: '乘法表',
    content: `fn getDigit(a: number) -> number {
  if (a == 0) {
    return 1;
  } else if (a < 0) {
    return getDigit(-a);
  }
  let c = 0;
  while (a > 0) {
    c = c + 1;
    a = a / 10;
  }
  return c;
}

fn main(a: number) {
  const aDigit = getDigit(a);
  const mxDigit = getDigit(a * a);
  for (let i = 1; i <= a; i = i + 1) {
    let row = "", spaceI = "";
    for (let k = getDigit(i); k < aDigit; k = k + 1) {
      spaceI = spaceI + " ";
    }
    for (let j = 1; j <= i; j = j + 1) {
      let spaceJ = "";
      for (let k = getDigit(j); k < aDigit; k = k + 1) {
        spaceJ = spaceJ + " ";
      }
      const col = spaceJ + j + " x " + spaceI + i + " = " + (i * j) + " ";
      row = row + col;
      for (let k = getDigit(i * j); k < mxDigit; k = k + 1) {
        row = row + " ";
      }
    }
    println(row);
  }
}`
  },
  {
    name: '树上最大独立集',
    content: `fn dfs(u: number, f: number) {
  const len = Array::length("edge_" + u);
  let s0 = 0, s1 = 1;
  for (let i = 0; i < len; i = i + 1) {
    const v = Array::get("edge_" + u, i);
    if (v != f) {
      dfs(v, u);
      s0 = s0 + Number::max(Array::get("dp0", v), Array::get("dp1", v));
      s1 = s1 + Array::get("dp0", v);
    }
  }
  Array::set("dp0", u, s0);
  Array::set("dp1", u, s1);
}

fn main() {
  const n = In::nextNumber();
  Array::new("dp0");
  Array::assign("dp0", n + 1);
  Array::new("dp1");
  Array::assign("dp1", n + 1);
  for (let i = 1; i <= n; i = i + 1) {
    Array::new("edge_" + i);
  }
  for (let i = 2; i <= n; i = i + 1) {
    const u = In::nextNumber();
    const v = In::nextNumber();
    Array::push("edge_" + u, v);
    Array::push("edge_" + v, u);
  }
  dfs(1, 0);
  println(Number::to_string(Number::max(Array::get("dp0", 1), Array::get("dp1", 1))));
}`
  }
];

export default Examples;
