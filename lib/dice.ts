import { xoroshiro128plus, uniformIntDistribution } from "pure-rand";

const seed = new Date().getTime() + Math.random() * 1000;
let rng = xoroshiro128plus(seed);

function* getDie<Result extends number>(
  sides: number
): Generator<Result, never, never> {
  while (true) {
    const [result, newRng] = uniformIntDistribution(1, sides, rng);
    rng = newRng;
    yield result as Result;
  }
}

export const d4 = getDie<1 | 2 | 3 | 4>(4);
export const d6 = getDie<1 | 2 | 3 | 4 | 5 | 6>(6);
export const d8 = getDie<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(8);
export const d10 = getDie<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10>(10);
export const d12 = getDie<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>(12);
export const d20 = getDie<
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
>(20);
export const d100 = getDie<
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90
  | 91
  | 92
  | 93
  | 94
  | 95
  | 96
  | 97
  | 98
  | 99
  | 100
>(100);

export function rollD4() {
  return d4.next().value;
}
export type D4Value = ReturnType<typeof rollD4>;

export function rollD6() {
  return d6.next().value;
}
export type D6Value = ReturnType<typeof rollD6>;

export function rollD8() {
  return d8.next().value;
}
export type D8Value = ReturnType<typeof rollD8>;

export function rollD10() {
  return d10.next().value;
}
export type D10Value = ReturnType<typeof rollD10>;

export function rollD12() {
  return d12.next().value;
}
export type D12Value = ReturnType<typeof rollD12>;

export function rollD20() {
  return d20.next().value;
}
export type D20Value = ReturnType<typeof rollD20>;

export function roll3D20() {
  return [d20.next().value, d20.next().value, d20.next().value] as const;
}
export type _3D20Values = ReturnType<typeof roll3D20>;

export function rollD100() {
  return d100.next().value;
}
export type D100Value = ReturnType<typeof rollD100>;
