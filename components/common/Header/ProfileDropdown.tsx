import styled from '@emotion/styled';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';

import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

const DropdownPortal = dynamic(() => import('@radix-ui/react-dropdown-menu').then((r) => r.DropdownMenuPortal), {
  ssr: false,
});

interface ProfileDropdownProps {
  children: ReactNode;
  myProfileHref?: string;
  onLogout?: () => void;
}

const ProfileDropdown: FC<ProfileDropdownProps> = ({ children, myProfileHref = '#', onLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownPortal>
        <DropdownMenu.Content sideOffset={12} align='end' asChild>
          <ContentBox>
            <DropdownMenu.Item asChild>
              <Link href={myProfileHref} legacyBehavior passHref>
                <ButtonItem as='a' onClick={() => setOpen(false)}>
                  내 프로필
                </ButtonItem>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <ButtonItem onClick={onLogout}>로그아웃</ButtonItem>
            </DropdownMenu.Item>
          </ContentBox>
        </DropdownMenu.Content>
      </DropdownPortal>
    </DropdownMenu.Root>
  );
};

export default ProfileDropdown;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  box-shadow: 0 10px 38px -10px rgb(22 23 24 / 35%), 0 10px 20px -15px rgb(22 23 24 / 20%);
  background: ${colors.black60};
  padding: 12px 0;
  min-width: 176px;
`;

const ButtonItem = styled.div`
  cursor: pointer;
  padding: 12px 20px;

  ${textStyles.SUIT_16_SB}
`;
