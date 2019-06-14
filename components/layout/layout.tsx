import Container from './container';
import { Layout, Icon, Input, Tooltip, Avatar } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';

const { Header, Content, Footer } = Layout;

interface MyProps {
  user?: any;
}

const InnerHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const MyLayout: React.FunctionComponent<MyProps> = ({ children }) => {
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
              <Input.Search placeholder="search repo" />
            </div>
          </HeaderLeft>
          <HeaderRight>
            <Tooltip title="點擊登入">
              <a href={'/'}>
                <Avatar size={40} icon="user" />
              </a>
            </Tooltip>
          </HeaderRight>
        </Container>
      </Header>
      <Container>{children}</Container>
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
export default MyLayout;
