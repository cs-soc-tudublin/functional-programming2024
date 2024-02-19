"use strict";
function head(array) {
  return array[0];
}
function tail(array) {
  return array.slice(1);
}
const factorial_loop = (num) => {
  let total = 1;
  for (let i = 1; i <= num; i++) {
    total *= i;
  }
  return total;
};
const fibonacci_loop = (num) => {
  let prev = 0;
  let current = 1;
  let next = prev + current;
  for (let i = 0; i < num; i++) {
    next = prev + current;
    prev = current;
    current = next;
  }
  return next;
};
const array_sum_loop = (arr) => {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
};
const factors_loop = (num) => {
  let factors = [];
  for (let i = 0; i <= num; i++) {
    if (num % i === 0) {
      factors = [...factors, i];
    }
  }
  return factors;
};
const clean_and_compute = (f1, f2, input, cleaner) => {
  const sanitized = cleaner(input);
  return [f1(sanitized), f2(sanitized)];
};
const init_currying_1 = (div) => {
  const nums = [9.8, 1437, 2.2];
  const divs = div.querySelectorAll("div");
  divs.forEach((challenge, i) => {
    challenge.querySelector(".input").oninput = (e) => {
      challenge.querySelector(".result").innerText =
        "Result: " +
        curry_multiplication(nums[i])(parseInt(e.target.value)).toString();
    };
  });
};
const init_currying_2 = (div) => {
  const input = div.querySelector("input");
  const buttons = div.querySelectorAll("button");
  if (input) {
    input.oninput = (e) => {
      buttons.forEach(
        (button) => (button.onclick = onclick_curry(e.target.value)),
      );
    };
  }
};
const init_recursive_challenge = (div, func_loop, func_recursion, cleaner) => {
  const input = div.querySelector(".input");
  const func_status = div.querySelector(".status");
  const loop_p = div.querySelector(".loop");
  const recursion_p = div.querySelector(".recursion");
  if (
    input === null ||
    func_status == null ||
    loop_p == null ||
    recursion_p == null
  ) {
    return;
  }
  input.oninput = () => {
    if (input.value == "") {
      return;
    }
    const [val_loop, val_rec] = clean_and_compute(
      func_loop,
      func_recursion,
      input.value,
      cleaner,
    );
    loop_p.innerText = "Result of loop: " + val_loop;
    recursion_p.innerText = "Result of recursion: " + val_rec;
    if (JSON.stringify(val_rec) === JSON.stringify(val_loop)) {
      func_status.style.color = "green";
      func_status.innerText = "Success!";
    } else {
      func_status.style.color = "red";
      func_status.innerText = "Keep trying!";
    }
  };
};
const challenges = [
  "challenge-1",
  "challenge-2",
  "challenge-3",
  "challenge-4",
].map((id) => document.getElementById(id));
init_recursive_challenge(challenges[0], factorial_loop, factorial, parseInt);
init_recursive_challenge(challenges[1], fibonacci_loop, fibonacci, parseInt);
init_recursive_challenge(challenges[2], array_sum_loop, array_sum, (x) =>
  x.split(",").map(Number),
);
init_recursive_challenge(challenges[3], factors_loop, factors, parseInt);
const curry_1 = document.getElementById("currying-1");
const curry_2 = document.getElementById("currying-2");
if (curry_1) init_currying_1(curry_1);
if (curry_2) init_currying_2(curry_2);
