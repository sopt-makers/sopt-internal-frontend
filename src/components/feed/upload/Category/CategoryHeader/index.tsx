import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/api/endpoint/feed/getCategory';
import { UploadFeedDataType } from '@/components/feed/upload/types';
import DetailArrow from '@/public/icons/icon-chevron-right.svg';
import ExpandMoreArrow from '@/public/icons/icon-expand-more.svg';
import Arrow from '@/public/icons/icon-select-arrow.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface CategoryHeaderProp {
  feedData: UploadFeedDataType;
  openCategory: () => void;
  openTag: () => void;
}

export default function CategoryHeader({ feedData, openCategory, openTag }: CategoryHeaderProp) {
  const { data: categories } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });

  const parentCategory =
    (categories &&
      categories.find(
        (category) =>
          category.id === feedData.mainCategoryId || category.children.some((tag) => tag.id === feedData.categoryId),
      )) ??
    null;

  const childrenCategory =
    (parentCategory && parentCategory.children.find((tag) => tag.id === feedData.categoryId)) ?? null;

  return (
    <>
      {feedData.categoryId <= 0 ? (
        <CategorySelectorStarter onClick={openCategory}>
          <UploadTitle>어디에 올릴까요?</UploadTitle>
          <OpenArrow fill='white' />
        </CategorySelectorStarter>
      ) : (
        <CategoryContainer>
          <CategoryTitle type='button' onClick={openCategory}>
            {parentCategory && parentCategory.name} <ExpandMoreArrowIcon className='icon-expand-more' />
          </CategoryTitle>
          {feedData.categoryId !== 1 && (
            <>
              <DetailArrow />
              <CategoryTitle type='button' onClick={openTag}>
                {childrenCategory
                  ? childrenCategory.name
                  : parentCategory && parentCategory.hasAll && '주제 선택 안 함'}
                <ExpandMoreArrowIcon className='icon-expand-more' />
              </CategoryTitle>
            </>
          )}
        </CategoryContainer>
      )}
    </>
  );
}

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 12px 16px;
  }
`;

const ExpandMoreArrowIcon = styled(ExpandMoreArrow)`
  display: none;
`;

const CategoryTitle = styled.button`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  padding: 6px;

  &:hover {
    background-color: ${colors.gray800};

    .icon-expand-more {
      display: flex;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0;

    &:hover {
      background-color: transparent;

      .icon-expand-more {
        display: none;
      }
    }
  }
`;

const UploadTitle = styled.h1`
  ${textStyles.SUIT_16_M}

  color: ${colors.white};
`;

const OpenArrow = styled(Arrow)`
  width: 14px;
  height: 14px;
`;

const CategorySelectorStarter = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px 12px;
  width: 154px;

  &:hover {
    border-radius: 8px;
    background-color: ${colors.gray800};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 14px 16px;
    width: 100%;
  }
`;
