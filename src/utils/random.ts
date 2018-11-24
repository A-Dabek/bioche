export namespace RandomUtils {
  export function randomDate (): Date {
    return new Date(randomRange(2010, 2018), randomRange(0, 11), randomRange(0, 28))
  }

  export function randomRange (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min
  }
}
