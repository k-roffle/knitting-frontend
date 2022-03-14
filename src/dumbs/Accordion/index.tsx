import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import React from 'react';

import { StyledAccordion } from './Accordion.css';

type P = {
  summary: string;
  detailElements: React.ReactElement[];
};

const Accordion = ({ summary, detailElements }: P): React.ReactElement => (
  <StyledAccordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>{summary}</Typography>
    </AccordionSummary>
    {detailElements.length && (
      <AccordionDetails>
        {detailElements.map((element) => element)}
      </AccordionDetails>
    )}
  </StyledAccordion>
);

export default Accordion;
