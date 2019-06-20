import { useCallback, useState } from 'react';
import Container from './container';
import { Layout, Icon, Input, Tooltip, Avatar, Dropdown, Menu } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { Userstate } from '../../redux/types/user';
import { NextFunctionComponent } from 'next';
import { logout } from '../../redux/actions/user';
import { bindActionCreators, Dispatch } from 'redux';
import { ReducersState } from '../../redux/store';
import { searchingRepos } from '../../redux/actions/search';

const { Header, Content, Footer } = Layout;

interface MyProps {
  user?: Userstate;
  router: any;
  logout: any;
  searchingRepos: any;
}

const InnerHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const MyLayout: NextFunctionComponent<MyProps> = ({
  children,
  router,
  user,
  logout,
  searchingRepos,
}) => {
  const handleLogout = useCallback(() => logout(), [logout]);
  const urlQuery = router.query && router.query.query;

  const [search, setSearch] = useState(urlQuery || '');

  const handleSearchChange = useCallback(
    (event) => {
      setSearch(event.target.value);
    },
    [setSearch],
  );

  const handleOnSearch = useCallback(() => {
    router.push(`/search?query=${search}`);
    searchingRepos(`?q=${search}`);
  }, [search]);
  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a
          href="javascript:void(0)"
          onClick={() => {
            handleLogout();
            console.log('log out ');
          }}>
          登 出
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <GlobalStyle />
      <Header>
        <Container style={InnerHeaderStyle}>
          <HeaderLeft>
            <Link href="/">
              <GithubIcon type="github" />
            </Link>
            <div>
              <Input.Search
                placeholder="search"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              />
            </div>
          </HeaderLeft>
          <HeaderRight>
            {user && user.data && user.data.id ? (
              <Dropdown overlay={userDropDown}>
                <a>
                  <Avatar size={40} src={user.data.avatar_url} />
                </a>
              </Dropdown>
            ) : (
              <Tooltip title="點擊登入">
                <a href={`/prepare-auth?url=${router.asPath}`}>
                  <Avatar size={40} icon="user" />
                </a>
              </Tooltip>
            )}
          </HeaderRight>
        </Container>
      </Header>
      <Content>
        <Container>{children}</Container>
      </Content>
      <MyFooter>
        Develop by Otaku_denka @
        <a href="mailto:jay7396@hotmail.com">jay7396@gmail.com</a>
      </MyFooter>
    </Layout>
  );
};
const GlobalStyle = createGlobalStyle`
  #__next {
    height: 100%;
  }
  .ant-layout {
    min-height: 100%;
  }
  .ant-layout-header {
    padding-left: 0;
    padding-right: 0;
  }
  .ant-layout-content {
    background: #fff;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const GithubIcon = styled(Icon)`
  color: white;
  font-size: 40px;
  display: block;
  padding-top: 10px;
  margin-right: 20px;
`;

const MyFooter = styled(Footer)`
  text-align: center;
`;
const mapStateToProps = (state: ReducersState) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logout: bindActionCreators(logout, dispatch),
    searchingRepos: bindActionCreators(searchingRepos, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(MyLayout));
