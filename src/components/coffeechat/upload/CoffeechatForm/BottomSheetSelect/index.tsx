import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconCheck, IconChevronDown } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { ReactNode, useEffect, useState } from 'react';

import { zIndex } from '@/styles/zIndex';

interface Option {
  label: string;
  value: string;
}

interface BottomSheetSelectProps {
  options: Option[];
  defaultOption?: Option;
  value: string | null | undefined;
  placeholder: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
}

const BottomSheetSelect = ({
  options,
  defaultOption,
  value,
  placeholder,
  onChange,
  icon,
  className,
  disabled = false,
}: BottomSheetSelectProps) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [temporaryValue, setTemporaryValue] = useState(value);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOptionSelect = (value: string) => {
    setTemporaryValue(value);
  };

  const handleConfirm = () => {
    setSelectedValue(temporaryValue);
    onChange(temporaryValue as string);

    handleClose();
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setSelectedValue(value);
    setTemporaryValue(value);
  }, [value]);

  const getSelectedLabel = (value: string) => {
    return options.find((option) => option.value === value)?.label || value;
  };

  return (
    <Container>
      <InputField onClick={handleOpen} className={className} disabled={disabled}>
        {selectedValue ? <p>{getSelectedLabel(selectedValue)}</p> : <p style={{ color: '#808087' }}>{placeholder}</p>}
        {!icon && !disabled && (
          <IconChevronDown
            style={{
              width: 20,
              height: 20,
              transform: open ? 'rotate(-180deg)' : '',
              transition: 'all 0.5s',
            }}
          />
        )}
      </InputField>

      {open && (
        <>
          <Overlay onClick={handleClose} />
          <BottomSheet>
            <OptionList>
              {defaultOption && (
                <OptionItem onClick={() => handleOptionSelect(defaultOption.value)}>
                  {defaultOption.label}
                  {temporaryValue === defaultOption.value && <CheckedIcon />}
                </OptionItem>
              )}
              {options.map((option) => (
                <OptionItem key={option.value} onClick={() => handleOptionSelect(option.value)}>
                  {option.label}
                  {temporaryValue === option.value && <CheckedIcon />}
                </OptionItem>
              ))}
            </OptionList>
            <Button size='lg' style={{ width: '100%' }} onClick={handleConfirm}>
              확인
            </Button>
          </BottomSheet>
        </>
      )}
    </Container>
  );
};
export default BottomSheetSelect;

const Container = styled.div`
  position: relative;
`;

const InputField = styled.div<{ disabled: boolean }>`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background-color: ${colors.gray800};
  cursor: pointer;
  padding: 11px 16px;
  ${fonts.BODY_16_M};

  width: 100%;
  pointer-events: ${({ disabled }) => disabled && 'none'};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${zIndex.헤더};
  background-color: rgb(15 15 18 / 80%);
  width: 100%;
  height: 100%;
`;

const BottomSheet = styled.section`
  position: fixed;
  bottom: 0;
  left: 20px;
  z-index: ${zIndex.헤더};
  margin-bottom: 12px;
  border-radius: 16px;
  background-color: ${colors.gray800};
  padding: 16px;
  width: calc(100% - 40px);
`;

const OptionList = styled.ul`
  margin: 0 0 16px;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
  list-style: none;
`;

const OptionItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px;
  height: 44px;
  ${fonts.BODY_14_M}
`;

const CheckedIcon = styled(IconCheck)`
  width: 24px;
  height: 24px;
  color: ${colors.success};
`;
