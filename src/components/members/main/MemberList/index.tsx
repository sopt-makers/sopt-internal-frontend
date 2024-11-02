import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconChevronDown, IconSwitchVertical } from '@sopt-makers/icons';
import { SearchField } from '@sopt-makers/ui';
import { debounce, uniq } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FC, ReactNode, useEffect, useMemo, useState } from 'react';

import { Profile } from '@/api/endpoint_LEGACY/members/type';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import OrderBySelect from '@/components/members/common/select/OrderBySelect';
import MessageModal, { MessageCategory } from '@/components/members/detail/MessageSection/MessageModal';
import { DESKTOP_ONE_MEDIA_QUERY, DESKTOP_TWO_MEDIA_QUERY } from '@/components/members/main/contants';
import { useMemberProfileQuery } from '@/components/members/main/hooks/useMemberProfileQuery';
import MemberCard from '@/components/members/main/MemberCard';
import {
  EMPLOYED_OPTIONS,
  FILTER_DEFAULT_OPTION,
  GENERATION_DEFAULT_OPTION,
  GENERATION_OPTIONS,
  MBTI_OPTIONS,
  Option,
  ORDER_OPTIONS,
  PART_DEFAULT_OPTION,
  PART_OPTIONS,
  TEAM_OPTIONS,
} from '@/components/members/main/MemberList/filters/constants';
import MemberListFilter from '@/components/members/main/MemberList/filters/MemberListFilter';
import MemberListFilterSheet from '@/components/members/main/MemberList/filters/MemberListFilterSheet';
import { LATEST_GENERATION } from '@/constants/generation';
import { playgroundLink } from '@/constants/links';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { usePageQueryParams } from '@/hooks/usePageQueryParams';
import { useRunOnce } from '@/hooks/useRunOnce';
import IconDiagonalArrow from '@/public/icons/icon-diagonal-arrow.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const PAGE_LIMIT = 30;

interface MemberListProps {
  banner: ReactNode;
}

export type MessageModalState =
  | {
      show: false;
    }
  | {
      show: true;
      data: {
        targetId: string;
        name: string;
        profileUrl: string;
      };
    };

const MemberList: FC<MemberListProps> = ({ banner }) => {
  const [generation, setGeneration] = useState<Option | null | undefined>(null);
  const [part, setPart] = useState<Option | null | undefined>(null);
  const [employed, setEmployed] = useState<Option | null | undefined>(null);
  const [team, setTeam] = useState<Option | null | undefined>(null);
  const [mbti, setMbti] = useState<Option | null | undefined>(null);
  const [orderBy, setOrderBy] = useState<string>(ORDER_OPTIONS[0].value);
  const [search, setSearch] = useState<string | undefined>('');
  const [messageModalState, setMessageModalState] = useState<MessageModalState>({ show: false });

  const router = useRouter();
  const { logClickEvent, logSubmitEvent, logPageViewEvent } = useEventLogger();
  const { ref, isVisible } = useIntersectionObserver();
  const { data: memberProfileData, fetchNextPage } = useMemberProfileQuery({
    limit: PAGE_LIMIT,
    queryKey: [router.query],
  });
  const { addQueryParamsToUrl } = usePageQueryParams({
    skipNull: true,
  });
  const isEmpty = memberProfileData?.pages[0].members.length === 0;

  const profiles = useMemo(
    () =>
      memberProfileData?.pages.map((page) =>
        page.members.map((member) => ({
          ...member,
          isActive: member.activities.map(({ generation }) => generation).includes(LATEST_GENERATION),
          part: uniq(member.activities.map(({ part }) => part)).join(' / '),
        })),
      ),
    [memberProfileData],
  );

  useRunOnce(() => {
    logPageViewEvent('mamberPageList');
  }, []);

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible, fetchNextPage]);

  useEffect(() => {
    if (router.isReady) {
      const { generation, filter, search, employed, team, mbti, orderBy } = router.query;
      if (typeof generation === 'string' || generation === undefined || null) {
        const generationOption = GENERATION_OPTIONS.find((option) => option.value === generation);
        setGeneration(generationOption as Option);
      }
      if (typeof filter === 'string' || filter === undefined || null) {
        const filterOption = PART_OPTIONS.find((option) => option.value === filter);
        setPart(filterOption as Option);
      }
      if (typeof search === 'string') {
        setSearch(search);
      }
      if (typeof team === 'string' || team === undefined || null) {
        const teamOption = TEAM_OPTIONS.find((option) => option.value === team);
        setTeam(teamOption);
      }
      if (typeof mbti === 'string' || mbti === undefined || null) {
        const mbtiOption = MBTI_OPTIONS.find((option) => option.value === mbti);
        setMbti(mbtiOption);
      }
      if (typeof employed === 'string' || employed === undefined || null) {
        const employedOption = EMPLOYED_OPTIONS.find((option) => option.value === employed);
        setEmployed(employedOption as Option);
      }
      if (typeof orderBy === 'string') {
        setOrderBy(orderBy);
      }
    }
  }, [router.isReady, router.query, router]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleSearchReset = () => {
    setSearch('');
    addQueryParamsToUrl({ search: '' });
  };

  const createTypeSafeHandler =
    <T extends string>(handler: (value: T) => void) =>
    (value: string | number | boolean) => {
      if (typeof value === 'string') {
        handler(value as T);
      }
    };

  const handleSelectPart = createTypeSafeHandler<string>((filter: string) => {
    addQueryParamsToUrl({ filter });
    logClickEvent('filterPart', { part: filter || 'all' });
  });

  const handleSelectGeneration = createTypeSafeHandler<string>((generation: string) => {
    addQueryParamsToUrl({ generation });
    logClickEvent('filterGeneration', { generation: generation || 'all' });
  });

  const handleSelectTeam = createTypeSafeHandler<string>((team: string) => {
    addQueryParamsToUrl({ team });
    logClickEvent('filterTeam', { team: team || 'all' });
  });

  const handleSelectMbti = createTypeSafeHandler<string>((mbti: string) => {
    addQueryParamsToUrl({ mbti });
    logClickEvent('filterMbti', { mbti: mbti || 'all' });
  });

  const handleSelectEmployed = createTypeSafeHandler<string>((employed: string) => {
    addQueryParamsToUrl({ employed });
    logClickEvent('filterEmployed', { employed: employed || 'all' });
  });

  const handleSelectOrderBy = createTypeSafeHandler<string>((orderBy: string) => {
    addQueryParamsToUrl({ orderBy });
    logClickEvent('filterOrderBy', { orderBy });
  });

  const handleSearchSubmit = debounce((searchQuery: string) => {
    addQueryParamsToUrl({ search: searchQuery });
    logSubmitEvent('searchMember', { content: searchQuery });

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, 0);

  const handleClickCard = (profile: Profile) => {
    logClickEvent('memberCard', { id: profile.id, name: profile.name });
  };

  return (
    <StyledContainer>
      <div
        css={css`
          padding: 0 20px;
          width: 100%;
        `}
      >
        <Responsive only='mobile'>{banner}</Responsive>
        <Responsive only='mobile' css={{ marginTop: '20px' }}>
          <StyledMemberSearch
            placeholder='이름, 학교, 회사를 검색해보세요!'
            value={search || ''}
            onChange={handleSearchChange}
            onSubmit={() => handleSearchSubmit(search as string)}
            onReset={handleSearchReset}
          />
          <StyledMobileFilterWrapper>
            <StyledMobileFilter
              value={generation?.value}
              onChange={handleSelectGeneration}
              options={GENERATION_OPTIONS}
              defaultOption={GENERATION_DEFAULT_OPTION}
              placeholder='기수'
              trigger={(placeholder) => (
                <MobileFilterTrigger selected={Boolean(generation)}>
                  {placeholder}
                  <StyledChevronDown />
                </MobileFilterTrigger>
              )}
            />
            <StyledMobileFilter
              placeholder='파트'
              value={part?.value}
              onChange={handleSelectPart}
              options={PART_OPTIONS}
              defaultOption={PART_DEFAULT_OPTION}
              trigger={(placeholder) => (
                <MobileFilterTrigger selected={Boolean(part)}>
                  {placeholder}
                  <StyledChevronDown />
                </MobileFilterTrigger>
              )}
            />
            <StyledMobileFilter
              options={TEAM_OPTIONS}
              value={team?.value}
              onChange={handleSelectTeam}
              defaultOption={FILTER_DEFAULT_OPTION}
              placeholder='활동'
              trigger={(placeholder) => (
                <MobileFilterTrigger selected={Boolean(team)}>
                  {placeholder}
                  <StyledChevronDown />
                </MobileFilterTrigger>
              )}
            />
            <StyledMobileFilter
              placeholder='MBTI'
              defaultOption={FILTER_DEFAULT_OPTION}
              options={MBTI_OPTIONS}
              value={mbti?.value}
              onChange={handleSelectMbti}
              trigger={(placeholder) => (
                <MobileFilterTrigger selected={Boolean(mbti)}>
                  {placeholder}
                  <StyledChevronDown />
                </MobileFilterTrigger>
              )}
            />
            <StyledMobileFilter
              placeholder='재직 상태'
              defaultOption={FILTER_DEFAULT_OPTION}
              options={EMPLOYED_OPTIONS}
              value={employed?.value}
              onChange={handleSelectEmployed}
              trigger={(placeholder) => (
                <MobileFilterTrigger selected={Boolean(employed)}>
                  {placeholder}
                  <StyledChevronDown />
                </MobileFilterTrigger>
              )}
            />
          </StyledMobileFilterWrapper>
          {memberProfileData && (
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20px;
                height: 48px;
              `}
            >
              <Text typography='SUIT_14_M'>{`전체 ${memberProfileData.pages[0].totalMembersCount}명`}</Text>
              <StyledMobileFilter
                placeholder=''
                options={ORDER_OPTIONS}
                value={orderBy}
                onChange={handleSelectOrderBy}
                trigger={(placeholder) => (
                  <OrderFilter>
                    <Text typography='SUIT_16_M' color={colors.gray300}>
                      {placeholder}
                    </Text>
                    <StyledSwitchVertical />
                  </OrderFilter>
                )}
              />
            </div>
          )}
        </Responsive>
      </div>
      <StyledMain>
        <Responsive
          only='desktop'
          css={css`
            margin-top: 64px;
            width: 100%;
          `}
        >
          {banner}
        </Responsive>
        <StyledRightWrapper>
          <StyledCardWrapper>
            {profiles?.map((profiles, index) => (
              <React.Fragment key={index}>
                {profiles.map((profile) => {
                  const sorted = profile.activities.sort((a, b) => b.generation - a.generation);
                  const badges = sorted.map((activity) => ({
                    content: `${activity.generation}기 ${activity.part}`,
                    isActive: activity.generation === LATEST_GENERATION,
                  }));

                  const belongs = profile.careers.find((career) => career.isCurrent)?.companyName ?? profile.university;

                  return (
                    <StyledLink
                      key={profile.id}
                      href={playgroundLink.memberDetail(profile.id)}
                      onClick={() => handleClickCard(profile)}
                    >
                      <MemberCard
                        name={profile.name}
                        belongs={belongs}
                        badges={badges}
                        intro={profile.introduction}
                        imageUrl={profile.profileImage}
                        isCoffeeChatActivate={profile.isCoffeeChatActivate}
                        email={profile.email}
                        onMessage={(e) => {
                          e.preventDefault();
                          setMessageModalState({
                            show: true,
                            data: {
                              targetId: `${profile.id}`,
                              name: profile.name,
                              profileUrl: profile.profileImage,
                            },
                          });
                        }}
                      />
                      <Responsive only='mobile'>
                        <HLine />
                      </Responsive>
                    </StyledLink>
                  );
                })}
              </React.Fragment>
            ))}
          </StyledCardWrapper>

          {isEmpty && (
            <StyledEmpty>
              <EmptyTitle>OMG... 검색 결과가 없어요.</EmptyTitle>
              <EmptyDescription>검색어를 바르게 입력했는지 확인하거나, 필터를 변경해보세요.</EmptyDescription>
            </StyledEmpty>
          )}
          <Responsive only='desktop'>
            <StyledTopWrapper>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  @media ${DESKTOP_TWO_MEDIA_QUERY} {
                    display: grid;
                    grid:
                      [row1-start] 'search' [row1-end]
                      [row2-start] 'filter' [row2-end]
                      [row3-start] 'orderBy' [row3-end]
                      / 1fr;
                  }
                `}
              >
                <StyledFilterWrapper>
                  <MemberListFilter
                    placeholder='기수'
                    defaultOption={GENERATION_DEFAULT_OPTION}
                    options={GENERATION_OPTIONS}
                    onChange={handleSelectGeneration}
                    value={generation ?? undefined}
                    onDefaultClick={() => setGeneration(undefined)}
                  />
                  <MemberListFilter
                    placeholder='파트'
                    onChange={handleSelectPart}
                    defaultOption={PART_DEFAULT_OPTION}
                    options={PART_OPTIONS}
                    value={part ?? undefined}
                    onDefaultClick={() => setPart(undefined)}
                  />
                  <MemberListFilter
                    placeholder='활동'
                    options={TEAM_OPTIONS}
                    onChange={handleSelectTeam}
                    defaultOption={FILTER_DEFAULT_OPTION}
                    value={team ?? undefined}
                    onDefaultClick={() => setTeam(undefined)}
                  >
                    <Link href={playgroundLink.makers()}>
                      <div>
                        <StyledMakersLink typography='SUIT_16_M'>
                          메이커스
                          <IconDiagonalArrow />
                        </StyledMakersLink>
                      </div>
                    </Link>
                  </MemberListFilter>
                  <MemberListFilter
                    placeholder='MBTI'
                    defaultOption={FILTER_DEFAULT_OPTION}
                    options={MBTI_OPTIONS}
                    onChange={handleSelectMbti}
                    value={mbti ?? undefined}
                    onDefaultClick={() => setMbti(undefined)}
                  />
                  <MemberListFilter
                    placeholder='재직 상태'
                    defaultOption={FILTER_DEFAULT_OPTION}
                    options={EMPLOYED_OPTIONS}
                    onChange={handleSelectEmployed}
                    value={employed ?? undefined}
                    onDefaultClick={() => setEmployed(undefined)}
                  />
                </StyledFilterWrapper>
                <StyledMemberSearch
                  placeholder='이름, 학교, 회사를 검색해보세요!'
                  value={search || ''}
                  onChange={handleSearchChange}
                  onSubmit={() => handleSearchSubmit(search as string)}
                  onReset={handleSearchReset}
                />
              </div>
              {memberProfileData && (
                <div
                  css={css`
                    display: flex;
                    grid-area: 'orderBy';
                    justify-content: space-between;
                    order: 3;
                    margin-top: 30px;
                  `}
                >
                  <Text typography='SUIT_18_M'>{`전체 ${memberProfileData.pages[0].totalMembersCount}명`}</Text>
                  <OrderBySelect
                    value={orderBy}
                    onChange={handleSelectOrderBy}
                    options={ORDER_OPTIONS}
                    trigger={
                      <OrderFilter>
                        <Text typography='SUIT_16_M' color={colors.gray300}>
                          {ORDER_OPTIONS.find((option: Option) => option.value === orderBy)?.label}
                        </Text>
                        <StyledSwitchVertical />
                      </OrderFilter>
                    }
                  />
                </div>
              )}
            </StyledTopWrapper>
          </Responsive>
        </StyledRightWrapper>
      </StyledMain>
      <Target ref={ref} />
      {messageModalState.show && (
        <MessageModal
          receiverId={messageModalState.data.targetId}
          name={messageModalState.data.name}
          profileImageUrl={messageModalState.data.profileUrl}
          onClose={() => setMessageModalState({ show: false })}
          defaultCategory={MessageCategory.COFFEE_CHAT}
          onLog={(options) =>
            logSubmitEvent('sendMessage', {
              category: options?.category?.toString() ?? '',
              receiverId: +messageModalState.data.targetId,
              referral: 'memberList',
            })
          }
        />
      )}
    </StyledContainer>
  );
};

export default MemberList;

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 0;
  }
`;

const StyledMain = styled.main`
  display: flex;
  position: relative;
  flex: 1;
  flex-direction: column;
  column-gap: 30px;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0 20px;
    width: 100%;
  }
`;

const StyledRightWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column-reverse;
  width: 100%;
`;

const StyledTopWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledFilterWrapper = styled.div`
  display: flex;
  column-gap: 10px;

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    display: flex;
    grid-area: 'filter';
    gap: 10px;
    align-items: center;
    order: 2;
    margin-top: 17px;
  }
`;

const StyledMakersLink = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: color 0.2s background-color 0.2s;
  outline: none;
  border-radius: 6px;
  padding: 8px 12px;

  &:hover {
    background-color: ${colors.gray700};
  }
`;

const StyledMemberSearch = styled(SearchField)`
  min-width: 335px;
  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    grid-area: 'search';
    order: 1;
    max-width: 100%;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    order: none;
    width: 100%;

    & > input {
      border-radius: 6px;
      padding: 12px 36px 12px 18px;
      ${textStyles.SUIT_15_M};
    }

    & > svg {
      top: 12px;
      right: 18px;
    }
  }
`;

const StyledCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(10px, 310px));
  gap: 24px;
  align-items: center;
  justify-items: stretch;
  margin-top: 28px;

  @media ${DESKTOP_ONE_MEDIA_QUERY} {
    grid-template-columns: repeat(3, minmax(10px, 310px));
  }

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    grid-template-columns: repeat(2, minmax(10px, 310px));
  }

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: repeat(1, 1fr);
    gap: 0 8px;
    justify-items: stretch;
    margin-top: 0;

    & > div {
      width: 100%;
    }
  }
`;

const StyledEmpty = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 300px;
  max-height: 100%;

  & > span {
    display: block;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px;
  }
`;

const EmptyTitle = styled.span`
  ${textStyles.SUIT_32_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_24_B};
  }
`;

const EmptyDescription = styled.span`
  color: ${colors.gray400};
  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M}
  }
`;

const HLine = styled.hr`
  position: absolute;
  bottom: 0;
  left: -20px;
  margin: 0;
  border: 0;
  border-bottom: 1px solid ${colors.gray800};
  padding: 0;
  width: 100dvw;
`;

const Target = styled.div`
  width: 100%;
  height: 40px;
`;

const StyledLink = styled(Link)`
  position: relative;
`;

const StyledMobileFilterWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 17px;
  margin-right: -20px;
  padding-right: 20px;
  overflow-x: auto;

  /* to disable scroll bar */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;
const StyledMobileFilter = styled(MemberListFilterSheet)`
  flex: none;
`;

const MobileFilterTrigger = styled.button<{ selected?: boolean }>`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 10px;
  background: ${colors.gray800};
  padding: 11px 16px;
  width: max-content;
  min-width: fit-content;
  height: 48px;
  color: ${colors.gray300};
  ${({ selected }) =>
    selected &&
    css`
      color: ${colors.white};
    `}
`;

const StyledChevronDown = styled(IconChevronDown)`
  width: 20px;
  height: 20px;
  color: ${colors.white};
`;

const StyledSwitchVertical = styled(IconSwitchVertical)`
  width: 20px;
  height: 20px;
  color: ${colors.gray300};
`;

const OrderFilter = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;
