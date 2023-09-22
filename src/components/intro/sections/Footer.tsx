import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <Container>
      <HLine />
      <Reserved>All rights reserved by</Reserved>
      <StyledMakersLogo />
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1280px;
`;

const HLine = styled.div`
  border-top: 1px solid ${colors.black40};
  width: 100%;
`;

const Reserved = styled.div`
  margin-top: 72px;
`;

const StyledMakersLogo = styled(MakersLogo)`
  margin-top: 20px;
  margin-bottom: 100px;
`;

function MakersLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={221} height={60} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#prefix__clip0_724_24655)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M161.59 18.505a2.277 2.277 0 002.279 2.276h4.415c.269 0 .486.216.486.485v2.762c0 .269-.217.485-.486.485h-4.415a6.01 6.01 0 01-6.013-6.008V8.996h-1.299a.485.485 0 01-.486-.485V5.749c0-.269.217-.485.486-.485h.507c.618 0 1.117-.5 1.117-1.117V.486c0-.27.216-.486.486-.486h2.437c.269 0 .486.216.486.486V5.26h6.657c.269 0 .486.217.486.486v2.761c0 .27-.217.486-.486.486h-6.657v9.511zM0 57.252c0 .393.082.765.232 1.103.476 1.101 1.643 1.753 2.805 1.632h11.362a2.736 2.736 0 002.736-2.735v-8.466L49.093 22.04a6.504 6.504 0 002.332-4.992V2.796c0-2.326-2.717-3.59-4.497-2.094L2.33 38.235a6.508 6.508 0 00-2.318 4.981v2.133c-.008.08-.011.159-.011.238V57.252zm34.282.008V43.216c0-1.922.848-3.743 2.319-4.981L81.208.705c1.78-1.497 4.497-.232 4.497 2.093V17.05a6.508 6.508 0 01-2.332 4.992L38.771 59.358c-1.78 1.49-4.491.225-4.491-2.098h.002zM71.302 60a2.736 2.736 0 01-2.736-2.735V45.6a2.736 2.736 0 012.736-2.735h11.668a2.736 2.736 0 012.736 2.735v11.665A2.736 2.736 0 0182.969 60H71.301zm38.264-35.487h-7.578a4.31 4.31 0 01-4.312-4.308v-.314c0-.172.14-.312.311-.312h3.114c.171 0 .311.14.311.312 0 .49.399.89.89.89h7.449c.824 0 1.495-.668 1.495-1.495v-1.148c0-.66-.534-1.193-1.194-1.193h-7.549a5.149 5.149 0 01-5.152-5.148v-1.206a5.41 5.41 0 015.41-5.406h7.127a4.766 4.766 0 014.767 4.76c0 .17-.14.31-.312.31h-3.214a.209.209 0 01-.208-.208v-.135a.996.996 0 00-.998-.995h-7.37c-.808 0-1.466.655-1.466 1.463v1.2c0 .901.732 1.63 1.63 1.63h7.718a4.54 4.54 0 014.542 4.537v1.35a5.41 5.41 0 01-5.411 5.406v.01zm98.443 35.26h7.581A5.41 5.41 0 00221 54.364v-1.349a4.539 4.539 0 00-4.542-4.538h-7.718a1.628 1.628 0 01-1.629-1.628v-1.202c0-.807.654-1.462 1.465-1.462h7.37c.549 0 .998.446.998.995v.135a.21.21 0 00.209.208h3.213c.172 0 .312-.14.312-.311 0-2.63-2.134-4.76-4.766-4.76h-7.127a5.408 5.408 0 00-5.411 5.407v1.206a5.149 5.149 0 005.152 5.148h7.547c.66 0 1.193.533 1.193 1.193v1.145c0 .824-.668 1.495-1.494 1.495h-7.449a.89.89 0 01-.89-.89.312.312 0 00-.312-.312h-3.113a.312.312 0 00-.312.312v.314a4.31 4.31 0 004.312 4.308v-.005zM128.981 9.004a1.74 1.74 0 011.738 1.737v8.366a1.74 1.74 0 01-1.738 1.737h-6.583a1.74 1.74 0 01-1.737-1.737V10.74a1.74 1.74 0 011.737-1.737h6.583zm0-3.73h-6.583a5.47 5.47 0 00-5.471 5.47v8.366a5.47 5.47 0 005.471 5.47h6.583a5.47 5.47 0 005.472-5.47v-8.366a5.47 5.47 0 00-5.472-5.47zm8.582 0h2.731c.277 0 .501.225.501.502v1.26a3.065 3.065 0 012.733-1.68h5.994a4.835 4.835 0 014.838 4.834v9.577a4.833 4.833 0 01-4.838 4.83h-5.587a3.471 3.471 0 01-3.14-1.99v9.43a.501.501 0 01-.501.501h-2.731a.501.501 0 01-.501-.501V5.773c0-.277.224-.501.501-.501v.002zm3.232 5.924v7.61a2.156 2.156 0 002.152 2.038h5.833c1.062 0 1.92-.857 1.92-1.919V11.08c0-1.061-.858-1.919-1.92-1.919h-5.833a2.156 2.156 0 00-2.152 2.038zm11.352 21.374h-2.762a.487.487 0 00-.486.486v26.29c0 .27.219.486.486.486h2.762a.485.485 0 00.486-.486v-8.11h3.38l6.572 8.408a.917.917 0 00.721.351h3.837a.285.285 0 00.224-.462l-7.752-9.917 7.095-8.952a.287.287 0 00-.225-.464h-3.831a.915.915 0 00-.718.345l-5.514 6.956h-3.786V33.056c0-.27-.22-.486-.486-.486l-.003.002zm49.566 7.878c.27 0 .486.216.486.485v2.759c0 .27-.216.486-.486.486h-6.575a2.678 2.678 0 00-2.68 2.68v12.488c0 .27-.216.486-.486.486h-2.762a.485.485 0 01-.486-.486V40.853c0-.269.217-.485.486-.485h2.762c.27 0 .486.216.486.485v2.11c.486-1.624 1.299-2.513 3.103-2.513h6.155-.003zm-73.049 3.162v-2.759c0-.266.217-.485.486-.485h12.503a4.067 4.067 0 014.059 4.054v14.926c0 .27-.217.486-.486.486h-2.762a.485.485 0 01-.486-.486V57.27c-.847 1.569-2.297 2.564-4.499 2.564h-6.121a3.925 3.925 0 01-3.927-3.923v-3.155a3.925 3.925 0 013.927-3.922l10.62-1.07v-2.109c0-.86-.697-1.56-1.56-1.56H129.15a.485.485 0 01-.486-.486v.003zm-8.798-3.466h-3.306c-1.64 0-3.103.766-4.048 1.956a4.922 4.922 0 00-3.932-1.956h-3.145c-1.827 0-3.435.95-4.351 2.384v-1.896a.485.485 0 00-.486-.485h-2.762a.487.487 0 00-.489.485v18.717c0 .269.217.485.489.485h2.762a.485.485 0 00.486-.485V45.848c0-1.088.884-1.972 1.972-1.972h4.101c1.13 0 2.046.916 2.046 2.043v13.426c0 .27.217.486.489.486h2.707a.484.484 0 00.485-.486v-13.5c0-1.087.885-1.971 1.973-1.971h4.101c1.13 0 2.046.915 2.046 2.043V59.34c0 .27.217.486.486.486h2.82c.27 0 .489-.217.489-.486V45.059a4.923 4.923 0 00-4.928-4.92h-.005v.007zm18.899 15.987c1.962 0 3.208-1.265 3.208-3.224v-1.533l-8.851.905c-1.078 0-1.954.55-1.954 1.626v.597c0 1.077.874 1.626 1.954 1.626h5.643v.003zm28.996-5.547v2.516c0 3.81 3.089 6.9 6.9 6.9h9.173a.485.485 0 00.486-.485v-2.761a.485.485 0 00-.486-.486h-8.49a3.85 3.85 0 01-3.849-3.849v-1.01h13.786a.494.494 0 00.494-.497v-5.18a5.364 5.364 0 00-5.363-5.364h-7.288a5.362 5.362 0 00-5.363 5.364v4.852zm14.283-2.914v-2.244c0-.73-.594-1.325-1.326-1.325h-7.898c-.731 0-1.325.594-1.325 1.325v1.896c0 .192.155.348.345.348h10.204z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='prefix__clip0_724_24655'>
          <path fill='#fff' d='M0 0h221v60H0z' />
        </clipPath>
      </defs>
    </svg>
  );
}
