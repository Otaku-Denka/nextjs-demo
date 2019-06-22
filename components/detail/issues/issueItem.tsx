import { useState, useCallback } from 'react';
import { IssueState, LabelState } from '../../../redux/types/detail';
import IssueDetail from './issuesDetail';
import { getLastUpdated } from '../../../lib/utils';
import { Avatar, Button } from 'antd';
import Label from './label';
import styled from 'styled-components';

interface IssueItemProps {
  issue: IssueState;
}

export default ({ issue }: IssueItemProps) => {
  const [showDetail, setShowDetail] = useState(false);
  const toggleShowDetail = useCallback(() => {
    setShowDetail((detail: boolean) => !detail);
  }, []);
  return (
    <div>
      <IssueContainer className="issue">
        <Button
          type="primary"
          size="small"
          style={{ position: 'absolute', right: 10, top: 10 }}
          onClick={toggleShowDetail}>
          {showDetail ? 'hide' : 'show'}
        </Button>
        <AvatarContainer>
          <Avatar src={issue.user.avatar_url} shape="square" size={50} />
        </AvatarContainer>
        <div>
          <IssueTitle>
            <span>{issue.title}</span>
            {issue.labels.map((label: LabelState) => (
              <Label label={label} key={label.id} />
            ))}
          </IssueTitle>
          <SubInfoContainer>
            <span>
              Updated at {getLastUpdated(issue.updated_at)}{' '}
              {` By: ${issue.user.login}`}
            </span>
          </SubInfoContainer>
        </div>
      </IssueContainer>
      {showDetail ? <IssueDetail issue={issue} /> : null}
    </div>
  );
};

const IssueContainer = styled.div`
  display: flex;
  position: relative;
  padding: 10px;
  :hover {
    background: #fafafa;
  }
  + .issue {
    border-top: 1px solid #eee;
  }
`;

const IssueTitle = styled.h6`
  max-width: 600px;
  font-size: 16px;
  padding-right: 40px;
`;

const AvatarContainer = styled.div`
  margin-right: 20px;
`;

const SubInfoContainer = styled.p`
  margin-bottom: 0;
  > span + span {
    display: inline-block;
    margin-left: 20px;
    font-size: 12px;
  }
`;
