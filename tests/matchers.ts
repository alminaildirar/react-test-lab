import "vitest";

declare module "vitest" {
  interface Assertion {
    toBeLoadingButton(): void;
  }
  interface AsymmetricMatchersContaining {
    toBeLoadingButton(): void;
  }
}

type MatcherResult = {
  pass: boolean;
  message: () => string;
};

type Matcher = (
  this: unknown,
  received: unknown,
  ...args: unknown[]
) => MatcherResult;

export const toBeLoadingButton: Matcher = function (received) {
  if (!(received instanceof HTMLButtonElement)) {
    return {
      pass: false,
      message: () => "toBeLoadingButton expects an HTMLButtonElement",
    };
  }

  const text = received.textContent ?? "";
  const isDisabled = received.disabled;

  const pass = isDisabled && /yapılıyor|loading/i.test(text);

  return {
    pass,
    message: () =>
      pass
        ? "Expected button not to be a loading button"
        : `Expected a disabled loading button with loading text, got: disabled=${isDisabled}, text="${text}"`,
  };
};
