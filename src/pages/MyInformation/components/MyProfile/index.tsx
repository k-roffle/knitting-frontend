import { useCommonSnackbar } from 'knitting/components/CommonSnackbar/useCommonSnackbar';
import { FAILED_TO_GET_MY_PROFILE } from 'knitting/constants/errors';
import EmptyContent from 'knitting/dumbs/EmptyContent';
import { tabItemLengthAtom } from 'knitting/pages/MyInformation/atom';

import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { useGetMyProfile } from '../../hooks/useGetMyProfile';

import {
  CreateButton,
  Email,
  EmptyProfile,
  MyProfileContainer,
  MySalesSummary,
  Name,
  Profile,
  ProfileContainer,
  SalesSummaryCount,
} from './MyProfile.css';
import { useRenderButtonText } from './useRenderButtonText';

const MyProfile = (): React.ReactElement => {
  const [createButtonText, handleButtonClick] = useRenderButtonText();
  const tabItemLength = useRecoilValue(tabItemLengthAtom);
  const { error: myProfileError, data: myProfileData } = useGetMyProfile();
  const navigate = useNavigate();

  const emptyContent = {
    title: '사용자 정보를 불러올 수 없어요! 😢',
    buttonText: '메인으로 돌아가기',
    onClick: () => navigate('/'),
  };

  useCommonSnackbar({
    message: FAILED_TO_GET_MY_PROFILE,
    severity: 'error',
    dependencies: [myProfileError],
  });

  if (myProfileData == null) {
    return <EmptyContent {...emptyContent} />;
  }

  const { email, profile_image_url, name } = myProfileData.payload;
  const emptyList = tabItemLength === 0;

  return (
    <MyProfileContainer>
      <ProfileContainer>
        {profile_image_url ? (
          <Profile src={profile_image_url} />
        ) : (
          <EmptyProfile />
        )}
        <div>
          <div>
            {name && <Name variant="h5">{name}</Name>}
            <Email>{email}</Email>
          </div>
          <MySalesSummary>
            <div>
              <Typography variant="caption">판매중인 상품</Typography>
              <SalesSummaryCount variant="h5">0</SalesSummaryCount>
            </div>
            <div>
              <Typography variant="caption">판매 수</Typography>
              <SalesSummaryCount variant="h5">0</SalesSummaryCount>
            </div>
          </MySalesSummary>
        </div>
      </ProfileContainer>
      {createButtonText != null && handleButtonClick != null && !emptyList && (
        <CreateButton
          variant="outlined"
          color="primary"
          onClick={handleButtonClick}
        >
          {createButtonText}
        </CreateButton>
      )}
    </MyProfileContainer>
  );
};

export default MyProfile;
