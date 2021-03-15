import {
  FormGroup,
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import KnitDesign from 'assets/designs/knit.png';
import React from 'react';
import styled, { css } from 'styled-components';

const fullWidth = css`
  width: 100%;
`;

const NumberInput = styled(Input)`
  ${fullWidth}
  input {
    text-align: right;
  }
`;

const FullWithInput = styled(Input)`
  ${fullWidth}
`;

const FullWithSelect = styled(Select)`
  ${fullWidth}
`;

const FormTitle = styled(Typography)`
  ${fullWidth}
  margin:8px;
`;

const Row = styled(Grid)`
  padding: 12px;
`;

const DesignImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  img {
    margin-top: 8px;
    height: 400px;
  }
`;

const Detail = (): React.ReactElement => {
  return (
    <>
      <form autoComplete="false">
        <Grid container>
          <Row item xs={12}>
            <FormTitle variant="h2">이름</FormTitle>
            <FullWithInput
              id="design-name"
              aria-describedby="design-name"
              placeholder="예) 토니 캔디 라운드넥 니트"
              required
            />
          </Row>
          <Row container spacing={6}>
            <Grid item xs={12} sm={6}>
              <FormTitle variant="h2">편물 종류</FormTitle>
              <FullWithSelect
                id="knitting-type"
                placeholder="종류 선택"
                required
                defaultValue={1}
              >
                <ListSubheader>상의</ListSubheader>
                <MenuItem value={1}>니트</MenuItem>
                <MenuItem value={2}>원피스</MenuItem>
                <ListSubheader>악세서리</ListSubheader>
                <MenuItem value={3}>목도리</MenuItem>
                <MenuItem value={4}>모자</MenuItem>
              </FullWithSelect>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTitle variant="h2">도안 종류</FormTitle>
              <FullWithSelect id="design-type" required defaultValue={1}>
                <MenuItem value={1}>서술형 도안</MenuItem>
                <MenuItem value={2} disabled={true}>
                  도식화 도안
                </MenuItem>
              </FullWithSelect>
            </Grid>
          </Row>
          <Row container>
            <FormTitle variant="h2">게이지</FormTitle>
            <FormTitle>10 x 10(cm) 편물의 코와 단을 공유해주세요.</FormTitle>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <FormTitle variant="h6">코</FormTitle>
                <NumberInput
                  id="stitch2"
                  type="number"
                  aria-describedby="design-name"
                  required
                  endAdornment={
                    <InputAdornment position="end">코</InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormTitle variant="h6">단</FormTitle>
                <NumberInput
                  id="tier"
                  type="number"
                  aria-describedby="design-name"
                  required
                  endAdornment={
                    <InputAdornment position="end">단</InputAdornment>
                  }
                />
              </Grid>
            </Grid>
          </Row>
          <Row container>
            <FormTitle variant="h2">사이즈</FormTitle>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <DesignImageWrapper>
                  <img src={KnitDesign} />
                </DesignImageWrapper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid>
                  <FormTitle variant="h6">총기장</FormTitle>
                  <NumberInput
                    id="total-length"
                    type="number"
                    aria-describedby="total-lengt"
                    required
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                  />
                </Grid>
                <Grid>
                  <FormTitle variant="h6">소매 기장</FormTitle>
                  <NumberInput
                    id="retail-length"
                    type="number"
                    aria-describedby="retail-length"
                    required
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                  />
                </Grid>
                <Grid>
                  <FormTitle variant="h6">어깨 너비</FormTitle>
                  <NumberInput
                    id="shoulder-length"
                    type="number"
                    aria-describedby="shoulder-length"
                    required
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                  />
                </Grid>
                <Grid>
                  <FormTitle variant="h6">밑단 너비</FormTitle>
                  <NumberInput
                    id="bottom-length"
                    type="number"
                    aria-describedby="bottom-length"
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                  />
                </Grid>
                <Grid>
                  <FormTitle variant="h6">팔폭</FormTitle>
                  <NumberInput
                    id="arm-width"
                    type="number"
                    aria-describedby="arm-width"
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Row>
          <Row item xs={12}>
            <FormTitle variant="h2">사용한 실</FormTitle>
            <FullWithInput
              id="thread-information"
              aria-describedby="thread-information"
              placeholder="예) 티파니 100g 4볼"
            />
          </Row>
          <Row item xs={12}>
            <FormTitle variant="h2">사용한 바늘</FormTitle>
            <FullWithInput
              id="needle-information"
              aria-describedby="needle-information"
              required
              placeholder="예) 5.0mm 80cm 둘레 바늘, 4.5mm 40cm 둘레 바늘"
            />
          </Row>
          <Row item xs={12}>
            <FormTitle variant="h2">추가 재료</FormTitle>
            <FullWithInput
              id="additional-materials"
              aria-describedby="additional-materials"
              placeholder="예) 18mm 단추 3개, 돗바늘, 지퍼 10개, 마커 10개"
            />
          </Row>
          <Row item xs={12}>
            <FormTitle variant="h2">판매 가격</FormTitle>
            <NumberInput
              id="price"
              type="number"
              aria-describedby="price"
              endAdornment={<InputAdornment position="end">원</InputAdornment>}
            />
          </Row>
        </Grid>
      </form>
    </>
  );
};

export default Detail;
