import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { currentStepAtom } from 'pages/CreateDesign/recoils';
import React from 'react';
import { useRecoilValue } from 'recoil';

const Connector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50%)',
    right: 'calc(50%)',
  },
  active: {
    '& $line': {
      borderColor: '#e0562e',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#e0562e',
    },
  },
  line: {
    borderColor: '#dcdcdc',
    borderTopWidth: 5,
  },
})(StepConnector);

const StepIconStyles = makeStyles({
  root: {
    color: '#dcdcdc',
    display: 'flex',
    height: 22,
    zIndex: 1,
    alignItems: 'center',
  },
  active: {
    color: '#e0562e',
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#e0562e',
    fontSize: 18,
  },
});

interface StepIconProps {
  active: boolean;
  completed: boolean;
}

function StepIcon(props: StepIconProps) {
  const classes = StepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <div className={clsx(classes.circle, classes.completed)} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

const StepProgressBar = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);
  const steps = ['기본 정보 입력', '도안 작성', '최종 확인'];

  return (
    <Stepper
      activeStep={currentStep}
      alternativeLabel
      connector={<Connector />}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepProgressBar;
