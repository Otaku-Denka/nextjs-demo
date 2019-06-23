import React from 'react';
import { NextFunctionComponent } from 'next';
import Router, { withRouter, RouterProps } from 'next/router';
import { Button, Icon, Tabs, Spin } from 'antd';
import { connect } from 'react-redux';
import { ReducersState } from '../redux/store';
import { Userstate } from '../redux/types/user';
import styled from 'styled-components';
import getCofnig from 'next/config';
import { fetchingUserRepo, fetchingStaredRepo } from '../redux/actions/repos';
import { bindActionCreators } from 'redux';
import { RepoItem } from '../redux/types/repos';
import Repo from '../components/common/repo';

const { publicRuntimeConfig } = getCofnig();

interface RouterWithQuery extends RouterProps {
  query: {
    key: string;
  };
}

interface HomeProps {
  user: Userstate;
  router: RouterWithQuery;
  userRepos: RepoItem[];
  staredRepos: RepoItem[];
  isFetching: boolean;
  fetchingUserRepo: any;
  fetchingStaredRepo: any;
}

const Home: NextFunctionComponent<any> = ({
  user,
  router,
  userRepos,
  staredRepos,
  isFetching,
  fetchingUserRepo,
  fetchingStaredRepo,
}: HomeProps) => {
  const tabKey = router.query.key || '1';
  const handleTabChange = (activeKey: string) => {
    if (!isFetching) {
      Router.push(`/?key=${activeKey}`);
      if (activeKey === '1') {
        fetchingUserRepo();
      } else if (activeKey === '2') {
        fetchingStaredRepo();
      }
    }
  };

  if (!user.data || !user.data.id) {
    return (
      <UnauthContainer className="root">
        <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>
          登入
        </Button>
      </UnauthContainer>
    );
  }

  return (
    <RootContainer>
      <UserInfoContainer>
        <UserAvatar
          src={user.data.avatar_url}
          alt="user avatar"
          className="avatar"
        />
        <LoginSpan>{user.data.login}</LoginSpan>
        <NameSpan>{user.data.name}</NameSpan>
        <BioSpan>{user.data.bio}</BioSpan>
        <p>
          <Icon type="mail" style={{ marginRight: 10 }} />
          <a href={`mailto:${user.data.email}`}>{user.data.email}</a>
        </p>
      </UserInfoContainer>
      <UserReposContainer>
        <Tabs activeKey={tabKey} onChange={handleTabChange} animated={false}>
          <Tabs.TabPane tab="Repositories" key="1">
            {isFetching ? (
              <LoadingContainer>
                <Spin />
              </LoadingContainer>
            ) : (
              userRepos.map((item: RepoItem) => {
                return <Repo repo={item} key={item.id} />;
              })
            )}
          </Tabs.TabPane>

          <Tabs.TabPane tab="Stars" key="2">
            {isFetching ? (
              <LoadingContainer>
                <Spin />
              </LoadingContainer>
            ) : (
              staredRepos.map((item: RepoItem) => {
                return <Repo repo={item} key={item.id} />;
              })
            )}
          </Tabs.TabPane>
        </Tabs>
      </UserReposContainer>
    </RootContainer>
  );
};

Home.getInitialProps = async (props: any) => {
  const { user, repos } = props.reduxStore.getState();
  const { userRepos, staredRepos } = repos;
  if (user && user.data && user.data.id) {
    const fetchingUserRepoAction = bindActionCreators(
      fetchingUserRepo,
      props.reduxStore.dispatch,
    );

    const fetchingStaredRepoAction = bindActionCreators(
      fetchingStaredRepo,
      props.reduxStore.dispatch,
    );
    if (
      userRepos.length === 0 &&
      (props.router.query.key === '1' || !props.router.query.key)
    ) {
      await fetchingUserRepoAction();
    }

    if (staredRepos.length === 0 && props.router.query.key === '2') {
      await fetchingStaredRepoAction();
    }

    // return { repo };
    return {};
  }

  return {};
};

const UnauthContainer = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RootContainer = styled.div`
  display: flex;
  padding: 20px 0;
`;

const UserInfoContainer = styled.div`
  width: 200px;
  margin-right: 40px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`;

const UserAvatar = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const LoginSpan = styled.span`
  font-weight: 800;
  font-size: 20px;
  margin-top: 20px;
`;

const NameSpan = styled.span`
  font-size: 16px;
  color: #777;
`;

const BioSpan = styled.span`
  margin-top: 20px;
  color: #333;
`;

const UserReposContainer = styled.div`
  flex-grow: 1;
`;

const LoadingContainer = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
`;

const mapStateToProps = (state: ReducersState) => {
  return {
    user: state.user,
    isFetching: state.repos.isFetching,
    staredRepos: state.repos.staredRepos,
    userRepos: state.repos.userRepos,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchingUserRepo: bindActionCreators(fetchingUserRepo, dispatch),
    fetchingStaredRepo: bindActionCreators(fetchingStaredRepo, dispatch),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Home),
);
