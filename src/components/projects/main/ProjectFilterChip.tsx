import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { PropsWithChildren } from 'react';

interface ProjectFilterChipProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  size?: 'medium' | 'small';
}
const ProjectFilterChip = ({
  size = 'medium',
  checked,
  children,
  onCheckedChange,
}: PropsWithChildren<ProjectFilterChipProps>) => {
  return (
    <Chip checked={checked} css={{ background: checked ? colors.success : colors.gray800 }} size={size}>
      <input type='checkbox' checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} />
      {children}
    </Chip>
  );
};

export default ProjectFilterChip;

const Chip = styled.label<Pick<ProjectFilterChipProps, 'checked' | 'size'>>`
  transition: background 0.2s;
  border-radius: 20px;
  cursor: pointer;
  padding: 7px 14px;
  color: ${colors.gray50};

  ${({ checked }) =>
    checked
      ? css`
          background-color: ${colors.success};

          &:hover {
            background-color: ${colors.blue300};
          }
        `
      : css`
          background-color: ${colors.gray800};
          /* stylelint-disable-next-line no-duplicate-selectors */
          &:hover {
            background-color: ${colors.gray600};
          }
        `}
  ${({ size }) =>
    size === 'medium' &&
    css`
      ${fonts.LABEL_14_SB};
    `}
    ${({ size }) =>
    size === 'small' &&
    css`
      ${fonts.LABEL_12_SB};
    `}
`;
