import Link from 'next/link';
import { Icon } from 'antd';
import { RepoItem } from '../../redux/types/repos';
import styled from 'styled-components';

import { getLastUpdated } from '../../lib/utils';

function getLicense(license: any) {
  return license ? `${license.spdx_id} license` : '';
}

interface RepoState {
  repo: RepoItem;
}

export default ({ repo }: RepoState) => {
  return (
    <Container className="root">
      <div>
        <RepoTitle>
          <Link href={`/detail?owner=${repo.owner.login}&name=${repo.name}`}>
            <a>{repo.full_name}</a>
          </Link>
        </RepoTitle>
        <RepoDesc>{repo.description}</RepoDesc>
        <OtherInfo>
          {repo.license ? <span>{getLicense(repo.license)}</span> : null}
          <span>{getLastUpdated(repo.updated_at)}</span>
          <span>{repo.open_issues_count} open issues</span>
        </OtherInfo>
      </div>
      <LangStar>
        <span className="lang">{repo.language}</span>
        <span className="stars">
          {repo.stargazers_count} <Icon type="star" theme="filled" />
        </span>
      </LangStar>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  + .root {
    border-top: 1px solid #eee;
    padding-top: 20px;
  }
`;

const RepoTitle = styled.h3`
  font-size: 20px;
`;

const RepoDesc = styled.p`
  width: 400px;
`;

const LangStar = styled.div`
  display: flex;
  > span {
    width: 120px;
    text-align: right;
  }
`;

const OtherInfo = styled.p`
  > span + span {
    margin-left: 10px;
  }
`;
