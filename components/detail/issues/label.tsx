import styled from 'styled-components';
import { LabelState } from '../../../redux/types/detail';

interface LabelProps {
  label: LabelState;
}

export default ({ label }: LabelProps) => {
  return (
    <>
      <LabelSpan background={`#${label.color}`}>{label.name}</LabelSpan>
    </>
  );
};

interface LabelSpanProps {
  background: string;
}

const LabelSpan = styled.span`
  background: ${(props: LabelSpanProps) => `${props.background}`};
  display: inline-block;
  line-height: 20px;
  margin-left: 15px;
  padding: 3px 10px;
  border-radius: 3px;
  font-size: 14px;
`;
