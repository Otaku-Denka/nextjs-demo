import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReducersState } from '../../redux/store';
import { NextFunctionComponent } from 'next';
import { fetchingRepoBasic } from '../../redux/actions/detail';
import Link from 'next/link';
import Repo from '../common/repo';
import styled from 'styled-components';

function makeQuery(queryObject: any) {
  const query = Object.entries(queryObject)
    .reduce((result: any, entry) => {
      result.push(entry.join('='));
      return result;
    }, [])
    .join('&');
  return `?${query}`;
}

export default (Comp: any, type: string = 'index') => {
  const WithDetail: NextFunctionComponent<any> = ({
    router,
    repoBasic,
    ...rest
  }: any) => {
    const query = makeQuery(router.query);

    return (
      <Container>
        <RepoBasicContainer>
          <Repo repo={repoBasic} />
          <div>
            {type === 'index' ? (
              <span className="tab">Readme</span>
            ) : (
              <Link href={`/detail${query}`}>
                <a className="tab index">Readme</a>
              </Link>
            )}
            {type === 'issues' ? (
              <span className="tab">Issues</span>
            ) : (
              <Link href={`/detail/issues${query}`}>
                <a className="tab issues">Issues</a>
              </Link>
            )}
          </div>
        </RepoBasicContainer>
        <div>
          <Comp {...rest} />
        </div>
      </Container>
    );
  };

  WithDetail.getInitialProps = async (props: any) => {
    const { detail } = props.reduxStore.getState();

    const { owner, name } = props.ctx.query;
    const fetchingRepoBasicAction = bindActionCreators(
      fetchingRepoBasic,
      props.reduxStore.dispatch,
    );

    let pageData = {};
    if (Comp.getInitialProps) {
      pageData = await Comp.getInitialProps(props);
    }

    const fullname = {
      owner,
      name,
    };
    if (detail.repoBasic.full_name !== `${owner}/${name}`) {
      await fetchingRepoBasicAction(fullname);
    }
    return { pageData };
  };

  const mapStateToProps = (state: ReducersState) => {
    return {
      repoBasic: state.detail.repoBasic,
    };
  };
  return withRouter(connect(mapStateToProps)(WithDetail));
};

const Container = styled.div`
  padding-top: 20px;
`;

const RepoBasicContainer = styled.div`
  padding: 20px;
  border: 1px solid #eee;
  margin-bottom: 20px;
  border-radius: 5px;
  .tab + .tab {
    margin-left: 20px;
  }
`;
