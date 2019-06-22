import withRepoBasic from '../../components/detail/with-repo-basic';
import SearchUser from '../../components/detail/issues/searchUser';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useState, useCallback } from 'react';
import { Button, Select, Spin } from 'antd';
import { bindActionCreators } from 'redux';
import { NextFunctionComponent } from 'next';
import {
  fetchingRepoLabels,
  fetchingRepoIssues,
} from '../../redux/actions/detail';
import { ReducersState } from '../../redux/store';
import { LabelState } from '../../redux/types/detail';
import IssueItem from '../../components/detail/issues/issueItem';

const Option = Select.Option;

function makeQuery(creator: string, state: string, labels: string[]) {
  const creatorStr = creator ? `creator=${creator}` : '';
  const stateStr = state ? `state=${state}` : '';
  let labelStr = '';
  if (labels && labels.length > 0) {
    labelStr = `labels=${labels.join(',')}`;
  }

  const arr = [];

  if (creatorStr) arr.push(creatorStr);
  if (stateStr) arr.push(stateStr);
  if (labelStr) arr.push(labelStr);

  return `?${arr.join('&')}`;
}
const Issues: NextFunctionComponent<any> = ({
  detail,
  fetchingRepoIssues,
  pageData,
}) => {
  const { owner, name } = pageData;
  const [state, setState] = useState();
  const [label, setLabel] = useState([]);
  const [creator, setCreator] = useState();
  const handleCreatorChange = useCallback((value: string) => {
    setCreator(value);
  }, []);
  const handleStateChange = useCallback((value: string) => {
    setState(value);
  }, []);
  const handleLabelChange = useCallback((value: any) => {
    setLabel(value);
  }, []);
  const handleSearch = useCallback(() => {
    const fullname = {
      owner,
      name,
    };
    fetchingRepoIssues(fullname, makeQuery(creator, state, label));
  }, [owner, name, creator, state, label]);
  return (
    <div>
      <SearchContainer>
        <SearchUser handleCreatorChange={handleCreatorChange} value={creator} />
        <Select
          placeholder="Status"
          onChange={handleStateChange}
          style={{ width: 200, marginLeft: 20 }}
          value={state}>
          <Option value="all">all</Option>
          <Option value="open">open</Option>
          <Option value="closed">closed</Option>
        </Select>
        <Select
          mode="multiple"
          placeholder="Label"
          onChange={handleLabelChange}
          style={{ flexGrow: 1, marginLeft: 20, marginRight: 20 }}
          value={label}>
          {detail.labels.items.map((la: LabelState) => (
            <Option value={la.name} key={la.id}>
              {la.name}
            </Option>
          ))}
        </Select>
        <Button
          type="primary"
          disabled={detail.isFetching}
          onClick={handleSearch}>
          Search
        </Button>
      </SearchContainer>
      {detail.isFetching ? (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      ) : (
        <div className="issues">
          {detail.issues.map((issue: any) => (
            <IssueItem issue={issue} key={issue.id} />
          ))}
        </div>
      )}
    </div>
  );
};
const SearchContainer = styled.div`
  display: flex;
`;

const LoadingContainer = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

Issues.getInitialProps = async ({ ctx, reduxStore }: any) => {
  const { owner, name } = ctx.query;
  const fullname = { owner, name };
  const store = reduxStore.getState();
  const { detail } = store;
  const { labels } = detail;
  const fetchingRepoLabelsAction = bindActionCreators(
    fetchingRepoLabels,
    reduxStore.dispatch,
  );
  const fetchingRepoIssuesAction = bindActionCreators(
    fetchingRepoIssues,
    reduxStore.dispatch,
  );
  if (labels.full_name !== `${owner}/${name}`) {
    await fetchingRepoLabelsAction(fullname);
  }
  await fetchingRepoIssuesAction(fullname);
  return {
    owner,
    name,
  };
};

const mapStateToProps = (state: ReducersState) => {
  return {
    detail: state.detail,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchingRepoIssues: bindActionCreators(fetchingRepoIssues, dispatch),
  };
};

export default withRepoBasic(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Issues),
  'issues',
);
