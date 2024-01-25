import { css, SerializedStyles } from '@emotion/react';

export const baseTextStyles = css`
  letter-spacing: -0.005em;
`;

/** @deprecated `@sopt-makers/fonts`의 fonts 객체를 사용해주세요. (MDS의 폰트 시스템을 사용하도록 변경되었습니다.) */
export const textStyles = (() => {
  const sizes = [10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 30, 32, 40, 60] as const;
  const weights = [
    ['L', 300],
    ['R', 400],
    ['M', 500],
    ['SB', 600],
    ['B', 700],
    ['EB', 800],
  ] as const;

  type FontKey = `SUIT_${(typeof sizes)[number]}_${(typeof weights)[number][0]}`;
  const entries = sizes.flatMap((size) =>
    weights.map(([weightName, value]) => [
      `SUIT_${size}_${weightName}` as FontKey,
      css`
        font-size: ${size}px;
        font-weight: ${value};
      `,
    ]),
  );
  const textStyles: Record<FontKey, SerializedStyles> = Object.fromEntries(entries);
  return textStyles;
})();

export type Typography = keyof typeof textStyles;
