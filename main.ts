function head<T>(array: Array<T>): T {
  return array[0];
}

function tail<T>(array: Array<T>): Array<T> {
  return array.slice(1);
}

const factorial_loop = (num: number): number => {
  let total = 1;
  for (let i = 1; i <= num; i++) {
    total *= i;
  }
  return total;
};

const fibonacci_loop = (num: number): number => {
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

const array_sum_loop = (arr: Array<number>): number => {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
};

const factors_loop = (num: number): Array<number> => {
  let factors: Array<number> = [];
  for (let i: number = 0; i <= num; i++) {
    if (num % i === 0) {
      factors = [...factors, i];
    }
  }
  return factors;
};

const clean_and_compute = (
  f1: (x: any) => any,
  f2: (x: any) => any,
  input: string,
  cleaner: (x: string) => any,
): [number, number] => {
  const sanitized = cleaner(input);
  return [f1(sanitized), f2(sanitized)];
};

const init_currying_1 = (div: HTMLDivElement) => {
  const nums: Array<number> = [9.8, 1437, 2.2];
  const divs: NodeListOf<HTMLDivElement> = div.querySelectorAll("div");
  divs.forEach((challenge: HTMLDivElement, i: number) => {
    (challenge.querySelector(".input") as HTMLInputElement).oninput = (e) => {
      (challenge.querySelector(".result") as HTMLParagraphElement).innerText =
        "Result: " +
        curry_multiplication(nums[i])(
          parseInt((e.target as HTMLInputElement).value),
        ).toString();
    };
  });
};

const init_currying_2 = (div: HTMLDivElement) => {
  const input: HTMLInputElement | null = div.querySelector("input");
  const buttons: NodeListOf<HTMLButtonElement> = div.querySelectorAll("button");
  if (input) {
    input.oninput = (e) => {
      buttons.forEach(
        (button: HTMLButtonElement) =>
          (button.onclick = onclick_curry(
            (e.target as HTMLInputElement).value,
          )),
      );
    };
  }
};

const init_recursive_challenge = (
  div: HTMLDivElement,
  func_loop: (x: any) => any,
  func_recursion: (x: any) => any,
  cleaner: (x: string) => any,
) => {
  const input: HTMLInputElement | null = div.querySelector(".input");
  const func_status: HTMLParagraphElement | null = div.querySelector(".status");
  const loop_p: HTMLParagraphElement | null = div.querySelector(".loop");
  const recursion_p: HTMLParagraphElement | null =
    div.querySelector(".recursion");

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

const challenges: Array<HTMLDivElement> = [
  "challenge-1",
  "challenge-2",
  "challenge-3",
  "challenge-4",
].map((id) => document.getElementById(id)) as Array<HTMLDivElement>;

init_recursive_challenge(challenges[0], factorial_loop, factorial, parseInt);
init_recursive_challenge(challenges[1], fibonacci_loop, fibonacci, parseInt);
init_recursive_challenge(
  challenges[2],
  array_sum_loop,
  array_sum,
  (x: string): Array<number> => x.split(",").map(Number),
);
init_recursive_challenge(challenges[3], factors_loop, factors, parseInt);

const curry_1: HTMLDivElement | null = document.getElementById(
  "currying-1",
) as HTMLDivElement;

const curry_2: HTMLDivElement | null = document.getElementById(
  "currying-2",
) as HTMLDivElement;

if (curry_1) init_currying_1(curry_1);
if (curry_2) init_currying_2(curry_2);
