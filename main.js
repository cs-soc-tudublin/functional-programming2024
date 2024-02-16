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
const init_challenge = (div, func_loop, func_recursion, cleaner) => {
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
init_challenge(challenges[0], factorial_loop, factorial, parseInt);
init_challenge(challenges[1], fibonacci_loop, fibonacci, parseInt);
init_challenge(challenges[2], array_sum_loop, array_sum, (x) =>
  x.split(",").map(Number),
);
init_challenge(challenges[3], factors_loop, factors, parseInt);
