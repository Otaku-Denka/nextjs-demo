import dynamic from 'next/dynamic';
import { IssueState } from '../../../redux/types/detail';
import styled from 'styled-components';
import { Button } from 'antd';
const MdRenderer = dynamic(() => import('../markdownRenderer'));

interface IssueDetailProps {
  issue: IssueState;
}

export default ({ issue }: IssueDetailProps) => {
  return (
    <Container>
      <MdRenderer content={issue.body} />
      <BtnContainer>
        <Button href={issue.html_url} target="_blank">
          Open Issue
        </Button>
      </BtnContainer>
    </Container>
  );
};

const Container = styled.div`
  background: #fefefe;
  padding: 20px;
`;

const BtnContainer = styled.div`
  text-align: right;
`;
