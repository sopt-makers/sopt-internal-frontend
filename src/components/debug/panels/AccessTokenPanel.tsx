import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC, useMemo, useReducer } from 'react';
import { useRecoilState } from 'recoil';

import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';
import { safeDecodeAccessToken } from '@/components/auth/util/accessToken';
import TextArea from '@/components/common/TextArea';
import useToast from '@/components/common/Toast/useToast';
import Panel from '@/components/debug/Panel';
import { ActionBox, ActionButton, PanelContent } from '@/components/debug/styles';
import { copyToClipboard } from '@/utils';

const AccessTokenPanel: FC = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);

  const [editState, dispatchEdit] = useReducer(reducer, { type: 'idle' });

  const toast = useToast();

  const applyEdit = () => {
    if (editState.type !== 'editing') {
      return;
    }
    if (isEditError) {
      return;
    }
    setAccessToken(editState.value !== '' ? editState.value : null);
    dispatchEdit({ type: 'end' });
  };

  const decodedToken = useMemo(() => {
    if (!accessToken) {
      return null;
    }
    return safeDecodeAccessToken(accessToken);
  }, [accessToken]);

  const isEditError = useMemo(() => {
    if (editState.type === 'idle') {
      return false;
    }
    if (editState.value === '') {
      return false;
    }
    return safeDecodeAccessToken(editState.value) === null;
  }, [editState]);

  const handleClickCopyButton = () => {
    if (!accessToken) {
      return null;
    }
    copyToClipboard(accessToken, { onSuccess: () => toast.show({ message: '토큰이 복사되었습니다.' }) });
  };

  return (
    <Panel title='저장된 액세스 토큰'>
      {editState.type === 'editing' ? (
        <PanelContent>
          <StyledTextArea
            value={editState.value}
            onChange={(e) => dispatchEdit({ type: 'change', value: e.target.value })}
            error={isEditError}
          />
          <ActionBox>
            <ActionButton
              variant='primary'
              onClick={() => dispatchEdit({ type: 'end' })}
              css={{ backgroundColor: colors.gray100, marginLeft: '5px' }}
            >
              취소
            </ActionButton>
            <ActionButton variant='primary' onClick={applyEdit}>
              확인
            </ActionButton>
          </ActionBox>
        </PanelContent>
      ) : (
        <PanelContent>
          <StyledTextArea value={accessToken ?? ''} disabled />
          <ActionBox>
            <ActionButton variant='primary' onClick={handleClickCopyButton}>
              복사
            </ActionButton>
            <ActionButton variant='primary' onClick={() => dispatchEdit({ type: 'change', value: accessToken ?? '' })}>
              변경
            </ActionButton>
          </ActionBox>
          <div>
            <InSectionTitle>디코드된 토큰 정보</InSectionTitle>
            <StyledTextArea value={JSON.stringify(decodedToken, null, 2)} disabled />
          </div>
        </PanelContent>
      )}
    </Panel>
  );
};

export default AccessTokenPanel;

const StyledTextArea = styled(TextArea)`
  min-height: 130px;

  ${(props) =>
    props.disabled
      ? css`
          background-color: #444;
        `
      : ''}
`;

const InSectionTitle = styled.div`
  margin: 5px 0;
`;

type States =
  | {
      type: 'editing';
      value: string;
    }
  | {
      type: 'idle';
    };

type Action =
  | {
      type: 'change';
      value: string;
    }
  | {
      type: 'end';
    };

const reducer = (_state: States, action: Action): States => {
  if (action.type === 'change') {
    return {
      type: 'editing',
      value: action.value,
    };
  } else if (action.type === 'end') {
    return {
      type: 'idle',
    };
  }

  throw new Error(`Invalid action type`);
};
