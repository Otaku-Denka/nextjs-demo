import withRepoBasic from '../../components/detail/with-repo-basic';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NextFunctionComponent } from 'next';
import { fetchingRepoReadme } from '../../redux/actions/detail';

import { ReducersState } from '../../redux/store';
const MarkdownRenderer: any = dynamic(
  () => import('../../components/detail/markdownRenderer'),
  {
    loading: () => <p>Loading...</p>,
  },
);
const Detail: NextFunctionComponent<any> = ({ readme }) => {
  return <MarkdownRenderer content={readme.content} isBase64={true} />;
};

Detail.getInitialProps = async ({
  reduxStore,
  ctx: {
    query: { owner, name },
  },
}: any) => {
  const store = reduxStore.getState();
  const { detail } = store;
  const { readme } = detail;
  const fetchingRepoReadmeAction = bindActionCreators(
    fetchingRepoReadme,
    reduxStore.dispatch,
  );
  const fullname = {
    owner,
    name,
  };

  if (readme.full_name !== `${owner}/${name}`) {
    await fetchingRepoReadmeAction(fullname);
  }
  return {};
};

const mapStateToProps = (state: ReducersState) => {
  return {
    readme: state.detail.readme,
  };
};

export default withRepoBasic(connect(mapStateToProps)(Detail), 'index');
